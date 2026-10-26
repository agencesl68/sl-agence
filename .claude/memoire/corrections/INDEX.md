# Mémoire des corrections

> Chaque correction de Loïc (ou erreur détectée par le contrôle qualité) devient un fichier ici,
> pour que **la même erreur ne revienne jamais**. Lu par l'analyste avant chaque brief, par chaque agent
> concerné avant d'agir, et vérifié par le contrôle qualité sur chaque livrable.
> Créer une correction : `/correction <ce qui n'allait pas>`. Ne jamais supprimer un fichier ; si une
> règle change, créer une nouvelle correction qui remplace l'ancienne (champ `remplace`).

| Id | Agents | Gravité | Règle (résumé) |
|---|---|---|---|
| [c001](c001-produire-un-audit-au-lieu-de-creer.md) | manager | haute | Par défaut, livrer du travail fini et utilisable (messages, posts, pages, plans exécutés) |
| [c002](c002-s-appuyer-sur-le-crm-de-sacha.md) | tous | haute | Ne jamais lire, utiliser ni citer le CRM SL Agence ou les scénarios Make |
| [c003](c003-rediger-les-posts-linkedin-a-la-place-de-loic.md) | contenu-linkedin | haute | Mode co-création : radar de tendances, questions pour récupérer sa matière, accroches, plans avec ses mots, relectures notées |
| [c004](c004-donnees-de-prospects-dans-le-depot-public.md) | tous | haute | Aucun nom de prospect, de dirigeant, d'e-mail, de téléphone, de client ni de tarif interne dans le dépôt |
| [c005](c005-ecrire-un-premier-message-a-une-entreprise-deja-co.md) | prospection | haute | Avant tout message : recherche Gmail (in:anywhere, domaine ET nom de l'entreprise) |
| [c006](c006-creer-un-fichier-drive-vide-pour-le-remplir-ensuit.md) | manager | moyenne | Créer un fichier Drive en une seule fois, avec son contenu final (create_file avec textContent) |
| [c007](c007-affirmer-qu-un-element-du-site-est-absent-sans-ver.md) | seo-site | moyenne | Avant d'affirmer une absence, chercher dans tous les fichiers (Grep sur le dépôt) et sur la version en ligne ; citer l'endroit vérifié. |
| [c008](c008-utiliser-un-outil-payant-indisponible-ahrefs.md) | tous | moyenne | Ne pas appeler Ahrefs |
| [c009](c009-visuels-trop-charges-et-peu-lisibles.md) | manager | moyenne | Les visuels pour Loïc suivent une hiérarchie simple et classique (Loïc → Manager → équipes), un seul message par écran, les détails au clic. |
| [c010](c010-signal-d-approche-flou-ou-trop-ancien.md) | prospection | moyenne | Un signal est daté précisément et a moins de 90 jours si possible (sinon dit honnêtement) |
| [c011](c011-deduction-non-sourcee-tiree-d-un-chiffre-source.md) | seo-site, contenu-linkedin, analyste | moyenne | Toute déduction tirée d'un chiffre sourcé est marquée (« en moyenne », « hypothèse », « calcul SL Agence ») ; jamais de généralisation |
| [c012](c012-premier-ecran-du-site-surcharge.md) | manager, seo-site | moyenne | Premier écran du site épuré : une seule animation, titre + une phrase + boutons, aucun élément décoratif en plus. |
| [c013](c013-sections-du-site-trop-bavardes.md) | manager, seo-site, contenu-linkedin | moyenne | Chaque section du site se comprend en 5 secondes : titre avec mot-clé, schéma ou phrase courte, une ligne max par élément. |
| [c014](c014-nombres-ecrits-en-lettres-sur-le-site.md) | manager, seo-site, contenu-linkedin | moyenne | Sur le site, les quantités en chiffres (15 minutes, 4 temps), sauf citations de clients. |
| [c015](c015-animation-qui-bloque-le-defilement.md) | manager, seo-site | moyenne | Aucune animation ne retient le défilement : elle se lance à l'apparition et joue seule. |
| [c016](c016-affirmation-non-verifiee-sur-un-prestataire.md) | seo-site, contenu-linkedin | moyenne | Texte juridique : chaque affirmation sur un prestataire (nationalité, DPF, hébergement) est vérifiée sur sa page officielle |
| [c017](c017-liens-de-pied-de-page-en-double.md) | seo-site | basse | Après ajout de liens de pied de page, vérifier par Grep qu'aucun href n'est en double (pages nouvelles comprises) |
| [c018](c018-texte-reglementaire-non-fidele-a-la-source.md) | seo-site, contenu-linkedin | moyenne | Texte réglementaire : chaque phrase retrouvable dans la source officielle, titres exacts, rien d'ajouté ni d'incertain à tort |
| [c019](c019-resultat-de-realisation-enrichi.md) | seo-site, contenu-linkedin | moyenne | Un cas client ne reprend que les résultats écrits dans realisations.html / agence.md, rien de déduit |
| [c020](c020-meta-trop-longue-livree.md) | seo-site, contenu-linkedin | basse | Compter title (60) et meta (155) avec un outil et raccourcir soi-même avant livraison |
| [c021](c021-identifiants-google-drive-dans-le-depot-public.md) | tous | haute | Jamais d'identifiant ni de lien Google Drive/Docs/Sheets dans le dépôt ; fichiers Drive en accès « Restreint » |
| [c022](c022-regle-conditionnelle-generalisee-dans-un-resume.md) | seo-site, contenu-linkedin | moyenne | Les résumés (FAQ, JSON-LD, meta) gardent les conditions d'une règle ; jamais de généralisation en raccourcissant |
| [c023](c023-faq-clonee-entre-pages-ville.md) | seo-site | moyenne | Pages ville : au plus 2 questions de FAQ de même structure, au moins 3 propres à la page |
| [c024](c024-page-modifiee-sans-corriger-les-defauts-connus.md) | seo-site, contenu-linkedin | moyenne | Page modifiée = relue en entier ; on corrige au passage les défauts déjà connus (c014, c019, c022) |
| [c025](c025-information-rgpd-plus-rassurante-que-la-source.md) | veille, seo-site, contenu-linkedin | moyenne | Texte RGPD sur un outil tiers : toutes les données, négations fidèles à la source, opposition vérifiée, destinataire et durée |
| [c026](c026-action-deja-faite-ou-contredite-par-les-donnees.md) | analyste, seo-site, manager | moyenne | Vérifier branche + main avant de proposer une action ; confronter les hypothèses aux captures de Loïc ; rien présenté avant QC |
