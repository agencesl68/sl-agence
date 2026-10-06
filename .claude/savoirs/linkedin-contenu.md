# Manuel métier : LinkedIn et contenu (agent `contenu-linkedin`)

> Rédigé le 2026-10-06 par l'agent `contenu-linkedin`. Usage interne, rien n'est publié.
> Relecture : chaque trimestre, ou dès qu'un changement d'algorithme est annoncé par LinkedIn.
> Règle de lecture : **[officiel]** = LinkedIn l'a écrit ; **[étude]** = étude tierce avec méthode publiée ;
> **[secondaire]** = chiffre repris par un site tiers, non vérifié à la source ; **[à tester]** = hypothèse.
> Les retours terrain de `memoire/apprentissages.md` priment sur tout ce qui suit.

## Plan

1. Comment fonctionne la distribution LinkedIn en 2026 (faits sourcés)
2. Les 12 règles d'or pour Loïc
3. 25 accroches adaptées à notre cible, classées par pilier
4. Huit structures de posts, avec un exemple rédigé pour SL Agence
5. Carrousels : structure slide par slide, design, outils gratuits
6. Commentaires stratégiques : méthode, 10 ouvertures, routine de 15 min/jour
7. Profil de Loïc : titre, Infos, bannière, sélection (rédigés)
8. Calendrier mensuel type (3 posts/semaine)
9. Indicateurs hebdomadaires et seuils
10. Ce qu'il ne faut jamais faire
11. Grille d'auto-évaluation (10 critères, seuil 8/10) appliquée aux posts de 2026-S41
12. Sources réellement consultées

---

## 1. Comment fonctionne la distribution LinkedIn en 2026

### 1.1 Ce que LinkedIn a officiellement décrit (mars 2026)

Billet d'ingénierie « Engineering the next generation of LinkedIn's Feed » (Hristo Danchev, 12 mars 2026) **[officiel]** :

- Le fil repose sur deux briques : une **récupération par LLM** qui « comprend mieux de quoi parle un post » et le relie aux intérêts de chaque membre, puis un **modèle de classement séquentiel** (« Generative Recommender ») qui lit « plus d'un millier » d'interactions passées du membre.
- Signaux utilisés : ce que le membre déclare sur **son profil** (secteur, expérience, compétences, **géographie**) et ce qu'il fait : lu, aimé, commenté, revu, ou simplement fait défiler.
- Le classement prédit des actions **passives** (clic, passage, lecture longue) et **actives** (réaction, commentaire, partage).
- Pas d'attributs démographiques. Mises à jour « en quelques minutes ».
- Pour un compte neuf (« cold start »), le système **déduit les centres d'intérêt à partir du profil**, sans attendre l'historique.

**Ce que cela implique pour Loïc** : le profil et les posts sont lus comme du texte. Un profil qui dit clairement
« automatisation, applications métier, TPE-PME, Haut-Rhin » et des posts qui restent sur ces sujets aident le système
à trouver les bons lecteurs. Les sujets hors thème brouillent ce signal.

**Point de vigilance** : beaucoup de blogs affirment que « 360Brew », un grand modèle de recherche de LinkedIn, classe
le fil et « lit votre profil comme un consultant ». Le guide Trust Insights (Q1 2026), qui synthétise les publications
d'ingénierie de LinkedIn, indique que cette approche a été testée puis **écartée pour le fil**. Ne pas bâtir de règle sur ce mythe.

### 1.2 La portée organique a baissé, la niche est récompensée

- Richard van der Blom, *Algorithm InSights 2025* (rapport payant ; chiffres repris par plusieurs sites) **[secondaire]** :
  vues **−50 %**, engagement **−25 %**, croissance d'abonnés **−59 %** sur un an.
