---
de: analyste
vers: prospection
date: 2026-10-28
statut: à faire
priorité: P1
---

# BRIEF — Mail de base de la campagne « 25 premiers contacts / jour ouvré »

## Demande
Rédiger `.claude/travail/prospection/mail-de-base.md` (lu par `/campagne`) : mail de base E1 + règles de remplissage
bloc par bloc ; banque de blocs par famille de secteur + bloc générique ; bases R1/R2/R3 ; procédure de vérification
et critères d'écartement. Validation : contrôle qualité → Loïc, avant le premier lot du jeudi 29/10.

## Contexte
- Objectif : chaque jour ouvré, 25 brouillons ≥ 8/10 (grille `emailing.md` §7, C1 et C9 éliminatoires), envoyables sans
  réécriture dans ≥ 80 % des cas ; le reste écarté avec un motif d'une ligne.
- Seule donnée terrain : campagne générique d'août 2026 = aucune réponse connue (`apprentissages.md`) → le fait réel n'est pas négociable.
- Entrée : feuille Drive « Campagne – liste à contacter » : Entreprise, Ville, E-mail. Pas de dirigeant, secteurs variés.
- Sources : `emailing.md` §1-4, §6, §7 ; `prospection.md` §2-4, §9 ; `agence.md` ; `realisations.html` (l. 800-866) ; `ton.md` ; `cible.md` ; `skills/campagne/SKILL.md`.

## Livrable attendu (fichier anonyme : aucun nom réel d'entreprise ou de personne, aucun lien Drive)

### A. Squelette E1
- Objet : 2-5 mots, minuscules, < 50 caractères, reprend le sujet de la première ligne.
- Formule d'appel : voir D.4.
- Bloc 1 — le fait : une phrase sur eux, **date absolue** (« le 14 octobre », jamais « cette semaine » : le brouillon peut partir plus tard).
- Bloc 2 — la question : 1-2 phrases reliant le fait à une tâche probablement faite deux fois, en question neutre ; jamais de jugement sur la taille ou l'organisation (c010).
- Bloc 3 — la preuve : 1 phrase tirée de la banque de la famille.
- Bloc 4 — la demande : une seule question d'intérêt (défaut « Est-ce un sujet chez vous en ce moment ? » ; variante « …ou tout roule déjà ? »).
- Signature imposée : « Loïc — SL Agence » / « 06 01 16 07 62 · slagence.fr ».
- Pied : « Votre adresse figure sur ⟨source réellement vérifiée : votre site internet / votre fiche PagesJaunes…⟩. Si le sujet ne vous concerne pas, répondez simplement « non » et je ne vous écrirai plus. » Si la formule d'appel utilise un nom tiré de l'annuaire : variante « …et votre nom sur l'annuaire des entreprises » (RGPD art. 14), à faire valider.
- Corps 50-90 mots (hors signature et pied), texte brut, 0 lien, 0 pièce jointe, pas de prix, typographie française.

### B. Banque par famille (NAF + site → famille)
Toujours nommer le vrai secteur de la réalisation ; jamais « un client comme vous » ; jamais localiser le client (pas dans la source, c019) ;
aucun chiffre hors de la phrase source ; une seule réalisation par mail. Pour chaque famille : 2 objets + 2 questions.

