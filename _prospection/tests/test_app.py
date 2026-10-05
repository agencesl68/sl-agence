"""Tests de bout en bout avec l'API Anthropic et le registre simulés (aucun coût).

Lancer : .venv/bin/python -m unittest discover tests -v
"""
import json
import os
import tempfile
import time
import unittest
from datetime import datetime, timedelta
from types import SimpleNamespace as NS
from unittest import mock

os.environ["PROSPECTION_DB"] = os.path.join(tempfile.mkdtemp(), "test.db")
os.environ["ANTHROPIC_API_KEY"] = "test"

from app import db, entreprises, generation, ia  # noqa: E402
from app.serveur import app  # noqa: E402


def entreprise_api(i, dep="68", tranche="11", naf="43.22A", lat=47.75, lon=7.33, dirigeant=True):
    return {
        "siren": f"{100000000 + i}",
        "nom_raison_sociale": f"ENTREPRISE {i}",
        "nom_complet": f"ENTREPRISE {i}",
        "section_activite_principale": "F",
        "activite_principale": naf,
        "tranche_effectif_salarie": tranche,
        "date_creation": "2012-03-01",
        "nature_juridique": "5499",
        "etat_administratif": "A",
        "complements": {"est_administration": False},
        "siege": {
            "activite_principale": naf, "tranche_effectif_salarie": tranche, "departement": dep,
            "libelle_commune": f"COMMUNE{i % 7}", "code_postal": "68100", "adresse": f"{i} rue X 68100",
            "latitude": str(lat), "longitude": str(lon), "liste_enseignes": None,
        },
        "dirigeants": [{"nom": f"DUPONT{i}", "prenoms": "JEAN PAUL", "qualite": "Gérant",
                        "type_dirigeant": "personne physique", "annee_de_naissance": "1970"}] if dirigeant else [],
    }


def faux_registre(params):
    page = params["page"]
    base = (hash((params["departement"], params["section_activite_principale"])) % 1000) * 100 + page * 25
    res = [entreprise_api(base + k) for k in range(25)]
    res[0]["siege"]["departement"] = "75"  # hors zone : doit être filtrée
    res[1]["siege"]["tranche_effectif_salarie"] = "NN"  # hors taille : filtrée
    return {"results": res, "total_pages": 3, "page": page}


def usage(entree=3000, sortie=800, recherches=0):
    return NS(input_tokens=entree, output_tokens=sortie, cache_read_input_tokens=0,
              cache_creation_input_tokens=0, server_tool_use=NS(web_search_requests=recherches))


class FauxClaude:
    """Imite client.beta.messages.create selon le type de demande."""

    def __init__(self):
        self.appels = []
        self.note_taches = 28
        self.echec_recherche = set()
        self.texte_invitation = "Bonjour Jean Dupont, j'ai vu que votre entreprise recrute une assistante administrative à Mulhouse. Je travaille avec des artisans du Haut-Rhin, je serais ravi d'échanger avec vous."
        self.beta = NS(messages=NS(create=self.create))

    def create(self, **kw):
        self.appels.append(kw)
        assert kw["model"] == "claude-sonnet-5-5"
        assert kw["fallbacks"] == "default"
        if kw.get("tools"):
            contenu = kw["messages"][0]["content"]
            for s in self.echec_recherche:
                if s in contenu:
                    raise ia.anthropic.APIConnectionError(request=mock.Mock())
            return NS(
                model="claude-sonnet-5-5", stop_reason="end_turn", usage=usage(40000, 2500, 4),
                content=[
                    NS(type="server_tool_use"),
                    NS(type="web_search_tool_result", content=[
                        NS(url="https://www.exemple-plombier.fr/"),
                        NS(url="https://www.indeed.fr/emploi/123"),
                    ]),
                    NS(type="text", text="SITE : exemple-plombier.fr | https://www.exemple-plombier.fr/\n"
                                         "TÂCHES : bons d'intervention papier | https://www.exemple-plombier.fr/services",
                       citations=None),
                ],
            )
        schema = kw["output_config"]["format"]["schema"]["properties"]
        if "note_taches" in schema:
            donnees = {
                "site_web": {"valeur": "https://www.exemple-plombier.fr/", "source": "https://www.exemple-plombier.fr/"},
                "activite": {"valeur": "Plomberie et chauffage pour particuliers", "source": "https://www.exemple-plombier.fr/"},
                "dirigeant": {"nom": "Jean Dupont", "poste": "Gérant", "source": "https://www.exemple-plombier.fr/equipe"},
                "taches": [
                    {"fait": "Bons d'intervention remplis sur papier", "source": "https://www.exemple-plombier.fr/services"},
                    {"fait": "Fait inventé", "source": "https://site-invente.fr/page"},
                ],
                "signaux": [{"fait": "Recrute une assistante administrative", "source": "https://www.indeed.fr/emploi/123"}],
                "note_taches": self.note_taches,
                "note_signaux": 15,
                "justification": "Beaucoup d'interventions. Recrutement administratif en cours.",
                "invitation": {"texte": self.texte_invitation, "element": "recrutement d'une assistante",
                               "source": "https://www.indeed.fr/emploi/123"},
                "suivi": {"texte": "Merci d'avoir accepté. Vos bons d'intervention sont encore sur papier — "
                                   "on peut les passer sur téléphone. Un appel de 15 minutes ? Loïc",
                          "element": "bons papier", "source": "https://www.exemple-plombier.fr/services"},
            }
        elif "offre" in schema:
            donnees = {"offre": "Automatisation.", "taches_supprimees": ["ressaisie"], "services": ["outils"],
                       "ton": "direct", "cibles": ["TPE"]}
        else:
            donnees = {"texte": "Bonjour Jean Dupont, nouvelle version courte.", "element": "bons papier",
                       "source": "https://www.exemple-plombier.fr/services"}
        return NS(model="claude-sonnet-5-5", stop_reason="end_turn", usage=usage(),
                  content=[NS(type="text", text=json.dumps(donnees), citations=None)])


