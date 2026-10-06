# Outils, données et permissions

## Où sont les données

| Donnée | Emplacement | Accès |
|---|---|---|
| Fichier de prospection historique (~205 entreprises de Mulhouse, statuts, e-mails envoyés) | Google Drive — feuille « Prospection SL agence » (id `1tLAhiIe2DXZNqb8vuc2Ao_nNI-0v2qi_s18lr7Z_REY`), onglets « Prospection chèque cadeau » et « Mail à envoyer » | Lecture via `mcp__Google_Drive__read_file_content` |
| Dossier de travail Google Drive | « SL agence » (id `1rAcFi7NBf_cXGzN_qJ0sBAe3Y5wTl4b3`) | Les nouveaux lots de prospects et brouillons de messages s'y créent (données personnelles = Drive, jamais le dépôt) |
| Analyse de marché + grille tarifaire (confidentiel) | Google Drive — « Analyse de marché SLagence.docx » (id `1y9U0WFV4y5UhABLhKoN1ASu0jA0n-jfk`) | Lecture seule |
| CRM SL Agence (construit par Sacha : deals, contacts, devis, tâches, relances, factures Qonto) | Firebase, piloté par les scénarios Make du dossier « CRM SL Agence » | Lecture limitée via les outils Make ci-dessous |
| Demandes reçues via le site | Make : outil `mcp__Make__s7743456_crm_demandes_du_site` | Lecture (autorisé) |
| Comptes et factures Qonto | Make : outil `mcp__Make__s7743454_crm_qonto_comptes_et_factures` | Lecture (autorisé, Manager uniquement) |
| Liste des clients existants (exclusion de la prospection) | Make : noms des dossiers, via `mcp__Make__folders_list` (teamId `1528818`) | Lecture |
| Site | Ce dépôt (racine) | Modifications par branche + PR validée |

## Le CRM de Sacha — ce qu'il fait déjà (ne pas le refaire)

Le robot « CRM - Robot du matin » (lun–ven 7 h 30) : synchronise Qonto, prépare les relances
commerciales (délais 3 / 7 / 14 jours) et les rappels d'impayés rédigés par Claude, crée une tâche
« appeler » après la dernière relance, et envoie un point du jour sur Telegram.
→ Le brief de SL Manager **complète** ce point (prospection, contenu, SEO) au lieu de le dupliquer.
→ ⚠️ Réglage par défaut du robot : relances **envoyées automatiquement** (`followup_mode: envoi`).
Loïc souhaite valider avant envoi : à régler en mode `brouillon` avec Sacha.

## Connecteurs

| Outil | État | Usage |
|---|---|---|
| Recherche web (WebSearch / WebFetch) | ✅ | Prospection, SEO, veille |
| API Recherche d'entreprises (État) — `https://recherche-entreprises.api.gouv.fr/search` | ✅ gratuit, sans clé (via WebFetch) | Lister des entreprises du 68 par activité (NAF), effectifs, dirigeants publics |
| Vibe Prospecting | ✅ **payant (crédits)** | Enrichissement ponctuel ; estimation de coût obligatoire, export seulement avec l'accord de Loïc |
| Google Drive | ✅ | Lire la prospection, créer les lots et brouillons |
| Make | ✅ | **Lecture seule** sur le CRM ; toute écriture est interdite (production de Sacha et de ses clients) |
| Ahrefs | ⚠️ connexion à terminer par Loïc | SEO : positions, mots-clés, backlinks |
| Gmail | ⚠️ connexion à terminer par Loïc | Lire les réponses des prospects |
| LinkedIn | ❌ aucun accès automatisé (et automatiser LinkedIn expose le compte à une suspension) | Les agents rédigent, Loïc publie |
| Search Console / Google Business Profile | ❌ | Export manuel par Loïc quand nécessaire |

## Interdits techniques (appliqués dans `.claude/settings.json`)

- Toute écriture dans Make (scénarios, webhooks, data stores, connexions, apps…)
- L'outil `CRM - Envoyer un email` (envoi réel)
- Supprimer ou partager des fichiers Google Drive
- Exporter (dépenser des crédits) Vibe Prospecting sans confirmation
