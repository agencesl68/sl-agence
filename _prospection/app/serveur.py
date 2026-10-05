"""Serveur web local (Flask). Ouvre http://127.0.0.1:5068"""
import csv
import io
import os
from datetime import datetime, timedelta

from dotenv import load_dotenv
from flask import Flask, Response, jsonify, request, send_from_directory

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
load_dotenv(os.path.join(RACINE, ".env"))

from . import agence, db, entreprises, ia  # noqa: E402  (après le chargement du .env)
from .generation import completer, generation, url_linkedin  # noqa: E402

app = Flask(__name__, static_folder=os.path.join(RACINE, "static"), static_url_path="/static")
db.init()


def enrichir(lead):
    lead["linkedin"] = url_linkedin(
        lead.get("dirigeant_nom") if not str(lead.get("dirigeant_nom", "")).startswith("non trouv") else "",
        lead.get("nom"),
    )
    lead["tranche_libelle"] = entreprises.TRANCHES.get(lead.get("tranche"), "")
    lead["statut_libelle"] = db.LIBELLES_STATUTS.get(lead.get("statut"), lead.get("statut"))
    lead["registre_url"] = ia.url_registre(lead["siren"])
    return lead


def erreur(message, code=400):
    return jsonify({"erreur": message}), code


@app.get("/")
def accueil():
    return send_from_directory(app.static_folder, "index.html")


@app.get("/api/etat")
def etat():
    r = db.reglages()
    return jsonify({
        "conso": db.consommation_du_jour(),
        "plafond": r["plafond_cout_jour"],
        "nb_leads": r["nb_leads"],
        "cle_presente": ia.cle_presente(),
        "profil_existe": agence.profil() is not None,
        "generation": generation.lire(),
        "statuts": [[cle, db.LIBELLES_STATUTS[cle]] for cle in db.STATUTS],
    })


@app.post("/api/generer")
def generer():
    r = db.reglages()
    nb = int((request.get_json(silent=True) or {}).get("nb") or r["nb_leads"])
    nb = max(1, min(nb, 50))
    try:
        generation.lancer(nb)
    except RuntimeError as e:
        return erreur(str(e), 409)
    return jsonify({"ok": True})


@app.get("/api/generation")
def suivi_generation():
    return jsonify(generation.lire())


@app.get("/api/leads")
def liste_leads():
    return jsonify([enrichir(l) for l in db.leads(request.args.get("statut") or None)])


@app.get("/api/aujourdhui")
def aujourdhui():
    tous = [enrichir(l) for l in db.leads()]
    limite = (datetime.now() - timedelta(days=7)).isoformat(timespec="seconds")
    return jsonify({
        "a_contacter": [l for l in tous if l["statut"] == "a_contacter"],
        "suivis": [l for l in tous if l["statut"] == "invitation_acceptee"],
        "relances": [
            l for l in tous
            if l["statut"] == "message_envoye" and (l.get("statut_maj_le") or "") <= limite
            and not l.get("relance_envoyee_le")
        ],
    })


@app.post("/api/leads/<int:lead_id>/statut")
def statut(lead_id):
    valeur = (request.get_json(silent=True) or {}).get("statut")
    try:
        db.changer_statut(lead_id, valeur)
    except ValueError as e:
        return erreur(str(e))
    except KeyError:
        return erreur("Lead introuvable", 404)
    return jsonify(enrichir(db.lead(lead_id)))


@app.post("/api/leads/<int:lead_id>/reecrire")
def reecrire(lead_id):
    nature = (request.get_json(silent=True) or {}).get("nature")
    if nature not in ("invitation", "suivi"):
        return erreur("Nature inconnue")
    lead = db.lead(lead_id)
    if lead is None:
        return erreur("Lead introuvable", 404)
    try:
        m = ia.reecrire(lead, nature, agence.profil_ou_defaut())
    except ia.ErreurIA as e:
        return erreur(str(e))
    if nature == "invitation":
        db.maj_lead(lead_id, {"invitation": m["texte"], "invitation_element": m.get("element"),
                              "invitation_source": m.get("source")})
    else:
        db.maj_lead(lead_id, {"message_suivi": m["texte"], "suivi_element": m.get("element"),
                              "suivi_source": m.get("source")})
    return jsonify(enrichir(db.lead(lead_id)))