def attendre_fin():
    for _ in range(200):
        if not generation.generation.lire().get("en_cours"):
            return generation.generation.lire()
        time.sleep(0.05)
    raise AssertionError("génération trop longue")


class Base(unittest.TestCase):
    def setUp(self):
        if os.path.exists(db.DB_PATH):
            os.remove(db.DB_PATH)
        db.init()
        db.enregistrer_reglages({"plafond_cout_jour": 50.0})
        self.claude = FauxClaude()
        p1 = mock.patch.object(ia, "client", return_value=self.claude)
        p2 = mock.patch.object(entreprises, "appeler_api", side_effect=faux_registre)
        p3 = mock.patch.object(entreprises, "time", NS(sleep=lambda s: None))
        p4 = mock.patch("app.agence.lire_site", return_value=([{"url": "https://slagence.fr/", "titre": "SL", "texte": "Automatisation"}], []))
        for p in (p1, p2, p3, p4):
            p.start()
            self.addCleanup(p.stop)
        generation.generation.etat = {"en_cours": False}
        self.web = app.test_client()


class TestGeneration(Base):
    def test_genere_ajoute_et_ne_duplique_pas(self):
        generation.generation.lancer(5)
        g = attendre_fin()
        self.assertIsNone(g["erreur"], g["journal"])
        self.assertEqual(g["ajoutes"], 5)
        leads = db.leads()
        self.assertEqual(len(leads), 5)
        l = leads[0]
        self.assertEqual(l["dirigeant_nom"], "Jean Dupont")
        self.assertGreaterEqual(l["score"], 40)
        # Le fait dont la source n'a pas été vue dans la recherche est écarté.
        self.assertEqual([f["fait"] for f in l["taches"]], ["Bons d'intervention remplis sur papier"])
        # Tiret long retiré, limites respectées.
        self.assertNotIn("—", l["message_suivi"])
        self.assertLessEqual(len(l["invitation"]), 300)
        self.assertLessEqual(len(l["message_suivi"]), 600)
        # Profil agence construit au premier lancement, avec les preuves réelles.
        with db.connexion() as con:
            profil = json.loads(con.execute("SELECT donnees FROM profil_agence").fetchone()[0])
        self.assertIn("Devis sous 24 heures", profil["preuves"])

        generation.generation.lancer(5)
        attendre_fin()
        sirens = [x["siren"] for x in db.leads()]
        self.assertEqual(len(sirens), 10)
        self.assertEqual(len(set(sirens)), 10)
        self.assertTrue(all(x["departement"] in ("68", "67") for x in db.leads()))
        self.assertGreater(db.consommation_du_jour()["cout"], 0)

    def test_notes_basses_ecartees_et_jamais_reproposees(self):
        self.claude.note_taches = 0
        db.enregistrer_reglages({"seuil_score": 90})
        generation.generation.lancer(2)
        g = attendre_fin()
        self.assertEqual(g["ajoutes"], 0)
        self.assertGreater(g["ecartes"], 0)
        with db.connexion() as con:
            exclus = {r[0] for r in con.execute("SELECT siren FROM exclusions")}
        self.assertTrue(exclus)
        self.assertTrue(exclus <= db.sirens_connus())

    def test_echec_recherche_donne_un_lead_a_completer(self):
        cible = None
        with mock.patch.object(entreprises, "chercher_candidats",
                               wraps=entreprises.chercher_candidats) as espion:
            self.claude.echec_recherche = {"SIREN : 1"}  # tous les SIREN commencent par 1
            generation.generation.lancer(2)
            g = attendre_fin()
            self.assertTrue(espion.called)
        self.assertEqual(g["a_completer"], 2)
        a_completer = [l for l in db.leads() if l["etat"] == "a_completer"]
        self.assertEqual(len(a_completer), 2)
        cible = a_completer[0]["id"]
        self.claude.echec_recherche = set()
        r = self.web.post(f"/api/leads/{cible}/completer")
        self.assertEqual(r.status_code, 200, r.json)
        self.assertEqual(r.json["etat"], "complet")
        self.assertIsNotNone(r.json["invitation"])

    def test_plafond_arrete_la_generation(self):
        db.enregistrer_reglages({"plafond_cout_jour": 0.0})
        generation.generation.lancer(3)
        g = attendre_fin()
        self.assertIn("Plafond", g["erreur"])
        self.assertEqual(db.leads(), [])


