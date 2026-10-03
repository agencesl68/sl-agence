"""Lecture du site slagence.fr et construction de la fiche « profil agence »."""
import json
import re

import requests
from bs4 import BeautifulSoup

from . import db, ia

SITE = "https://slagence.fr/"
ENTETES = {"User-Agent": "SL-Agence-Prospection/1.0 (outil interne)"}


def urls_du_site():
    urls = [SITE]
    try:
        r = requests.get(SITE + "sitemap.xml", headers=ENTETES, timeout=20)
        if r.ok:
            urls = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", r.text) or urls
    except requests.RequestException:
        pass
    # Les pages du blog sont découvertes depuis l'index du blog si besoin.
    return list(dict.fromkeys(urls))[:30]


def lire_page(url):
    r = requests.get(url, headers=ENTETES, timeout=20)
    r.raise_for_status()
    r.encoding = r.encoding or "utf-8"
    soupe = BeautifulSoup(r.text, "html.parser")
    for balise in soupe(["script", "style", "noscript", "svg", "iframe", "video"]):
        balise.decompose()
    titre = (soupe.title.string or "").strip() if soupe.title else ""
    corps = soupe.find("main") or soupe.body or soupe
    texte = re.sub(r"\n\s*\n+", "\n", corps.get_text("\n", strip=True))
    return {"url": url, "titre": titre, "texte": texte}


def lire_site():
    pages, erreurs = [], []
    for url in urls_du_site():
        try:
            pages.append(lire_page(url))
        except requests.RequestException as e:
            erreurs.append(f"{url} : {e}")
    return pages, erreurs


def mettre_a_jour():
    """Relit le site et reconstruit le profil. Sans clé API, garde le profil de base + les pages lues."""
    pages, erreurs = lire_site()
    if not pages:
        raise RuntimeError("Impossible de lire slagence.fr : " + "; ".join(erreurs[:3]))
    if ia.cle_presente():
        profil = ia.synthese_profil(pages)
        mode = "synthese"
    else:
        profil = dict(ia.PROFIL_PAR_DEFAUT)
        mode = "base"
    profil["pages_lues"] = [{"url": p["url"], "titre": p["titre"]} for p in pages]
    profil["mode"] = mode
    with db.connexion() as con:
        con.execute(
            "INSERT INTO profil_agence (id, donnees, pages, maj_le) VALUES (1, ?, ?, ?) "
            "ON CONFLICT(id) DO UPDATE SET donnees = excluded.donnees, pages = excluded.pages, "
            "maj_le = excluded.maj_le",
            (
                json.dumps(profil, ensure_ascii=False),
                json.dumps(pages, ensure_ascii=False),
                db.maintenant(),
            ),
        )
    return profil, erreurs


def profil():
    with db.connexion() as con:
        row = con.execute("SELECT donnees, maj_le FROM profil_agence WHERE id = 1").fetchone()
    if row is None:
        return None
    p = json.loads(row["donnees"])
    p["maj_le"] = row["maj_le"]
    return p


def profil_ou_defaut():
    return profil() or dict(ia.PROFIL_PAR_DEFAUT)
