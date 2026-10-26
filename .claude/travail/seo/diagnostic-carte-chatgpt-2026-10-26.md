# Diagnostic : carte ChatGPT au mauvais logo / mauvais lien, absence dans Gemini (26/10/2026)

Analyste, corrigé après contrôle qualité (2 passes). Contexte : relevé IA n°1 de Loïc et ses captures (memoire/apprentissages.md).

## Ce que montrent les captures (constaté)
- ChatGPT « remplacer Excel Haut-Rhin » : SL Agence 1re. Texte juste (Friesen, services, exemple Excel), **nos 2 numéros (07 et 06)** affichés, **notre favicon** dans la puce source « SL Agence Mul… ». Faux : l'**image de la carte** (logo de S2i Evolution, classée 2e dans la même réponse) et le **clic sur le nom** (ouvre des homonymes).
- La réponse est donc bien reliée à nos données et à notre site ; seuls l'image et le clic sont faux.

## Faits sourcés (consultés le 26/10/2026)
- OpenAI ne nomme aucun fournisseur de données de lieux et ne documente aucune procédure de correction (aide OpenAI « Searching the web with ChatGPT » ; forum OpenAI 05/12/2024, sans réponse).
- Seul partenariat de données de lieux annoncé publiquement : Yelp, annoncé le 23/07/2026 (Axios), repris par MarTech le 28/07/2026 ; couverture par pays non précisée.
- Entités cliquables depuis le 30/01/2026 ; images « Photos or logos pulled from web sources » (LLMrefs, page mise à jour le 09/02/2026).
- Étude SCAILE (09/10/2026 ; 50 conversations, Munich, en allemand) : étiquette `serp` sur 142/146 fiches ; notes identiques à Google sur de petits échantillons (étude, pas une règle) ; au clic, recherche séparée par nom et lieu/adresse. **Aucune erreur d'image ou de logo relevée par l'étude** ; incohérences de données observées (note qui change, cache périmé, entreprise citée dans le texte mais absente de la carte).

## Causes probables (HYPOTHÈSES)
1. **Image** (principale) : la carte prend une image trouvée sur le web par le nom ; « SL Agence » étant générique et peu documenté par des tiers, l'image retenue est celle de l'entreprise voisine dans la même réponse (S2i).
2. **Clic** : la recherche « nom + lieu » d'un nom courant renvoie des homonymes ; notre fiche n'a pas de point précis sur la carte (zone desservie) et n'est pas encore dans Bing Places (validation ~02/11) ni sur Yelp.
3. **Peu de sources tierces** qui écrivent ensemble « SL Agence, slagence.fr, Friesen ».
4. **Deux numéros** sur le site (07 et 06 : JSON-LD `contactPoint` et boutons de contact) alors que la décision du 21/10 est « 07 partout » : signal d'identité moins net.

## État du site (vérifié)
- logo.png 512×512 carré lisible ; favicon ; JSON-LD (logo, image, tél., adresse, sameAs Google/LinkedIn/PagesJaunes) ; robots.txt autorise OAI-SearchBot.
- `alternateName` et `disambiguatingDescription` : **sur la branche de travail (PR du 26/10), pas encore en production**.

## Actions classées
| # | Action | Qui | Temps |
|---|---|---|---|
| 1 | Harmoniser le téléphone sur le site (07 seul, ou décision de Loïc) **avant** de créer Bing/Yelp | Loïc décide, seo-site (PR) | 30 min |
| 2 | Fusionner la PR (désambiguïsation JSON-LD + phrase visible /a-propos) | Loïc | 2 min |
| 3 | Test Google Maps « SL Agence » / « SL Agence Friesen » (fiche 1re ? point sur la carte ?) | Loïc | 5 min |
| 4 | Même phrase de description sur fiche Google, LinkedIn, PagesJaunes, Bing — sans toucher au nom de la fiche Google | Loïc | 20 min |
| 5 | Bing Places à la validation (~02/11) : NAP identique, puis sameAs | Loïc puis seo-site | 15 min |
| 6 | Fiche Yelp France gratuite (pari peu coûteux, couverture France inconnue) | Loïc | 15 min |
| 7 | Pouce bas + commentaire dans ChatGPT (effet incertain) | Loïc | 2 min |
À ne pas faire : Wikidata (pas assez de références publiques), changer le nom de la fiche Google.

Renvoi : sur « agence automatisation IA Mulhouse », les 3 premiers affichent des chiffres et un prix de départ → résultats chiffrés de realisations.html + « à partir de 500 € » (PR du 26/10).

## Gemini (HYPOTHÈSE : Gemini s'appuie sur l'index Google ; la page d'aide Gemini citée au départ ne le dit pas)
/remplacer-excel est en position ~24 (GSC 19/10). Leviers : service « Remplacement de fichiers Excel par une application sur mesure » sur la fiche Google + post Google vers /remplacer-excel ; liens internes « remplacer Excel par une application » depuis l'accueil et les pages ville (PR du 26/10) ; mention tierce (LinkedIn, presse).

## Sources
scaile.tech/blog/fundamentals/mechanics/how-chatgpt-surfaces-local-businesses · llmrefs.com/blog/chatgpt-entities · axios.com/2026/07/23/yelp-reviews-chatgpt-geo-partnership · martech.org/yelp-brings-reviews-and-local-leads-to-chatgpt · community.openai.com/t/inaccurate-information-in-search-gpt-results-index-or-business-listing/1044290 · developers.google.com/search/docs/appearance/structured-data/organization · wikidata.org/wiki/Wikidata:Notability

Contrôle qualité : 2e passe appliquée par le Manager (corrections des points 1 à 7).
