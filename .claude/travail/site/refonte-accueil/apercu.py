#!/usr/bin/env python3
"""Transforme la maquette en page d'aperçu privée (Artifact claude.ai).

- retire doctype/html/head/body (l'Artifact les ajoute) ;
- Geist via Google Fonts (seul hôte de polices autorisé) ;
- images et vidéo servies à côté de la page (chemins relatifs) ;
- liens internes vers slagence.fr (ouverts dans un nouvel onglet) ;
- formulaire neutralisé : la maquette n'envoie rien ;
- pastille « Maquette » en bas à gauche.

    python3 .claude/travail/site/refonte-accueil/apercu.py <dossier de sortie>
"""
import pathlib, re, shutil, sys

ICI = pathlib.Path(__file__).resolve().parent
RACINE = ICI.parents[3]
OUT = pathlib.Path(sys.argv[1]).resolve()
OUT.mkdir(parents=True, exist_ok=True)

V = sys.argv[2] if len(sys.argv) > 2 else ""
h = (ICI / ("etape-1-accueil" + ("-" + V if V else "") + ".html")).read_text(encoding="utf-8")

h = re.sub(r"<!DOCTYPE html>\s*<html[^>]*>\s*<head>\s*", "", h, count=1)
h = re.sub(r"<meta charset[^>]*>\s*<meta name=\"viewport\"[^>]*>\s*", "", h, count=1)
h = h.replace("<title>Automatisation et logiciel sur mesure à Mulhouse | SL Agence</title>",
              "<title>Refonte accueil SL Agence" + (" " + V.upper() if V else "") + "</title>", 1)
h = re.sub(r"</head>\s*<body>", "", h, count=1)
h = re.sub(r"</body>\s*</html>\s*$", "", h)

# polices
h = re.sub(r"<link rel=\"preload\" href=\"/fonts/[^>]*>\n", "", h)
h = re.sub(r"@font-face\{[^}]*\}\n", "", h)
h = h.replace("<style>", '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap">\n<style>:root{color-scheme:dark}', 1)

# ressources locales
FICHIERS = ["logo-sl.png", "logo-sl-mark.png"]
for f in FICHIERS:
    h = h.replace(f'"/{f}"', f'"{f}"').replace(f"(/{f})", f"({f})")
    shutil.copy(RACINE / f, OUT / f)

# liens internes → site en ligne
h = re.sub(r'href="/([^"#]*)"', r'href="https://slagence.fr/\1" target="_blank" rel="noopener"', h)
h = h.replace('target="_blank" rel="noopener" target="_blank" rel="noopener"', 'target="_blank" rel="noopener"')

# formulaire neutralisé
ancien = "form.addEventListener('submit', function(e){\n    e.preventDefault();"
assert ancien in h
h = h.replace(ancien, ancien + """
    errBox.textContent = "Maquette : ce formulaire n'envoie rien. Sur le vrai site, il fonctionne comme aujourd'hui.";
    errBox.classList.add('show');
    return;""")

# pastille maquette
h += """
<div style="position:fixed;left:12px;bottom:12px;z-index:300;padding:.45rem .8rem;border-radius:99px;background:#a9c49f;color:#070907;font:600 .7rem/1.2 Geist,Arial,sans-serif;letter-spacing:.08em;text-transform:uppercase;pointer-events:none">MAQUETTE_ETIQUETTE · pas en ligne</div>
""".replace("MAQUETTE_ETIQUETTE", "Maquette · v8 Genèse" if V else "Maquette · étape 1 (v7)")

# v8 : sélecteur de couleur d'accent, pour comparer en direct (n'existe que dans la maquette)
if V:
    h += """
<div id="choixAccent" style="position:fixed;right:12px;bottom:12px;z-index:300;display:flex;gap:6px;align-items:center;padding:6px 8px;border-radius:99px;background:rgba(15,20,14,.92);box-shadow:inset 0 0 0 1px rgba(255,255,255,.14);font:500 .72rem/1 Geist,Arial,sans-serif;color:#fff">
  <span style="padding:0 6px;opacity:.7">Accent</span>
  <button data-a="" style="--c:#f2a65a">Ambre</button><button data-a="corail" style="--c:#ff7a5c">Corail</button><button data-a="lilas" style="--c:#b69cff">Lilas</button><button data-a="vert" style="--c:#a9c49f">Tout vert</button>
</div>
<style>
#choixAccent button{font:inherit;color:#fff;background:transparent;border:0;border-radius:99px;padding:7px 10px 7px 22px;cursor:pointer;position:relative}
#choixAccent button::before{content:"";position:absolute;left:8px;top:50%;width:9px;height:9px;margin-top:-4.5px;border-radius:50%;background:var(--c)}
#choixAccent button[aria-pressed="true"]{background:rgba(255,255,255,.12)}
@media (max-width:760px){#choixAccent{bottom:84px;right:8px;left:8px;justify-content:center;flex-wrap:wrap}}
</style>
<script>
(function(){
  var hero = document.querySelector('.hero--genese'), bs = document.querySelectorAll('#choixAccent button');
  bs.forEach(function(b, i){
    b.setAttribute('aria-pressed', i === 0 ? 'true' : 'false');
    b.addEventListener('click', function(){
      if(b.dataset.a){ hero.setAttribute('data-accent', b.dataset.a); } else { hero.removeAttribute('data-accent'); }
      bs.forEach(function(x){ x.setAttribute('aria-pressed', x === b ? 'true' : 'false'); });
    });
  });
})();
</script>
"""

(OUT / "index.html").write_text(h, encoding="utf-8")
print("aperçu :", OUT / "index.html")