@app.post("/api/leads/<int:lead_id>/texte")
def modifier_texte(lead_id):
    v = request.get_json(silent=True) or {}
    if v.get("champ") not in ("invitation", "message_suivi", "relance"):
        return erreur("Champ inconnu")
    if db.lead(lead_id) is None:
        return erreur("Lead introuvable", 404)
    db.maj_lead(lead_id, {v["champ"]: str(v.get("texte") or "")})
    return jsonify({"ok": True})


@app.post("/api/leads/<int:lead_id>/relance")
def ecrire_relance(lead_id):
    lead = db.lead(lead_id)
    if lead is None:
        return erreur("Lead introuvable", 404)
    try:
        m = ia.relance(lead, agence.profil_ou_defaut())
    except ia.ErreurIA as e:
        return erreur(str(e))
    db.maj_lead(lead_id, {"relance": m["texte"]})
    return jsonify(enrichir(db.lead(lead_id)))


@app.post("/api/leads/<int:lead_id>/relance_envoyee")
def relance_envoyee(lead_id):
    db.maj_lead(lead_id, {"relance_envoyee_le": db.maintenant()})
    return jsonify(enrichir(db.lead(lead_id)))


@app.post("/api/leads/<int:lead_id>/completer")
def completer_lead(lead_id):
    try:
        lead = completer(lead_id)
    except ia.ErreurIA as e:
        db.maj_lead(lead_id, {"erreur": str(e)})
        return erreur(str(e))
    except (KeyError, RuntimeError) as e:
        return erreur(str(e))
    return jsonify(enrichir(lead))


@app.delete("/api/leads/<int:lead_id>")
def supprimer(lead_id):
    if not db.supprimer_lead(lead_id):
        return erreur("Lead introuvable", 404)
    return jsonify({"ok": True})


@app.get("/api/tableau")
def tableau():
    with db.connexion() as con:
        rows = con.execute(
            "SELECT strftime('%Y-%W', le) AS semaine, MIN(date(le)) AS debut, statut, "
            "COUNT(DISTINCT COALESCE(CAST(lead_id AS TEXT), 'e' || id)) AS n "
            "FROM evenements GROUP BY semaine, statut ORDER BY semaine DESC"
        ).fetchall()
        en_base = {r["statut"]: r["n"] for r in con.execute(
            "SELECT statut, COUNT(*) AS n FROM leads GROUP BY statut")}
    semaines = {}
    for r in rows:
        s = semaines.setdefault(r["semaine"], {"semaine": r["semaine"], "debut": r["debut"]})
        s["debut"] = min(s["debut"], r["debut"])
        s[r["statut"]] = r["n"]
    res = []
    for s in sorted(semaines.values(), key=lambda x: x["semaine"], reverse=True)[:12]:
        contactes = s.get("invitation_envoyee", 0)
        acceptees = s.get("invitation_acceptee", 0)
        res.append({
            "semaine": s["semaine"],
            "debut": s["debut"],
            "contactes": contactes,
            "acceptees": acceptees,
            "taux_acceptation": round(100 * acceptees / contactes) if contactes else None,
            "messages": s.get("message_envoye", 0),
            "reponses": s.get("a_repondu", 0),
            "rdv": s.get("rdv_pris", 0),
        })
    return jsonify({"semaines": res, "statuts_actuels": en_base})


@app.get("/api/export.csv")
def export_csv():
    colonnes = [
        ("nom", "Entreprise"), ("siren", "SIREN"), ("commune", "Commune"), ("naf_libelle", "Activité"),
        ("tranche_libelle", "Effectif"), ("dirigeant_nom", "Dirigeant"), ("dirigeant_poste", "Poste"),
        ("site_web", "Site"), ("score", "Score"), ("justification", "Justification"),
        ("statut_libelle", "Statut"), ("invitation", "Invitation"), ("message_suivi", "Message de suivi"),
        ("invitation_source", "Source invitation"), ("suivi_source", "Source message"),
        ("linkedin", "Recherche LinkedIn"), ("cree_le", "Ajouté le"), ("statut_maj_le", "Statut mis à jour le"),
    ]
    sortie = io.StringIO()
    w = csv.writer(sortie, delimiter=";")
    w.writerow([c[1] for c in colonnes])
    for l in db.leads():
        l = enrichir(l)
        w.writerow([l.get(c[0]) if l.get(c[0]) is not None else "" for c in colonnes])
    nom = f"leads-sl-agence-{db.aujourdhui()}.csv"
    return Response(
        "﻿" + sortie.getvalue(),
        mimetype="text/csv; charset=utf-8",
        headers={"Content-Disposition": f'attachment; filename="{nom}"'},
    )


