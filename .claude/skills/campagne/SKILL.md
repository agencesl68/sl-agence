---
name: campagne
description: Campagne e-mail quotidienne - l'équipe trouve elle-même les entreprises du Haut-Rhin (API Recherche d'entreprises, sites) et leur adresse publiée, plus celles que Loïc ajoute dans la feuille « Campagne – liste à contacter » ; vérifie chacune, personnalise le mail de base avec un fait réel, contrôle qualité, puis crée un brouillon Gmail par entreprise et un compte rendu dans Drive. Lancée chaque jour ouvré par une tâche programmée, ou à la main (« /campagne », « /campagne 5 » pour un test).
---

# /campagne — 25 premiers contacts par jour, prêts à envoyer

Arguments : `$ARGUMENTS` = nombre d'entreprises à traiter (défaut : **25**, objectif de Loïc validé le 2026-10-28).

**Phase test (depuis le 2026-10-29) : brouillons uniquement.** Loïc relit et envoie lui-même.
L'envoi automatique n'est pas autorisé (règle absolue n° 2 de `.claude/CLAUDE.md`) ; il ne sera
envisagé que sur décision écrite de Loïc, depuis une boîte @slagence.fr (voir `savoirs/emailing.md` §6).

## Entrées

- **Les entreprises — trouvées par l'équipe (décision de Loïc du 2026-10-29, correction c036).** Les listes ChatGPT
  ne donnaient pas d'adresses : c'est `prospection` qui source chaque jour les entreprises et leur adresse publiée.
  1. D'abord les lignes que Loïc a ajoutées dans la feuille « Campagne – liste à contacter » (prioritaires, facultatives),
     lues via `mcp__Google_Drive__download_file_content` en `text/csv` (base64 à décoder).
  2. Puis le sourçage : API Recherche d'entreprises (`https://recherche-entreprises.api.gouv.fr/search?activite_principale=<NAF>&departement=68&etat_administratif=A&tranche_effectif_salarie=<code>&per_page=25&page=<n>`),
     par famille du mail de base, en faisant tourner les codes NAF et les pages d'un jour à l'autre (noter dans le compte rendu
     le NAF et la page atteints, pour reprendre le lendemain) ; feuille « Prospection SL agence » (lignes « À contacter ») en complément.
  3. Adresse : uniquement celle affichée par l'entreprise (site, mentions légales, fiche officielle), procédure D.3.
  Prévoir environ 40 candidats pour 25 brouillons (écartements). 3 agents `prospection` en parallèle, une famille chacun,
  pour éviter les doublons.
- **Le mail de base** : `.claude/travail/prospection/mail-de-base.md` (validé par le contrôle qualité,
  puis par Loïc). Toute personnalisation part de ce modèle.

## Qui est déjà traité (source de vérité = Gmail + comptes rendus)

Une ligne est **déjà traitée** si l'un de ces cas est vrai :
1. Gmail contient un échange ou un brouillon avec cette adresse ou ce domaine
   (`search_threads` : `in:anywhere <adresse>`, puis `in:anywhere <domaine>` et `in:anywhere "<entreprise>"` — correction c005 ;
   `list_drafts` avec la même requête pour les brouillons) ;
2. elle figure dans un compte rendu précédent `Campagne – brouillons AAAA-MM-JJ` (Drive, dossier « SL agence »),
   y compris comme **écartée** ;
3. la colonne `Statut` n'est pas vide ;
4. la feuille « Prospection SL agence » la marque « déjà client » ou contactée ;
5. l'adresse figure dans la liste « Ne plus contacter » (Drive, recherche `fullText contains '<adresse>'`) — opposition CNIL.

Case E-mail vide : les cas 1 (adresse et domaine) et 5 sont vérifiés dès que l'adresse est trouvée (D.1 du mail de base).

Exception aux cas 1 et 4 — déjà contactée il y a plus de 30 jours sans réponse : ce n'est pas un écartement mais une **relance dans le fil
existant**, signalée comme telle et hors quota des 25. Ligne sans nom d'entreprise ou sans ville : écartée (LIGNE-INCOMPLÈTE). Une case E-mail vide n'est pas un écartement :
l'agent cherche l'adresse affichée sur le site officiel ou la fiche officielle (règle D.3 du mail de base, MX vérifié) ;
introuvable → écartée (ADRESSE).

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
   - **Lancer les requêtes telles qu'écrites dans le mail de base** (correction c032) et suivre sa procédure de vérification (doublons → identité → adresse → formule
     d'appel → fait), sans raccourci. En particulier :
     - **adresse** : domaine identique à celui du site, ou adresse affichée par l'entreprise elle-même
       (cette page devient l'origine citée dans le pied, jamais « ChatGPT » ni la liste) ; MX vérifié ; jamais
       devinée ni corrigée ; case E-mail vide = on la cherche sur le site officiel / la fiche officielle ;
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
4. **Gmail** : un brouillon par mail VALIDÉ (`create_draft` : destinataire = adresse vérifiée en D.3 (celle de la liste si retrouvée affichée, sinon celle trouvée sur le site), objet,
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

## Relances — plafond de Loïc : 50 brouillons par jour au total

**Règle de Loïc (2026-10-28, correction c033)** : au plus **50 brouillons par jour** à relire = **25 premiers
contacts + 25 relances maximum**. Les relances ne dépassent jamais 50 − (premiers contacts du jour).

Bases dans `travail/prospection/mail-de-base.md` §C, cadence en **jours ouvrés** (jours fériés sautés) :
R1 à E1 + 3, R2 à E1 + 8, R3 (rupture) à E1 + 14 — toujours dans le même fil, arrêt dès la première
réponse (même « non »). Quand il y a plus de relances dues que de places, ordre de priorité :
1. **R1** (la plus utile : un élément nouveau), de la plus ancienne à la plus récente ;
2. puis **R2**, puis **R3**, avec les places restantes (jours où moins de 25 premiers contacts sont partis) ;
3. une R2 ou R3 en retard de plus de 10 jours ouvrés est abandonnée (contact clos, noté dans le compte rendu).
Conséquence assumée par Loïc : à 25 premiers contacts par jour, la plupart des contacts ne recevront qu'une relance.
Les relances « hors quota » (entreprise de la liste déjà contactée avant) comptent dans les 25 relances.

Elles sont préparées par `/relances` (agent `suivi`) avec ce plafond ; `suivi` repère les mails de campagne envoyés
par Loïc (`in:sent`) et pose le libellé `SL Prospection/Contacté`. La tâche programmée enchaîne `/campagne` puis `/relances`.

## Restitution à Loïc

```
📬 Campagne du <date> — <N> brouillons prêts dans Gmail · <M> écartées · <X> restantes dans la liste
→ À faire (≈ <N> min) : ouvrir Gmail › Brouillons, relire, envoyer entre 8 h et 10 h, étalés.
→ Compte rendu : <lien du Doc>
→ Écartées : <entreprise — raison>, …
→ Relances du jour : <nombre> / <places restantes sur 50> (R1 · R2 · R3), abandonnées : <nombre>
```
