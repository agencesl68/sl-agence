# Transmission — analyste → prospection — 2026-10-07

**Mission** : lot « entreprises créées en 2026, artisanat et bâtiment » (directive de Loïc, QG, 2026-10-07).
15 entreprises actives, créées entre le 2026-01-01 et le 2026-08-31, ≥ 12 dans le Haut-Rhin, ≤ 3 à Strasbourg.
Une ligne par entreprise dans un Google Sheet (Drive « SL agence »), un mail proposé par ligne, brouillon Gmail seulement si e-mail pro publié.

## 1. Sourcing
- Pappers : 403 en WebFetch → non utilisé (filtre « Avec contacts » = option manuelle pour Loïc).
- API Recherche d'entreprises : pas de filtre de date → sert à **vérifier**, pas à trouver.
- **Source n° 1 : BODACC, annonces de création** (opendatasoft, gratuit) :
  `https://bodacc-datadila.opendatasoft.com/api/explore/v2.1/catalog/datasets/annonces-commerciales/records?where=cp like "68*" AND familleavis="creation" AND dateparution>="2026-01-01" AND dateparution<="2026-09-30" AND (search(listeetablissements,"plomberie") OR ...)&select=dateparution,commercant,ville,cp,registre,listeetablissements&limit=100`
  2e passe : chauffage, carrelage, plâtrerie, charpente, isolation, terrassement, rénovation, second œuvre, zinguerie, façade, sanitaire. Strasbourg : `cp like "67*"`.
  Ne garder que l'origine du fonds « création » ; SIREN = `registre` (9 chiffres).
- **Vérification obligatoire** : `https://recherche-entreprises.api.gouv.fr/search?q=<SIREN>&include=dirigeants,siege,complements&minimal=true`
  → `date_creation` dans la fenêtre, `etat_administratif` = A, département 68/67, NAF de la liste, dirigeant.
- NAF : 43.21A, 43.22A, 43.22B, 43.29A, 43.31Z, 43.32A, 43.32B, 43.33Z, 43.34Z, 43.91A, 43.91B, 43.99A, 43.99C, 43.99D, 43.12A, 43.11Z, 41.20A, 41.20B, 43.39Z, 81.30Z.
- E-mail : site (mentions légales, contact) → fiche Google → PagesJaunes → Facebook pro. Jamais deviné. Adresse gratuite acceptée seulement si publiée par l'entreprise (marquée « gratuite »). Vibe Prospecting : pas d'export.

## 2. Inclusion / exclusion
Inclus : actif, créé dans la fenêtre, siège 68 (≤ 3 en 67), métier manuel, dirigeant identifié.
Priorité 1 : société avec salarié ou site/fiche/e-mail trouvable. Micro/EI signalés, ≤ 5/15.
Exclus : holdings, SCI, marchands de biens, cessées/non diffusibles, reprises/achats de fonds, franchises, déjà un fil Gmail (c005).
Diversité : ≥ 5 métiers, ≤ 4 par métier. ~40 candidats → 15 meilleurs.

## 3. Mail « large » (consigne de Loïc, prioritaire sur emailing.md C5/C6)
≤ 120 mots, objet < 50 caractères en minuscules, ouverture = date de création exacte (c010), une question ouverte,
fin = appel de 15 min. Pas de tâche précise (devis, factures, heures…), pas de jugement sur le démarrage, pas de jargon
(IA, automatisation, digitalisation), pas de lien, prix, client, puce ; « Madame/Monsieur » seulement si certain.

> Objet : vos premiers mois à ⟨Ville⟩
>
> Bonjour Monsieur ⟨Nom⟩,
>
> Vous avez créé ⟨Entreprise⟩ le ⟨12 mars 2026⟩ à ⟨Ville⟩, en ⟨plomberie-chauffage⟩.
>
> Je suis Loïc, de SL Agence, à Friesen. Avec mon associé, nous construisons des outils simples pour les artisans du Haut-Rhin, pour que le travail ne soit pas fait deux fois : une fois sur le chantier, une fois le soir au bureau.
>
> Une question : en dehors des chantiers, qu'est-ce qui vous prend le plus de temps dans la semaine ?
>
> Si vous voulez en parler, je vous propose 15 minutes au téléphone, au moment qui vous arrange. Vous me dites ce qui vous pèse, je vous dis franchement si nous pouvons aider.
>
> Loïc — SL Agence
> (signature exacte de `memoire/ton.md`)
>
> Votre adresse figure sur ⟨source réelle⟩. Si le sujet ne vous concerne pas, répondez simplement « non » et je ne vous écrirai plus.

## 4. Fichier et brouillons
Un seul fichier créé en une fois (c006) : Drive `create_file`, mimeType `application/vnd.google-apps.spreadsheet`, contenu CSV
(le connecteur Google Sheets n'a pas les droits ce jour). Si échec : Google Doc avec le tableau, pas de fichier provisoire.
Nom : « Prospects – créations 2026 BTP – lot 2026-10-07 ».
Colonnes : N° · Entreprise · Ville · CP · Activité · NAF · Date de création · Forme juridique · Micro/EI · Effectif · Dirigeant ·
Source dirigeant · Site web · E-mail pro · Type d'e-mail · Source e-mail · Téléphone pro publié · Source BODACC · Vérification Gmail ·
Objet · Mail proposé · Brouillon Gmail · Priorité · Remarques · Statut.
Brouillons : 1 destinataire, texte brut (slagence.fr sans lien), aucun envoi.

## 5. Critères de réussite (contrôle qualité)
15 lignes (ou raison écrite) ; 100 % dates et état vérifiés avec URL ; exclusions respectées ; zéro e-mail deviné ;
chaque mail conforme au §3 ; vérification Gmail citée ; un seul fichier, lien fourni ; rien de nominatif dans le dépôt ; note ≥ 8/10.
Corrections : c002, c004, c005, c006, c008, c010.
