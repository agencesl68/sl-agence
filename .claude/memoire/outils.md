# Outils, données et permissions

## Principe : le département IA de Loïc est SÉPARÉ du CRM de Sacha

Le CRM SL Agence (Firebase + scénarios Make « CRM - … ») appartient au travail de Sacha.
**Les agents ne le lisent pas, n'y écrivent pas et ne s'appuient pas dessus.** Le suivi commercial
de Loïc vit dans ses propres outils : **Gmail** (conversations et statuts via libellés) et **Google Drive**.

## Où sont les données

| Donnée | Emplacement | Accès |
|---|---|---|
| Fichier de prospection historique (~205 entreprises de Mulhouse, statuts, e-mails déjà préparés) | Google Drive — feuille « Prospection SL agence » (id `1tLAhiIe2DXZNqb8vuc2Ao_nNI-0v2qi_s18lr7Z_REY`), onglets « Prospection chèque cadeau » et « Mail à envoyer » | Lecture (`mcp__Google_Drive__read_file_content`) |
| Dossier de travail Drive | « SL agence » (id `1rAcFi7NBf_cXGzN_qJ0sBAe3Y5wTl4b3`) | Les lots de prospects (`Prospects – lot AAAA-MM-JJ`) et listes de relances y sont créés |
| Conversations avec les prospects | Gmail **agence.sl.68@gmail.com** (boîte partagée de l'agence, Sacha la voit aussi ; ~200 fils envoyés, dont une prospection d'août 2026) | Lecture, brouillons, libellés (jamais d'envoi) |
| Analyse de marché + grille tarifaire (confidentiel) | Drive — « Analyse de marché SLagence.docx » (id `1y9U0WFV4y5UhABLhKoN1ASu0jA0n-jfk`) | Lecture seule, jamais recopiée dans le dépôt |
| Données SEO (positions, mots-clés, Search Console, concurrents) | Ahrefs (plan sans API pour l'instant) ; exports Search Console de Loïc | Lecture |
| Site | Ce dépôt (racine) | Modifications par branche + pull request validée |

## Suivi commercial dans Gmail (système de libellés)

Libellés (créés au premier usage par l'agent `suivi`, sous le parent `SL Prospection`) :

| Libellé | Sens |
|---|---|
| `SL Prospection/Contacté` | Premier message envoyé, pas de réponse |
| `SL Prospection/Relancé` | Au moins une relance envoyée |
| `SL Prospection/A répondu` | Le prospect a répondu → action de Loïc |
| `SL Prospection/RDV` | Appel ou rendez-vous fixé |
| `SL Prospection/Devis` | Devis envoyé |
| `SL Prospection/Gagné` · `SL Prospection/Perdu` · `SL Prospection/Plus tard` | Clôture ou report |

Fonctionnement :
1. `prospection` crée les messages en **brouillons Gmail** (objet + corps), Loïc relit et envoie.
2. `suivi` retrouve les e-mails envoyés (`in:sent`) aux adresses des lots, pose les libellés, détecte
   les réponses et calcule les relances dues ; il prépare les relances en **brouillons dans le même fil**.
3. Les échanges LinkedIn ou téléphone ne sont pas visibles : `suivi` les demande à Loïc.

Clients existants à exclure de la prospection : ceux marqués « déjà client » dans la feuille Drive,
et toute entreprise avec laquelle Gmail montre un échange commercial abouti (devis accepté, facture).

## Notion (à connecter par Loïc — gratuit)

Rôle : le **cockpit personnel de Loïc** (pas un second CRM : les prospects restent dans Sheets + Gmail).
Au premier usage, créer une page « SL Agence — Département IA » avec 3 bases :

| Base | Champs | Alimentée par |
|---|---|---|
| Tâches de Loïc | Tâche, Échéance, Priorité, Agent, Lien, Statut (À faire / Fait) | toutes les commandes (ce que Loïc doit faire) |
| Contenus | Titre, Canal (LinkedIn / Blog / Google), Pilier, Statut (Idée / En atelier / Prêt / Publié), Date prévue, Lien | `/linkedin`, `/seo` |
| Rapports | Titre, Type (Brief / Bilan / SEO / Veille), Date | `/brief`, `/bilan`, `/seo-suivi`, `/veille` |

Jamais de données personnelles de prospects dans Notion au-delà du nom d'entreprise et d'un lien.

## Connecteurs

| Outil | État | Usage |
|---|---|---|
| Recherche web (WebSearch / WebFetch) | ✅ | Prospection, SEO, veille |
| API Recherche d'entreprises (État) — `https://recherche-entreprises.api.gouv.fr/search` | ✅ gratuit, sans clé (WebFetch) | Entreprises du 68 par activité (NAF), effectifs, dirigeants publics |
| Gmail | ✅ | Lecture des fils, **brouillons**, libellés. Envoi, transfert, suppression : **interdits** |
| Google Drive | ✅ | Lecture de la prospection, création des lots et listes |
| PageSpeed Insights API | ⚠️ clé API gratuite à créer par Loïc (Google Cloud) — sans clé, quota épuisé | Vitesse et SEO technique mesurés automatiquement |
| Search Console | ⚠️ pas de connecteur : export CSV mensuel déposé par Loïc dans Drive « SL agence/SEO » | Impressions, clics, positions réelles par page et requête |
| Google Sheets | ✅ | Mise à jour de la feuille de prospection (statuts, dates de relance, nouveaux prospects) |
| Google Calendar | ✅ | Lecture des rendez-vous ; créneaux proposés dans les relances. Création d'événement : confirmation de Loïc |
| Canva | ✅ | Carrousels et visuels LinkedIn aux couleurs de SL Agence |
| Ahrefs | ⚠️ connecté mais l'abonnement actuel refuse l'accès API (« Insufficient plan », 2026-10-06) | Inutilisable tant que le plan n'inclut pas l'API. En attendant : WebSearch + exports Search Console fournis par Loïc |
| Vibe Prospecting | ✅ **payant (crédits)** | Enrichissement ponctuel ; estimation obligatoire, export seulement avec l'accord de Loïc |
| Make | ⛔ hors périmètre | Production de Sacha et CRM : toutes les écritures sont bloquées |
| LinkedIn | ❌ aucun accès automatisé | Les agents rédigent, Loïc publie |
| Google Business Profile | ❌ | Actions faites par Loïc à partir des recommandations |

## Interdits techniques (appliqués dans `.claude/settings.json`)

- Envoyer, répondre, transférer, supprimer ou marquer comme spam dans Gmail
- Toute écriture dans Make (scénarios, webhooks, data stores, connexions…) et l'outil d'envoi du CRM
- Supprimer ou partager des fichiers Google Drive
- Exporter (dépenser des crédits) Vibe Prospecting sans confirmation
