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
| [c011](c011-premier-ecran-du-site-surcharge.md) | manager, seo-site | moyenne | Premier écran du site épuré : une seule animation, titre + une phrase + boutons, aucun élément décoratif en plus. |
| [c012](c012-sections-du-site-trop-bavardes.md) | manager, seo-site, contenu-linkedin | moyenne | Chaque section du site se comprend en 5 secondes : titre avec mot-clé, schéma ou phrase courte, une ligne max par élément. |
| [c013](c013-nombres-ecrits-en-lettres-sur-le-site.md) | manager, seo-site, contenu-linkedin | moyenne | Sur le site, les quantités en chiffres (15 minutes, 4 temps), sauf citations de clients. |
| [c014](c014-animation-qui-bloque-le-defilement.md) | manager, seo-site | moyenne | Aucune animation ne retient le défilement : elle se lance à l'apparition et joue seule. |
