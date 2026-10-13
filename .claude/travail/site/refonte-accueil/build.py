#!/usr/bin/env python3
"""Maquette de la refonte de l'accueil (étape 1).

Lit l'accueil en ligne (index.html à la racine du dépôt, jamais modifié) et
produit `etape-1-accueil.html` : même <head> (title, meta, canonical, JSON-LD),
même H1, mêmes H2 et liens internes ; héros animé, bloc chiffres/réalisations
retiré, textes resserrés, appels à l'action ajoutés.

    python3 .claude/travail/site/refonte-accueil/build.py
"""
import pathlib, re, sys

ICI = pathlib.Path(__file__).resolve().parent
RACINE = ICI.parents[3]
SRC = ICI / "src"

html = (RACINE / "index.html").read_text(encoding="utf-8")
CAL = "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1KMz4JuDOMopdFm9NB0qJJZbaCwd_soCiO8R13VrHiY730d95LPzufLbl6U8LXyVLgAThRYX2e"


def remplace(ancien, nouveau, n=1):
    global html
    if html.count(ancien) != n:
        sys.exit(f"introuvable ou ambigu ({html.count(ancien)}x) : {ancien[:80]!r}")
    html = html.replace(ancien, nouveau)


def entre(debut, fin, nouveau):
    """Remplace tout ce qui va de `debut` (inclus) à `fin` (exclu)."""
    global html
    i = html.index(debut)
    j = html.index(fin, i)
    html = html[:i] + nouveau + html[j:]


# ---- styles : héros + compléments, après la feuille principale ----
css = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ("hero.css", "constat.css", "domaines.css", "extra.css"))
i = html.index("</style>", html.index("Vert #3c4f3b"))
html = html[:i] + "\n" + css + html[i:]

# la photo d'archives n'est plus chargée par le héros
html = html.replace('<link rel="preload" href="/logo-sl.png" as="image">\n', "")

# ---- rideau d'ouverture : retiré (l'atelier fait l'entrée, et le contenu arrive plus vite) ----
remplace('<div class="rideau" id="rideau" hidden aria-hidden="true"><span class="rideau-logo"></span></div>\n', "")

# ---- en-tête : un bouton d'action clair ----
remplace('<a class="head-contact" href="#contact">Nous contacter</a>',
         '<a class="head-contact" href="#contact">Demander un devis</a>')

# ---- panneau : bouton de rendez-vous ----
remplace('<div class="panneau-pied">',
         f'<div class="panneau-pied">\n    <a class="btn btn-plein" href="{CAL}" target="_blank" rel="noopener">Réserver un appel de 15 minutes</a>')

# ---- héros ----
entre("<!-- ============ HÉROS ============ -->", "<!-- ============ 01 · LE CONSTAT ============ -->",
      (SRC / "hero.html").read_text(encoding="utf-8") + "\n")

# ---- 01 · constat : les photos éparpillées laissent place à la double saisie animée ----
entre("<!-- ============ 01 · LE CONSTAT ============ -->", "<!-- ============ 02 · CE QUE NOUS FAISONS ============ -->",
      (SRC / "constat.html").read_text(encoding="utf-8") + "\n")

# ---- la vidéo n'est plus sur l'accueil : son balisage VideoObject non plus (les données structurées doivent refléter la page) ----
i = html.index('<script type="application/ld+json">{\n  "@context": "https://schema.org",\n  "@type": "VideoObject"')
j = html.index("</script>", i) + len("</script>\n")
html = html[:i] + html[j:]

# ---- 02 · domaines : le schéma remplace la liste de 8 paragraphes (7 pages de service liées + le centre) ----
entre("<!-- ============ 02 · CE QUE NOUS FAISONS ============ -->", "<!-- ============ 03 · RÉALISATIONS",
      (SRC / "domaines.html").read_text(encoding="utf-8") + "\n")

# ---- preuves : on retire les chiffres et le lien réalisations (la page reste dans le menu et le pied) ----
entre('    <div class="chiffres reveal">', '    <div class="avis reveal">', "")
remplace('<!-- ============ 03 · RÉALISATIONS : page dédiée /realisations ============ -->',
         '<!-- ============ AVIS CLIENTS (les réalisations ont leur page : /realisations, dans le menu) ============ -->')
