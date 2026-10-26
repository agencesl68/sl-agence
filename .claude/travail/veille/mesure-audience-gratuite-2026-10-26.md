# Mesure d'audience gratuite, sans cookie, sans bandeau — slagence.fr

> Veille du 2026-10-26. Toutes les pages ci-dessous ont été consultées ce jour. « Constaté » = lu sur la page citée. « Hypothèse » = déduction, étiquetée. « Non vérifié » = pas trouvé sur une source officielle.
> Rien n'a été modifié sur le site. Aucune donnée personnelle dans ce fichier.

## En bref

- **Recommandation : GoatCounter (version hébergée goatcounter.com).** Gratuit pour un site de PME, sans cookie ni stockage dans le navigateur, données chez Hetzner en Finlande/Allemagne (UE), clics sur « Appeler » comptables avec un simple attribut HTML.
- **Cloudflare Web Analytics est écarté** : pas d'événements personnalisés (« Not yet »), donc impossible de compter les clics sur le lien tel:.
- **Aucune solution n'est « validée CNIL »** : la CNIL a remplacé sa liste par un outil d'auto-évaluation destiné aux éditeurs. La conformité dépend de la configuration et de l'information des visiteurs (voir §2). Reste un point à régler : **GoatCounter n'affiche pas d'accord de sous-traitance (DPA) public** → à demander par e-mail (étape 6).

## 1. Ce que dit la CNIL (sources officielles)

| Point | Constaté | Source (consultée le 2026-10-26) |
|---|---|---|
| Conditions de l'exemption | Finalité « strictement limitée à la seule mesure de l'audience du site », pour le compte exclusif de l'éditeur ; données statistiques « anonymes uniquement » ; pas de recoupement avec d'autres traitements ; pas de suivi de la personne sur plusieurs sites | https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience (page datée du 04/07/2025) |
| Durées | Traceur : une durée limitée, par exemple 13 mois, sans prolongation automatique. Informations conservées : 25 mois maximum | même page |
| Liste de solutions évaluées | **N'existe plus.** La CNIL « a remplacé son programme d'évaluation des solutions de mesure d'audience » par un outil d'auto-évaluation que remplissent les éditeurs (FAQ, question 12) | https://www.cnil.fr/fr/cookies-et-autres-traceurs/regles/cookies/FAQ |
| Outil d'auto-évaluation (juillet 2025) | Fonctions autorisées : mesure de performance, analyse des contenus consultés, etc. Mesure « à visée marketing » (conversion, acquisition, campagnes) à désactiver. Au plus 3 types d'événements : présence sur une page ; **clic bouton / clic lien avec destination ou label** ; temps de chargement, défilement, temps passé. Référent limité au domaine, pas d'UTM, pas de rejeu de session, DPA standard avec le fournisseur, aucune réutilisation des données par le fournisseur, **opposition possible par un bouton ou lien dans la politique de confidentialité** | https://cnil.fr/sites/default/files/2025-07/outil_d_auto-evaluation_mesure_d_audience.pdf (lu en entier, 8 pages) |
| Opposition | Même exempté, le RGPD s'applique (souvent des données personnelles) ; si intérêt légitime, un mécanisme d'opposition aisément accessible est exigé | FAQ CNIL, question 10 (même URL que ci-dessus) |
| Information | Les utilisateurs doivent être informés, par exemple dans la politique de confidentialité | https://www.cnil.fr/fr/mesurer-la-frequentation-de-vos-sites-web-et-de-vos-applications |
| Outils qui NE bénéficient PAS de l'exemption | Google Analytics, Quantcast Analytics, Facebook Analytics cités (réutilisation des données par le fournisseur) | même page « Mesurer la fréquentation… » |

**Limite à connaître (constaté + hypothèse).** L'outil CNIL dit qu'il « n'a pas vocation à évaluer la conformité de la solution dans son ensemble ». Aucune page CNIL consultée ne traite explicitement des outils « sans cookie ». Hypothèse : un outil qui ne dépose ni ne relit rien sur l'appareil du visiteur pose moins de difficulté au titre de l'article 82, mais ce n'est pas écrit par la CNIL ; le RGPD (information, opposition) s'applique de toute façon. Rester dans les critères de l'outil CNIL est donc la ligne la plus sûre.

## 2. Tableau comparatif