| Famille | Pour qui (NAF indicatifs) | Preuve E1 (source) | Élément nouveau R1 |
|---|---|---|---|
| 1 · Chantier | Terrassement, démolition, gros œuvre, TP, VRD, paysage (43.1x, 43.99C, 41.20x, 42.xx, 81.30Z) | Heures l. 820-821 (12 salariés, 30 secondes avant de rentrer, rappel automatique) ; si fait sur les engins : carburant l. 805-806 (11 engins, pleins vus le jour même) | L'autre preuve terrassement, ou l'article « Terrassement : les coûts cachés des heures, des engins et du carburant » |
| 2 · Interventions chez le client | Second œuvre, chauffage-sanitaire, maintenance, dépannage, nettoyage, ETA, forestier (43.2x, 43.3x, 43.9x, 01.61Z, 01.62Z, 02.xx) | Travaux agricoles l. 812-814 (bon rempli et signé au doigt chez le client, PDF envoyé dans la foulée, plus rien à recopier) | Pointage 12 salariés (si équipe) ou l'article « Bon d'intervention : ce qu'il doit contenir, et un modèle gratuit » |
| 3 · Contrôles et échéances | 80.10Z, 80.20Z, 71.20B, maintenance réglementaire | Sécurité et prévention l. 855-856 (contrôle signalé avant la date, historique exportable en un clic) | Article « Excel ne suffit plus… 7 signes » |
| 4 · Cabinets et dossiers clients | Gestion de patrimoine, courtage, experts-comptables, avocats (« Maître »), immobilier (66.19B, 66.22Z, 69.20Z, 69.10Z, 68.31Z, 68.32A, 70.22Z) | Gestion de patrimoine l. 847-849 (un Excel par client remplacé par une seule application, clients à relancer signalés automatiquement) ; toujours écrire « gestion de patrimoine » | Articles « Relancer un devis sans réponse… » ou « Comment relancer une facture poliment… » |
| 5 · Transport | 49.41x, 49.42Z, 52.29x, 52.10B | Aucune réalisation livrée. Seule formulation admise (accord de Loïc requis) : « Nous construisons en ce moment, pour un transporteur routier, un planning relié directement aux commandes, avec les bons lus depuis Outlook et reportés automatiquement » (l. 825-828, « projet en cours »), aucun résultat annoncé. À défaut : preuve carburant en nommant le terrassement. | Article « Logiciel de gestion transport et parc d'engins… » |
| 6 · Réservations et accueil | Associations, événementiel, loisirs (restauration et commerce = cible C) | Événementiel associatif l. 862-863 (réservation en ligne, confirmation, totaux en direct sans doublon) | Article « Excel ne suffit plus… » |
| 7 · Générique | Aucune famille proche | « Nous construisons des outils sur mesure pour qu'une information ne soit saisie qu'une fois. » + **une seule** phrase exacte du site (c028) : « 7 jours pour mettre en place votre premier outil » OU « Jusqu'à 20 h récupérées chaque semaine chez un client » (l. 883-884), jamais les deux | Article « Excel ne suffit plus… » ou la page modèles gratuits |

Famille 7 autorisée seulement avec un fait de niveau 1, ou de niveau 3 avec douleur explicite. Écarter (HORS-CIBLE) : santé déjà équipée, administrations, enseignes.