@app.get("/api/reglages")
def lire_reglages():
    return jsonify({"valeurs": db.reglages(), "sections": entreprises.SECTIONS, "tranches": entreprises.TRANCHES})


@app.post("/api/reglages")
def ecrire_reglages():
    v = request.get_json(silent=True) or {}
    propres = {}
    try:
        if "nb_leads" in v:
            propres["nb_leads"] = max(1, min(50, int(v["nb_leads"])))
        if "departements" in v:
            deps = [str(d).strip().zfill(2) for d in v["departements"] if str(d).strip()]
            if not deps:
                return erreur("Indiquez au moins un département.")
            propres["departements"] = deps
        if "poids_departements" in v:
            propres["poids_departements"] = {str(k): max(1, int(x)) for k, x in v["poids_departements"].items()}
        if "tranches" in v:
            tr = [t for t in v["tranches"] if t in entreprises.TRANCHES]
            if not tr:
                return erreur("Choisissez au moins une taille d'entreprise.")
            propres["tranches"] = tr
        for cle, bas, haut in (("bonus_batiment", 0, 30), ("seuil_score", 0, 100),
                               ("recherches_web_max", 1, 15), ("recherches_paralleles", 1, 5)):
            if cle in v:
                propres[cle] = max(bas, min(haut, int(v[cle])))
        if "plafond_cout_jour" in v:
            propres["plafond_cout_jour"] = max(0.0, float(v["plafond_cout_jour"]))
    except (TypeError, ValueError):
        return erreur("Valeur invalide.")
    db.enregistrer_reglages(propres)
    return jsonify({"valeurs": db.reglages()})


@app.post("/api/cle")
def enregistrer_cle():
    cle = (request.get_json(silent=True) or {}).get("cle")
    try:
        ia.verifier_et_enregistrer_cle(cle, os.path.join(RACINE, ".env"))
    except ia.ErreurIA as e:
        return erreur(str(e))
    import threading

    threading.Thread(target=construire_profil_si_besoin, daemon=True).start()
    return jsonify({"ok": True})


@app.get("/api/profil")
def lire_profil():
    return jsonify(agence.profil())


@app.post("/api/profil/maj")
def maj_profil():
    try:
        profil, erreurs = agence.mettre_a_jour()
    except (RuntimeError, ia.ErreurIA) as e:
        return erreur(str(e))
    return jsonify({"profil": agence.profil(), "erreurs": erreurs})


def construire_profil_si_besoin():
    """Premier lancement (ou clé ajoutée depuis) : lit slagence.fr en arrière-plan."""
    p = agence.profil()
    if p is None or (p.get("mode") == "base" and ia.cle_presente()):
        try:
            agence.mettre_a_jour()
            print("  Profil agence construit à partir de slagence.fr")
        except Exception as e:  # le profil de base reste utilisable
            print(f"  Lecture de slagence.fr impossible pour l'instant : {e}")


def port_occupe(port):
    import socket

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        return s.connect_ex(("127.0.0.1", port)) == 0


def demarrer(port=5068, ouvrir=True):
    import threading

    if port_occupe(port):
        print(f"\n  L'application est déjà ouverte : http://127.0.0.1:{port}\n")
        if ouvrir:
            import webbrowser
            webbrowser.open(f"http://127.0.0.1:{port}")
        return
    threading.Thread(target=construire_profil_si_besoin, daemon=True).start()
    if ouvrir:
        import webbrowser
        threading.Timer(1.2, lambda: webbrowser.open(f"http://127.0.0.1:{port}")).start()
    print(f"\n  SL Agence · Prospection  ->  http://127.0.0.1:{port}\n  (Ctrl+C pour arrêter)\n")
    app.run(host="127.0.0.1", port=port, debug=False, threaded=True)