| | **GoatCounter** (recommandé) | Cloudflare Web Analytics | Umami Cloud (Hobby) | Matomo | Plausible |
|---|---|---|---|---|---|
| Prix réel | **Gratuit** « for reasonable public usage » ; PME explicitement acceptée, pas de plafond chiffré (« millions of pageviews/day » exclus) | **Gratuit** (« Get started for free ») | **0 $/mois** : 100 000 événements/mois, 1 site, 6 mois d'historique | Cloud : à partir de 29/mois HT (50 000 « hits »), essai sans CB (durée non indiquée). Version gratuite = auto-hébergée, impossible sur GitHub Pages | À partir de 9 $/mois (10 000 pages vues) après 30 jours d'essai |
| Cookie / stockage navigateur | Aucun (« doesn't store any information in the browser with cookies, localStorage, cache ») | Aucun cookie ni localStorage | « ne utilise pas de cookies » | Configurable (conforme CNIL selon son guide, sous réserve de réglages) | Non vérifié |
| Compter les clics « Appeler » (tel:) | **Oui**, `data-goatcounter-click="appel"` sur le lien | **Non** : « Custom events : Not yet » | Oui, `data-umami-event="appel"` | Oui | Non vérifié |
| Formulaire / rendez-vous | Oui : clic sur le lien Agenda par attribut ; envoi du formulaire par `goatcounter.count({event:true})` | Non | Oui | Oui | Non vérifié |
| Ce qu'on voit | Pages, référents (sites d'origine), navigateurs, pays/ville, taille d'écran, campagnes UTM. **Pas de requêtes Google** (non vérifié ; Google ne les transmet généralement pas : hypothèse) | Pages, hostnames, pays, référents, statuts HTTP, vitesse. Données non agrégées 7 jours, puis ~10 % échantillonnées | Pages, référents, navigateur/OS, appareil, localisation approximative | Très complet | Non vérifié |
| Où sont les données | **Hetzner Online GmbH, Finlande et Allemagne** ; exploitant en Irlande ; « No information is shared with third parties » | Cloudflare, Inc. (États-Unis). Lieu de stockage Web Analytics : non vérifié. DPA Cloudflare v6.4 (03/04/2026) avec DPF et clauses types, mais **applicabilité à Web Analytics non vérifiée** | « Hébergé aux États-Unis et en Allemagne » ; 14 sous-traitants dont AWS, Cloudflare, OpenAI, Anthropic, Vercel (liste du 24/04/2026) ; DPA proposé | Cloud : non vérifié | Non vérifié |
| DPA fournisseur (critère CNIL) | **Non trouvé** (politique de confidentialité ne mentionne pas de DPA) → à demander | Non vérifié pour Web Analytics | Oui (mentionné dans la politique) | Non vérifié | Non vérifié |
| Bandeau nécessaire ? | « probably doesn't require a GDPR consent notice » (éditeur, non juriste) ; pas de liste CNIL | Doc Cloudflare ne dit rien sur le consentement | « La conformité RGPD dépend de la configuration » (éditeur) | Guide « Configurer Matomo pour la CNIL » (avril 2026) | Non vérifié |
| Mise en place | 1 ligne `<script>` | 1 ligne JS + compte Cloudflare | 1 ligne `<script>` + compte | Lourde ou payant | Payant |
| Point faible | Service tenu par une seule personne (« currently offered for free ») ; UTM et référent complet collectés automatiquement ; pas de DPA public | Pas d'événements ; limite de 10 sites non proxifiés | Données potentiellement aux États-Unis ; 1 seul site ; 100 000 événements/mois | Payant (29/mois) | Payant |

Sources du tableau (toutes consultées le 2026-10-26) :
- GoatCounter : https://www.goatcounter.com/ · /terms · /privacy · /help/events · /help/sessions · /help/js · /help/campaigns · /help/faq · /code/skip-dev · /gdpr · https://github.com/arp242/goatcounter
- Cloudflare : https://www.cloudflare.com/web-analytics/ · https://developers.cloudflare.com/web-analytics/faq/ · /get-started/ · /limits/ · /data-metrics/data-origin-and-collection/ · https://www.cloudflare.com/cloudflare-customer-dpa/
- Umami : https://umami.is/pricing · /terms · /privacy · /subprocessors · https://docs.umami.is/docs/faq · /docs/track-events
- Matomo : https://matomo.org/pricing/ (devise non précisée sur la page) · https://matomo.org/wp-content/uploads/2026/04/Configurer-Matomo-pour-la-CNIL-FR.pdf (contenu détaillé illisible, non vérifié)
- Plausible : https://plausible.io/#pricing (« 9 $ » : indiqué sans précision mensuel/annuel)

Écartés sans vérification approfondie : Google Analytics (cité par la CNIL comme non exempté), outils avec cookies (Statcounter, etc. : non vérifié, mais hors du cahier des charges « sans cookie »).

## 3. Recommandation : GoatCounter

**Pourquoi** (constaté) : seul candidat vérifié qui cumule gratuit pour une PME, aucun stockage dans le navigateur, hébergement dans l'UE (donc pas de transfert hors UE à documenter, contrairement à Umami et Cloudflare), et clics comptables par attribut HTML. Le tout en une ligne de code.

**Ce qu'il faut accepter** :
1. Gratuité « actuelle » et sans engagement écrit : si le service ferme, on remplace la balise (export des données possible, cf. README GitHub).
2. Pas de DPA public trouvé : on le demande par e-mail à support@goatcounter.com (adresse indiquée sur la page https://www.goatcounter.com/help/campaigns) et on garde la réponse.
3. GoatCounter n'est pas « validé CNIL » (aucune solution ne l'est depuis le remplacement du programme). L'éditeur dit « probably », il n'est pas juriste.

**Plan B** : Umami Cloud Hobby (DPA existant, événements), au prix d'un hébergement États-Unis/Allemagne et de 14 sous-traitants à citer dans la politique de confidentialité.

