# Sites gratuits où obtenir un lien ou une mention (consulté le 13/11/2026)

Mission du 13/11 : liens vers slagence.fr, 0 €, par Loïc lui-même, hors annuaires d'entreprises classiques. Aucun compte créé, personne contacté, aucun fichier du site modifié.
Déjà connus et non repris : Bing Places, Apple, Grand Est Développement, France Num, LinkedIn, Codeur, La Fabrique du Net, PagesJaunes, Malt, fiche Google (voir `00-suivi-liens.md`, `kit-annuaires.md`). Radio WNE et la mairie de Friesen sont déjà au suivi (#10, #12) : non repris.

**Mini-lexique.** Lien canonique = mention qui dit à Google que l'original est sur slagence.fr. Nofollow = lien que Google ne compte pas (ou peu). Indexable = la page peut apparaître dans Google.

## 0. Limites de cette vérification (à lire d'abord)

- Méthode : WebFetch (lecture de la page officielle) et WebSearch (qui n'est pas Google ; ses résumés citent parfois des sources secondaires, signalées). Un seul appel API GitHub en lecture sur le dépôt du site.
- **Blocages du réseau de la session** : les pages suivantes n'ont pas pu être lues (403, 404, 503 ou domaine non autorisé) : Medium (aide), Hashnode (aide), Scribd, SlideShare, Issuu, Reddit, Quora, Indie Hackers, uha.fr, alsace-digitale.fr, friesen.fr, Trustpilot (aide, page tronquée), Crunchbase, YouTube (l'aide ne répond pas à la question). Elles sont classées « non vérifié » (tableau B), jamais supposées.
- **Aucun type de lien (normal / nofollow / ugc) n'a pu être lu dans le code HTML** : WebFetch renvoie du texte, pas les attributs. Colonne « Lien » = « non vérifié » partout. Règle pratique pour Loïc : après publication, clic droit > « Afficher le code source », recherche de `slagence.fr`, noter `rel="..."` dans `00-suivi-liens.md` (voir `04-protocole-mesure.md`).
- « Page indexable » n'est vérifiable qu'après publication (recherche `site:` ou Search Console). Toutes les lignes sont « à vérifier après publication ».
- Réalité à dire à Loïc : sur ces plateformes, la plupart des liens sont probablement nofollow (hypothèse non vérifiée ici). Leur valeur est d'abord : des pages tierces qui citent SL Agence (utiles aux moteurs IA et au nom de marque), quelques visites, quelques liens normaux possibles. Aucune ne remplace un lien écrit par un site métier ou local.
- **Règle c040 / c046 (mesures en cours)** : un lien vers une page en test est une changement qui fausse la mesure. Dans les contenus, ne lier que `/modeles-gratuits` et les guides qui ne figurent pas dans `travail/seo/experiences.md` comme en test ou prêts. Vérifié le 13/11 (experiences.md, blog-4-conseils-2026-11-09.md, rappels-seo.md) : `/modeles-gratuits` et `/blog/facture-electronique-artisan-ce-qui-change` n'ont aucune ligne de mesure. En test : `/blog/feuille-heures-salaries`, `/blog/comment-relancer-une-facture-poliment` et `/blog/relancer-un-devis-sans-reponse` (titles du 19/10, mesure le 16/11, nouveau départ vers le 24/11 ; experiences.md l.33-39 les cite sous forme courte « feuille-heures », « relancer-une-facture », « relancer-un-devis »). À éviter pour l'instant : ces 3 articles, `/blog/bon-intervention-contenu-modele` (après le 30/11), `/agent-ia-pme` (jusqu'au 16/11), `/` et `/a-propos` (en mesure jusqu'au 01/12 et au 23/11 environ), `/blog/crm-ou-excel`, `/blog/limites-excel-entreprise`, `/logiciel-btp-sur-mesure`, `/agence-ia-automatisation-haut-rhin`. Les champs « site web » de profil pointent forcément vers `https://slagence.fr/` : lien de marque inévitable, à dater dans le suivi (J0).

## 1. Textes réutilisables (copier-coller)

Règles tenues : pas de nom de client ni de personne (c004), pas de prix, chiffres en chiffres (c014), mots simples (c038), pas de résultat enrichi (c019), zone = phrase du kit (c032).

- **BIO-135** (135 caractères, compté par script) : `Agence d'automatisation et de logiciels sur mesure pour TPE et artisans, près de Mulhouse (Haut-Rhin). Modèles gratuits sur slagence.fr`
- **BIO-160** (champs « bio » plus longs) : `SL Agence : automatisation, IA et logiciels sur mesure pour TPE, PME et artisans du Haut-Rhin. Modèles gratuits : bon d'intervention, feuille d'heures.`
- **PRESENTATION-80** : `02-contenus-a-citer.md` §3 (80 mots, à coller tel quel).
- **ZONE** : « Basés à Friesen, près de Mulhouse, nous nous déplaçons dans le Haut-Rhin, en Alsace et dans le Grand Est, et travaillons à distance partout en France. »
- **MODELES** : « Modèles gratuits pour TPE : bon d'intervention, feuille d'heures, relances de facture et de devis, fichier de suivi client. Libres d'utilisation et de modification, sans inscription. » → `https://slagence.fr/modeles-gratuits`
- **DESC-300 / DESC-750** : `kit-annuaires.md` §2.

## 2. Tableau A : cibles dont la gratuité ou la procédure a été lue (18 ; l'ancienne ligne 11, n8n, est passée en « Écartées »)

Classées par rapport valeur / effort (1 = à faire en premier). Valeur = probabilité d'un lien utile × proximité avec la cible TPE (jugement SL Agence, pas une mesure). « Gratuit » : oui = écrit sur la page lue ; oui (secondaire) = lu dans un résumé de recherche, pas sur la page officielle ; non précisé = la page ne dit rien. « Champ site » : où le lien se pose.

| # | Cible (famille) | Page lue / URL d'entrée (13/11) | Ce que Loïc fait | Gratuit | Champ site / lien confirmé | Temps | Valeur |
|---|---|---|---|---|---|---|---|
| 1 | **GitHub, dépôt du site** (tech) | `https://github.com/agencesl68/sl-agence` ; API REST lue aujourd'hui : dépôt public, `homepage` = vide, `description` = vide, `topics` = vide | Roue dentée « About » du dépôt : renseigner Website, description, mots-clés du dépôt (topics). Le dépôt existe déjà : 0 compte à créer | oui (dépôt public existant) | Champ « Website » du dépôt : existe (valeur vide constatée) ; lien affiché : non vérifié | 2 min | moyenne (page déjà indexable probablement : non vérifié) |
| 2 | **GitHub, profil du compte / organisation + page d'accueil README** (tech) | docs.github.com « About organizations » : « You can use organizations for free » ; page « profil d'organisation » : README public dans le dépôt public `.github`, dossier `profile` | Renseigner le profil du compte (bio, site) ; option : organisation + README (texte §3-A). Aucun secret, aucun client, rien de la production de Sacha | oui (organisation gratuite ; dépôts publics illimités) | Site du profil : champ connu, non lu dans la doc ; README : lien oui (texte) | 20-30 min | moyenne |
| 3 | **Gravatar** (profil) | `https://gravatar.com/` : « completely free for individual users » | Créer le profil, ajouter le site et les liens (BIO-135) | oui | oui (« website and other relevant links ») ; indexable : non précisé | 10 min | faible à moyenne (profil lié à l'e-mail agence ; affiché sur les sites qui utilisent Gravatar) |
| 4 | **Medium** : republier 1 guide (blog) | Aide Medium « Import a story » et « Set a canonical link » : lues via recherche (les pages d'aide renvoient 403) | « Import a story » : coller l'URL du guide ; l'outil met le lien canonique vers slagence.fr tout seul ; profil avec BIO-135 | oui (secondaire) | lien canonique + lien dans le texte : oui ; attribut : non vérifié | 20 min | moyenne : visites et mention ; la page Medium ne doit pas dépasser la nôtre grâce au canonique |
| 5 | **Hashnode** : republier 1 guide (blog) | `https://hashnode.com/pricing` : plan Free « $0 forever », blog `hashnode.dev`, articles illimités. Canonique : « Are you republishing? > Add Original URL » (aide officielle, via recherche) | Créer le blog gratuit, republier avec l'URL d'origine | oui | lien dans le texte oui ; attribut non vérifié | 20 min | faible à moyenne (public développeurs, pas dirigeants de TPE) |
| 6 | **dev.to** : republier 1 guide (blog) | `https://dev.to/p/editor_guide` : variable `canonical_url` « link for the canonical version of the content » | Idem Hashnode ; choisir **un seul** des deux (5 ou 6) pour ne pas multiplier des copies | non précisé sur la page lue | lien dans le texte oui ; attribut non vérifié ; profil : champ site non lu | 20 min | faible (même réserve) |
| 7 | **Calaméo** : publier le PDF des modèles (documents) | `support.calameo.com/hc/articles/205481658` (titre « How many documents can I publish? ») : compte BASIC, publications en nombre non limité jusqu'à la limite de stockage, 100 Mo et 500 pages par document (via recherche, page 403 en lecture directe) ; article du blog Calaméo sur la détection automatique des liens | Créer un PDF **nouveau** de 2 à 4 pages (couverture + 6 relances de facture en extrait + dernière page avec le lien). Ne pas modifier les fichiers du site | oui (compte BASIC) | liens cliquables dans le PDF : oui d'après le blog Calaméo ; attribut non vérifié ; mode public = indexable (le mode privé exclut l'indexation) | 40 min | moyenne |
| 8 | **Speaker Deck** : le même PDF que Calaméo (documents) | `https://speakerdeck.com/` : offre gratuite « 100 uploads, 150 MB par upload » | Même PDF que Calaméo, sans le refaire (Speaker Deck accepte les PDF) | oui (offre gratuite lue) | lien auteur : non précisé ; indexable : non précisé | 15 min | faible à moyenne |
| 9 | **Notion, galerie de modèles** (modèles) | `notion.com/en-gb/help/how-to-submit-a-template` : français accepté ; page Notion publique (« Share to web », « Allow duplicate as template ») ; formulaire demande si le modèle est gratuit ou payant ; examen dans l'ordre d'arrivée | Créer un modèle Notion « Suivi des devis et relances » (texte §3-E), le publier, le soumettre | non précisé (la page ne parle d'aucun frais) | profil créateur avec lien site : **non vérifié** (affirmé par une source secondaire seulement) | 2-3 h (création) + 10 min | moyenne à élevée si accepté (audience qui cherche des modèles) ; acceptation incertaine |
| 10 | **Airtable Universe** (modèles) | `support.airtable.com/articles/7447788665-airtable-universe` : publier une base depuis Airtable, « Plan availability : All plan types », propriétaire ou créateur de la base | Publier une base « Suivi clients et relances » (même fond que le fichier Excel du site, sans reprendre le fichier) | oui d'après la page (tous les plans) | champ site dans le profil : la page ne le mentionne pas ; examen : non précisé | 1-2 h | faible (audience anglophone majoritaire : hypothèse) |
| 12 | **Maddyness, tribune** (média ; **plus tard, après le 16/11**, 2 h 30 : le thème agent IA touche `/agent-ia-pme` en mesure) | `https://www.maddyness.com/faq/` : « professionnels de l'écosystème » : suivre les consignes (lien sur la page) puis envoyer le texte à l'adresse de la rédaction publiée sur cette FAQ | Rédiger 1 tribune (texte §3-F) et l'envoyer ; aucune garantie de parution | non précisé (la FAQ ne parle d'aucune rémunération ni frais) | signature d'auteur : non vérifié | 2 h 30 | élevée si publiée (lien d'un média connu) mais public start-up, parution incertaine |
| 13 | **Bien en Alsace** (marque employeur territoriale, Alsace) | `alsace.com/en/set-up-your-business-or-invest-in-alsace/regional-employer-branding/` : « Participation is free », signature d'une charte, lien « Contact us » ; un article du Journal des Entreprises parle d'un répertoire de signataires (non confirmé sur la page) | Écrire via « Contact us » (texte §3-G) pour savoir si une entreprise sans salarié peut signer et si un répertoire public existe | oui (écrit sur la page) | répertoire avec lien : **non vérifié** ; éligibilité d'une entreprise sans salarié : inconnue | 15 min | moyenne (page régionale ; Adira, déjà source des chiffres du site) |
| 14 | **Eventbrite : 1 atelier gratuit** (événement) | Aide Eventbrite en français, via recherche : événements gratuits publiables sans frais ; des blogs tiers contredisent (limites). Page de tarifs ouverte : 404 | **Seulement si Loïc anime vraiment un atelier** (ex. « Facture électronique : ce que doit faire une TPE », en visio). Texte §3-H | oui (secondaire, contesté) | page de l'événement avec lien vers l'organisateur : non vérifié | 45 min + l'atelier | moyenne ; **engagement nouveau (atelier gratuit) : accord de Loïc** |
| 15 | **Qwoted** (experts et journalistes) | `https://www.qwoted.com/pricing` : plan Basic gratuit : 2 pitches par mois, « appear in reporter's expert database », e-mail quotidien d'opportunités | Créer un profil d'expert (BIO-160) et répondre à une demande seulement si elle colle au métier (administratif, automatisation, facture électronique) | oui | lien dans une citation : **non vérifié** ; plateforme surtout américaine, français : non précisé | 20 min | faible (hypothèse : peu de demandes en français) |
| 16 | **Featured.com** (experts et journalistes) | `https://www.featured.com/pricing` : plan Free « $0, Free forever », accès aux demandes (HARO, LinkedIn) ; IA limitée par jour | Idem Qwoted ; **ne pas s'inscrire aux deux la même semaine** : choisir celui qui montre des demandes en français | oui | liens dans les citations : non précisé sur la page | 20 min | faible |
| 17 | **about.me** (profil) | `https://about.me/` : offre « Free $0/yr » (page + signature) ; domaine personnalisé seulement en Pro | Page gratuite avec BIO-135 | oui | liens vers un site sur l'offre gratuite : **non précisé** (la page l'attache à d'autres offres) | 10 min | faible |
| 18 | **Pinterest** (visuels des modèles) | `help.pinterest.com/en/business/article/claim-your-website` (processus de revendication du site lu) ; compte pro gratuit : sources secondaires | Compte pro ; épingles : visuels des 6 modèles, lien vers `/modeles-gratuits` ; revendiquer `slagence.fr` (balise HTML à poser sur le site : **demande à Sacha**, rien ne s'ajoute sans PR) | oui (secondaire) | lien de l'épingle vers la page : oui par construction ; attribut : non vérifié | 1 h (visuels) | faible à moyenne (visites) ; public B2B : hypothèse |
| 19 | **Les entreprises s'engagent** (réseau public) | `https://lesentreprises-sengagent.gouv.fr` : « Rejoignez gratuitement la Communauté », « Trouver mon club » (par département) | S'inscrire seulement si Loïc veut ensuite rejoindre le club du Haut-Rhin | oui | page publique d'entreprise avec lien : **aucune trouvée sur la page** | 15 min | faible pour le lien ; utile pour le réseau local |

## 3. Textes prêts à coller par cible

### A. GitHub (cibles 1 et 2)
- Cible 1, **Description** : `Site slagence.fr : agence d'automatisation et de logiciels sur mesure pour TPE et artisans, basée à Friesen (Haut-Rhin).` ; **Website** : `https://slagence.fr` ; **Mots-clés du dépôt (topics)** : `automatisation`, `logiciel-sur-mesure`, `tpe`, `haut-rhin`, `alsace`.
- Cible 2, **README du profil** : si `agencesl68` est un compte personnel : dépôt public `agencesl68/agencesl68` avec `README.md` ; si c'est une organisation : `.github/profile/README.md`. **Avertissement : le dépôt du site est public et contient tout le dossier `.claude` (stratégie, méthodes) ; ajouter des mots-clés le rend plus facile à trouver. Décision de Loïc avant les cibles 1 et 2.**


> # SL Agence
> Agence d'automatisation, d'intelligence artificielle et de logiciels sur mesure pour TPE, PME et artisans, basée à Friesen (Haut-Rhin).
>
> **Modèles gratuits** : bon d'intervention, feuille d'heures, relances de facture et de devis, fichier de suivi client. Libres d'utilisation et de modification, sans inscription : https://slagence.fr/modeles-gratuits
>
> Basés à Friesen, près de Mulhouse, nous nous déplaçons dans le Haut-Rhin, en Alsace et dans le Grand Est, et travaillons à distance partout en France.

Ne pas copier les fichiers du site dans un dépôt : le README renvoie au site (pas de contenu en double).

### B. Medium / Hashnode / dev.to (cibles 4 à 6)
Guide par défaut : **`/blog/facture-electronique-artisan-ce-qui-change`** (« Facture électronique : ce qui change pour les artisans et TPE. » ; aucune ligne de mesure au 13/11). Les guides sur la feuille d'heures et les relances sont en test jusqu'au verdict vers le 24/11 : ne pas les republier avant. Une seule plateforme à la fois (Medium, puis Hashnode une autre semaine ; Hashnode seul si Medium est bloqué).
- Introduction à coller sous le titre : « Cet article a d'abord été publié sur slagence.fr : https://slagence.fr/blog/facture-electronique-artisan-ce-qui-change »
- Fin d'article (une seule fois) : « Des modèles gratuits (bon d'intervention, feuille d'heures, relances), libres d'utilisation et de modification, sans inscription : https://slagence.fr/modeles-gratuits »
- Biographie : BIO-135.
- Vérifier avant de publier : le texte du guide vient de `blog/facture-electronique-artisan-ce-qui-change.html`; contrôler les dates réglementaires avant copie (c018) ; ne rien y ajouter.

### C. Calaméo et Speaker Deck (cibles 7 et 8)
Titre : « Relancer une facture : le calendrier et 6 modèles ». Dernière page / dernière diapositive : « Les modèles complets en Word, gratuits : https://slagence.fr/modeles-gratuits » + MODELES. Les 6 relances viennent de `02-contenus-a-citer.md` §1 n°3 : rappel avant échéance, relance courtoise, relance ferme, SMS, dernier rappel, lettre de mise en demeure. Un extrait de 2 modèles suffit : le reste est sur le site. Le PDF ne recopie pas le texte de l'article sur les relances (en test jusqu'au verdict vers le 24/11) : il renvoie seulement vers /modeles-gratuits. Publier après le 24/11.

### D. Gravatar, about.me, Qwoted, Featured (cibles 3, 15 à 17)
Bio : BIO-135 (ou BIO-160 si la limite le permet). Sujets d'expert à cocher : administratif de TPE, automatisation, facture électronique, remplacer Excel. Ne jamais citer un client ni un chiffre qui ne soit pas dans `agence.md`.

### E. Notion (cible 9)
- Nom : « Suivi des devis et des relances »
- Description : « Un tableau pour suivre vos devis envoyés : statut, date de relance, messages prêts à copier pour chaque situation. Libre d'utilisation et de modification, sans inscription. »
- Contenu : une base de 4 colonnes (client, montant, date d'envoi, prochaine relance) + les 8 messages de `/blog/relancer-un-devis-sans-reponse` (guide en test jusqu'au verdict vers le 24/11 : ne pas le lier avant ; lien vers /modeles-gratuits seulement).
- Lien en bas du modèle : « Guide et autres modèles : https://slagence.fr/modeles-gratuits ».

### F. Maddyness (cible 12)
Piste : **« Un agent IA dans une PME, concrètement : 3 usages simples »** (saisie de factures par photo, compte rendu depuis un vocal, tri du courrier : les 3 exemples de `agence.md`, présentés comme usages possibles, pas comme résultats).
Message à la rédaction (≈ 70 mots) : « Bonjour, nous dirigeons SL Agence (automatisation et logiciels sur mesure pour TPE, Haut-Rhin). Nous proposons une tribune de 700 mots : trois usages simples d'un assistant d'intelligence artificielle dans une PME, ce qu'il fait, ce qu'il ne fait pas. [à n'écrire qu'une fois le texte rédigé et les consignes lues]. Biographie : [BIO-160]. Un seul lien en signature : https://slagence.fr/modeles-gratuits. Cordialement. »
Après le 16/11 seulement. Avant l'envoi : lire les consignes liées sur `maddyness.com/faq/` (non lues ici). Ne pas lier `/agent-ia-pme` (en mesure jusqu'au 16/11).

### G. Bien en Alsace (cible 13), message pour « Contact us »
« Bonjour, SL Agence est une agence d'automatisation et de logiciels sur mesure basée à Friesen (Haut-Rhin), créée en mai 2026 par deux associés. Une entreprise de notre taille peut-elle signer la charte Bien en Alsace ? Existe-t-il un répertoire public des signataires, avec un lien vers le site de chaque entreprise ? Merci d'avance. » (Rien d'autre : pas de promesse de recrutement.)

### H. Eventbrite (cible 14), si l'atelier a lieu
- Titre : « Facture électronique : ce que doit faire une TPE (atelier gratuit en visio) »
- Description : « Atelier de 45 minutes pour les dirigeants de TPE et les artisans : ce qui est obligatoire et à quelle date (réception depuis le 1er septembre 2026, émission à partir de septembre 2027 pour les TPE et PME), quoi préparer maintenant, questions en direct. Organisé par SL Agence, Friesen (Haut-Rhin). Inscription gratuite. » **Durée, date, gratuité : décisions de Loïc.** Contrôler les dates réglementaires sur la page officielle avant publication (c018).

## 4. Tableau B : pistes non vérifiées (page illisible ou conditions inconnues)

Ne rien faire sans que Loïc ait lu la page d'inscription lui-même (2 minutes) et noté ce qu'il voit.

| # | Cible | Pourquoi non vérifié | Ce qu'il faut regarder | Temps | Texte |
|---|---|---|---|---|---|
| 20 | **YouTube** : chaîne + vidéo de 45 s (déjà sur l'accueil) | L'aide consultée ne parle pas des liens de la chaîne | Onglet « À propos » : champ liens ; description de la vidéo avec le lien | 20 min | Description : MODELES + ZONE |
| 21 | **Issuu** | Pages officielles 404 ; des sources secondaires donnent des limites contradictoires (5 publications, 50 pages, logo Issuu) | Offre gratuite actuelle, logo imposé, liens cliquables | 30 min | comme C. |
| 22 | **SlideShare / Scribd** | Pages : erreur de chargement | Dépôt gratuit sans abonnement, liens dans le document | 30 min | comme C. |
| 23 | **Crunchbase** (profil d'organisation) | Seule la page des offres s'ouvre (« essai gratuit » ≠ gratuit) | Création d'une organisation sans carte bancaire, champ site | 15 min | BIO-160 + DESC-300 |
| 24 | **Trustpilot** (profil d'entreprise) | Page d'aide chargée à moitié : « revendication gratuite, lien du site » (non confirmé) | Revendication gratuite ; **avis réels uniquement, demandés à tous les clients, sans contrepartie** (règle des avis de `seo.md`) | 15 min | DESC-300 |
| 25 | **Marque Alsace, partenaires** (`marque.alsace`) | Page d'`alsace.com` : « ouverte aux organisations de toutes tailles » ; frais et visibilité non écrits ; `marque.alsace` non lu | Coût, annuaire des partenaires, lien site | 15 min | DESC-300 + ZONE |
| 26 | **Université de Haute-Alsace : offre de stage ou d'alternance** | `uha.fr` : erreur 503 ; WebSearch ne trouve aucune page de dépôt d'offres UHA | **Seulement si SL Agence recrute un stagiaire** ; sinon rien. Demander au service d'insertion professionnelle | 20 min | offre : à rédiger par Loïc (poste réel) |
| 27 | **La Fabrike** (podcast d'Alsace, Ausha) | Page lue le 13/11 : aucun mail, aucun formulaire ; seul contact : Instagram `lafabrike_` ; aucun lien externe dans les notes d'épisode lues | Message privé Instagram de Loïc : proposer un épisode sur l'administratif des TPE | 10 min | message court : présentation PRESENTATION-80, 3 lignes |
| 28 | **petite-entreprise.net** (portail de fiches pratiques pour TPE, éditeur Valpolis à Logelheim, Haut-Rhin) | Page « Qui sommes-nous » lue : site s'appuie sur un réseau de conseillers recrutés ; aucune page « article invité » trouvée ; « Devenir conseiller » = recrutement sélectif d'un réseau (frais : non écrits) | Proposition de **contenu invité** via leur page « Contactez-nous » (`petite-entreprise.net/contact`) : 1 fiche pratique sur les relances (liée aux modèles). Ne **pas** postuler au réseau de conseillers sans lire les conditions | 30 min | message : PRESENTATION-80 + 1 phrase de proposition |
| 29 | **Reddit** (profil + participations) et **Quora** | Reddit : outil non autorisé ; Quora : 403 | Lire les règles de chaque forum avant d'écrire ; **un lien dans le profil seulement, jamais dans les réponses** | 20 min | BIO-135 |
| 30 | **Indie Hackers** | 403 | Profil gratuit, champ site ; probable audience de créateurs de produits (hors cible) | 10 min | BIO-135 |

## 5. Écartées et pourquoi

| Piste | Raison (vérifiée ou non) |
|---|---|
| **Product Hunt** | Aide lue : « Company accounts can't post products » (compte personnel seulement). Un échange du forum dit que les agences ne sont pas mises en avant (source : forum, pas la règle). Lancer l'agence est hors sujet ; lancer les modèles gratuits : possible mais peu de chances (produits numériques utilisables seulement) |
| **n8n, modèles de la communauté** | Usage de n8n par l'agence non confirmé ; travail technique de Sacha |
| **Hugging Face** | Plateforme de modèles d'apprentissage automatique : aucun contenu de SL Agence à y mettre |
| **PressValue** | Résumé de recherche (fiche La Fabrique du Net du 28/05/2026) : gratuit pour les journalistes, entreprises à partir de 49 € HT/mois : payant pour nous |
| **MentionMatch** (ex Help a B2B Writer) | La FAQ « Is MentionMatch free ? » est vide sur la page lue ; thèmes marketing / SaaS ; anglais. Non vérifié, hors cible |
| **La Bonne Alternance** | Page lue : « gratuit » n'apparaît pas, aucune page publique d'entreprise avec lien |
| **Alsace Digitale** | Adhésion payante (HelloAsso, résumé de recherche : paliers dès 5 € ; personne morale 100 € : chiffre ambigu). Site non joignable depuis la session |
| **Rhénatic** | Cluster d'entreprises du numérique ; conditions et coût non trouvés (déjà « non vérifié » dans `seo.md`) |
| **Réseau Entreprendre Alsace** | Les lauréats deviennent membres et paient une cotisation (résumé de recherche, article du Journal des Entreprises) |
| **REISA** | Réseau informel d'une dizaine d'entreprises, sans adhésion ; successeur cité : IndustriA (Adira), pour industriels |
| **Alsace Excellence** | Label avec candidature et audit externe ; coût non trouvé ; entreprise créée en mai 2026 : peu de chances et pas gratuit démontré |
| **Rivalis** (conseillers de petite-entreprise.net) | Recrutement sélectif d'un réseau de conseillers (800), pas un lien ; frais non écrits |
| **Annonces d'emploi (Welcome to the Jungle, Indeed, Jobijoba)** | Page des tarifs de WTTJ : erreur 404 ; sans poste réel à pourvoir, ce serait une fausse annonce |
| **Make (forum, partenaires)** | Interdit par la consigne (production de Sacha) ; non ouvert |
| **Canva public, Zenodo, Behance** | Canva : aucune page lue sur les liens ; Zenodo : dépôt scientifique ; Behance : portfolio de créatifs, hors métier |
| **Commentaires de blog, forums de liens, échanges, achats** | Interdits (`seo.md`, mission) |
| **Mairie de Friesen / com com** | Déjà au suivi (#12). Constat du jour : le résumé de recherche situe Friesen dans la **Communauté de communes de la Largue** (siège indiqué à Seppois-le-Bas), pas dans le « Sundgau » : **à confirmer** ; `friesen.fr` n'a pas pu être lu ; aucune liste d'entreprises trouvée |

## 6. Top 10 « à faire cette semaine » (ordre de valeur / effort)

| Ordre | Action | Cible | Temps |
|---|---|---|---|
| 1 | Renseigner Website + description + mots-clés du dépôt (topics) du dépôt GitHub du site | 1 | 2 min |
| 2 | Gravatar (profil + site) | 3 | 10 min |
| 3 | Profil GitHub (bio, site) + README d'organisation avec les modèles | 2 | 30 min |
| 4 | Republier le guide « facture électronique : ce qui change pour les artisans et TPE » sur Medium (import, canonique automatique) | 4 | 20 min |
| 5 | Message « Contact us » à Bien en Alsace (3 lignes) | 13 | 15 min |
| 6 | PDF de 2 à 4 pages des relances de facture : préparé cette semaine, publié sur Calaméo après le 24/11 | 7 | 40 min |
| 7 | Même PDF que Calaméo sur Speaker Deck, sans le refaire (après le 24/11 pour le contenu relances) | 8 | 15 min |
| 8 | Hashnode : même article que Medium, avec lien d'origine (pas le même jour que Medium) | 5 | 20 min |
| 9 | Message privé Instagram à La Fabrike (non vérifié, tableau B) | 27 | 10 min |
| 10 | Contenu invité proposé à petite-entreprise.net (Haut-Rhin, non vérifié) | 28 | 30 min |
| | **Total** | | **≈ 3 h 12 (192 min)** |

Remarques : les actions 1 à 7 sont de la saisie (aucun achat). Les actions 6-7 supposent que Loïc fasse 1 PDF avec un outil gratuit (Canva ou Google Slides : à lui de choisir). Maddyness (2 h 30) : plus tard, après le 16/11. Capacité de Loïc non connue : le Manager réduit à 6 actions si besoin (c027). Chaque URL obtenue est notée dans `00-suivi-liens.md` avec la date et l'attribut du lien (à lire dans le code source). Mesure : `04-protocole-mesure.md`.

## 7. Auto-évaluation

Grille appliquée : celle du manuel (`seo.md` §9), adaptée à un dossier de liens (pas une page). 
- Exactitude (5) : 4,5/5. Chaque fait est daté et sourcé ; les contenus lus par résumé sont marqués « secondaire » ; aucun type de lien affirmé.
- Complétude de la vérification (5) : 3/5. 18 cibles lues, 11 non vérifiées à cause du réseau de la session ; types de lien non lus.
- Utilité immédiate : textes prêts, ordre de priorité, temps, contrainte des pages en mesure (c040, c046).
- Règles : aucun nom de client, e-mail, téléphone, prix ou lien Drive ; aucun fichier du site modifié.
**Note : 7,5/10, sous le seuil de 8** par manque de vérification technique (types de lien) et parce que 11 cibles restent « non vérifié ». Pour atteindre 8 : autoriser les domaines bloqués (Medium, Hashnode, Reddit, Quora, uha.fr, alsace-digitale.fr, friesen.fr) et relire les 6 premières pages publiées pour noter l'attribut des liens. Le contrôle qualité tranche.
