# Diagnostic : carte ChatGPT au mauvais logo / mauvais lien, absence dans Gemini (analyste, 26/10/2026)

Contexte : relevé IA n°1 de Loïc (voir memoire/apprentissages.md). Sur « remplacer Excel », ChatGPT cite SL Agence 1re mais la carte montre le logo du 2e et le clic sur le nom ouvre des homonymes.

## Faits sourcés (consultés le 26/10/2026)
- OpenAI ne nomme aucun fournisseur de lieux ; aucune procédure de correction de fiche documentée (aide OpenAI « Searching the web with ChatGPT » ; forum OpenAI 05/12/2024, sans réponse).
- Seul fournisseur nommé publiquement : Yelp (accord annoncé le 23/07/2026, couverture pays non précisée — MarTech 28/07/2026).
- Étude SCAILE (09/10/2026, Munich, petit échantillon) : 142/146 fiches étiquetées `serp`, notes = Google ; le clic sur un nom lance une recherche séparée par **nom + lieu/adresse** ; confusions observées. https://scaile.tech/blog/fundamentals/mechanics/how-chatgpt-surfaces-local-businesses
- Entités cliquables depuis le 30/01/2026 ; images « venant du web » (LLMrefs 09/02/2026) ; images trouvées par requêtes construites sur le nom (Trevor Fox, 04/11/2025).
- Gemini s'appuie sur la recherche Google (aide Gemini Apps). /remplacer-excel : position ~24 (GSC 19/10).

## Causes probables (HYPOTHÈSES)
1. Le clic cherche « SL Agence + lieu » : nom très courant → homonymes ; fiche Google en zone desservie (pas de point précis) ; absents des bases de lieux (Bing Places pas encore en ligne, pas de Yelp).
2. Texte juste mais non relié à notre fiche : la carte reçoit l'image/la fiche d'une autre entreprise (le 2e de la même réponse).
3. Peu de sources tierces qui écrivent ensemble « SL Agence, slagence.fr, Friesen ».

Vérifié côté site : logo.png 512×512 carré lisible, favicon, JSON-LD (logo, image, tél., adresse, sameAs Google/LinkedIn/PagesJaunes), robots.txt autorise OAI-SearchBot. Absents : alternateName, disambiguatingDescription.

## Actions classées
| # | Action | Qui | Temps |
|---|---|---|---|
| 1 | Test : Google Maps « SL Agence » puis « SL Agence Friesen » (fiche 1re ? point sur la carte ?) ; capture du clic dans ChatGPT | Loïc | 10 min |
| 2 | Désambiguïsation JSON-LD (alternateName, disambiguatingDescription) + phrase visible sur /a-propos | seo-site (PR) | 45 min |
| 3 | Même phrase de description sur fiche Google, LinkedIn, PagesJaunes, Bing — sans toucher au nom de la fiche Google | Loïc | 20 min |
| 4 | Bing Places à la validation (~02/11) : NAP identique, puis sameAs | Loïc puis seo-site | 15 min |
| 5 | Fiche Yelp France gratuite (pari peu coûteux, couverture France inconnue) | Loïc | 15 min |
| 6 | Pouce bas + commentaire dans ChatGPT (effet incertain) | Loïc | 2 min |
| 7 | Apple Business Connect (facultatif pour ChatGPT) | Loïc | 20 min |
À ne pas faire : Wikidata (pas assez de références publiques), changer le nom de la fiche Google.

Gemini « remplacer Excel » : ajouter le service à la fiche Google + post Google vers /remplacer-excel ; liens internes « remplacer Excel par une application » depuis l'accueil et les pages ville ; mention tierce (LinkedIn, presse).

Sources complètes : rapport de l'analyste (session du 26/10), dont seroundtable.com 22/12/2025, llmrefs.com/blog/chatgpt-entities, trevorfox.com 04/11/2025, martech.org 28/07/2026, developers.google.com Organization structured data (08/09/2026), support.google.com/gemini/answer/14143489.
