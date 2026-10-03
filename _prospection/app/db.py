"""Base SQLite : schéma, réglages, suivi des coûts."""
import json
import os
import sqlite3
from contextlib import contextmanager
from datetime import date, datetime

DB_PATH = os.environ.get(
    "PROSPECTION_DB",
    os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "prospection.db"),
)

STATUTS = [
    "a_contacter",
    "invitation_envoyee",
    "invitation_acceptee",
    "message_envoye",
    "a_repondu",
    "rdv_pris",
    "pas_interesse",
    "ne_pas_contacter",
]

LIBELLES_STATUTS = {
    "a_contacter": "À contacter",
    "invitation_envoyee": "Invitation envoyée",
    "invitation_acceptee": "Invitation acceptée",
    "message_envoye": "Message envoyé",
    "a_repondu": "A répondu",
    "rdv_pris": "Rendez-vous pris",
    "pas_interesse": "Pas intéressé",
    "ne_pas_contacter": "Ne pas contacter",
}

REGLAGES_DEFAUT = {
    "nb_leads": 10,
    "departements": ["68", "67"],
    "poids_departements": {"68": 3, "67": 1},
    "tranches": ["01", "02", "03", "11", "12"],
    "bonus_batiment": 5,
    "seuil_score": 40,
    "plafond_cout_jour": 5.0,
    "recherches_web_max": 6,
    "modele": "claude-sonnet-5-5",
    "recherches_paralleles": 3,
}

SCHEMA = """
CREATE TABLE IF NOT EXISTS reglages (
    cle TEXT PRIMARY KEY,
    valeur TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS profil_agence (
    id INTEGER PRIMARY KEY CHECK (id = 1),
    donnees TEXT NOT NULL,
    pages TEXT NOT NULL,
    maj_le TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS leads (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    siren TEXT NOT NULL UNIQUE,
    nom TEXT NOT NULL,
    naf TEXT,
    naf_libelle TEXT,
    tranche TEXT,
    adresse TEXT,
    commune TEXT,
    code_postal TEXT,
    departement TEXT,
    distance_km REAL,
    date_creation TEXT,
    dirigeant_nom TEXT,
    dirigeant_poste TEXT,
    dirigeant_source TEXT,
    site_web TEXT,
    site_web_source TEXT,
    activite TEXT,
    activite_source TEXT,
    taches TEXT NOT NULL DEFAULT '[]',
    signaux TEXT NOT NULL DEFAULT '[]',
    score INTEGER,
    score_detail TEXT NOT NULL DEFAULT '{}',
    justification TEXT,
    invitation TEXT,
    invitation_element TEXT,
    invitation_source TEXT,
    message_suivi TEXT,
    suivi_element TEXT,
    suivi_source TEXT,
    relance TEXT,
    relance_envoyee_le TEXT,
    statut TEXT NOT NULL DEFAULT 'a_contacter',
    statut_maj_le TEXT,
    etat TEXT NOT NULL DEFAULT 'complet',
    erreur TEXT,
    recherche_brute TEXT,
    registre TEXT,
    cree_le TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS exclusions (
    siren TEXT PRIMARY KEY,
    motif TEXT NOT NULL,
    le TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS evenements (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    lead_id INTEGER REFERENCES leads(id) ON DELETE SET NULL,
    statut TEXT NOT NULL,
    le TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS appels_api (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    jour TEXT NOT NULL,
    usage TEXT NOT NULL,
    modele TEXT,
    tokens_entree INTEGER DEFAULT 0,
    tokens_sortie INTEGER DEFAULT 0,
    tokens_cache INTEGER DEFAULT 0,
    recherches_web INTEGER DEFAULT 0,
    cout REAL DEFAULT 0,
    le TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS rotation (
    cle TEXT PRIMARY KEY,
    page INTEGER NOT NULL DEFAULT 1,
    epuise INTEGER NOT NULL DEFAULT 0,
    utilise_le TEXT
);
"""


@contextmanager
def connexion():
    """Connexion courte : validée en fin de bloc, annulée en cas d'erreur, toujours fermée."""
    con = sqlite3.connect(DB_PATH, timeout=30)
    con.row_factory = sqlite3.Row
    con.execute("PRAGMA foreign_keys = ON")
    try:
        yield con
        con.commit()
    except Exception:
        con.rollback()
        raise
    finally:
        con.close()


def init():
    with connexion() as con:
        con.execute("PRAGMA journal_mode = WAL")
        con.executescript(SCHEMA)


def maintenant():
    return datetime.now().isoformat(timespec="seconds")


def aujourdhui():
    return date.today().isoformat()


# ---------- Réglages ----------

def reglages():
    res = dict(REGLAGES_DEFAUT)
    with connexion() as con:
        for row in con.execute("SELECT cle, valeur FROM reglages"):
            res[row["cle"]] = json.loads(row["valeur"])
    return res


def enregistrer_reglages(valeurs):
    with connexion() as con:
        for cle, valeur in valeurs.items():
            if cle in REGLAGES_DEFAUT:
                con.execute(
                    "INSERT INTO reglages (cle, valeur) VALUES (?, ?) "
                    "ON CONFLICT(cle) DO UPDATE SET valeur = excluded.valeur",
                    (cle, json.dumps(valeur)),
                )


