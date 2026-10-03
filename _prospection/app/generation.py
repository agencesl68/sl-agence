"""Génération des leads : registre public -> recherche web -> note -> messages.

Tourne dans un fil d'exécution séparé ; l'interface interroge l'état pour la barre de progression.
"""
import json
import threading
import time
from concurrent.futures import FIRST_COMPLETED, ThreadPoolExecutor, wait

from . import agence, db, entreprises, ia


def _clamp(v, bas, haut):
    try:
        v = int(v)
    except (TypeError, ValueError):
        v = bas
    return max(bas, min(haut, v))


def non_trouve(v):
    return not v or str(v).strip().lower().startswith("non trouv")


def note_finale(e, analyse, taches, signaux, reglages):
    """Score sur 100. Claude note les tâches et les signaux ; le reste est calculé ici."""
    detail = {}
    detail["taches"] = _clamp(analyse.get("note_taches"), 0, 35)
    s = _clamp(analyse.get("note_signaux"), 0, 20)
    detail["signaux"] = s if signaux or taches else min(s, 3)
    detail["taille"] = {"01": 4, "02": 7, "03": 9, "11": 10, "12": 10}.get(e.get("tranche"), 0)
    d = e.get("distance_km")
    if d is None:
        detail["proximite"] = 3
    else:
        detail["proximite"] = 10 if d <= 15 else 8 if d <= 30 else 6 if d <= 50 else 4 if d <= 80 else 2 if d <= 120 else 0
    dirigeant = analyse.get("dirigeant") or {}
    if not non_trouve(dirigeant.get("nom")):
        detail["dirigeant"] = 15
    elif e.get("dirigeant"):
        detail["dirigeant"] = 10
    else:
        detail["dirigeant"] = -10  # pas de dirigeant identifiable : le lead perd beaucoup de points
    age = entreprises.age_annees(e.get("date_creation"))
    detail["capacite"] = 2 if age is None else 10 if age >= 10 else 8 if age >= 5 else 6 if age >= 2 else 1
    detail["bonus_batiment"] = int(reglages.get("bonus_batiment", 0)) if entreprises.est_batiment(e.get("naf")) else 0
    total = sum(detail.values())
    return max(0, min(100, total)), detail


def url_linkedin(nom_dirigeant, entreprise):
    from urllib.parse import quote
    mots = " ".join(x for x in [nom_dirigeant, entreprise] if x)
    return "https://www.linkedin.com/search/results/people/?keywords=" + quote(mots)


def champs_registre(e):
    dirigeant = e.get("dirigeant") or {}
    return {
        "siren": e["siren"],
        "nom": e["nom"],
        "naf": e.get("naf"),
        "naf_libelle": e.get("naf_libelle"),
        "tranche": e.get("tranche"),
        "adresse": e.get("adresse"),
        "commune": e.get("commune"),
        "code_postal": e.get("code_postal"),
        "departement": e.get("departement"),
        "distance_km": e.get("distance_km"),
        "date_creation": e.get("date_creation"),
        "dirigeant_nom": dirigeant.get("nom"),
        "dirigeant_poste": dirigeant.get("poste"),
        "dirigeant_source": ia.url_registre(e["siren"]) if dirigeant else None,
        "registre": json.dumps(e, ensure_ascii=False),
    }


