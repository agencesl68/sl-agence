"""Recherche d'entreprises via l'API publique recherche-entreprises.api.gouv.fr.

Aucun accès à LinkedIn ici : seulement le registre public des entreprises.
"""
import math
import re
import time
from datetime import date

import requests

from . import db

API = "https://recherche-entreprises.api.gouv.fr/search"
MULHOUSE = (47.7508, 7.3359)

# Sections NAF retenues (on écarte l'administration publique, les ménages employeurs
# et les organismes extraterritoriaux).
SECTIONS = {
    "F": "Construction",
    "C": "Industrie manufacturière",
    "M": "Activités spécialisées, scientifiques et techniques",
    "G": "Commerce, réparation automobile",
    "Q": "Santé humaine et action sociale",
    "N": "Services administratifs et de soutien",
    "H": "Transports et entreposage",
    "A": "Agriculture",
    "L": "Activités immobilières",
    "I": "Hébergement et restauration",
    "K": "Activités financières et d'assurance",
    "S": "Autres activités de services",
    "J": "Information et communication",
    "E": "Eau, assainissement, déchets",
    "P": "Enseignement",
    "R": "Arts, spectacles et loisirs",
    "D": "Énergie",
}

TRANCHES = {
    "01": "1 ou 2 salariés",
    "02": "3 à 5 salariés",
    "03": "6 à 9 salariés",
    "11": "10 à 19 salariés",
    "12": "20 à 49 salariés",
}

DIVISIONS_NAF = {
    "01": "Culture et production animale", "02": "Sylviculture", "03": "Pêche et aquaculture",
    "05": "Extraction de houille", "08": "Autres industries extractives",
    "10": "Industries alimentaires", "11": "Fabrication de boissons", "13": "Fabrication de textiles",
    "14": "Industrie de l'habillement", "15": "Industrie du cuir", "16": "Travail du bois",
    "17": "Industrie du papier", "18": "Imprimerie", "20": "Industrie chimique",
    "21": "Industrie pharmaceutique", "22": "Produits en caoutchouc et plastique",
    "23": "Produits minéraux non métalliques", "24": "Métallurgie", "25": "Fabrication de produits métalliques",
    "26": "Produits informatiques et électroniques", "27": "Équipements électriques",
    "28": "Machines et équipements", "29": "Industrie automobile", "30": "Autres matériels de transport",
    "31": "Fabrication de meubles", "32": "Autres industries manufacturières",
    "33": "Réparation et installation de machines", "35": "Électricité, gaz, vapeur",
    "36": "Captage et distribution d'eau", "37": "Collecte des eaux usées", "38": "Gestion des déchets",
    "39": "Dépollution", "41": "Construction de bâtiments", "42": "Génie civil",
    "43": "Travaux de construction spécialisés", "45": "Commerce et réparation automobile",
    "46": "Commerce de gros", "47": "Commerce de détail", "49": "Transports terrestres",
    "50": "Transports par eau", "51": "Transports aériens", "52": "Entreposage et services auxiliaires des transports",
    "53": "Activités de poste et de courrier", "55": "Hébergement", "56": "Restauration",
    "58": "Édition", "59": "Production audiovisuelle", "60": "Programmation et diffusion",
    "61": "Télécommunications", "62": "Programmation et conseil informatique", "63": "Services d'information",
    "64": "Services financiers", "65": "Assurance", "66": "Activités auxiliaires de services financiers et d'assurance",
    "68": "Activités immobilières", "69": "Activités juridiques et comptables", "70": "Conseil de gestion",
    "71": "Architecture et ingénierie", "72": "Recherche-développement", "73": "Publicité et études de marché",
    "74": "Autres activités spécialisées", "75": "Activités vétérinaires", "77": "Location et location-bail",
    "78": "Activités liées à l'emploi", "79": "Agences de voyage", "80": "Enquêtes et sécurité",
    "81": "Services relatifs aux bâtiments et aménagement paysager", "82": "Activités administratives et de soutien aux entreprises",
    "85": "Enseignement", "86": "Activités pour la santé humaine", "87": "Hébergement médico-social",
    "88": "Action sociale sans hébergement", "90": "Activités créatives et artistiques",
    "91": "Bibliothèques, musées", "92": "Jeux de hasard", "93": "Activités sportives et de loisirs",
    "94": "Activités des organisations associatives", "95": "Réparation d'ordinateurs et de biens personnels",
    "96": "Autres services personnels",
}


