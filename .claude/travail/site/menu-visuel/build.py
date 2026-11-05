#!/usr/bin/env python3
"""Maquette du menu « visuel » (inspiré des menus déroulants de deax.fr envoyés par Loïc le 05/11).

Lit index.html (jamais modifié), remplace la barre de menu par la nouvelle version
(titre + description par entrée, carte visuelle à droite, onglet « L'agence »,
barre flottante arrondie), et écrit `maquette-index.html`. L'aperçu Artifact se fait ensuite avec :

    python3 .claude/travail/site/menu-visuel/build.py
    python3 .claude/travail/site/rdv/apercu.py <sortie> .claude/travail/site/menu-visuel/maquette-index.html
"""
import pathlib, re, sys
ICI = pathlib.Path(__file__).resolve().parent
RACINE = ICI.parents[3]
h = (RACINE / "index.html").read_text(encoding="utf-8")

def lien(href, titre, desc):
    return f'<a class="mx-lien" href="{href}"><b>{titre}</b><span>{desc}</span></a>'

RALENTIT = [
    ("/automatisation-taches-administratives", "Le travail fait 2 fois", "Noté sur place, puis retapé au bureau."),
    ("/remplacer-excel", "Les fichiers Excel", "Trop de fichiers, plus personne ne s'y retrouve."),
    ("/relance-factures-automatique", "Les factures qui traînent", "On vous doit de l'argent et personne ne relance."),
    ("/bon-intervention-numerique", "Les papiers du terrain", "Ils se perdent entre le terrain et le bureau."),
    ("/logiciel-sur-mesure", "Le suivi des équipes", "Vous ne savez pas ce qu'elles ont fait avant le soir."),
    ("/connecter-logiciels-entreprise", "Les logiciels séparés", "Ils ne se parlent pas, alors vous recopiez."),
]
REGLE = [
    ("/logiciel-sur-mesure", "Votre logiciel sur mesure", "Un outil fait pour votre façon de travailler."),
    ("/application-web-sur-mesure", "Application web sur mesure", "Sur le téléphone, la tablette et l'ordinateur."),
    ("/crm-sur-mesure", "CRM sur mesure", "Vos clients, vos devis et vos relances au même endroit."),
    ("/agent-ia-pme", "Assistant IA", "Une photo ou un message vocal : c'est noté pour vous."),
    ("/bon-intervention-numerique", "Bon d'intervention numérique", "Rempli et signé sur place, même sans réseau."),
    ("/relance-factures-automatique", "Relances automatiques", "Vos factures relancées jusqu'au règlement."),
    ("/application-pointage-chantier", "Heures de chantier", "Pointées sur le téléphone, avant de rentrer."),
    ("/logiciel-gestion-stock-sur-mesure", "Gestion de stock", "Ce qui entre, ce qui sort, ce qu'il reste."),
    ("/connecter-logiciels-entreprise", "Connecter ses logiciels", "Compta, agenda, devis : vos logiciels se parlent."),
    ("/facture-electronique-tpe", "Facture électronique", "Reçue sans retaper, prête pour l'envoi de 2027."),
]
AGENCE = [
    ("/#questions", "Questions fréquentes", "Prix, données, équipes, zone : nos réponses."),
    ("/#methode", "Notre méthode", "4 temps, du premier appel à l'outil en main."),
    ("/a-propos", "À propos", "Qui est derrière SL Agence, et pourquoi."),
    ("/agence-ia-automatisation-haut-rhin", "Bien choisir son agence", "Les points à vérifier avant de signer."),
    ("/application-bon-epandage-agricole", "Étude de cas", "Le bon d'épandage, du papier au téléphone."),
]

def carte(img, alt, texte, href, action, rdv=False):
    data = " data-rdv" if rdv else ""
    return (f'<a class="mx-carte" href="{href}"{data}><span class="mx-carte-img" style="background-image:url(/{img})" role="img" aria-label="{alt}"></span>'
            f'<span class="mx-carte-txt"><span>{texte}</span><b>{action}</b></span></a>')

