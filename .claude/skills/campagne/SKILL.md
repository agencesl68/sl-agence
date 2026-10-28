---
name: campagne
description: Campagne e-mail quotidienne - prend les 25 entreprises suivantes de la feuille Drive « Campagne – liste à contacter » (fournie par Loïc - entreprise, ville, e-mail), vérifie chacune, personnalise le mail de base avec un fait réel, contrôle qualité, puis crée un brouillon Gmail par entreprise et un compte rendu dans Drive. Lancée chaque jour ouvré par une tâche programmée, ou à la main (« /campagne », « /campagne 5 » pour un test).
---

# /campagne — 25 premiers contacts par jour, prêts à envoyer

Arguments : `$ARGUMENTS` = nombre d'entreprises à traiter (défaut : **25**, objectif de Loïc validé le 2026-10-28).

**Phase test (depuis le 2026-10-29) : brouillons uniquement.** Loïc relit et envoie lui-même.
L'envoi automatique n'est pas autorisé (règle absolue n° 2 de `.claude/CLAUDE.md`) ; il ne sera
envisagé que sur décision écrite de Loïc, depuis une boîte @slagence.fr (voir `savoirs/emailing.md` §6).

## Entrées

- **La liste** : feuille Google « Campagne – liste à contacter » (dossier Drive « SL agence »), à retrouver
  par son nom (`mcp__Google_Drive__search_files`, jamais d'identifiant dans le dépôt). Loïc remplit les
  colonnes A-C : `Entreprise`, `Ville`, `E-mail`. Les colonnes D-G (`Statut`, `Date du brouillon`,
  `Fait utilisé (source)`, `Remarque`) sont remplies par la campagne.
  Lecture complète : `mcp__Google_Drive__download_file_content` avec `exportMimeType: text/csv`
  (le contenu revient en base64 : le décoder). `read_file_content` ne rend qu'un extrait : ne pas l'utiliser.
- **Le mail de base** : `.claude/travail/prospection/mail-de-base.md` (validé par le contrôle qualité,
  puis par Loïc). Toute personnalisation part de ce modèle.

## Qui est déjà traité (source de vérité = Gmail + comptes rendus)

Une ligne est **déjà traitée** si l'un de ces cas est vrai :
1. Gmail contient un échange ou un brouillon avec cette adresse ou ce domaine
   (`search_threads` : `in:anywhere <adresse>`, puis `in:anywhere <domaine>` et `in:anywhere "<entreprise>"` — correction c005 ;
   `list_drafts` avec la même requête pour les brouillons) ;
2. elle figure dans un compte rendu précédent `Campagne – brouillons AAAA-MM-JJ` (Drive, dossier « SL agence »),
   y compris comme **écartée** ;
3. la colonne `Statut` n'est pas vide.

Les N premières lignes **non traitées**, dans l'ordre de la feuille, forment le lot du jour.
Si la liste est épuisée : le dire dans le compte rendu (« liste épuisée, X restantes ») et s'arrêter.

## Chaîne (obligatoire)

QG : agents « au travail » + activité → **prospection** (Sonnet, en 3 lots parallèles de 8-9 entreprises)
→ **controle-qualite** (Opus, verdict par mail) → corrections (2 allers-retours max, sinon on écarte)
→ brouillons Gmail → compte rendu Drive → QG → commit.
Le mail de base ayant été validé par l'analyste puis le contrôle qualité, l'analyste n'est pas relancé
chaque jour ; il l'est si Loïc corrige le modèle ou si le taux de réponse est sous 5 % après 2 semaines.

## Étapes

1. **Lire la liste** et constituer le lot (section précédente). Écrire le QG (prospection « au travail »).
2. **Prospection** — pour chaque entreprise (savoirs : `emailing.md`, `prospection.md` ; corrections
   `prospection` et `tous`) :
   - **Suivre la procédure de vérification du mail de base** (doublons → identité → adresse → formule
     d'appel → fait), sans raccourci. En particulier :
     - **adresse** : domaine identique à celui du site, ou adresse affichée par l'entreprise elle-même
       (cette page devient l'origine citée dans le pied) ; MX vérifié ; jamais devinée ni corrigée ;
     - **formule d'appel** : « Monsieur/Madame <Nom> » seulement si une source nomme le dirigeant **avec sa
       civilité** (l'API Recherche d'entreprises ne la donne pas) ; « Maître » pour les avocats ; sinon « Bonjour, ».
   - **Trouver un fait réel**, daté, de préférence de moins de 90 jours (c010) : site, offre d'emploi,
     actualité, fiche Google. Source = URL.
   - **Écrire le mail** à partir du mail de base : bloc preuve de la famille de secteur la plus proche,
     jamais une réalisation qu'on n'a pas (c028) ; pied d'origine + opposition adapté à la source de l'adresse.
   - **Écarter** plutôt que produire un mail bancal : entreprise fermée ou introuvable, adresse
     incohérente, déjà cliente ou déjà en contact, aucun fait vérifiable, hors cible (`cible.md`). Raison en une ligne.
   - Rendre au Manager : par entreprise, l'objet, le corps, le fait + URL, la note /10 (grille §7), ou la raison d'écartement.
3. **Contrôle qualité** : un verdict par mail (seuil 8/10, faits sourcés, c004 c005 c010 c028).
   À CORRIGER → renvoi à prospection ; toujours sous 8 après 2 passes → écartée (« à revoir par Loïc »).
4. **Gmail** : un brouillon par mail VALIDÉ (`create_draft` : destinataire = adresse de la liste, objet,
   corps en texte brut, signature imposée). Si l'entreprise a déjà un fil sans réponse : pas de premier
   message, mais une relance dans le fil (`replyToMessageId`) signalée comme telle.
   **Jamais d'envoi.**
5. **Feuille** : si l'outil Google Sheets répond, remplir D-G (`Brouillon prêt` / `Écartée – <raison>` /
   `Relance (déjà contactée le …)`, date, fait + URL). S'il est refusé : ne rien inventer, le compte rendu fait foi.
6. **Compte rendu Drive** : Google Doc `Campagne – brouillons AAAA-MM-JJ` dans « SL agence », créé en une
   seule fois avec son contenu final (c006) : tableau entreprise · ville · statut · fait utilisé (URL) · note QC,
   puis les écartées avec leur raison, puis « restantes dans la liste : X ».
7. **QG** : mission du jour, livrable « N brouillons prêts » (lien vers le compte rendu, statut « à valider »),
   agents « disponibles ». Aucun e-mail ni nom de dirigeant dans le QG (nom d'entreprise, ville, statut seulement).
8. **Journal** (`memoire/journal.md`, sans donnée personnelle) : « Campagne : N brouillons, M écartées (raisons) ».
   Commiter et pousser.

## Relances (3 sur 3 semaines)

Séquence de `savoirs/emailing.md` §4 : R1 à J+4, R2 à J+10, R3 (rupture) à J+20, toujours dans le même fil,
arrêt dès la première réponse (même « non »). Elles sont préparées par `/relances` (agent `suivi`), qui
repère les mails de campagne envoyés par Loïc (`in:sent`) et pose le libellé `SL Prospection/Contacté`.
La tâche programmée enchaîne `/campagne` puis `/relances`.

## Restitution à Loïc

```
📬 Campagne du <date> — <N> brouillons prêts dans Gmail · <M> écartées · <X> restantes dans la liste
→ À faire (≈ <N> min) : ouvrir Gmail › Brouillons, relire, envoyer entre 8 h et 10 h, étalés.
→ Compte rendu : <lien du Doc>
→ Écartées : <entreprise — raison>, …
→ Relances du jour : <nombre> (voir /relances)
```
