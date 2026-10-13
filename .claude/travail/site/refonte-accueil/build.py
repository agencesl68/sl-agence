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
# (plus de bouton sous les avis : trop d'appels à l'action répétés, retour de Loïc)

# ---- 03 · votre métier : 4 familles ; la section « Vos outils » est fondue dans le schéma 02 ----
entre("<!-- ============ 04 · VOTRE MÉTIER ============ -->", "<!-- ============ 06 · NOTRE INTERVENTION ============ -->",
      (SRC / "metiers.html").read_text(encoding="utf-8"))

# ---- 04 · méthode : une ligne de 4 étapes, sans paragraphes ----
entre('    <div class="entete reveal">\n      <p class="pill">06 — Notre intervention</p>',
      '    <div class="entete reveal" style="margin-top:clamp(4rem,10vh,7rem)">\n      <p class="pill">Près de chez vous</p>',
      f"""    <div class="entete entete--centre reveal">
      <p class="pill">04 — Notre intervention</p>
      <h2 class="titre-l">4 temps, pas un de plus.</h2>
    </div>

    <ol class="etapes reveal casc">
      <li><i>01</i><h3>Nous vous écoutons</h3></li>
      <li><i>02</i><h3>Nous construisons</h3></li>
      <li><i>03</i><h3>Vos équipes l'essaient</h3></li>
      <li><i>04</i><h3>Vous gagnez du temps</h3></li>
    </ol>
    <p class="etapes-cta reveal"><a class="btn btn-plein btn-fleche" href="{CAL}" target="_blank" rel="noopener">Commencer par l'étape 01</a></p>

""")

# ---- près de chez vous + guides : titres plus petits, guides en lignes cliquables ----
remplace("""    <div class="entete reveal" style="margin-top:clamp(4rem,10vh,7rem)">\n      <p class="pill">Près de chez vous</p>""",
         """    <div class="entete entete--petit reveal">\n      <p class="pill">Près de chez vous</p>""")
remplace("""    <div class="entete reveal" style="margin-top:clamp(4rem,10vh,7rem)">\n      <p class="pill">Guides pratiques</p>""",
         """    <div class="entete entete--petit reveal">\n      <p class="pill">Guides pratiques</p>""")
html, n = re.subn(r'<a class="guide" href="([^"]+)"><small>Guide · ([^<]+)</small><b>([^<]+)</b><span>[^<]*</span></a>',
                  lambda m: f'<a class="guide-ligne" href="{m.group(1)}"><small>Guide {m.group(2).split()[0].lower()}</small><b>{m.group(3)}</b></a>', html)
if n != 6:
    sys.exit(f"guides : {n} transformés au lieu de 6")
remplace('<div class="guides reveal">', '<div class="guides-liste reveal">')

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
for ancien, nouveau in [("07 — Ce qu'on nous demande", "05 — Ce qu'on nous demande"),
                        ("08 — Parlons-en", "06 — Parlons-en")]:
    remplace(ancien, nouveau)

# ---- les quantités en chiffres (correction c013) ; les citations de clients restent telles quelles ----
remplace("Quinze minutes au téléphone suffisent", "15 minutes au téléphone suffisent")
remplace("Écrivez-nous en deux minutes.", "Écrivez-nous en 2 minutes.")

sortie = ICI / "etape-1-accueil.html"
sortie.write_text(html, encoding="utf-8")
print("écrit :", sortie.relative_to(RACINE), f"({len(html)//1024} Ko)")
