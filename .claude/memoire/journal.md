# Journal des décisions, actions et résultats

> Ajouter en haut. Jamais de données personnelles (pas de nom de prospect, d'e-mail, de client).
> Format : `## AAAA-MM-JJ — titre` puis 2 à 5 lignes : décision / action / résultat / prochaine étape.

## 2026-10-07 — Lot « créations 2026 » et réparation des brouillons

- Directive QG : 15 entreprises artisanat/BTP créées en 2026 (68), sourcées BODACC et vérifiées par l'API officielle ;
  0 e-mail publié trouvé → complément via Pappers « Avec contacts » ou courrier au siège. Validé 9/10.
- Apprentissage : les entreprises de moins d'un an publient très rarement un e-mail ; prévoir un canal de repli (c013).
- 15 brouillons Gmail réparés (signature convertie en lien google.com/url par l'outil Gmail → passer par htmlBody, c011).
- Accès Google Calendar et Google Sheets à réautoriser.

## 2026-10-06 — Organisation par modèle, mémoire des corrections, workflows en commandes

- Opus analyse (Manager, Analyste) et contrôle (Contrôle qualité) ; Sonnet exécute (5 équipes).
  Rien n'est présenté à Loïc sans verdict VALIDÉ.
- Mémoire des corrections : 10 corrections de la journée (`memoire/corrections/`), `/correction` pour en ajouter.
- Commandes : `/prospects`, `/relances`, `/brief`, `/bilan`, `/linkedin`, `/seo`, `/seo-suivi`, `/veille`
  enchaînent Gmail, Drive, Sheets, Calendar et Notion ; `/workflow` crée de nouvelles commandes.
- QG : onglet Carte = organigramme (Loïc → Manager + Analyste/Contrôle qualité → 5 équipes).
- Notion à connecter par Loïc (cockpit : tâches, contenus, rapports).

## 2026-10-06 — Manuels métier des agents

- 6 manuels sourcés et datés dans `savoirs/` : seo, emailing, prospection, linkedin-contenu, veille,
  marche-2026 (~35 000 mots, études 2024-2026). Chaque agent les lit avant d'agir et note ses livrables
  avec une grille (seuil 8/10). Boucle d'apprentissage : `memoire/apprentissages.md`.
- Connecteurs gratuits ajoutés : Google Sheets, Google Calendar, Canva.
- Décisions ouvertes : adresse d'envoi sur slagence.fr, offre d'entrée packagée, garantie 30 jours,
  abonnement de suivi, adresse de Friesen masquée ou non sur la fiche Google.

## 2026-10-06 — Premier lot de prospection

- 10 prospects qualifiés (5 chauds, 5 tièdes) depuis la feuille Drive ; 25 candidats écartés après
  vérification (fermés, trop grands, introuvables, sans fait sourcé) ; grands réseaux non traités.
- 5 brouillons Gmail créés (dont 1 relance : entreprise déjà contactée en août sans réponse).
- Apprentissages : la feuille contient beaucoup d'entreprises introuvables ou fermées (~40 %) ;
  peu de BTP vérifiable → enrichir le BTP via l'API Recherche d'entreprises plutôt que la feuille ;
  toujours vérifier l'historique Gmail avant un premier message.

## 2026-10-06 — Validations et séparation du CRM

- Loïc valide le positionnement et les engagements du site comme référence, et les objectifs hebdomadaires.
- Décision : le département IA est **séparé du CRM de Sacha**. Suivi commercial dans Gmail (libellés
  `SL Prospection/…`, relances en brouillons) et Drive. Agent `crm-relances` remplacé par `suivi`.
- Ahrefs et Gmail connectés : SEO sur données réelles ; messages préparés en brouillons Gmail.

## 2026-10-06 — Création du département IA

- Mise en place de SL MANAGER et de 5 agents : prospection (Lead Hunter + Prospection),
  crm-relances, seo-site (SEO + Site & CRO), contenu-linkedin (Content Factory + LinkedIn), veille.
- Choix : tout dans `.claude/` car le dépôt du site est public ; données personnelles uniquement dans Drive / CRM.
- Constats de départ : ~190 entreprises « À contacter » dans la feuille Drive ; CRM et robot de relance
  déjà construits par Sacha ; aucune mesure d'audience sur le site ; Ahrefs et Gmail non connectés.
- À décider par Loïc : positionnement de référence, tarifs à jour, objectifs chiffrés, mode brouillon du robot CRM.