class TestMessages(unittest.TestCase):
    def test_nettoyage(self):
        self.assertEqual(ia.nettoyer("Bonjour — vous 🙂 allez bien"), "Bonjour, vous allez bien")

    def test_problemes(self):
        self.assertTrue(ia.problemes("x" * 301, 300))
        self.assertTrue(ia.problemes("Notre workflow est simple", 300))
        self.assertTrue(ia.problemes("Tu as un process", 300))
        self.assertEqual(ia.problemes("Bonjour, vous gérez vos bons sur papier.", 300), [])

    def test_note(self):
        e = {"tranche": "11", "distance_km": 10, "date_creation": "2010-01-01", "naf": "43.22A", "dirigeant": None}
        score, d = generation.note_finale(e, {"note_taches": 30, "note_signaux": 10, "dirigeant": {"nom": "non trouvé"}},
                                          [], [], {"bonus_batiment": 5})
        self.assertEqual(d["dirigeant"], -10)
        self.assertEqual(d["signaux"], 3)  # rien de sourcé : signaux plafonnés
        self.assertEqual(score, 30 + 3 + 10 + 10 - 10 + 10 + 5)


class TestSuivi(Base):
    def creer(self, n=3):
        generation.generation.lancer(n)
        attendre_fin()
        return db.leads()

    def test_statuts_vue_jour_relance_et_suppression(self):
        leads = self.creer(3)
        a, b, c = (l["id"] for l in leads)
        self.assertEqual(len(self.web.get("/api/aujourdhui").json["a_contacter"]), 3)

        self.web.post(f"/api/leads/{a}/statut", json={"statut": "invitation_envoyee"})
        self.web.post(f"/api/leads/{a}/statut", json={"statut": "invitation_acceptee"})
        self.assertEqual([x["id"] for x in self.web.get("/api/aujourdhui").json["suivis"]], [a])

        self.web.post(f"/api/leads/{a}/statut", json={"statut": "message_envoye"})
        self.assertEqual(self.web.get("/api/aujourdhui").json["relances"], [])
        il_y_a_8_jours = (datetime.now() - timedelta(days=8)).isoformat(timespec="seconds")
        db.maj_lead(a, {"statut_maj_le": il_y_a_8_jours})
        self.assertEqual([x["id"] for x in self.web.get("/api/aujourdhui").json["relances"]], [a])
        r = self.web.post(f"/api/leads/{a}/relance")
        self.assertEqual(r.status_code, 200)
        self.assertTrue(r.json["relance"])
        self.web.post(f"/api/leads/{a}/relance_envoyee")
        self.assertEqual(self.web.get("/api/aujourdhui").json["relances"], [])

        # Ne pas contacter : bloqué pour toujours.
        self.web.post(f"/api/leads/{b}/statut", json={"statut": "ne_pas_contacter"})
        siren_b = db.lead(b)["siren"]
        with db.connexion() as con:
            motif = con.execute("SELECT motif FROM exclusions WHERE siren = ?", (siren_b,)).fetchone()[0]
        self.assertEqual(motif, "ne_pas_contacter")

        # Suppression définitive : plus aucune donnée, seul le SIREN reste exclu.
        siren_c = db.lead(c)["siren"]
        self.assertEqual(self.web.delete(f"/api/leads/{c}").status_code, 200)
        self.assertIsNone(db.lead(c))
        self.assertIn(siren_c, db.sirens_connus())

        t = self.web.get("/api/tableau").json
        self.assertEqual(t["semaines"][0]["contactes"], 1)
        self.assertEqual(t["semaines"][0]["acceptees"], 1)
        self.assertEqual(t["semaines"][0]["taux_acceptation"], 100)

    def test_reecrire_texte_export_reglages(self):
        l = self.creer(1)[0]
        r = self.web.post(f"/api/leads/{l['id']}/reecrire", json={"nature": "invitation"})
        self.assertEqual(r.json["invitation"], "Bonjour Jean Dupont, nouvelle version courte.")
        self.web.post(f"/api/leads/{l['id']}/texte", json={"champ": "message_suivi", "texte": "Modifié"})
        self.assertEqual(db.lead(l["id"])["message_suivi"], "Modifié")
        self.assertIn("linkedin.com/search/results/people/?keywords=Jean%20Dupont", self.web.get("/api/leads").json[0]["linkedin"])

        csv = self.web.get("/api/export.csv")
        self.assertEqual(csv.status_code, 200)
        texte = csv.data.decode("utf-8-sig")
        self.assertTrue(texte.startswith("Entreprise;SIREN"))
        self.assertIn(l["siren"], texte)

        self.assertEqual(self.web.post("/api/reglages", json={"tranches": []}).status_code, 400)
        r = self.web.post("/api/reglages", json={"nb_leads": 12, "bonus_batiment": 99, "departements": ["68"]})
        self.assertEqual(r.json["valeurs"]["nb_leads"], 12)
        self.assertEqual(r.json["valeurs"]["bonus_batiment"], 30)
        e = self.web.get("/api/etat").json
        self.assertTrue(e["cle_presente"])
        self.assertEqual(e["statuts"][0], ["a_contacter", "À contacter"])
        self.assertEqual(e["nb_leads"], 12)
        self.assertEqual(self.web.get("/").status_code, 200)