- Van der Blom, podcast *Creator Science* n° 307 (2026, données sur 13 M de posts) **[étude, propos de l'auteur]** :
  portée **−60 % en deux ans** pour les créateurs actifs ; fréquence utile passée de 5–6 à **2–4 posts par semaine** ;
  **80 % du contenu sur 1 ou 2 sujets** ; commenter hors sujet **nuit** à la portée ; les **newsletters** LinkedIn font
  bien mieux que les articles ; il recommande **texte + image, carrousel, newsletter** plutôt que texte seul ou vidéo
  (sauf si on aime la vidéo) ; **80 % des commentaires reçus dans ses 5 premières minutes sont écrits par une IA**.
- Metricool, étude 2026 (673 658 posts, 63 108 comptes) **[étude]** : environ **la moitié des impressions arrive dans les 48 premières heures**.

### 1.3 LinkedIn freine le contenu IA générique (mai 2026)

« Keeping conversations real on LinkedIn » (Laura Lorenzetti, 20 mai 2026, republié le 4 juin 2026) **[officiel]** :
LinkedIn détecte le contenu « qui peut sembler soigné mais n'a ni point de vue ni substance », les **commentaires
publiés en masse par des outils d'automatisation** et les commentaires qui **ne font que reformuler le post**.
Détection correcte « 94 % du temps » lors des premiers tests. Ces posts ne sont pas supprimés, mais moins diffusés
hors du réseau direct (The Next Web, 20 mai 2026). L'IA comme aide reste admise : « la valeur vient de l'humain derrière l'outil ».
La presse (The Next Web, Media Copilot) cite parmi les marqueurs la tournure **« ce n'est pas X, c'est Y »** ; elle
n'apparaît pas dans le texte de LinkedIn consulté, mais c'est un tic d'écriture IA reconnu : **à utiliser une fois au plus par post**.

### 1.4 Formats : ce que disent les études

| Source | Périmètre | Résultat utile |
|---|---|---|
| Socialinsider 2026 **[étude]** | 1,3 M posts, 16 645 **pages entreprise**, 2024–2025 | Taux d'engagement : documents 7,00 % · multi-images 6,45 % · vidéo 6,00 % · image 5,30 % · texte 4,50 % · sondage 4,20 % · lien 3,25 % |
| Metricool 2026 **[étude]** | 673 658 posts | Profils perso 2,60 % d'engagement contre 1,60 % pour les pages ; carrousels 1 451 impressions moyennes contre 606 pour la vidéo ; posts avec **question directe : +77 % de commentaires** |
| AuthoredUp 2026 **[secondaire]** | 3 M posts de profils perso, mars 2025–févr. 2026 | Documents : +39 % de portée, +30 % d'engagement par rapport à la moyenne ; posts de 1 300 à 2 500 caractères : +27 % d'engagement par rapport aux posts de moins de 400 |
| LinkedIn via TechCrunch (4 févr. 2025) **[officiel, rapporté]** | — | Vidéo en hausse de 36 % sur un an ; fil vidéo vertical déployé |

**Lecture** : le **document PDF (carrousel)** est le format le plus régulier dans toutes les études. Texte + image
reste la base. La vidéo progresse mais ne marche que si on est à l'aise face caméra.

### 1.5 Liens externes : pénalité réelle mais inégale

- Ordinal (posts 2023 → début 2026) **[étude]** : pénalité de 5 % à 42 % selon les années, **surtout pour les pages entreprise** ;
  les profils personnels n'en subissent « presque aucune ».
- Metricool 2026 **[étude]** : liens = **−27 % d'impressions pour les profils perso** (+51 % pour les pages).
- **Règle retenue** : pas de lien dans le corps ; lien en premier commentaire, mais le post doit **se suffire à lui-même**
  (un post écrit uniquement pour envoyer vers un lien est déclassé, selon plusieurs observateurs **[secondaire]**).

### 1.6 Horaires : les études se contredisent

- Buffer (4,8 M posts, publié le 9 sept. 2026) **[étude]** : **mercredi** meilleur jour, puis jeudi et vendredi ; lundi et mardi les plus faibles ;
  pic **15 h–20 h**, meilleur créneau mercredi 16 h ; **le week-end chute nettement**.
- Hootsuite **[secondaire]** : mardi et mercredi, 8 h–9 h.
- Metricool 2026 **[étude]** : forte activité 9 h–12 h.
- **Conclusion** : tester deux créneaux (8 h et 16 h) pendant 4 semaines et garder celui qui marche **pour l'audience de Loïc**.

### 1.7 Fonctions et limites à connaître

- **Mode créateur supprimé** (mars 2024) : ses outils (bouton « Suivre », newsletter, Live, statistiques) sont ouverts à tous ; les hashtags de profil ont disparu **[secondaire]**.
- **Newsletter** : « tous les membres peuvent créer une newsletter » (aide LinkedIn) **[officiel]**.
- **Documents** : PDF, PPT(X), DOC(X) ; 100 Mo et 300 pages maximum ; pages de même taille ; **impossible de modifier le document après publication** (seul le texte l'est) **[officiel]**.
- **Hashtags** : aucun rôle documenté par LinkedIn (Trust Insights) ; 0 à 3, toujours en lien avec le sujet.
- **Invitations** : LinkedIn ne publie pas de quota ; plafond observé ~100 par semaine glissante, notes personnalisées limitées sur compte gratuit (chiffres variables selon les sources) **[secondaire]**.
- **SSI** (Social Selling Index) : score 0–100 visible sur linkedin.com/sales/ssi, 4 piliers de 25 points (marque professionnelle, trouver les bonnes personnes, échanger des informations, construire des relations) **[secondaire]**.
- **Statistiques** : Shield a fermé en mai 2026 (contraintes LinkedIn et Google) ; utiliser les **statistiques natives** de LinkedIn (gratuites) et les noter chaque semaine dans un tableau.

---

## 2. Les 12 règles d'or pour Loïc

1. **Deux sujets, pas dix.** 80 % des posts sur « supprimer la double saisie et l'administratif des TPE-PME » et « facture électronique / outils du quotidien ». Le reste : coulisses.
2. **Le profil d'abord.** Il est lu par le système pour trouver vos lecteurs. Titre et Infos réécrits (section 7) avant le premier post.
3. **3 posts par semaine, pas plus.** La qualité prime ; 2 à 4 posts est la zone efficace observée en 2026.
4. **Une scène vraie bat dix conseils.** Chaque post part d'un fait de `agence.md`, d'une source officielle ou d'une expérience réelle de Loïc. Jamais d'exemple inventé.
5. **Deux premières lignes = tout.** Une scène, un chiffre vrai ou une date. Pas de « Aujourd'hui je voudrais vous parler de ».
6. **Écrire comme on parle à un artisan au téléphone.** Phrases courtes, mots du métier (bon, chantier, devis, relance), « je ».
7. **Aucun tic d'IA.** Pas de « ce n'est pas X, c'est Y » en série, pas de tirets longs à répétition, pas de morale finale creuse. Relire à voix haute.
8. **Finir par une vraie question**, précise, à laquelle un dirigeant peut répondre en une phrase. Jamais « Commentez OUI ».
9. **Lien en commentaire, post autonome.** Le post doit apporter sa valeur sans le clic.
10. **Être là la première heure.** Répondre à chaque commentaire, par une phrase qui relance (question ou précision).
11. **Commenter avant de publier.** 15 minutes par jour sur les posts de dirigeants du 68, de comptables, de la CCI, toujours dans nos sujets.
12. **Trois carrousels par mois.** Le document PDF est le format le plus régulier dans les études ; recycler les articles du blog.

---

## 3. 25 accroches pour les dirigeants du Haut-Rhin

Règles : moins de 200 caractères (LinkedIn coupe le texte vers 200 caractères avant « voir plus » **[secondaire]**),
un fait vrai, un objet concret. Les crochets `[…]` = à remplir par un **fait réel** fourni par Loïc ou une source ; sans fait, on n'utilise pas l'accroche.

**Pilier 1 — Scènes du terrain (preuve)** — faits issus de `agence.md`
1. « 11 engins. Une photo du compteur avant le plein, une après. Le carburant consommé est visible le jour même. »
2. « 30 secondes. C'est le temps qu'il faut à un salarié de terrassement pour pointer ses heures, avant de rentrer. »
3. « Un bon d'intervention agricole rempli une seule fois. Signé au doigt. Envoyé en PDF. »
4. « Un conseiller en gestion de patrimoine avait un fichier par client. Il a maintenant un seul écran, et le score du client se calcule pendant le rendez-vous. »
5. « Dans une entreprise de sécurité et prévention, les échéances de contrôle s'affichent avant de tomber. »

**Pilier 2 — Le coût caché (pédagogie)**
6. « Le soir, après le chantier, beaucoup de dirigeants ont une deuxième journée : recopier. »
7. « Combien de fois l'heure d'un salarié est-elle écrite avant d'arriver sur sa fiche de paie ? Comptez. »
8. « "Il faut demander à…" Si cette phrase revient pour un fichier, ce fichier est un risque. »
9. « Qui, chez vous, peut dire ce matin quelles factures sont en retard, sans ouvrir trois fichiers ? »
10. « Ce devis envoyé il y a trois semaines : qui devait le relancer ? »

**Pilier 3 — Mode d'emploi (autorité)**
11. « Relancer un devis sans réponse : J+2, J+7, J+10, J+15, J+30. Voici quoi dire à chaque étape. »
12. « Sortir d'Excel sans tout changer : commencez par une seule tâche. Voici comment la choisir. »
13. « Facture électronique : trois questions à poser à votre expert-comptable avant la fin du mois. »
14. « Avant le départ d'une personne clé, faites-lui filmer son fichier, écran partagé. 20 minutes. »
15. « Bons d'intervention papier : quatre questions à vous poser avant de passer au téléphone. »

**Pilier 4 — Coulisses (humain)**
16. « Sacha construit les outils. Moi, j'écoute. Voici comment se passe notre premier appel de 15 minutes. »
17. « Pourquoi nous annonçons un prix ferme avant de commencer, et jamais après. »
18. « La première version d'un outil, chez nous, est d'abord testée sur les téléphones des équipes. »
19. « Une erreur que nous avons faite sur un projet : [fait réel, anonymisé]. Ce que nous faisons différemment depuis. »
20. « Friesen, Sundgau. Voici à quoi ressemble une semaine de travail chez SL Agence : [faits réels]. »

**Pilier 5 — Actualité locale ou réglementaire (visibilité)**
21. « Depuis le 1er septembre 2026, votre entreprise doit pouvoir recevoir des factures électroniques. Même avec trois salariés. »
22. « 1er septembre 2027 : toutes les TPE et PME devront émettre leurs factures en électronique. Il reste onze mois. » (à recalculer à chaque usage)
23. « J'étais à [événement CCI Alsace Eurométropole, date]. Une phrase m'est restée : [citation exacte, avec accord]. »
24. « [Chiffre officiel récent sur les PME ou les délais de paiement] — source : [organisme, date]. Ce que ça veut dire pour une entreprise de 10 salariés. »
25. « Au [date], [obligation] change pour les entreprises de [taille]. La version courte, en trois lignes. »

---

## 4. Huit structures de posts (avec exemple rédigé)

Longueur cible : 120 à 250 mots (`ton.md`), soit environ 800 à 1 600 caractères. Les études récentes montrent un léger
avantage aux posts plus longs (1 300–2 500 caractères **[secondaire]**) : on peut monter à 300 mots pour un mode d'emploi.

### Structure 1 — Avant / Après / Le détail qui compte (preuve sociale)
Chiffre ou scène → contexte (secteur, taille) → ce qui a été mis en place (3 lignes) → le détail qui fait que ça marche → question.
```
11 engins. Une photo du compteur avant le plein, une après.

C'est ce que font les chauffeurs d'une entreprise de terrassement que nous accompagnons.

[L'avant réel, si Loïc le connaît : comment le carburant était suivi, par qui, avec quel délai. Sinon, supprimer ce paragraphe.]

Ce qui est en place :
→ deux photos du compteur, prises au téléphone, avant et après le plein ;
→ 11 engins suivis de la même façon ;
→ le carburant consommé est visible le jour même.

Le détail qui compte : la photo. Personne ne doit retenir un chiffre ni le recopier. Le compteur fait foi.

Dans votre entreprise, qui sait aujourd'hui ce qu'a consommé chaque véhicule cette semaine ?

#BTP #Terrassement #HautRhin
```

### Structure 2 — Le coût caché, calculé par le lecteur (pédagogie)
Scène banale → le lecteur fait lui-même le calcul (aucun chiffre inventé) → ce que coûte vraiment la tâche → une piste → question.
```
Prenez un bon d'intervention papier.

Il est rempli sur place. Il voyage dans le camion. Il arrive au bureau. Quelqu'un le recopie dans le logiciel. Puis quelqu'un vérifie qu'il n'y a pas d'erreur.

Faites le calcul chez vous, honnêtement :
1. Combien de bons par semaine ?
2. Combien de minutes pour en recopier un ?
3. Combien de bons perdus ou illisibles par mois ?

Multipliez. C'est le temps que votre entreprise paie pour écrire deux fois la même chose.

Ce temps-là ne se voit sur aucun bilan. Il se voit le soir, quand le bureau reste allumé.

Un bon rempli une seule fois, signé au doigt sur un téléphone et envoyé en PDF, supprime le voyage dans le camion et la recopie au bureau.

Vous arrivez à combien de minutes par semaine ?

#TPE #HautRhin #Artisans
```

### Structure 3 — Mode d'emploi en étapes (autorité)
Problème en une ligne → étapes numérotées (dates, actions) → l'erreur à éviter → ressource en commentaire → question.
```
Un devis sans réponse ne veut presque jamais dire « non ».

Le client n'a pas eu le temps, il compare, il hésite sur un point, ou le projet est repoussé.

Le calendrier que je recommande :
J+2 : vérifier que le devis est bien arrivé.
J+7 : première relance, par mail, courte.
J+10 : un appel.
J+15 : une relance avec un élément nouveau (une option, une date, une précision).
J+30 : un message de clôture, poli, qui laisse la porte ouverte.

L'erreur la plus fréquente : relancer une seule fois, puis attendre.

Adaptez à votre métier. Un dépannage se décide en quelques jours. Un chantier peut demander plusieurs semaines.

Les 8 modèles de messages, prêts à copier, sont en commentaire.

À quelle étape décrochez-vous le plus souvent ?

#Artisans #TPE #Devis
```
Premier commentaire : https://slagence.fr/blog/relancer-un-devis-sans-reponse

### Structure 4 — La liste de signes (autorité, format carrousel idéal)
Titre-promesse → 3 à 7 signes concrets, chacun avec son « alerte » → seuil (« si vous en cochez 3… ») → question.
```
« Devis_2026_v3_final_OK ». Vous connaissez ce fichier.

Excel est un excellent outil. Il n'a pas été conçu pour servir de logiciel métier.

Quatre signes qu'il en fait trop chez vous :
1. Plusieurs versions du même fichier circulent.
2. Une même information est saisie deux fois.
3. Une seule personne sait comment le fichier fonctionne.
4. Vos équipes ne peuvent pas l'utiliser depuis un téléphone.

Si vous en cochez deux, commencez petit : une seule tâche, celle qui vous coûte le plus de temps.

Les 7 signes complets et la méthode en 4 étapes sont en commentaire.

Combien en cochez-vous ?

#Excel #PME #HautRhin
```

### Structure 5 — L'erreur et ce qu'on a appris (coulisses)
Aveu daté → contexte → conséquence → ce qu'on fait maintenant → question. **Uniquement avec un fait réel donné par Loïc.**
```
[Quand] nous avons [erreur réelle, anonymisée].

[Ce qui s'est passé, en 2 lignes, sans nom de client.]

[Conséquence concrète : temps perdu, outil pas utilisé, retour du terrain.]

Depuis, nous faisons une chose différemment : [règle réelle].
C'est pour ça que la première version de chaque outil est testée sur les téléphones des équipes avant d'être finalisée.

Et vous, quelle leçon a coûté le plus cher dans votre métier ?
```

### Structure 6 — L'actualité décryptée (visibilité)
Date ou fait officiel → à qui ça s'applique → ce qui change concrètement → 3 actions → source en commentaire → question.
```
1er septembre 2027.

C'est la date à laquelle toutes les TPE et PME devront envoyer leurs factures en format électronique, via une plateforme agréée.

La réception, elle, est déjà obligatoire depuis le 1er septembre 2026.

Trois choses à préparer d'ici là :
1. Demander à l'éditeur de votre logiciel de facturation s'il est compatible. Si oui, vous le gardez.
2. Vérifier que vos fiches clients sont complètes. Une facture électronique a besoin de données propres.
3. Lister les factures que vous tapez encore à la main. Ce sont elles qui coûteront le plus de temps.

La réforme est une contrainte. Elle est aussi l'occasion de ne plus recopier une seule facture.

Où en êtes-vous : logiciel compatible, en cours de vérification, ou pas encore regardé ?

#FactureElectronique #TPE #HautRhin
```
Premier commentaire : fiche officielle impots.gouv.fr (lien dans `travail/contenu/linkedin/2026-S41.md`).
Vérifier le point 2 auprès de la source officielle avant publication (mentions obligatoires).

### Structure 7 — La question au réseau (conversation)
Constat personnel → question précise avec 3 options → pourquoi je pose la question → promesse de restituer les réponses.
Préférer une question écrite à un sondage LinkedIn (les sondages ont le plus faible taux d'engagement chez Socialinsider).
```
Je prépare un guide pour les entreprises du BTP du Haut-Rhin.

Une question, une seule :
quelle tâche administrative vous prend le plus de temps chaque semaine ?

A. Les bons et les rapports d'intervention
B. Le pointage des heures
C. Les relances de devis et de factures

Répondez juste par la lettre. Ou mieux : dites-moi combien de temps ça vous prend.

Je publierai la synthèse des réponses ici, sans nommer personne.

#BTP #HautRhin
```
(Ne publier que si le guide existe ou sera réellement produit.)

### Structure 8 — Le récit d'un premier appel (conversion)
Scène d'appel → ce qu'on demande au dirigeant → ce qu'il en ressort → engagements publics → appel à l'action doux.
```
15 minutes au téléphone, écran partagé.

C'est comme ça que commence chaque projet chez SL Agence.

Le but : que vous nous montriez ce que vous refaites chaque semaine.

[Ce que Loïc voit réellement pendant ces appels : un tableur, un carnet, des bons en pièce jointe… à confirmer par lui.]

Ensuite :
→ un devis gratuit, avec un prix ferme sous 24 h ;
→ le périmètre écrit noir sur blanc ;
→ un premier outil en place en 7 jours, testé sur les téléphones de vos équipes ;
→ vos données restent à vous, exportables à tout moment.

Si vous savez décrire ce qui vous fait perdre du temps, nous savons le construire.

Le lien pour réserver ces 15 minutes est en commentaire.

#TPE #Automatisation #HautRhin
```
Usage : 1 fois par mois maximum (objectif conversion).

---

## 5. Carrousels (posts « document »)

### Structure type : 8 à 10 slides
1. **Couverture** : la promesse en 8 mots maximum + un objet concret (« Excel ne suffit plus ? 7 signes »). Visage de Loïc ou logo en petit.
2. **Le problème** : une scène que le dirigeant reconnaît (« Devis_v3_final_OK »).
3. à 7. **Le contenu** : une idée par slide, un numéro géant, un titre court, une phrase d'explication, une « alerte » ou un exemple.
8. **Ce qu'il faut retenir** : la règle en une phrase.
9. **Passer à l'action** : la première étape à faire demain + la question posée aussi dans le texte du post.
10. **Signature** : « Loïc — SL Agence, Friesen (68) » + « Ressource complète : lien en commentaire ».

### Règles de design
- **Une seule taille pour toutes les pages** (exigence LinkedIn) ; format portrait 4:5 (1080 × 1350 px) ou carré 1080 × 1080 px **[secondaire]**.
- Exporter en **PDF aplati** ; vérifier avant publication : **le document ne peut plus être modifié ensuite** **[officiel]**.
- Donner un **titre de document** descriptif (il s'affiche sur le carrousel).
- Charte du site : fond noir `#070907`, vert `#a9c49f`, police Geist (comme le carrousel S41). Blanc pour le texte courant.
- Règles maison : 30 mots maximum par slide ; texte lisible sur un téléphone sans zoomer ; une couleur d'accent ; pas d'image de banque d'images ni de visuel « IA » ; captures d'écran d'outils **floutées** (aucune donnée client).
- Le texte du post (60 à 120 mots) donne envie d'ouvrir le document ; il n'en résume pas tout le contenu.

### Outils gratuits
- **Canva** (plan gratuit ; connecté à notre environnement) : modèles « Carrousel LinkedIn », export « PDF standard ». Créer un modèle maître aux couleurs du site et le dupliquer chaque semaine.
- **Google Slides** : format personnalisé 1080 × 1350, export PDF. Pratique pour réutiliser un article du blog.
- **Figma** (plan gratuit ; connecté) : pour un modèle très précis aux couleurs du site.
- **Statistiques natives LinkedIn** (gratuites) pour mesurer, Shield ayant fermé en mai 2026.
- **Descript** (connecté ; plan gratuit limité) : sous-titres et découpe d'une vidéo courte.

---

## 6. Commentaires stratégiques et social selling

### Méthode R-A-Q (40 à 90 mots)
1. **Reprendre** un détail précis du post (une phrase, un chiffre). Sans détail précis, on ne commente pas.
2. **Apporter** une chose que le post n'a pas : un fait sourcé, une réalisation de `agence.md`, une étape pratique.
3. **Questionner** : une question à laquelle l'auteur peut répondre en une phrase.

Pourquoi : LinkedIn limite depuis mai 2026 les commentaires automatisés et ceux qui « ne font que reformuler le post » **[officiel]** ;
van der Blom observe que commenter **hors de ses sujets** brouille le signal et nuit à la portée **[étude]**.
Un commentaire de fond travaille donc deux fois : il fait connaître Loïc de l'auteur, et il ancre son profil sur nos sujets.
Pas de lien, pas d'offre, pas de mention de SL Agence : le profil fait le travail.

### 10 ouvertures non génériques
1. « Le passage sur [détail exact] m'a arrêté : … »
2. « Un chiffre officiel pour compléter : [fait + source]. »
3. « Une précision qui évite une erreur courante : … »
4. « Chez une entreprise de terrassement que nous accompagnons, [fait de `agence.md`]. »
5. « Question pratique : comment faites-vous quand [cas précis tiré du post] ? »
6. « Je retiens surtout "[citation exacte du post]", parce que … »
7. « Une nuance, depuis le terrain : … »
8. « Pour ceux qui se demandent si ça les concerne : [obligation], c'est à partir du [date] (source : [organisme]). »
9. « Si je devais ajouter une étape à votre liste : … »
10. « Vous parlez de [problème]. Avez-vous mesuré combien de temps ça prend par semaine ? »

### Routine de 15 minutes par jour (du lundi au vendredi)
- **0–4 min** : répondre à tous les commentaires reçus (une phrase qui relance) et aux messages privés.
- **4–12 min** : 2 commentaires R-A-Q sur la liste cible (objectif fiche : 10 par semaine). Les jours de publication, les faire **avant** de publier.
- **12–15 min** : 2 à 4 invitations personnalisées à des personnes de la cible qui ont réagi ou commenté.

**Liste cible (à construire avec Loïc, 30 comptes)** : dirigeants de TPE-PME du 68 dans les secteurs A (BTP, terrassement,
travaux agricoles, sécurité-prévention), experts-comptables et banques locales (relais de la facture électronique),
CCI Alsace Eurométropole, réseaux d'entrepreneurs et médias économiques locaux. Vérifier chaque compte dans Gmail/Drive : pas de client existant.

### Invitations et messages
- Inviter en priorité les personnes qui ont **interagi** avec un post ou un commentaire de Loïc ; rester entre 20 et 30 invitations par semaine
  (règle maison, très en dessous du plafond observé d'environ 100 **[secondaire]**). Un taux d'acceptation faible expose à des limitations.
- Note d'invitation (si disponible) : une phrase de contexte réel. « Nous avons échangé sous le post de X sur la facture électronique. »
- Après acceptation : **pas de vente dans le premier message**. Un merci et, au plus, une ressource utile liée à ce qu'il a écrit.
- La prospection directe suit `ton.md` (50 à 90 mots, un détail réel, une question) et passe par l'agent `prospection`.
- **Jamais d'outil d'automatisation** (invitations, messages, commentaires) : risque de restriction du compte.

---

## 7. Profil de Loïc (textes prêts à coller)

À faire **avant** le premier post : le système déduit les centres d'intérêt d'un compte récent à partir de son profil **[officiel]**.

**Photo** : vraie photo, visage net, lumière du jour, fond simple. Pas d'avatar, pas de logo, pas de photo générée.

**Lieu** : Friesen ou « Mulhouse et périphérie » (la géographie fait partie des signaux du profil **[officiel]**).

**Titre** (limite 220 caractères) — proposition principale :
> J'aide les TPE et PME du Haut-Rhin à ne plus faire le travail deux fois | Applications métier, automatisation et IA sur mesure | Associé SL Agence, Friesen

Variante plus « preuve » :
> Associé SL Agence | Automatisation, applications métier et IA pour les TPE-PME de Mulhouse, Colmar et du Haut-Rhin | Premier outil en place en 7 jours

**Infos** (limite 2 600 caractères ; environ 1 500 ici) :
```
Le travail est fait deux fois. Une fois quand l'information arrive, une fois quand on la recopie.

Je m'appelle Loïc. Je suis associé de SL Agence, à Friesen, avec Sacha. Sacha construit les outils. Moi, j'écoute les dirigeants, je cadre le besoin et je vérifie que l'outil sert vraiment à ceux qui l'utilisent.

Nous travaillons pour les indépendants, TPE, PME, cabinets et associations de Mulhouse, Colmar, Saint-Louis, Altkirch, du Sundgau et de tout le Haut-Rhin.

Ce que nous construisons :
→ des bons d'intervention sur téléphone, signés au doigt, avec photos horodatées, même hors réseau ;
→ un seul écran à la place de vos fichiers Excel ;
→ des devis, factures, contrats et rapports générés automatiquement ;
→ des relances de factures et d'échéances qui partent seules ;
→ des assistants IA : facture saisie depuis une photo, compte rendu depuis un message vocal, tri du courrier ;
→ des connexions entre vos logiciels : comptabilité, paie, agenda, messagerie, caisse ;
→ la préparation à la facture électronique.

Quelques réalisations (nos clients sont présentés par leur activité) :
→ Terrassement : 12 salariés pointent leurs heures en 30 secondes, avant de rentrer.
→ Terrassement : le carburant de 11 engins visible le jour même.
→ Gestion de patrimoine : un fichier par client remplacé par un seul écran.
→ Sécurité et prévention : les échéances de contrôle signalées à l'avance.

Notre méthode : 15 minutes au téléphone, écran partagé. Un devis gratuit, un prix ferme sous 24 h, un périmètre écrit. Un premier outil en place en 7 jours. Vos données restent à vous, exportables à tout moment.

Ici, je publie trois fois par semaine : des cas concrets, des méthodes à appliquer vous-même et l'actualité qui touche les entreprises du 68.

Pour en parler : « Réserver un appel de 15 minutes » sur slagence.fr, ou agence.sl.68@gmail.com.
```

**Bannière** (1584 × 396 px **[secondaire]**), fond `#070907` :
- Ligne 1, grande, vert `#a9c49f` : « Si vous savez le décrire, nous savons le construire. »
- Ligne 2, blanc : « Applications métier · Automatisation · IA — TPE et PME du Haut-Rhin »
- Ligne 3, petite : « slagence.fr · Friesen (68) »
- Texte aligné à droite : la photo de profil recouvre le coin inférieur gauche.

**Sélection** (dans cet ordre) :
1. Lien slagence.fr — titre « Ce que nous faisons, en 45 secondes (vidéo) ».
2. Le carrousel « Excel ne suffit plus ? 7 signes », une fois publié.
3. Article « Relancer un devis sans réponse : 8 modèles à copier » — slagence.fr/blog/relancer-un-devis-sans-reponse.
4. Page « Facture électronique TPE » — slagence.fr/facture-electronique-tpe.
5. Le post « scène du terrain » le plus commenté du mois (mise à jour mensuelle).

**Expérience** : poste « Associé — commercial et stratégie », SL Agence, avec 3 lignes reprenant la méthode et les engagements.
**Compétences** (5 premières) : Automatisation des processus · Applications métier · Intelligence artificielle · Développement commercial · Gestion de projet.
**Bouton principal** : garder « Se connecter » (objectif : relations avec des dirigeants locaux, pas une audience large).

---

## 8. Calendrier mensuel type (12 posts)

Créneaux de départ : **mardi 8 h · mercredi 16 h · jeudi 8 h**. Les études se contredisent (section 1.6) : on compare les
créneaux du matin et de l'après-midi sur 4 semaines, puis on garde le meilleur pour l'audience de Loïc. Pas de publication le week-end (chute nette selon Buffer 2026).

| Semaine | Mardi 8 h | Mercredi 16 h | Jeudi 8 h |
|---|---|---|---|
| 1 | P2 Coût caché — texte + photo (structure 2) | P3 Mode d'emploi — **carrousel** (structure 4) | P1 Scène du terrain (structure 1) |
| 2 | P5 Actualité (structure 6) | P1 Scène du terrain — capture floutée | P4 Coulisses (structure 5, fait réel) |
| 3 | P2 Coût caché (structure 2) | P3 Mode d'emploi — **carrousel** (structure 3) | P1 Scène du terrain |
| 4 | P2 Question au réseau (structure 7) | P3 Mode d'emploi — **carrousel** | P4 Conversion : le premier appel (structure 8) |

Répartition : P1 ×3, P2 ×3, P3 ×3, P4 ×2, P5 ×1 (+ actualité urgente en remplacement si besoin).
Chaque mois, en plus : **1 newsletter LinkedIn** (reprise de l'article de blog de la quinzaine, ouverte à tous les membres **[officiel]**),
1 vidéo courte de 30 à 45 s **seulement si Loïc est à l'aise** (accroche 0–3 s, 3 plans, chute, sous-titres), et la routine de commentaires chaque jour ouvré.

---

## 9. Indicateurs à suivre chaque semaine

Source : statistiques natives LinkedIn (onglet de chaque post + « Statistiques » du profil), notées chaque lundi dans un tableau
(Google Sheets dans Drive, pas dans ce dépôt). Les seuils ci-dessous sont des **objectifs de départ fixés par nous**, pas des
moyennes du marché : on les recalibre après 4 semaines sur la **médiane** des posts de Loïc.

| Indicateur | Pourquoi | Seuil de départ | Si en dessous |
|---|---|---|---|
| Impressions par post | Portée | Comparer à la médiane de Loïc | Post < 50 % de la médiane : revoir accroche, sujet ou créneau |
| Taux d'engagement (réactions + commentaires + republications) ÷ impressions | Qualité | ≥ 2,6 % (moyenne des profils perso, Metricool 2026) | 3 posts de suite en dessous : retravailler accroches et questions finales |
| Commentaires venant de la cible (dirigeants, comptables du 68) | Bonne audience | ≥ 2 par post | Revoir la liste cible des commentaires (section 6) |
| Vues du profil | Curiosité | En hausse sur 4 semaines | Revoir titre et bannière |
| Abonnés et relations situés dans le Haut-Rhin (données démographiques) | Ancrage local | En hausse chaque mois | Plus de posts piliers 1 et 5, plus de commentaires locaux |
| Invitations envoyées / acceptées | Réseau | 20–30 envoyées, ≥ 50 % acceptées | Sous 30 % : arrêter, mieux cibler, ajouter du contexte |
| Commentaires R-A-Q faits par Loïc | Régularité | 10 par semaine | Bloquer le créneau de 15 min dans l'agenda |
| Conversations privées ouvertes par un dirigeant | Intérêt commercial | ≥ 1 par semaine à partir du 2e mois | Plus de posts piliers 1 et 3, un post structure 8 par mois |
| Appels de 15 min réservés venant de LinkedIn | Résultat | ≥ 1 par mois à partir du 3e mois | Revoir l'appel à l'action et la sélection du profil |

Chaque résultat notable (post qui marche, sujet qui ne prend pas, créneau gagnant) va dans `memoire/apprentissages.md`.

---

## 10. Ce qu'il ne faut jamais faire

1. Inventer un chiffre, un témoignage, une citation, un « avant » de client. Citer un nom de client ou montrer une capture non floutée.
2. Appâter l'engagement : « Commentez OUI », « Likez si… », « Tapez 1 pour recevoir le PDF ». LinkedIn le freine **[officiel]**.
3. Utiliser des outils d'automatisation, des « pods » d'engagement, acheter des abonnés.
4. Publier un texte d'IA brut, non relu. Empiler les « ce n'est pas X, c'est Y », les tirets longs, les morales creuses, les emojis en série.
5. Mettre un lien dans le corps du post, ou écrire un post qui ne sert qu'à envoyer vers un lien.
6. Plus de 3 hashtags ; taguer des personnes qui n'ont rien à voir avec le post.
7. Publier puis disparaître : ne pas répondre aux commentaires le jour même.
8. Commenter hors de nos sujets (politique, polémiques, sujets sans rapport) : cela brouille le profil.
9. Vendre dans le premier message après une acceptation d'invitation.
10. Annoncer un prix, dénigrer un concurrent, promettre un résultat non prouvé, parler de l'IA « qui va tout transformer ».
11. Faire des sondages pour gonfler les vues : c'est le format au plus faible engagement chez Socialinsider.
12. Publier un post sans objectif unique : dans ce cas, on ne le produit pas et on le signale au Manager.

---

## 11. Grille d'auto-évaluation d'un post (seuil 8/10)

1 point par critère, 0,5 si partiel. **Sous 8/10, le post est réécrit avant d'être livré.**

| # | Critère | Question de contrôle |
|---|---|---|
| 1 | Objectif et pilier | Un seul objectif (visibilité, autorité, acquisition, conversion, preuve sociale, pédagogie) et un pilier clair ? |
| 2 | Accroche | Les 2 premières lignes (moins de 200 caractères) contiennent-elles une scène, un chiffre vrai ou une date ? |
| 3 | Une seule idée | Le post reste-t-il sur un seul sujet du début à la fin ? |
| 4 | Preuve vraie | Chaque fait vient-il de `agence.md`, d'une source officielle ou d'un fait confirmé par Loïc ? |
| 5 | Concret | Des objets et des métiers (bon, chantier, devis), pas des concepts ? |
| 6 | Voix humaine | Phrases de Loïc, en « je » ; aucun tic d'IA (contraste en série, morale creuse, tirets longs) ? |
| 7 | Lisibilité | 120 à 300 mots, paragraphes d'une ou deux lignes, lisible sur téléphone ? |
| 8 | Valeur pour le lecteur | Un dirigeant qui ne nous contactera jamais en tire-t-il quelque chose ? |
| 9 | Fin | Une question précise, à laquelle on répond en une phrase, sans appât ? |
| 10 | Conformité et diffusion | Pas de lien dans le corps, 0 à 3 hashtags, aucun nom de client, `ton.md` respecté, créneau pertinent ? |

### Application aux posts de `travail/contenu/linkedin/2026-S41.md`

**Post 1 — mardi 7 oct. (présentation, pilier 2) : 8/10, au seuil.**
1 : 1 · 2 : 1 · 3 : 0,5 (manifeste + présentation + engagement de rythme) · 4 : 0,5 (aucune preuve de résultat) · 5 : 1 · 6 : 0,5 · 7 : 1 · 8 : 0,5 · 9 : 1 · 10 : 1.
Améliorations concrètes :
- Remplacer « Ce n'est pas un défaut d'organisation. C'est un outil qui manque. » par « Ce travail en double a une cause simple : il manque un outil. » (la tournure « pas X, c'est Y » est citée par la presse parmi les marqueurs de texte IA ; la garder sur le site, l'éviter dans les posts).
- Ajouter une preuve après la liste des trois exemples : « Chez une entreprise de terrassement que nous accompagnons, 12 salariés pointent leurs heures en 30 secondes, avant de rentrer. »
- Supprimer « Pas de discours sur l'IA. » (formule en creux) : garder « Des cas concrets, des méthodes à appliquer vous-même, et l'actualité qui touche les entreprises du 68. »
- Ajouter une phrase personnelle vraie (pourquoi Loïc fait ce métier) : **à fournir par Loïc**. Avec ces 4 changements, note estimée 9/10.

**Post 2 — jeudi 9 oct. (facture électronique, pilier 5) : 9,5/10.**
1 : 1 · 2 : 1 · 3 : 1 · 4 : 1 (fiche officielle impots.gouv.fr) · 5 : 1 · 6 : 0,5 · 7 : 1 · 8 : 1 · 9 : 1 · 10 : 1.
Améliorations concrètes :
- Remplacer « Le vrai sujet n'est pas la date. C'est de profiter de ce changement pour… » par « Profitez de ce changement pour ne plus recopier une seule facture à la main. »
- Décliner le même contenu en carrousel de 5 slides la semaine suivante (le document est le format le plus régulier dans les études).

**Post 3 — dimanche 12 oct. (terrassement, pilier 1) : 9/10.**
1 : 1 · 2 : 1 (« 30 secondes. ») · 3 : 1 · 4 : 1 · 5 : 0,5 (l'« avant » décrit le secteur, pas ce client) · 6 : 1 · 7 : 1 · 8 : 1 · 9 : 1 · 10 : 0,5 (dimanche soir : Buffer 2026 observe une chute nette le week-end).
Améliorations concrètes :
- Déplacer au mercredi 15 oct. 16 h ou au jeudi 16 oct. 8 h, et remplacer la chute « Demain matin, beaucoup d'entre vous vont reprendre la semaine… » par « Ce vendredi, combien d'heures de la semaine faudra-t-il encore rassembler ? ». Si Loïc tient au dimanche, le traiter comme un **test** et noter le résultat dans `apprentissages.md`.
- Remplacer le paragraphe général sur le pointage dans le BTP par l'avant réel de ce client, dès que Loïc le fournit.
- Visuel : capture de l'écran de pointage floutée, avec accord du client.

---

## 12. Sources réellement consultées (le 2026-10-06)

**Officielles LinkedIn**
- Hristo Danchev, « Engineering the next generation of LinkedIn's Feed », LinkedIn Engineering, 12 mars 2026 — https://www.linkedin.com/blog/engineering/feed/engineering-the-next-generation-of-linkedins-feed
- Laura Lorenzetti, « Keeping conversations real on LinkedIn », LinkedIn News, 20 mai 2026 (republié le 4 juin 2026) — https://news.linkedin.com/2026/keeping-conversations-real-on-linkedin
- Aide LinkedIn, accès aux newsletters — https://www.linkedin.com/help/learning/answer/134850
- Aide LinkedIn, partager un document dans un post — https://www.linkedin.com/help/linkedin/answer/97459

**Études et analyses**
- Trust Insights, *The Unofficial LinkedIn Algorithm Guide*, édition Q1 2026 (PDF, pages 11–12, 51–53, 89–91) — https://www.trustinsights.ai/wp-content/uploads/2026/03/The-Unofficial-LinkedIn-Algorithm-Guide-Q1-2026-Edition.pdf
- Socialinsider, LinkedIn Benchmarks 2026 (1,3 M posts de pages, 2024–2025) — https://www.socialinsider.io/social-media-benchmarks/linkedin
- Metricool, « LinkedIn Trends : 6 Strategy Insights from Our 2026 Study » — https://metricool.com/linkedin-trends/
- Buffer, meilleur moment pour publier sur LinkedIn (4,8 M posts, 9 sept. 2026) — https://buffer.com/resources/best-time-to-post-on-linkedin/
- Ordinal, étude sur la pénalité des liens (2023–2026) — https://www.tryordinal.com/blog/linkedin-link-penalty-study
- Richard van der Blom, épisode 307 du podcast *Creator Science* (« The state of LinkedIn in 2026 ») — https://podcast.creatorscience.com/richard-van-der-blom-2/
- Mercer MacKay, synthèse du rapport *Algorithm InSights 2025* de van der Blom **[secondaire]** — https://mercermackay.com/thinking/blog/a-leaders-guide-to-the-linkedin-algorithm-what-the-data-says/
- Dataslayer, « LinkedIn Algorithm 2026 » **[secondaire, chiffres contradictoires : non retenus sauf recoupement]** — https://www.dataslayer.ai/blog/linkedin-algorithm-february-2026-whats-working-now

**Presse**
- The Next Web, « LinkedIn cracks down on AI slop with 94% detection accuracy », 20 mai 2026 — https://thenextweb.com/news/linkedin-ai-slop-crackdown-generic-content
- Yahoo Finance UK, « LinkedIn cracks down on "AI slop" posts and comments » — https://uk.finance.yahoo.com/news/linkedin-cracks-down-ai-slop-045111100.html
- Media Copilot, « LinkedIn's war on AI filler » — https://mediacopilot.ai/linkedin-ai-slop-crackdown/
- PPC Land, « LinkedIn rebuilds its feed from scratch with LLMs and GPU-powered ranking » — https://ppc.land/linkedin-rebuilds-its-feed-from-scratch-with-llms-and-gpu-powered-ranking/
- Gens d'Internet, « Comment l'algorithme de LinkedIn fonctionne en 2026 ? », 13 mars 2026 — https://gensdinternet.fr/2026/03/13/comment-lalgorithme-de-linkedin-fonctionne-en-2026/
- TechCrunch, « LinkedIn amps up vertical video tools as uploads jump 36% », 4 févr. 2025 — https://techcrunch.com/2025/02/04/linkedin-amps-up-vertical-video-tools-as-uploads-jump-36
- AuthoredUp, « Shield Analytics winding down » — https://authoredup.com/blog/shield-analytics-winding-down
- JustPollen, « LinkedIn Statistics 2026 » (compilation sourcée) — https://justpollen.com/blog/linkedin-statistics-2026

**Vus uniquement en résultats de recherche (non ouverts : à vérifier avant de citer un chiffre)**
- Chiffres AuthoredUp sur la longueur (1 300–2 500 car.) et les documents (+39 % de portée) ; quotas d'invitations (~100/semaine) ;
  suppression du mode créateur (mars 2024) ; dimensions de bannière 1584 × 396 ; SSI à 4 piliers ; horaires Hootsuite et Sprout Social.

**Références d'écriture** (principes connus, résumés consultés en ligne, livres non relus pour ce manuel)
- Ann Handley, *Everybody Writes* : l'écriture est une compétence ; premier jet laid puis réécriture ; empathie extrême pour le lecteur ; « personne ne se plaindra que vous avez rendu les choses trop simples ».
- Chip et Dan Heath, *Made to Stick* : idées qui restent = Simples, Inattendues, Concrètes, Crédibles, Émotionnelles, en Histoires (SUCCES). Nos piliers 1 (histoire concrète) et 2 (inattendu chiffré par le lecteur) en découlent.