def construire(e, rapport, vues, analyse, profil, reglages):
    """Transforme la recherche et l'analyse en champs de lead. Retourne (champs, score)."""
    taches = ia.filtrer_faits(analyse.get("taches"), vues, e["siren"])
    signaux = ia.filtrer_faits(analyse.get("signaux"), vues, e["siren"])
    score, detail = note_finale(e, analyse, taches, signaux, reglages)
    champs = champs_registre(e)

    site = analyse.get("site_web") or {}
    if not non_trouve(site.get("valeur")) and ia.source_verifiee(site.get("source") or site.get("valeur"), vues, e["siren"]):
        champs["site_web"] = site["valeur"]
        champs["site_web_source"] = site.get("source") or site["valeur"]
    else:
        champs["site_web"] = "non trouvé"
    act = analyse.get("activite") or {}
    if not non_trouve(act.get("valeur")) and ia.source_verifiee(act.get("source"), vues, e["siren"]):
        champs["activite"] = act["valeur"]
        champs["activite_source"] = act["source"]
    else:
        champs["activite"] = "non trouvé"
    dirigeant = analyse.get("dirigeant") or {}
    if not non_trouve(dirigeant.get("nom")) and ia.source_verifiee(dirigeant.get("source"), vues, e["siren"]):
        champs["dirigeant_nom"] = dirigeant["nom"]
        champs["dirigeant_poste"] = dirigeant.get("poste") or champs.get("dirigeant_poste")
        champs["dirigeant_source"] = dirigeant["source"]
    if not champs.get("dirigeant_nom"):
        champs["dirigeant_nom"] = "non trouvé"

    champs.update({
        "taches": taches,
        "signaux": signaux,
        "score": score,
        "score_detail": detail,
        "justification": (analyse.get("justification") or "").strip(),
        "recherche_brute": rapport,
        "etat": "complet",
        "erreur": None,
    })
    if score >= int(reglages["seuil_score"]):
        inv = ia.message_conforme(e, "invitation LinkedIn", analyse.get("invitation") or {}, 300, profil)
        suivi = ia.message_conforme(e, "message de suivi", analyse.get("suivi") or {}, 600, profil)
        champs.update({
            "invitation": inv.get("texte"),
            "invitation_element": inv.get("element"),
            "invitation_source": inv.get("source"),
            "message_suivi": suivi.get("texte"),
            "suivi_element": suivi.get("element"),
            "suivi_source": suivi.get("source"),
        })
    return champs, score