class ErreurRegistre(Exception):
    pass


def libelle_naf(code):
    if not code:
        return ""
    return DIVISIONS_NAF.get(code[:2], "")


def est_batiment(code):
    return bool(code) and code[:2] in ("41", "42", "43")


def distance_km(lat, lon, ref=MULHOUSE):
    try:
        lat, lon = float(lat), float(lon)
    except (TypeError, ValueError):
        return None
    r = 6371.0
    p1, p2 = math.radians(ref[0]), math.radians(lat)
    dp = p2 - p1
    dl = math.radians(lon - ref[1])
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return round(2 * r * math.asin(math.sqrt(a)), 1)


def age_annees(date_creation):
    try:
        d = date.fromisoformat(date_creation)
    except (TypeError, ValueError):
        return None
    return round((date.today() - d).days / 365.25, 1)


def appeler_api(params, essais=4):
    for essai in range(essais):
        try:
            r = requests.get(API, params=params, timeout=20)
        except requests.RequestException as e:
            if essai == essais - 1:
                raise ErreurRegistre(f"API Recherche d'entreprises injoignable : {e}") from e
            time.sleep(2 ** essai)
            continue
        if r.status_code == 429 or r.status_code >= 500:
            time.sleep(2 ** essai)
            continue
        if r.status_code != 200:
            raise ErreurRegistre(f"API Recherche d'entreprises : erreur {r.status_code}")
        return r.json()
    raise ErreurRegistre("API Recherche d'entreprises : trop de tentatives")


def dirigeant_principal(dirigeants):
    """Choisit la personne physique la plus haut placée. Ne garde ni âge ni date de naissance."""
    ordre = ["président", "gérant", "directeur général", "dirigeant", "exploitant", "associé"]
    personnes = [d for d in dirigeants or [] if d.get("type_dirigeant") == "personne physique"]
    if not personnes:
        return None

    def rang(d):
        q = (d.get("qualite") or "").lower()
        for i, mot in enumerate(ordre):
            if mot in q:
                return i
        return len(ordre)

    d = sorted(personnes, key=rang)[0]
    prenom = (d.get("prenoms") or "").split(" ")[0].title()
    nom = re.sub(r"\s*\(.*?\)", "", d.get("nom") or "").title()
    return {"nom": f"{prenom} {nom}".strip(), "poste": d.get("qualite") or "Dirigeant"}


def normaliser(r):
    siege = r.get("siege") or {}
    naf = siege.get("activite_principale") or r.get("activite_principale") or ""
    dirigeant = dirigeant_principal(r.get("dirigeants"))
    return {
        "siren": r.get("siren"),
        "nom": r.get("nom_raison_sociale") or r.get("nom_complet") or "",
        "nom_complet": r.get("nom_complet") or "",
        "enseignes": siege.get("liste_enseignes") or [],
        "naf": naf,
        "naf_libelle": libelle_naf(naf),
        "section": r.get("section_activite_principale"),
        "tranche": siege.get("tranche_effectif_salarie") or r.get("tranche_effectif_salarie"),
        "adresse": siege.get("adresse") or "",
        "commune": (siege.get("libelle_commune") or "").title(),
        "code_postal": siege.get("code_postal") or "",
        "departement": siege.get("departement") or "",
        "distance_km": distance_km(siege.get("latitude"), siege.get("longitude")),
        "date_creation": r.get("date_creation") or siege.get("date_creation"),
        "nature_juridique": r.get("nature_juridique") or "",
        "etat": r.get("etat_administratif"),
        "dirigeant": dirigeant,
        "est_administration": bool((r.get("complements") or {}).get("est_administration")),
    }


def acceptable(e, reglages):
    if e["etat"] != "A" or not e["siren"]:
        return False
    if e["departement"] not in reglages["departements"]:
        return False
    if e["tranche"] not in reglages["tranches"]:
        return False
    if e["nature_juridique"].startswith("7") or e["est_administration"]:
        return False
    return True