remplace('.avis{margin-top:clamp(4rem,10vh,7rem)}', '.avis{margin-top:0}')
i = html.index("</div>\n    </div>\n  </div>\n</section>", html.index('<div class="avis-grille">'))
html = html[:i] + f"""</div>
      <div class="avis-suite">
        <a class="btn btn-plein btn-fleche" href="#contact">Parler de mon projet</a>
        <span>Réponse sous 24 h, devis gratuit.</span>
      </div>
    </div>
  </div>
</section>""" + html[i + len("</div>\n    </div>\n  </div>\n</section>"):]

# ---- 03 · votre métier : 4 familles ; la section « Vos outils » est fondue dans le schéma 02 ----
entre("<!-- ============ 04 · VOTRE MÉTIER ============ -->", "<!-- ============ 06 · NOTRE INTERVENTION ============ -->",
      (SRC / "metiers.html").read_text(encoding="utf-8"))

# ---- méthode : commencer par le temps 01 ----
i = html.index("</div>\n    </div>", html.index('<div class="temps reveal casc">')) + len("</div>\n    </div>")
html = html[:i] + f"""
    <div class="relais reveal">
      <p><b>Le temps 01 commence par un appel.</b>15 minutes, sans engagement : vous repartez avec un avis clair.</p>
      <div class="relais-actions">
        <a class="btn btn-plein" href="{CAL}" target="_blank" rel="noopener">Choisir mon créneau</a>
        <a class="btn btn-creux" href="tel:+33767081943">07 67 08 19 43</a>
      </div>
    </div>""" + html[i:]

# ---- questions : une autre question ? ----
i = html.index('<div class="promesses reveal casc">')
html = html[:i] + """<div class="relais reveal">
      <p><b>Une autre question ?</b>Posez-la directement à Loïc ou à Sacha, du lundi au samedi, de 8 h à 19 h.</p>
      <div class="relais-actions">
        <a class="btn btn-plein btn-fleche" href="#contact">Poser ma question</a>
        <a class="btn btn-creux" href="tel:+33601160762">06 01 16 07 62</a>
      </div>
    </div>
    """ + html[i:]

# ---- barre d'action mobile ----
remplace("</main>", """</main>

<div class="barre-cta" id="barreCta">
  <a class="btn btn-creux" href="tel:+33767081943">Appeler</a>
  <a class="btn btn-plein" href="#contact">Demander un devis</a>
</div>""")

# ---- scripts du héros + barre mobile ----
barre = """<script>
(function(){
  var b = document.getElementById('barreCta'), h = document.querySelector('.hero'), c = document.getElementById('contact');
  if(!b || !h || !window.IntersectionObserver){ return; }
  var horsHero = false, surContact = false;
  function maj(){ b.classList.toggle('montre', horsHero && !surContact); }
  new IntersectionObserver(function(e){ horsHero = !e[0].isIntersecting; maj(); }).observe(h);
  if(c){ new IntersectionObserver(function(e){ surContact = e[0].isIntersecting; maj(); }, {threshold:.2}).observe(c); }
})();
</script>
"""
i = html.rindex("</body>")
html = html[:i] + (SRC / "hero.js").read_text(encoding="utf-8") + (SRC / "constat.js").read_text(encoding="utf-8") + (SRC / "domaines.js").read_text(encoding="utf-8") + barre + "\n" + html[i:]

# chemins d'images absolus : identiques en ligne, et la maquette s'affiche depuis son dossier
html = re.sub(r'(src|poster)="(p-[a-z]+\.jpg|pub-sl-agence\.(?:mp4|jpg))"', r'\1="/\2"', html)

# ---- numérotation : 01 constat, 02 ce que nous faisons, 03 votre métier, 04 intervention, 05 questions, 06 contact ----
for ancien, nouveau in [("06 — Notre intervention", "04 — Notre intervention"),
                        ("07 — Ce qu'on nous demande", "05 — Ce qu'on nous demande"),
                        ("08 — Parlons-en", "06 — Parlons-en")]:
    remplace(ancien, nouveau)

# ---- les quantités en chiffres (correction c013) ; les citations de clients restent telles quelles ----
remplace("Quatre temps, pas un de plus.", "4 temps, pas un de plus.")
remplace("Un quart d'heure au téléphone, puis", "15 minutes au téléphone, puis")
remplace("Quinze minutes au téléphone suffisent", "15 minutes au téléphone suffisent")
remplace("Écrivez-nous en deux minutes.", "Écrivez-nous en 2 minutes.")

sortie = ICI / "etape-1-accueil.html"
sortie.write_text(html, encoding="utf-8")
print("écrit :", sortie.relative_to(RACINE), f"({len(html)//1024} Ko)")
