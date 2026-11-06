# Protocole de mesure des liens et mentions externes (créé le 06/11/2026)

Outils gratuits seulement. Pas d'Ahrefs (c008). Objectifs = propositions, pas mesures (c011).
Trois relevés : **J0 le 06/11/2026, J+30 le 06/12/2026, J+90 le 04/02/2027.**

## 1. Ce qui compte comme « page extérieure indexée »

Une URL compte si les 4 conditions sont vraies, vérifiées en l'ouvrant le jour du relevé :
1. L'URL s'ouvre (code 200) et n'est pas sur slagence.fr.
2. Elle mentionne « SL Agence » ou « slagence.fr » (texte ou lien).
3. Elle est publiée par un tiers : annuaire, institution, média, association, client, profil de réseau. Un profil créé par nous compte comme « profil » (type A), pas comme « écrite par d'autres » (type B).
4. Elle apparaît dans une recherche (Google, ou Bing) ou dans Search Console / Bing Webmaster Tools. « Indexée » = trouvée par la recherche `site:` ou par la copie du moteur.

Ne comptent pas : le registre officiel (Sirene, annuaires d'État), les fiches automatiques sans mention du site, les profils déjà dans le `sameAs` avant le 06/11, les doublons d'une même organisation.

Types : **A** profil ou fiche créé par nous · **B** page écrite par d'autres (presse, radio, ressources, client) · **I** site institutionnel (chambre, agence régionale, administration). Une URL peut être B et I.

## 2. Relevé J0 (06/11/2026)

Fait par l'agent avec une recherche web qui n'est pas Google : **0 page tierce** (`00-suivi-liens.md` §1). À compléter par Loïc (2 minutes), avec Google :

| Étape | Requête à copier telle quelle | À noter |
|---|---|---|
| 1 | `"slagence.fr" -site:slagence.fr` | nombre de résultats, URL de chacun |
| 2 | `"SL Agence" (Friesen OR Mulhouse) -site:slagence.fr` | idem ; exclure les homonymes |
| 3 | `site:slagence.fr` | nombre de pages de notre site indexées (repère) |
| 4 | Search Console > Liens > « Principaux sites de liens externes » | capture d'écran déposée dans le dossier « SL agence/SEO » du Drive (nom du fichier, sans lien dans le dépôt) |
| 5 | Bing Webmaster Tools > Backlinks (si le site y est ajouté) | nombre de liens entrants |

## 3. Règles de relevé

- Mêmes requêtes, même navigateur, même compte, fenêtre privée, mêmes étapes aux 3 dates.
- Chaque URL obtenue est **ouverte** et notée avec la date du jour, le titre exact de la page, la phrase qui cite SL Agence et le type de lien (texte seul ou lien cliquable ; marqué `nofollow` ou `sponsored` ou non, voir le code source si besoin). Un lien `nofollow` compte comme mention, mais pas comme lien d'autorité : à noter.
- Vérifier à chaque fois le nom-adresse-téléphone affiché : doit être identique au kit §1 (pas de « SL Agence Mulhouse », pas de 06 si le 07 est le numéro unique choisi).
- Une mention négative, fausse ou à corriger : noter, et demander la correction à l'éditeur par message poli.
- Pas d'achat de lien, pas d'échange de lien, pas d'article sponsorisé (règle Google contre le spam) ; aucun paiement sans accord de Loïc.

## 4. Tableau de relevé (à copier dans `00-suivi-liens.md` à chaque date)

| Date | URL | Organisation | Type (A/B/I) | Lien cliquable ? | `nofollow` ? | Indexée ? | NAP conforme ? |
|---|---|---|---|---|---|---|---|
| (jj/mm) | | | | | | | |

## 5. Objectifs et lecture (propositions)

| Relevé | Pages indexées | Type B | Type I | Demandes envoyées (cumul) |
|---|---|---|---|---|
| J0, 06/11 | 0 | 0 | 0 | 0 |
| J+30, 06/12 | 3 ou plus | — | — | 12 ou plus (fin de la semaine 4) |
| J+90, 04/02/2027 | 6 ou plus | 2 ou plus | 1 ou plus | — |

Verdict à chaque relevé : **gagné** (objectif atteint), **neutre** (au moins la moitié), **perdu** (moins de la moitié), avec les chiffres. Lecture honnête : un lien ou une mention est lent à apparaître ; les profils (type A) sont rapides, les pages B demandent des semaines. Le résultat sur la position dans Google n'est pas mesuré ici (autres facteurs en jeu) : on mesure les mentions, pas la position (c011).

## 6. Que faire selon le résultat

- J+30 sous 3 pages : vérifier d'abord les moyens (au moins 12 demandes envoyées ?). Si oui, regarder quels types ont répondu et refaire ce type. Si non, c'est un problème d'envoi, pas de cible.
- Une cible « refusée » ou sans réponse après une relance dans le même fil (c005) : la noter, ne pas insister.
- Toute leçon utile va dans `memoire/apprentissages.md` (section SEO) et la ligne correspondante dans `travail/seo/experiences.md` (date de mesure J+28 ou J+56 selon le type).

## 7. Temps de Loïc

Relevé J0 : 10 minutes (requêtes, capture Search Console). Relevé J+30 : 10 minutes (déjà prévues dans la semaine 4 du brief). Relevé J+90 : 10 minutes. Ces 10 minutes comprennent la saisie dans le tableau.