### C. Bases des relances
Même fil, même objet, même formule d'appel ; 2-3 phrases ; pied toujours présent ; interdits « je reviens vers vous », « je me permets », « sauf erreur » ;
arrêt dès la première réponse (même « non ») ; message d'absence → attendre le retour. Les brouillons de relance sont créés par `suivi`
(replyToMessageId, après l'envoi par Loïc) ; prospection n'écrit que les bases. Cadence en jours ouvrés :

| Relance | Quand | Contenu |
|---|---|---|
| R1 | E1 + 3 jours ouvrés (≈ J+4/5) | Élément nouveau de la famille ; article cité en texte, ≤ 1 lien ; titres exacts relus dans `blog/` |
| R2 | E1 + 8 jours ouvrés (≈ J+10/12) | 15 min au téléphone, deux créneaux ⟨jour date heure⟩ pris dans l'agenda par `suivi`, ou appel au standard ; jamais « diagnostic offert » (c028) |
| R3 | E1 + 14 jours ouvrés (≈ J+20) | Rupture élégante ; dernière phrase adaptée à la famille (« si un jour ⟨les bons / les échéances / les dossiers⟩ deviennent pénibles… ») |

11/11 férié : sauté.

### D. Procédure de vérification (ordre fixe, ≤ 10 min par entreprise, source citée à chaque étape)
1. **Doublons (c005)** : Gmail `in:anywhere` adresse → domaine → « nom de l'entreprise » + `list_drafts` ; comptes rendus « Campagne – brouillons » précédents ;
   feuille « Prospection SL agence » (« déjà client ») ; liste « Ne plus contacter ». Client / conversation en cours / opposition / contact < 30 jours → écarter.
   Contacté plus tôt sans réponse → pas d'E1 : relance dans le fil existant, signalée, hors quota des 25.
2. **Identité** : API Recherche d'entreprises, nom + ville (code postal), un seul SIREN cohérent ; `etat_administratif=A` ; siège 68 (Alsace toléré) ;
   pas d'ETI/GE, pas de réseau ou franchise ; NAF → famille ; effectif noté (« NN » si non renseigné) ; `statut_diffusion` partiel : ne rien contourner.
3. **Adresse** : syntaxe ; domaine = celui du site, **ou** adresse affichée par l'entreprise (contact, mentions légales, fiche Google, PagesJaunes) — l'URL
   sert d'origine dans le pied ; domaine propre → MX vérifié (`https://dns.google/resolve?name=<domaine>&type=MX`), pas de MX → écarter ;
   adresse nominative d'un salarié non publiée, introuvable publiquement ou coquille → écarter. Jamais deviner ni corriger une adresse.
4. **Formule d'appel** (l'API ne donne pas la civilité, vérifié le 28/10) : « Monsieur/Madame ⟨Nom⟩ » seulement si un dirigeant unique, personne physique,
   actuel et cohérent avec l'API est nommé **avec sa civilité** par une source (site, presse, page entreprise) ; avocats, notaires, commissaires de justice :
   « Maître » ; sinon « Bonjour, » (co-gérants, holding, civilité inconnue, nom vu seulement dans l'API, sources en désaccord). Jamais de civilité devinée
   d'après le prénom, jamais « Bonjour ⟨Prénom⟩ », jamais « Madame, Monsieur ».
5. **Fait réel** — Niveau 1 : signal < 90 jours (offre d'emploi avec employeur nommé, BODACC, presse L'Alsace/DNA, nouvelle agence, publication datée).
   Niveau 2 : 90 jours à 6 mois, cité au passé avec sa date. Niveau 3 : constat vérifiable du jour sur le site ou la fiche, lié à une douleur
   (formulaire PDF à imprimer, « envoyez-nous votre bon par mail », rendez-vous par téléphone uniquement, contrats d'entretien, parc d'engins) — URL + date de consultation.
   Refusé : description pure, compliment, facture électronique comme seul fait (jamais l'amende, c027), avis > 24 mois, offre d'intérim sans employeur nommé.
   La phrase citée doit être dans la page (c026) ; pas d'absence affirmée sans avoir vérifié toutes les pages (c007).
6. **Rédaction** depuis la base, auto-notation §7, nombre de mots indiqué.
7. **Ligne du compte rendu Drive** (pas dans le dépôt) : entreprise · ville · SIREN · famille · source de l'adresse · requêtes Gmail et résultat ·
   fait (niveau, date, URL) · formule et sa source · note · verdict.

### E. Écartements (motifs normalisés)
INTROUVABLE · CESSÉE (ou procédure collective) · HOMONYME · HORS-ZONE (siège hors Alsace) · RÉSEAU (franchise, réseau national, ETI, GE) ·
ADRESSE (incohérente, non publiée, sans MX) · DÉJÀ-CONTACT (client, conversation en cours, opposition, contact < 30 jours) ·
SANS-FAIT (aucun fait niveau 1-3 en 10 min) · HORS-CIBLE (`cible.md`) · QC (< 8 après 2 passes, « à revoir par Loïc »).

### F. Trois exemples remplis, marqués « EXEMPLE FICTIF » et notés
Famille 1 + fait niveau 1 ; famille 2 + fait niveau 3 ; famille 7 générique.

## Critères de réussite (contrôle qualité)
- 3 exemples ≥ 8/10, C1 et C9 respectés ; corps 50-90 mots compté ; objet < 50 caractères.
- Chaque preuve retrouvable mot pour mot à la ligne citée de `realisations.html` ; une seule promesse publique par mail (c028).
- R1/R2/R3 : 2-3 phrases, pied présent, aucune formule interdite.
- Chaque étape de la procédure nomme son outil, sa requête et sa condition de réussite/échec ; motifs d'écartement exhaustifs.
- Aucun nom réel, aucun lien Drive (c004, c021) ; les 25 mails d'un même jour n'ont jamais la même première ligne.

## Corrections à respecter
c002 (pas de CRM ni Make) · c004/c021 (zéro donnée personnelle, zéro lien Drive) · c005 (Gmail adresse + domaine + nom, cité) · c007 · c010 · c011 ·
c019 (preuve limitée à `realisations.html`) · c026 · c027 (jamais l'amende FE) · c028 (une seule phrase du site par promesse).

## Pièges
- Laisser entendre à un plombier qu'on a équipé un plombier (toujours nommer le vrai secteur).
- Utiliser un chantier « en cours » comme une réussite ; dates relatives ; mots qui déclenchent les filtres (gratuit, offre, urgent).
- Double signature si Gmail ajoute la sienne : à vérifier sur le premier brouillon.
- Compter une relance dans le quota des E1.

## Pour le Manager — volumes et temps de Loïc (c027, calcul SL Agence, durées unitaires = hypothèses à mesurer)
| Poste / jour en régime établi (≈ dès le 19/11) | Volume | Durée unitaire | Minutes |
|---|---|---|---|
| Relire et envoyer les E1 | 25 | 1 min 30 | ≈ 38 |
| Relire et envoyer les relances | ≤ 75 (≈ 65-68 si 10 % de réponses) | 30 s | ≈ 33-38 |
| Traiter les réponses | ≈ 2-3 | 5 min | ≈ 10-15 |
| **Total** | | | **≈ 80-90 min/jour** |

Montée en charge : semaine du 29/10 ≈ 40-55 min/jour (R1 dès le 03/11) ; dès le 10/11 ≈ 75 min/jour. Liste nécessaire : ≈ 210 lignes/semaine
si 40 % d'écartées (hypothèse). Délivrabilité : pause si rebonds > 2 % sur une semaine ; test mail-tester du mail de base avant le premier envoi.

## Retour
<rempli par prospection : fichier produit, notes des exemples, écarts signalés, statut>
