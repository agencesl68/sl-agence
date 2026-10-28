#!/usr/bin/env python3
"""Aperçu privé (Artifact claude.ai) de l'accueil actuel avec la prise de rendez-vous.

    python3 .claude/travail/site/rdv/apercu.py <dossier de sortie>

Les feuilles et scripts de /assets sont intégrés à la page ; rien n'est envoyé
(formulaire et prise de rendez-vous neutralisés) ; liens internes → slagence.fr.
"""
import pathlib, re, shutil, sys
RACINE = pathlib.Path(__file__).resolve().parents[4]
OUT = pathlib.Path(sys.argv[1]).resolve(); OUT.mkdir(parents=True, exist_ok=True)
h = (RACINE / "index.html").read_text(encoding="utf-8")

h = re.sub(r"<!DOCTYPE html>\s*<html[^>]*>\s*<head>\s*", "", h, count=1, flags=re.I)
h = re.sub(r"<meta charset[^>]*>\s*", "", h, count=1)
h = re.sub(r"<meta name=\"viewport\"[^>]*>\s*", "", h, count=1)
h = re.sub(r"<title>.*?</title>", "<title>Prise de rendez-vous SL Agence</title>", h, count=1)
h = re.sub(r"</head>\s*<body[^>]*>", "", h, count=1)
h = re.sub(r"</body>\s*</html>\s*$", "", h)

# feuilles et scripts du site intégrés
def css(m): return "<style>" + (RACINE / m.group(1)).read_text(encoding="utf-8") + "</style>"
def js(m):  return "<script>" + (RACINE / m.group(1)).read_text(encoding="utf-8") + "</script>"
h = re.sub(r'<link rel="stylesheet" href="/(assets/[^"]+\.css)">', css, h)
h = re.sub(r'<script src="/(assets/[^"]+\.js)" defer></script>', js, h)

# polices : Google Fonts (seul hôte autorisé dans un Artifact)
h = re.sub(r'<link rel="preload" href="/fonts/[^>]*>\s*', "", h)
h = re.sub(r"@font-face\{[^}]*\}", "", h)
h = '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap">\n<style>:root{color-scheme:dark}</style>\n' + h

for f in ["logo-sl.png", "logo-sl-mark.png"]:
    h = h.replace(f'"/{f}"', f'"{f}"').replace(f"(/{f})", f"({f})").replace(f'("/{f}")', f'("{f}")')
    shutil.copy(RACINE / f, OUT / f)

h = re.sub(r'href="/([^"#]*)"', r'href="https://slagence.fr/\1" target="_blank" rel="noopener"', h)

# rien ne part : prise de rendez-vous en mode aperçu, formulaire neutralisé
h = "<script>window.SL_RDV_APERCU = true;</script>\n" + h
ancien = "form.addEventListener('submit', function(e){\n    e.preventDefault();"
if ancien in h:
    h = h.replace(ancien, ancien + "\n    errBox.textContent = \"Maquette : ce formulaire n'envoie rien.\"; errBox.classList.add('show'); return;")
h += ('\n<div style="position:fixed;left:12px;bottom:12px;z-index:400;padding:.45rem .8rem;border-radius:99px;'
      'background:#a9c49f;color:#070907;font:600 .7rem/1.2 Geist,Arial,sans-serif;letter-spacing:.08em;'
      'text-transform:uppercase;pointer-events:none">Maquette · prise de rendez-vous · pas en ligne</div>\n')
(OUT / "index.html").write_text(h, encoding="utf-8")
print("aperçu :", OUT / "index.html")