# l'application carburant (réalisation terrassement), dessinée dans un grand téléphone
TEL = """<span class="mx-tel" aria-hidden="true"><span class="mx-tel-cadre"><span class="mx-tel-ecran">
  <span class="mx-tel-barre"><i>9:41</i><em></em></span>
  <span class="mx-app-tete"><b>Carburant</b><small>Aujourd'hui</small></span>
  <span class="mx-app-kpi"><b>11</b><small>engins suivis</small></span>
  <span class="mx-app-ligne"><span><b>Pelle</b><small>Compteur avant, après</small></span><i class="mx-ph"></i><i class="mx-ph"></i><em>Noté</em></span>
  <span class="mx-app-ligne"><span><b>Chargeuse</b><small>Compteur avant, après</small></span><i class="mx-ph"></i><i class="mx-ph"></i><em>Noté</em></span>
  <span class="mx-app-ligne"><span><b>Tombereau</b><small>Plein en cours</small></span><i class="mx-ph"></i><i class="mx-ph mx-ph-vide"></i><em class="mx-attente">Photo</em></span>
  <span class="mx-app-bouton">Nouveau plein</span>
</span></span></span>"""

def carte_tel(texte, href, action):
    return (f'<a class="mx-carte mx-carte--tel" href="{href}">{TEL}'
            f'<span class="mx-carte-txt"><span>{texte}</span><b>{action}</b></span></a>')

def panneau(i, titre, entrees, extra=""):
    return f'''        <li class="mn-item">
          <button class="mn-top" type="button" aria-expanded="false" aria-controls="mn-p{i}">{titre}</button>
          <div class="mn-panel" id="mn-p{i}"><div class="mn-in mx-in">
            <div class="mx-grille">{"".join(lien(*e) for e in entrees)}</div>
            {extra}
          </div></div>
        </li>'''

villes = ('<p class="mx-villes">Près de chez vous : <a href="/logiciel-entreprise-mulhouse">Mulhouse</a> · '
          '<a href="/logiciel-entreprise-colmar">Colmar</a> · <a href="/logiciel-entreprise-saint-louis">Saint-Louis</a> · '
          '<a href="/agence-ia-automatisation-haut-rhin">tout le Haut-Rhin</a></p>')

# Ressources : on garde les liens vers le blog (maillage SEO), présentés comme le reste
ress = re.search(r'aria-controls="mn-p4">Ressources</button>.*?</div></div>\n        </li>', h, re.S).group(0)
RESS = [(m.group(1), m.group(2)) for m in re.finditer(r'<a href="([^"]+)">([^<]+)</a>', ress)]

NAV = f'''<ul class="mn-list">
{panneau(1, "Ce qui vous ralentit", RALENTIT,
         '<div class="mx-cote">' + carte("p-comptable.webp", "Des papiers à recopier", "Quelle phrase est la vôtre ? 15 minutes suffisent pour en parler.", "/#rendez-vous", "Réserver 15 minutes", True) + '</div>' + villes)}
{panneau(2, "Ce qu'on règle", REGLE,
         '<div class="mx-cote">' + carte_tel("Chez un client en terrassement, le dirigeant voit les pleins du jour, le jour même.", "/realisations#terrain", "Voir les réalisations") + '</div>')}
        <li class="mn-item mx-simple"><a class="mn-top mx-accent" href="/realisations">Réalisations</a></li>
        <li class="mn-item">
          <button class="mn-top" type="button" aria-expanded="false" aria-controls="mn-p4">Ressources</button>
          <div class="mn-panel" id="mn-p4"><div class="mn-in mx-in mx-ress">
            {"".join(f'<a class="mx-court" href="{a}">{t}</a>' for a, t in RESS)}
          </div></div>
        </li>
        <li class="mn-item mx-etroit">
          <button class="mn-top" type="button" aria-expanded="false" aria-controls="mn-p5">SL Agence</button>
          <div class="mn-panel" id="mn-p5"><div class="mn-in mx-in mx-liste">{"".join(lien(*e) for e in AGENCE)}</div></div>
        </li>
      </ul>'''

def transformer(h):
    h = h.replace(h[h.index('<ul class="mn-list">'):h.index('</ul>\n    </nav>') + len('</ul>')], NAV, 1)
    h = re.sub(r'(<a class="mn-cta" href="(/?)#contact">Parlons de votre cas</a>)',
               r'<a class="mx-rdv" href="/#rendez-vous" data-rdv>Prendre rendez-vous</a>\n    \1', h, count=1)
    return h.replace('<header class="site-head" id="siteHead">', '<header class="site-head mx-flottant" id="siteHead">', 1)

if __name__ == '__main__':
    h = transformer(h)
    css = (ICI / "menu-visuel.css").read_text(encoding="utf-8")
    h = h.replace("</style>\n</head>", "</style>\n<style>" + css + "</style>\n</head>", 1) if "</style>\n</head>" in h else h.replace("</head>", "<style>" + css + "</style>\n</head>", 1)
    (ICI / "maquette-index.html").write_text(h, encoding="utf-8")
    print("écrit :", (ICI / "maquette-index.html").relative_to(RACINE), len(RESS), "liens Ressources")