# ---------- Coûts ----------

def enregistrer_appel(usage, modele, entree, sortie, cache, recherches, cout):
    with connexion() as con:
        con.execute(
            "INSERT INTO appels_api (jour, usage, modele, tokens_entree, tokens_sortie, "
            "tokens_cache, recherches_web, cout, le) VALUES (?,?,?,?,?,?,?,?,?)",
            (aujourdhui(), usage, modele, entree, sortie, cache, recherches, cout, maintenant()),
        )


def consommation_du_jour():
    with connexion() as con:
        row = con.execute(
            "SELECT COUNT(*) AS appels, COALESCE(SUM(cout), 0) AS cout, "
            "COALESCE(SUM(recherches_web), 0) AS recherches FROM appels_api WHERE jour = ?",
            (aujourdhui(),),
        ).fetchone()
    return {"appels": row["appels"], "cout": round(row["cout"], 4), "recherches": row["recherches"]}


# ---------- Exclusions ----------

def sirens_connus():
    with connexion() as con:
        a = {r[0] for r in con.execute("SELECT siren FROM leads")}
        b = {r[0] for r in con.execute("SELECT siren FROM exclusions")}
    return a | b


def exclure(siren, motif, con=None):
    sql = (
        "INSERT INTO exclusions (siren, motif, le) VALUES (?, ?, ?) "
        "ON CONFLICT(siren) DO UPDATE SET motif = excluded.motif, le = excluded.le"
    )
    if con is not None:
        con.execute(sql, (siren, motif, maintenant()))
    else:
        with connexion() as c:
            c.execute(sql, (siren, motif, maintenant()))


# ---------- Leads ----------

CHAMPS_JSON = ("taches", "signaux", "score_detail")


def lead_en_dict(row):
    d = dict(row)
    for champ in CHAMPS_JSON:
        try:
            d[champ] = json.loads(d.get(champ) or ("{}" if champ == "score_detail" else "[]"))
        except (TypeError, ValueError):
            d[champ] = {} if champ == "score_detail" else []
    d.pop("recherche_brute", None)
    d.pop("registre", None)
    return d


def inserer_lead(donnees):
    d = dict(donnees)
    for champ in CHAMPS_JSON:
        if champ in d and not isinstance(d[champ], str):
            d[champ] = json.dumps(d[champ], ensure_ascii=False)
    d.setdefault("cree_le", maintenant())
    d.setdefault("statut", "a_contacter")
    d.setdefault("statut_maj_le", d["cree_le"])
    colonnes = ", ".join(d.keys())
    marques = ", ".join("?" for _ in d)
    with connexion() as con:
        cur = con.execute(f"INSERT INTO leads ({colonnes}) VALUES ({marques})", list(d.values()))
        return cur.lastrowid


def maj_lead(lead_id, champs):
    d = dict(champs)
    for champ in CHAMPS_JSON:
        if champ in d and not isinstance(d[champ], str):
            d[champ] = json.dumps(d[champ], ensure_ascii=False)
    if not d:
        return
    sets = ", ".join(f"{k} = ?" for k in d)
    with connexion() as con:
        con.execute(f"UPDATE leads SET {sets} WHERE id = ?", [*d.values(), lead_id])


def lead(lead_id, brut=False):
    with connexion() as con:
        row = con.execute("SELECT * FROM leads WHERE id = ?", (lead_id,)).fetchone()
    if row is None:
        return None
    if brut:
        return dict(row)
    return lead_en_dict(row)


def leads(statut=None):
    sql = "SELECT * FROM leads"
    args = []
    if statut:
        sql += " WHERE statut = ?"
        args.append(statut)
    sql += " ORDER BY (etat = 'a_completer') ASC, COALESCE(score, -1) DESC, cree_le DESC"
    with connexion() as con:
        return [lead_en_dict(r) for r in con.execute(sql, args)]


def changer_statut(lead_id, statut):
    if statut not in STATUTS:
        raise ValueError("Statut inconnu")
    with connexion() as con:
        row = con.execute("SELECT siren FROM leads WHERE id = ?", (lead_id,)).fetchone()
        if row is None:
            raise KeyError(lead_id)
        con.execute(
            "UPDATE leads SET statut = ?, statut_maj_le = ? WHERE id = ?",
            (statut, maintenant(), lead_id),
        )
        con.execute(
            "INSERT INTO evenements (lead_id, statut, le) VALUES (?, ?, ?)",
            (lead_id, statut, maintenant()),
        )
        if statut == "ne_pas_contacter":
            exclure(row["siren"], "ne_pas_contacter", con)
        elif statut == "pas_interesse":
            exclure(row["siren"], "pas_interesse", con)


def supprimer_lead(lead_id):
    """Efface toutes les données du lead. Seul le SIREN reste, pour ne jamais le reproposer."""
    with connexion() as con:
        row = con.execute("SELECT siren FROM leads WHERE id = ?", (lead_id,)).fetchone()
        if row is None:
            return False
        exclure(row["siren"], "supprime", con)
        con.execute("DELETE FROM leads WHERE id = ?", (lead_id,))
    return True