## 4. Création du compte (5 minutes, pour Loïc)

Les champs exacts du formulaire n'ont pas été vérifiés (page d'inscription non ouverte) ; ils peuvent différer légèrement.
1. Aller sur https://www.goatcounter.com et choisir l'inscription (« Sign up »).
2. Choisir un code de site (par exemple `slagence` : le tableau de bord sera à `slagence.goatcounter.com`), une adresse e-mail et un mot de passe.
3. Renseigner le domaine `slagence.fr`.
4. Dans les réglages, onglet « Tracking » : ajouter l'adresse IP de Loïc dans la liste d'IP ignorées (fonction vérifiée sur https://www.goatcounter.com/code/skip-dev). Ouvrir une fois `https://slagence.fr/#toggle-goatcounter` sur chaque navigateur de Loïc et de Sacha pour ne pas fausser les chiffres.
5. Noter le code du site et le transmettre au Manager (pas d'identifiants dans le dépôt).
6. Écrire à support@goatcounter.com : « Je suis éditeur de slagence.fr (France, RGPD). Fournissez-vous un accord de sous-traitance (DPA) ? Les données sont-elles bien hébergées chez Hetzner (Finlande/Allemagne) ? Peut-on désactiver la collecte des paramètres UTM ? » et conserver la réponse.

## 5. Ce qu'il faudra ajouter au site (rien n'est modifié)

### a) Balise (dans toutes les pages, avant `</body>`) — source officielle https://www.goatcounter.com/help/start

```html
<script data-goatcounter="https://CODE.goatcounter.com/count"
        async src="//gc.zgo.at/count.js"></script>
```

### b) Clics « Appeler » et prise de rendez-vous — source https://www.goatcounter.com/help/events

```html
<a href="tel:+33XXXXXXXXX" data-goatcounter-click="clic-appeler">Appeler</a>
<a href="LIEN-AGENDA" data-goatcounter-click="clic-rdv">Prendre rendez-vous</a>
```
Formulaire : un appel `window.goatcounter.count({path:'envoi-formulaire', event:true})` à l'envoi réussi. Hypothèse : l'attribut ne compte que les clics, pas les envois réussis ; seul l'appel JS compte l'envoi. Le numéro réel n'est pas écrit ici.
Pour rester dans le cadre CNIL : compter l'usage de la fonction (clic sur un lien), ne pas attribuer les appels à un canal d'acquisition, ne pas mettre d'UTM dans nos liens (GoatCounter les lit automatiquement : https://www.goatcounter.com/help/campaigns).

### c) Politique de confidentialité (politique-de-confidentialite.html) — vérifié en lisant le fichier

Il faut modifier trois endroits :
- Ligne 876 : « aucun outil de mesure d'audience » devient faux → à remplacer.
- Ligne 877 : « aucun appel à Google Fonts ni à YouTube » reste vrai, mais la balise appelle désormais gc.zgo.at et goatcounter.com : le préciser.
- Ligne 881 : la phrase « Si nous ajoutons un jour… » est à remplacer ; ajouter GoatCounter dans la liste des destinataires (section 04, ligne 844 environ). Pas de transfert hors UE à ajouter à la section 05, **si** l'hébergement UE est confirmé par la réponse au point 6.

Texte proposé (à faire valider par Loïc ; chaque phrase est tirée de la page GoatCounter citée) :

> **Mesure d'audience.** Le site utilise GoatCounter, un outil de statistiques qui ne dépose aucun cookie et ne stocke aucune information dans votre navigateur. Il compte les pages consultées, les sites d'origine des visiteurs et les clics sur les boutons « Appeler » et « Prendre rendez-vous ». Votre adresse IP et votre navigateur ne sont pas enregistrés ; seul un identifiant aléatoire est conservé. Les données sont hébergées chez Hetzner Online GmbH, en Finlande et en Allemagne. Elles servent uniquement à mesurer la fréquentation du site, pour le compte de SL Agence, sur la base de notre intérêt légitime à connaître l'usage du site. **Vous pouvez vous y opposer** : [ne pas être compté](https://slagence.fr/#toggle-goatcounter).

Réserves : la phrase « ne sont pas enregistrés » reprend https://www.goatcounter.com/help/sessions (IP et User-Agent « never stored to the database or disk ») ; un export GoatCounter liste pourtant un champ User-Agent (source tierce, non vérifié) → à confirmer avec la réponse du support avant publication. Le lien d'opposition utilise la fonction officielle `#toggle-goatcounter` (https://www.goatcounter.com/code/skip-dev) ; la page ne précise pas ce qu'elle stocke dans le navigateur (non vérifié) : à tester avant publication.

## 6. Actions

1. **Loïc** : créer le compte (§4) et envoyer l'e-mail au support. 15 min au total.
2. **seo-site** (après réponse du support) : pull request ajoutant la balise, les attributs de clic et le texte du §5c ; aucune mise en ligne avant validation de Loïc (règle 4).
3. **Manager** : à J+28, lire les chiffres (pages, clics Appeler) et consigner le résultat dans `memoire/apprentissages.md`.