if __name__ == "__main__":
    unittest.main()


class TestCle(unittest.TestCase):
    def test_enregistrement_de_la_cle(self):
        env = os.path.join(tempfile.mkdtemp(), ".env")
        with open(env, "w") as f:
            f.write("# commentaire\nANTHROPIC_API_KEY=\n")
        bonne = "sk-ant-api03-" + "a" * 40
        with self.assertRaises(ia.ErreurIA):
            ia.verifier_et_enregistrer_cle("bonjour", env)
        faux = mock.Mock()
        reponse = mock.Mock(status_code=401, headers={})
        faux.return_value.models.list.side_effect = ia.anthropic.AuthenticationError("non", response=reponse, body=None)
        with mock.patch.object(ia.anthropic, "Anthropic", faux):
            with self.assertRaises(ia.ErreurIA) as ctx:
                ia.verifier_et_enregistrer_cle(bonne, env)
            self.assertIn("refuse", str(ctx.exception))
        faux.return_value.models.list.side_effect = None
        avant = os.environ.get("ANTHROPIC_API_KEY")
        try:
            with mock.patch.object(ia.anthropic, "Anthropic", faux):
                ia.verifier_et_enregistrer_cle(f"  {bonne} ", env)
            with open(env) as f:
                contenu = f.read()
            self.assertEqual(contenu, f"# commentaire\nANTHROPIC_API_KEY={bonne}\n")
            self.assertEqual(os.environ["ANTHROPIC_API_KEY"], bonne)
        finally:
            os.environ["ANTHROPIC_API_KEY"] = avant or ""
