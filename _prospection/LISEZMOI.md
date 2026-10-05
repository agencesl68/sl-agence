# Prospection SL Agence : mode d'emploi

Cette application tourne sur votre ordinateur. Chaque jour, elle trouve des dirigeants d'entreprise du Haut-Rhin et du Bas-Rhin qui ont de bonnes raisons de travailler avec SL Agence. Pour chacun, elle écrit une invitation LinkedIn et un message de suivi.

**Elle n'envoie rien et ne se connecte jamais à LinkedIn.** C'est vous qui copiez, collez et envoyez chaque message.

---

## 1. Installation (une seule fois, 5 minutes)

Rien à installer à la main : l'installateur s'occupe de tout, Python compris.

**Sur Mac**
1. Ouvrez l'application **Terminal** : appuyez sur Cmd + Espace, tapez « Terminal », puis Entrée.
2. Copiez cette ligne, collez-la dans le Terminal (Cmd + V), puis appuyez sur Entrée :
   ```
   curl -fsSL https://raw.githubusercontent.com/agencesl68/sl-agence/claude/eager-shannon-5we0ld/_prospection/installer.sh | bash
   ```
3. Attendez 2 à 3 minutes. Si le Mac demande l'accès au Bureau, cliquez sur OK.

**Sur Windows**
1. Ouvrez **PowerShell** : touche Windows, tapez « PowerShell », puis Entrée.
2. Collez cette ligne (clic droit), puis appuyez sur Entrée :
   ```
   irm https://raw.githubusercontent.com/agencesl68/sl-agence/claude/eager-shannon-5we0ld/_prospection/installer.ps1 | iex
   ```

L'application s'ouvre ensuite dans votre navigateur. Une icône **« Prospection SL Agence »** est créée sur votre Bureau.

**La clé API Anthropic (une seule fois)**

L'application vous la demande au premier lancement, avec les étapes affichées à l'écran :
1. Créez un compte sur https://platform.claude.com/ (comme sur n'importe quel site).
2. Dans « Billing », ajoutez une carte bancaire et 10 $ de crédit.
3. Dans « API keys », cliquez sur « Create Key », nommez-la « Prospection » et copiez la clé (elle commence par `sk-ant-`).
4. Collez-la dans l'application et cliquez sur « Enregistrer la clé ». L'application vérifie la clé tout de suite.

Pour mettre l'application à jour plus tard, relancez simplement la même ligne d'installation : vos leads et votre clé sont conservés.

## 2. Chaque matin (10 à 20 minutes)

1. **Lancez l'application** : double-clic sur « Prospection SL Agence » sur le Bureau. Elle s'ouvre dans votre navigateur à l'adresse http://127.0.0.1:5068. Laissez la fenêtre du lanceur ouverte tant que vous travaillez.
2. **Onglet « Aujourd'hui »**, de haut en bas :
   - **Message de suivi à envoyer** : ces personnes ont accepté votre invitation. Copiez le message, envoyez-le sur LinkedIn, puis cliquez sur « Message envoyé ».
   - **Relances à faire** : vous leur avez écrit il y a plus de 7 jours, sans réponse. Cliquez sur « Écrire la relance », relisez, copiez, envoyez, puis « J'ai envoyé la relance ».
   - **À contacter** : les nouveaux leads, du plus intéressant au moins intéressant.
3. **Cliquez sur « Générer 10 nouveaux leads »** s'il n'en reste pas assez. Comptez 3 à 6 minutes. La barre montre l'avancement. Les nouveaux leads s'ajoutent aux anciens, ils ne les remplacent jamais.
4. **Pour chaque lead à contacter** :
   1. Lisez la justification et ouvrez « Ce qui a été trouvé ». Chaque information a un lien vers sa source : **cliquez sur la source citée dans le message pour vérifier** avant d'envoyer.
   2. Cliquez sur « Chercher sur LinkedIn » : la recherche s'ouvre avec le nom du dirigeant et de l'entreprise. Trouvez le bon profil.
   3. Cliquez sur « Copier l'invitation » et collez-la dans la note d'invitation LinkedIn. Vous pouvez modifier le texte directement dans la carte avant de copier (il est enregistré).
   4. Si le texte ne vous plaît pas : « Réécrire » donne une autre version.
   5. Cliquez sur « Invitation envoyée ».
   6. Si l'entreprise ne convient pas : « Supprimer définitivement » ou « Ne pas contacter ».

Pour arrêter l'application : fermez la fenêtre noire (Terminal) qui s'est ouverte avec elle.

---

## 3. Les statuts

Un clic sur un statut le change. Ils servent au suivi et au tableau de bord.

| Statut | Quand l'utiliser |
|---|---|
| À contacter | Nouveau lead (par défaut) |
| Invitation envoyée | Vous avez envoyé l'invitation LinkedIn |
| Invitation acceptée | La personne a accepté : le lead apparaît dans « Message de suivi à envoyer » |
| Message envoyé | Vous avez envoyé le message de suivi : une relance sera proposée 7 jours plus tard |
| A répondu | La personne a répondu |
| Rendez-vous pris | L'appel découverte est calé |
| Pas intéressé | Refus : l'entreprise ne sera plus jamais proposée |
| Ne pas contacter | Blocage définitif de l'entreprise |

