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
css = "\n".join((SRC / f).read_text(encoding="utf-8") for f in ("hero.css", "constat.css", "extra.css"))
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
entre("<!-- ============ HÉROS ============ -->", "<!-- ============ BANDEAU ============ -->",
      (SRC / "hero.html").read_text(encoding="utf-8") + "\n")

# ---- 01 · constat : les photos éparpillées laissent place à la double saisie animée ----
entre("<!-- ============ 01 · LE CONSTAT ============ -->", "<!-- ============ VIDÉO ============ -->",
      (SRC / "constat.html").read_text(encoding="utf-8") + "\n")

# ---- vidéo : texte resserré ----
remplace("""        La même information saisie deux fois, puis neuf. Des fichiers qui ne se parlent pas.
        Voici comment nous relions tout, de la demande du client jusqu'au règlement de la facture.""",
         """        De la demande du client jusqu'au règlement de la facture :
        voici comment nous relions tout.""")

# ---- domaines : une phrase chacun, liens conservés ----
lien = lambda href, txt: f' <a href="{href}">{txt}</a>'
DOM = {
    "Applications terrain et bons d'intervention numériques":
        "Bons, feuilles d'heures, états des lieux : signés au doigt, avec photos, même sans réseau." + lien("/bon-intervention-numerique", "Le bon d'intervention numérique"),
    "Remplacer vos fichiers Excel par un seul écran":
        "Clients, chantiers, véhicules et dossiers réunis, avec une recherche instantanée et des exports pour le comptable." + lien("/remplacer-excel", "Remplacer Excel par une application"),
    "Documents générés":
        "Devis, factures, contrats et rapports produits, nommés, classés et envoyés sans que personne n'y touche.",
    "Relances automatiques de factures et d'échéances":
        "Impayés, pièces manquantes, renouvellements : suivis jusqu'au règlement, au bon moment." + lien("/relance-factures-automatique", "Automatiser vos relances de factures"),
    "Assistants IA pour TPE et PME":
        "Une photo de facture et la saisie est faite. Un vocal et le compte rendu est écrit." + lien("/agent-ia-pme", "Découvrir les agents IA pour PME"),
    "Portails et prise de rendez-vous":
        "Réservation en ligne, dépôt de pièces et suivi de dossier, avec rappels automatiques.",
    "Conformité et registres":
        "Habilitations, formations et contrôles suivis à l'avance, exportés en un clic le jour J.",
    "Automatisation entre vos logiciels":
        "Comptabilité, paie, agenda, messagerie : vos outils se parlent enfin, sans recopie." + lien("/automatisation-taches-administratives", "Automatiser vos tâches administratives"),
}
for titre, texte in DOM.items():
    motif = re.compile(r"(<h3>" + re.escape(titre) + r"</h3><p>).*?(</p></article>)")
    html, n = motif.subn(lambda m: m.group(1) + texte + m.group(2), html)
    if n != 1:
        sys.exit("domaine introuvable : " + titre)

remplace("""      <article class="domaine"><i>08</i>""", """      <article class="domaine"><i>08</i>""")
i = html.index("</div>", html.index('<article class="domaine"><i>08</i>'))
html = html[:i + 6] + f"""

    <div class="relais reveal" style="grid-column:2">
      <p><b>Votre besoin n'est pas dans la liste ?</b>Décrivez-le en quelques lignes : la réponse est très probablement oui.</p>
      <div class="relais-actions"><a class="btn btn-plein btn-fleche" href="#contact">Décrire mon besoin</a></div>
    </div>""" + html[i + 6:]

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

# ---- outils : vérifier la compatibilité ----
i = html.index("</p>", html.index('<p class="outils-plus reveal">')) + 4
html = html[:i] + f"""
    <div class="relais reveal">
      <p><b>Vous ne savez pas si vos logiciels sont compatibles ?</b>Quinze minutes au téléphone suffisent pour le vérifier ensemble.</p>
      <div class="relais-actions">
        <a class="btn btn-plein" href="{CAL}" target="_blank" rel="noopener">Réserver un appel de 15 min</a>
      </div>
    </div>""" + html[i:]

# ---- méthode : commencer par le temps 01 ----
i = html.index("</div>\n    </div>", html.index('<div class="temps reveal casc">')) + len("</div>\n    </div>")
html = html[:i] + f"""
    <div class="relais reveal">
      <p><b>Le temps 01 commence par un appel.</b>Un quart d'heure, sans engagement : vous repartez avec un avis clair.</p>
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
html = html[:i] + (SRC / "hero.js").read_text(encoding="utf-8") + (SRC / "constat.js").read_text(encoding="utf-8") + barre + "\n" + html[i:]

# chemins d'images absolus : identiques en ligne, et la maquette s'affiche depuis son dossier
html = re.sub(r'(src|poster)="(p-[a-z]+\.jpg|pub-sl-agence\.(?:mp4|jpg))"', r'\1="/\2"', html)

sortie = ICI / "etape-1-accueil.html"
sortie.write_text(html, encoding="utf-8")
print("écrit :", sortie.relative_to(RACINE), f"({len(html)//1024} Ko)")