class Generation:
    def __init__(self):
        self.verrou = threading.Lock()
        self.etat = {"en_cours": False}

    def _maj(self, **kw):
        with self.verrou:
            self.etat.update(kw)

    def journal(self, texte):
        with self.verrou:
            j = self.etat.setdefault("journal", [])
            j.append(f"{time.strftime('%H:%M:%S')}  {texte}")
            del j[:-40]

    def lire(self):
        with self.verrou:
            e = dict(self.etat)
            e["journal"] = list(self.etat.get("journal", []))
        return e

    def lancer(self, nb):
        with self.verrou:
            if self.etat.get("en_cours"):
                raise RuntimeError("Une génération est déjà en cours.")
            self.etat = {
                "en_cours": True, "voulus": nb, "ajoutes": 0, "ecartes": 0, "a_completer": 0,
                "examines": 0, "etape": "Préparation", "journal": [], "erreur": None,
                "cout_depart": db.consommation_du_jour()["cout"], "debut": db.maintenant(),
            }
        threading.Thread(target=self._executer, args=(nb,), daemon=True).start()

    # -- traitement d'une entreprise --
    def traiter(self, e, profil, reglages):
        try:
            rapport, vues = ia.rechercher(e)
        except ia.PlafondAtteint as err:
            return "plafond", str(err), e
        except ia.ErreurIA as err:
            db.inserer_lead({**champs_registre(e), "etat": "a_completer", "erreur": str(err)})
            return "a_completer", str(err), e
        try:
            analyse = ia.analyser(e, rapport, profil)
        except ia.ErreurIA as err:
            db.inserer_lead({
                **champs_registre(e), "etat": "a_completer", "erreur": str(err), "recherche_brute": rapport,
            })
            return ("plafond" if isinstance(err, ia.PlafondAtteint) else "a_completer"), str(err), e
        champs, score = construire(e, rapport, vues, analyse, profil, reglages)
        if score < int(reglages["seuil_score"]):
            db.exclure(e["siren"], f"ecarte_score_{score}")
            return "ecarte", score, e
        db.inserer_lead(champs)
        return "ajoute", score, e

    def _executer(self, nb):
        try:
            reglages = db.reglages()
            if not ia.cle_presente():
                raise ia.ErreurIA("Clé API Anthropic absente : ajoutez-la dans le fichier .env puis relancez.")
            ia.verifier_plafond(ia.ESTIMATION_PAR_ENTREPRISE)
            profil = agence.profil()
            if profil is None:
                self._maj(etape="Lecture du site slagence.fr")
                self.journal("Premier lancement : lecture du site slagence.fr")
                profil, _ = agence.mettre_a_jour()

            self._maj(etape="Recherche d'entreprises dans le registre public")
            deja = db.sirens_connus()
            file = entreprises.ordonner(
                entreprises.chercher_candidats(nb * 4, reglages, deja, journal=self.journal), reglages
            )
            self.journal(f"{len(file)} entreprises candidates trouvées")
            recharges = 0
            paralleles = max(1, int(reglages.get("recherches_paralleles", 3)))
            essais_max = nb * 4
            stop = None
            with ThreadPoolExecutor(max_workers=paralleles) as ex:
                en_vol = {}
                while True:
                    etat = self.lire()
                    restant = nb - etat["ajoutes"] - etat["a_completer"]
                    while (
                        not stop and restant - len(en_vol) > 0 and len(en_vol) < paralleles
                        and etat["examines"] + len(en_vol) < essais_max
                    ):
                        if not file and recharges < 3:
                            recharges += 1
                            self._maj(etape="Recherche de nouvelles entreprises")
                            deja = db.sirens_connus() | {c["siren"] for c in en_vol.values()}
                            file = entreprises.ordonner(
                                entreprises.chercher_candidats(nb * 3, reglages, deja, journal=self.journal),
                                reglages,
                            )
                        if not file:
                            break
                        e = file.pop(0)
                        self.journal(f"Recherche web : {e['nom']} ({e['commune']})")
                        en_vol[ex.submit(self.traiter, e, profil, reglages)] = e
                    if not en_vol:
                        break
                    self._maj(etape=f"Recherche et analyse ({len(en_vol)} en cours)")
                    finis, _ = wait(list(en_vol), return_when=FIRST_COMPLETED)
                    for f in finis:
                        en_vol.pop(f)
                        try:
                            resultat, info, e = f.result()
                        except Exception as err:  # une erreur imprévue ne bloque pas le lot
                            self._maj(examines=self.lire()["examines"] + 1)
                            self.journal(f"Erreur inattendue : {err}")
                            continue
                        etat = self.lire()
                        if resultat == "plafond":
                            stop = info
                            self.journal(info)
                            if e["siren"] in db.sirens_connus():
                                self._maj(a_completer=etat["a_completer"] + 1)
                            continue
                        maj = {"examines": etat["examines"] + 1}
                        if resultat == "ajoute":
                            maj["ajoutes"] = etat["ajoutes"] + 1
                            self.journal(f"Ajouté : {e['nom']} ({info}/100)")
                        elif resultat == "ecarte":
                            maj["ecartes"] = etat["ecartes"] + 1
                            self.journal(f"Écarté : {e['nom']} ({info}/100, sous le seuil)")
                        else:
                            maj["a_completer"] = etat["a_completer"] + 1
                            self.journal(f"À compléter : {e['nom']} ({info})")
                        self._maj(**maj)
            fin = self.lire()
            if stop:
                self._maj(erreur=stop)
            elif fin["ajoutes"] + fin["a_completer"] < nb:
                self.journal("Moins de leads que demandé : candidats épuisés ou trop de notes basses pour ce lot.")
        except (ia.ErreurIA, entreprises.ErreurRegistre, RuntimeError) as err:
            self._maj(erreur=str(err))
            self.journal(str(err))
        except Exception as err:
            self._maj(erreur=f"Erreur inattendue : {err}")
            self.journal(f"Erreur inattendue : {err}")
        finally:
            cout = db.consommation_du_jour()["cout"] - self.lire().get("cout_depart", 0)
            self._maj(en_cours=False, etape="Terminé", cout_lot=round(cout, 4), fin=db.maintenant())


def completer(lead_id):
    """Relance la recherche pour un lead « à compléter »."""
    brut = db.lead(lead_id, brut=True)
    if brut is None:
        raise KeyError(lead_id)
    e = json.loads(brut.get("registre") or "{}")
    if not e:
        raise RuntimeError("Données du registre manquantes pour ce lead.")
    reglages = db.reglages()
    profil = agence.profil_ou_defaut()
    rapport, vues = ia.rechercher(e)
    analyse = ia.analyser(e, rapport, profil)
    champs, score = construire(e, rapport, vues, analyse, profil, reglages)
    champs.pop("siren", None)
    if score < int(reglages["seuil_score"]):
        champs["erreur"] = f"Note {score}/100, sous le seuil : vous pouvez le supprimer."
    db.maj_lead(lead_id, champs)
    return db.lead(lead_id)


generation = Generation()