---

## 4. Les autres onglets

- **Leads** : tous les leads, filtrables par statut. Bouton « Exporter en CSV » (s'ouvre dans Excel).
- **Tableau de bord** : par semaine, le nombre de personnes contactées, le taux d'acceptation, les réponses et les rendez-vous.
- **Profil agence** : ce que l'application sait de SL Agence. Après une modification du site, cliquez sur « Mettre à jour le profil agence ». Les preuves (20 h par semaine, 7 jours, devis sous 24 h, appel de 15 minutes) et les trois réalisations sont toujours incluses, sans jamais nommer de client.
- **Réglages** : nombre de leads par clic, départements (68 en priorité, puis 67), tailles d'entreprise (1 à 50 salariés), bonus bâtiment, note minimale (40), plafond de coût par jour, nombre de recherches web par entreprise.

---

## 5. Comment les leads sont choisis

1. **Registre public des entreprises** (recherche-entreprises.api.gouv.fr, gratuit) : entreprises actives, de 1 à 49 salariés, dans le 68 puis le 67. Les secteurs et les communes changent d'un lot à l'autre.
2. **Tri gratuit** : proximité de Mulhouse, taille, ancienneté, dirigeant connu, petit bonus pour le bâtiment.
3. **Recherche web** (Claude, modèle claude-sonnet-5-5) sur les meilleures : site, métier, signes de papier ou de tâches répétitives, recrutements, croissance, dirigeant. LinkedIn est exclu des sources. Une information non trouvée est marquée « non trouvé ». Une information dont la source n'a pas été réellement consultée est retirée.
4. **Note sur 100** :
   - tâches répétitives probables : 35 points
   - signaux concrets sourcés : 20 points
   - dirigeant identifié : 15 points (et 10 points de pénalité s'il est introuvable)
   - taille : 10 points
   - proximité de Mulhouse : 10 points
   - ancienneté (capacité à investir) : 10 points
   - bonus bâtiment : 5 points (réglable)

   Sous 40, l'entreprise est écartée et ne sera plus proposée.
5. **Messages** : invitation de 300 caractères maximum, message de suivi de 600 caractères maximum, vouvoiement, sans tirets longs, sans emoji, sans jargon. Chaque message cite un élément précis, avec sa source affichée sous le texte.

Une entreprise n'est jamais proposée deux fois (contrôle par SIREN), ni si elle a été contactée, refusée, écartée ou supprimée.

Si une recherche échoue (coupure, limite de l'API), le lead est ajouté avec la mention « à compléter » au lieu de bloquer le lot. Un bouton « Compléter la recherche » relance la recherche plus tard.

---

## 6. Le coût

- Le compteur en haut à droite affiche le nombre d'appels API et le coût du jour, en dollars (Anthropic facture en dollars).
- Ordre de grandeur estimé : 0,15 à 0,35 $ par entreprise étudiée. Certaines entreprises sont écartées après étude : comptez environ 2 à 5 $ pour 10 leads. La génération test (ci-dessous) donne le vrai chiffre.
- Le **plafond par jour** (5 $ par défaut, dans Réglages) arrête la génération dès qu'il est atteint.
- « Réécrire » et « Écrire la relance » coûtent environ 0,02 à 0,04 $.

### Génération test

Pour vérifier que tout marche et voir le coût réel d'un lot de 5 :

```
cd ~/SL-Prospection && .venv/bin/python lancer.py --test 5
```

(sous Windows : `cd $env:USERPROFILE\SL-Prospection; .venv\Scripts\python lancer.py --test 5`). Les 5 leads, leurs messages, leurs sources et le coût s'affichent dans la fenêtre. Ils sont aussi ajoutés à l'application.

---

## 7. Données personnelles

- L'application ne garde que des données professionnelles publiques : entreprise, nom et poste du dirigeant, sources. Pas de date de naissance, pas de coordonnées personnelles.
- « Supprimer définitivement » efface toutes les données du lead. Seul le numéro SIREN de l'entreprise est conservé, pour ne jamais la reproposer.
- « Ne pas contacter » bloque l'entreprise pour toujours.
- Tout est stocké dans le fichier `prospection.db` (dossier `SL-Prospection` de votre dossier personnel), sur votre ordinateur uniquement. Pour sauvegarder, copiez ce fichier.
- Le fichier `.env` (votre clé) et `prospection.db` ne sont jamais envoyés sur GitHub. Le dossier commence par `_` : il n'est donc pas publié sur slagence.fr.

---

## 8. En cas de problème

| Problème | Solution |
|---|---|
| L'application demande la clé | Suivez les étapes affichées, puis collez la clé |
| « Clé API Anthropic refusée » | La clé est fausse ou désactivée : créez-en une nouvelle |
| « Plafond du jour atteint » | Relevez le plafond dans Réglages, ou attendez demain |
| Leads « à compléter » | Cliquez sur « Compléter la recherche » plus tard |
| Moins de leads que demandé | Trop de notes basses dans ce lot : relancez, les secteurs changent à chaque fois |
| La page ne s'ouvre pas | Vérifiez que la fenêtre du lanceur est ouverte, puis allez sur http://127.0.0.1:5068 |