def note_preliminaire(e, reglages):
    """Tri rapide avant toute dépense API : proximité, taille, ancienneté, dirigeant connu."""
    n = 0.0
    d = e["distance_km"]
    if d is not None:
        n += max(0, 30 - d / 4)
    n += {"01": 4, "02": 8, "03": 10, "11": 10, "12": 9}.get(e["tranche"], 0)
    age = age_annees(e["date_creation"])
    if age is not None:
        n += 10 if age >= 5 else 6 if age >= 2 else 0
    if e["dirigeant"]:
        n += 12
    if est_batiment(e["naf"]):
        n += reglages.get("bonus_batiment", 0)
    return n


# ---------- Rotation des secteurs et des pages ----------

def creneaux(reglages):
    """Liste des (département, section) à parcourir, en donnant plus de place au 68."""
    poids = reglages.get("poids_departements") or {}
    sequence = []
    for dep in reglages["departements"]:
        sequence += [dep] * max(1, int(poids.get(dep, 1)))
    res = []
    for dep in sequence:
        for section in SECTIONS:
            res.append((dep, section))
    return res


def _curseur(con):
    row = con.execute("SELECT page FROM rotation WHERE cle = 'curseur'").fetchone()
    return row["page"] if row else 0


def chercher_candidats(nb_voulus, reglages, deja_vus, max_requetes=14, journal=None):
    """Parcourt les créneaux à partir du curseur du jour précédent, page par page."""
    liste = creneaux(reglages)
    tranches = ",".join(reglages["tranches"])
    candidats = {}
    requetes = 0
    with db.connexion() as con:
        curseur = _curseur(con)
    tours = 0
    while len(candidats) < nb_voulus and requetes < max_requetes and tours < len(liste):
        dep, section = liste[curseur % len(liste)]
        curseur += 1
        tours += 1
        cle = f"{dep}:{section}"
        with db.connexion() as con:
            row = con.execute("SELECT page, epuise FROM rotation WHERE cle = ?", (cle,)).fetchone()
        page = row["page"] if row else 1
        if row and row["epuise"]:
            # Tout a été parcouru : on repart du début (de nouvelles entreprises apparaissent).
            page = 1
        params = {
            "departement": dep,
            "section_activite_principale": section,
            "tranche_effectif_salarie": tranches,
            "etat_administratif": "A",
            "per_page": 25,
            "page": page,
        }
        if journal:
            journal(f"Registre : {SECTIONS.get(section, section)} ({dep}), page {page}")
        data = appeler_api(params)
        requetes += 1
        total_pages = data.get("total_pages") or 1
        for r in data.get("results", []):
            e = normaliser(r)
            if e["siren"] in deja_vus or e["siren"] in candidats:
                continue
            if acceptable(e, reglages):
                candidats[e["siren"]] = e
        epuise = 1 if page >= total_pages else 0
        with db.connexion() as con:
            con.execute(
                "INSERT INTO rotation (cle, page, epuise, utilise_le) VALUES (?, ?, ?, ?) "
                "ON CONFLICT(cle) DO UPDATE SET page = excluded.page, epuise = excluded.epuise, "
                "utilise_le = excluded.utilise_le",
                (cle, 1 if epuise else page + 1, epuise, db.maintenant()),
            )
        time.sleep(0.2)  # l'API autorise 7 requêtes par seconde
    with db.connexion() as con:
        con.execute(
            "INSERT INTO rotation (cle, page) VALUES ('curseur', ?) "
            "ON CONFLICT(cle) DO UPDATE SET page = excluded.page",
            (curseur % len(liste),),
        )
    return list(candidats.values())


def ordonner(candidats, reglages, nb_max_par_commune=2):
    """Trie par note préliminaire en évitant de concentrer le lot sur une même commune."""
    tries = sorted(candidats, key=lambda e: note_preliminaire(e, reglages), reverse=True)
    res, reste, par_commune = [], [], {}
    for e in tries:
        c = e["commune"]
        if par_commune.get(c, 0) < nb_max_par_commune:
            par_commune[c] = par_commune.get(c, 0) + 1
            res.append(e)
        else:
            reste.append(e)
    return res + reste
