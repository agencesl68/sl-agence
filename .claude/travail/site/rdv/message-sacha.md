# Message pour Sacha — rendez-vous du site → Google Agenda (Make)

> Préparé le 28/10/2026. À envoyer par Loïc (WhatsApp, e-mail…). Make est le périmètre de Sacha : on ne touche à rien de notre côté.

---

Salut Sacha,

Depuis aujourd'hui, le bouton « Prendre rendez-vous » du site n'envoie plus vers Google Agenda. Une petite fenêtre s'ouvre directement sur le site : le client choisit un jour, puis un créneau de 15 min, puis il laisse son prénom, son nom, son e-mail, son téléphone et son entreprise (facultatif).

La demande arrive **sur le même webhook Make que le formulaire de contact**, donc tu n'as rien à brancher. Pour l'instant, elle arrive comme un message de contact qui commence par « DEMANDE DE RENDEZ-VOUS ». Mais rien ne s'inscrit dans l'agenda, et il faut confirmer chaque créneau à la main.

**Est-ce que tu pourrais ajouter une branche dans le scénario du formulaire pour créer l'événement automatiquement ?**

1. **Filtre** : seules les demandes de rendez-vous contiennent le champ `rendezvous` (le formulaire de contact ne l'a pas). Condition : `rendezvous` existe.
2. **Google Agenda → Créer un événement**
   - Début : `parseDate(rendezvous; "YYYY-MM-DDTHH:mm"; "Europe/Paris")`. Le champ arrive au format `2026-10-29T09:30`, en heure de Paris, sans fuseau.
   - Durée : 15 minutes.
   - Titre : `Appel 15 min — {prenom} {nom}` (+ `{entreprise}` si rempli).
   - Description : `telephone`, `email` et `source` (la page d'où vient la demande).
   - Invité : `email` du client. Google lui envoie l'invitation, ce qui vaut confirmation.
3. **Optionnel**, contre les doublons : avant de créer l'événement, chercher dans l'agenda si quelque chose existe déjà sur ce créneau. Si oui, on ne crée rien, et on reçoit juste une alerte pour rappeler le client et lui proposer une autre heure. Le site ne connaît pas l'agenda, donc il peut proposer un créneau déjà pris.

Les autres champs restent comme pour le formulaire : `theme` (toujours « Autre »), `message` (phrase lisible avec la date) et `date` (heure d'envoi).

Les créneaux proposés sur le site : du lundi au vendredi de 9 h à 12 h et de 14 h à 18 h, le samedi matin, jamais à moins de 2 h. Les jours fériés (Alsace-Moselle compris) sont exclus. Dis-moi si ça ne colle pas avec tes disponibilités.

Une fois que c'est en place, l'ancienne page de réservation Google Agenda ne sert plus. Tu peux la désactiver quand tu veux.

Merci !
Loïc
