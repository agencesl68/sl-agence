/* ============================================================
   Prise de rendez-vous SL Agence
   Une fenêtre simple : 1. on choisit un jour puis un créneau (des carrés),
   2. on laisse ses coordonnées (pas besoin de décrire son besoin), 3. c'est envoyé.

   - S'ouvre à la place des liens Google Agenda (ils restent en secours sans JS),
     sur tout élément [data-rdv], et à l'arrivée sur une adresse finissant par #rendez-vous.
   - Le site n'a pas de serveur : les créneaux proposés sont nos horaires habituels
     (jours fériés d'Alsace-Moselle exclus) ; la demande part par le même canal que
     le formulaire de contact, et l'équipe confirme le créneau au client.
   ============================================================ */
(function(){
  "use strict";

  var WEBHOOK = "https://hook.eu1.make.com/amtz92481aosrjlm8g5h5qojh74rwurd";   // même canal que le formulaire de contact
  var MATIN = ["09:00","09:30","10:00","10:30","11:00","11:30"];
  var APREM = ["14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];
  var NB_JOURS = 12;                 // jours ouvrés proposés
  var DELAI_MIN = 2 * 3600 * 1000;   // pas de créneau à moins de 2 h
  var APERCU = !!window.SL_RDV_APERCU;   // maquette : rien n'est envoyé

  var JOURS = ["dim.","lun.","mar.","mer.","jeu.","ven.","sam."];
  var JOURS_LONGS = ["dimanche","lundi","mardi","mercredi","jeudi","vendredi","samedi"];
  var MOIS = ["janv.","févr.","mars","avr.","mai","juin","juil.","août","sept.","oct.","nov.","déc."];
  var MOIS_LONGS = ["janvier","février","mars","avril","mai","juin","juillet","août","septembre","octobre","novembre","décembre"];

  /* ---------- calendrier ---------- */

  function paques(an){   // algorithme de Meeus
    var a = an % 19, b = Math.floor(an / 100), c = an % 100, d = Math.floor(b / 4), e = b % 4,
        f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
        i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7,
        m = Math.floor((a + 11 * h + 22 * l) / 451), mois = Math.floor((h + l - 7 * m + 114) / 31),
        jour = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(an, mois - 1, jour);
  }
  function cle(d){ return d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate(); }
  function decale(d, n){ var x = new Date(d); x.setDate(x.getDate() + n); return x; }
  function feries(an){   // France + Alsace-Moselle (Vendredi saint, 26 décembre)
    var p = paques(an), f = {};
    [[0,1],[4,1],[4,8],[6,14],[7,15],[10,1],[10,11],[11,25],[11,26]].forEach(function(md){ f[cle(new Date(an, md[0], md[1]))] = 1; });
    [-2, 1, 39, 50].forEach(function(n){ f[cle(decale(p, n))] = 1; });
    return f;
  }
  function horaires(d){
    var j = d.getDay();
    if(j === 0){ return []; }
    if(j === 6){ return MATIN.slice(); }
    return MATIN.concat(APREM);
  }
  function aLHeure(d, h){ var x = new Date(d); x.setHours(+h.slice(0, 2), +h.slice(3), 0, 0); return x; }

  function joursProposes(){
    var res = [], d = new Date(), maintenant = Date.now(), fer = {};
    d.setHours(0, 0, 0, 0);
    for(var n = 0; res.length < NB_JOURS && n < 40; n++){
      var jour = decale(d, n);
      if(!fer[jour.getFullYear()]){ fer[jour.getFullYear()] = feries(jour.getFullYear()); }
      if(fer[jour.getFullYear()][cle(jour)]){ continue; }
      var libres = horaires(jour).filter(function(h){ return aLHeure(jour, h).getTime() - maintenant >= DELAI_MIN; });
      if(libres.length){ res.push({date: jour, creneaux: libres}); }
    }
    return res;
  }

  function heureFr(h){ return h.slice(0, 2).replace(/^0/, "") + " h" + (h.slice(3) === "00" ? "" : " " + h.slice(3)); }
  function dateFr(d){ return JOURS_LONGS[d.getDay()] + " " + d.getDate() + " " + MOIS_LONGS[d.getMonth()]; }

  /* ---------- la fenêtre ---------- */

  var racine, carte, pas = [], fil, joursEl, creneauxEl, rappel, form, erreur, envoyer, fin;
  var choix = {jour: null, heure: null}, retourFocus = null, liste = [];

  function el(tag, attrs, html){
    var e = document.createElement(tag);
    for(var k in attrs){ e.setAttribute(k, attrs[k]); }
    if(html != null){ e.innerHTML = html; }
    return e;
  }

  function construire(){
    racine = el("div", {"class": "rdv", id: "rdv", role: "dialog", "aria-modal": "true", "aria-labelledby": "rdvTitre", hidden: ""});
    racine.innerHTML =
      '<div class="rdv-voile" data-fermer></div>' +
      '<div class="rdv-carte">' +
        '<div class="rdv-tete"><div><h2 id="rdvTitre">Prendre rendez-vous</h2>' +
          '<p>Un appel de 15 minutes, gratuit et sans engagement.</p></div>' +
          '<button type="button" class="rdv-x" data-fermer aria-label="Fermer">×</button></div>' +
        '<ol class="rdv-fil"><li class="rv-actif">Votre créneau</li><li>Vos coordonnées</li></ol>' +

        '<div class="rdv-pas" data-pas="1">' +
          '<div class="rdv-jours" aria-label="Choisissez un jour"></div>' +
          '<div class="rdv-creneaux"></div>' +
        '</div>' +

        '<div class="rdv-pas" data-pas="2" hidden>' +
          '<button type="button" class="rdv-rappel"></button>' +
          '<form class="rdv-form" novalidate>' +
            '<div class="rdv-duo">' +
              '<div class="rdv-champ"><label for="rdvPrenom">Prénom</label><input id="rdvPrenom" name="prenom" autocomplete="given-name" required></div>' +
              '<div class="rdv-champ"><label for="rdvNom">Nom</label><input id="rdvNom" name="nom" autocomplete="family-name" required></div>' +
            '</div>' +
            '<div class="rdv-duo">' +
              '<div class="rdv-champ"><label for="rdvEmail">E-mail</label><input id="rdvEmail" name="email" type="email" autocomplete="email" required></div>' +
              '<div class="rdv-champ"><label for="rdvTel">Téléphone</label><input id="rdvTel" name="telephone" type="tel" autocomplete="tel" required></div>' +
            '</div>' +
            '<div class="rdv-champ"><label for="rdvEntreprise">Entreprise <i>(facultatif)</i></label><input id="rdvEntreprise" name="entreprise" autocomplete="organization"></div>' +
            '<div class="rdv-hp" aria-hidden="true"><label for="rdvSite">Ne pas remplir</label><input id="rdvSite" name="website" tabindex="-1" autocomplete="off"></div>' +
            '<div class="rdv-erreur" role="alert"></div>' +
            '<button type="submit" class="rdv-envoyer">Confirmer le rendez-vous</button>' +
            '<p class="rdv-note">Vos coordonnées servent uniquement à vous appeler. ' +
              '<a href="/politique-de-confidentialite">Politique de confidentialité</a>.</p>' +
          '</form>' +
        '</div>' +

        '<div class="rdv-pas rdv-fait" data-pas="3" hidden>' +
          '<div class="rdv-coche" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12.5l5.5 5.5L20 7"/></svg></div>' +
          '<h3>C\'est noté !</h3>' +
          '<p class="rdv-recap"></p>' +
          '<button type="button" class="rdv-envoyer" data-fermer>Fermer</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(racine);

    carte = racine.querySelector(".rdv-carte");
    pas = racine.querySelectorAll(".rdv-pas");
    fil = racine.querySelectorAll(".rdv-fil li");
    joursEl = racine.querySelector(".rdv-jours");
    creneauxEl = racine.querySelector(".rdv-creneaux");
    rappel = racine.querySelector(".rdv-rappel");
    form = racine.querySelector(".rdv-form");
    erreur = racine.querySelector(".rdv-erreur");
    envoyer = form.querySelector(".rdv-envoyer");
    fin = racine.querySelector(".rdv-recap");

    racine.addEventListener("click", function(e){ if(e.target.closest("[data-fermer]")){ fermer(); } });
    racine.addEventListener("keydown", function(e){
      if(e.key === "Escape"){ fermer(); }
      if(e.key === "Tab"){ piegeFocus(e); }
    });
    rappel.addEventListener("click", function(){ etape(1); });
    form.addEventListener("submit", soumettre);
  }

  function etape(n){
    pas.forEach(function(p){ p.hidden = +p.dataset.pas !== n; });
    fil[0].className = n === 1 ? "rv-actif" : "rv-fait";
    fil[1].className = n === 2 ? "rv-actif" : (n === 3 ? "rv-fait" : "");
    racine.querySelector(".rdv-fil").hidden = n === 3;
    carte.scrollTop = 0;
    var cible = n === 1 ? (joursEl.querySelector('[aria-pressed="true"]') || joursEl.firstChild)
              : n === 2 ? form.querySelector("input") : racine.querySelector(".rdv-fait .rdv-envoyer");
    if(cible){ setTimeout(function(){ cible.focus({preventScroll: n !== 2}); }, 60); }
  }

  function afficherJours(){
    liste = joursProposes();
    joursEl.innerHTML = "";
    liste.forEach(function(j, i){
      var b = el("button", {type: "button", "class": "rdv-jour", "aria-pressed": "false",
                            "aria-label": dateFr(j.date)},
                 "<small>" + JOURS[j.date.getDay()] + "</small><b>" + j.date.getDate() + "</b><small>" + MOIS[j.date.getMonth()] + "</small>");
      b.addEventListener("click", function(){ choisirJour(i); });
      joursEl.appendChild(b);
    });
    choisirJour(0);
  }

  function choisirJour(i){
    choix.jour = i; choix.heure = null;
    joursEl.querySelectorAll(".rdv-jour").forEach(function(b, k){ b.setAttribute("aria-pressed", k === i ? "true" : "false"); });
    var j = liste[i];
    creneauxEl.innerHTML = "";
    if(!j){ creneauxEl.innerHTML = '<p class="rdv-vide">Aucun créneau disponible pour le moment. Écrivez-nous plutôt : nous vous rappelons.</p>'; return; }
    [["Matin", MATIN], ["Après-midi", APREM]].forEach(function(bloc){
      var heures = j.creneaux.filter(function(h){ return bloc[1].indexOf(h) >= 0; });
      if(!heures.length){ return; }
      creneauxEl.appendChild(el("p", {"class": "rdv-moment"}, bloc[0]));
      var g = el("div", {"class": "rdv-grille"});
      heures.forEach(function(h){
        var b = el("button", {type: "button", "class": "rdv-creneau", "aria-pressed": "false",
                              "aria-label": dateFr(j.date) + " à " + heureFr(h)}, heureFr(h));
        b.addEventListener("click", function(){ choisirHeure(h, b); });
        g.appendChild(b);
      });
      creneauxEl.appendChild(g);
    });
  }

  function choisirHeure(h, bouton){
    choix.heure = h;
    creneauxEl.querySelectorAll(".rdv-creneau").forEach(function(b){ b.setAttribute("aria-pressed", b === bouton ? "true" : "false"); });
    var j = liste[choix.jour];
    rappel.innerHTML = "<div><b>" + dateFr(j.date).replace(/^./, function(c){ return c.toUpperCase(); }) +
                       " à " + heureFr(h) + "</b><small>Appel de 15 minutes</small></div><span>Modifier</span>";
    setTimeout(function(){ etape(2); }, 180);   // le carré s'allume, puis on passe à la suite
  }

  /* ---------- envoi ---------- */

  function nettoie(s){
    return (s || "").replace(/[\r\n\t]+/g, " ").replace(/\\/g, "/").replace(/"/g, "”").replace(/\s+/g, " ").trim();
  }

  function soumettre(e){
    e.preventDefault();
    erreur.classList.remove("montre");
    if(form.website.value){ return; }
    var premier = null;
    form.querySelectorAll("input[required]").forEach(function(i){
      var ok = i.checkValidity();
      i.setAttribute("aria-invalid", ok ? "false" : "true");
      if(!ok && !premier){ premier = i; }
    });
    if(premier){
      erreur.textContent = "Il manque une information (ou l'e-mail n'est pas valide) : vérifiez le champ entouré.";
      erreur.classList.add("montre"); premier.focus(); return;
    }

    var j = liste[choix.jour], h = choix.heure;
    var quand = dateFr(j.date) + " " + j.date.getFullYear() + " à " + heureFr(h);
    var iso = j.date.getFullYear() + "-" + String(j.date.getMonth() + 1).padStart(2, "0") + "-" + String(j.date.getDate()).padStart(2, "0") + "T" + h;
    var payload = {
      prenom: nettoie(form.prenom.value),
      nom: nettoie(form.nom.value),
      entreprise: nettoie(form.entreprise.value),
      email: form.email.value.trim(),
      telephone: nettoie(form.telephone.value),
      theme: "Autre",
      message: "DEMANDE DE RENDEZ-VOUS : appel de 15 minutes le " + quand + ". (Envoyé depuis la prise de rendez-vous du site.)",
      rendezvous: iso,
      date: new Date().toLocaleString("fr-FR", {timeZone: "Europe/Paris"}),
      source: location.href.split("#")[0] + " (prise de rendez-vous)"
    };

    envoyer.disabled = true; envoyer.textContent = "Envoi…";
    var envoi = APERCU ? new Promise(function(ok){ setTimeout(ok, 700); })
                       : fetch(WEBHOOK, {method: "POST", headers: {"Content-Type": "application/json"}, body: JSON.stringify(payload)})
                           .then(function(r){ if(!r.ok){ throw new Error("statut " + r.status); } });
    envoi.then(function(){
      fin.innerHTML = "Nous vous appelons le <strong>" + quand + "</strong> au <strong>" + payload.telephone.replace(/</g, "&lt;") +
                      "</strong>.<br>Nous vous confirmons ce créneau par e-mail dans la journée.";
      etape(3);
    }).catch(function(){
      erreur.innerHTML = "L'envoi n'a pas abouti. Réessayez, ou appelez-nous au 07 67 08 19 43.";
      erreur.classList.add("montre");
    }).then(function(){
      envoyer.disabled = false; envoyer.textContent = "Confirmer le rendez-vous";
    });
  }

  /* ---------- ouvrir / fermer ---------- */

  function ouvrir(){
    if(!racine){ construire(); }
    retourFocus = document.activeElement;
    form.reset(); erreur.classList.remove("montre");
    form.querySelectorAll("input").forEach(function(i){ i.removeAttribute("aria-invalid"); });
    afficherJours();
    racine.hidden = false;
    document.documentElement.classList.add("rdv-ouvert");
    etape(1);
  }

  function fermer(){
    if(!racine || racine.hidden){ return; }
    racine.hidden = true;
    document.documentElement.classList.remove("rdv-ouvert");
    if(location.hash === "#rendez-vous"){ history.replaceState(null, "", location.pathname + location.search); }
    if(retourFocus && retourFocus.focus){ retourFocus.focus(); }
  }

  function piegeFocus(e){
    var f = Array.prototype.filter.call(
      carte.querySelectorAll("button,input,a[href]"),
      function(x){ return x.offsetParent !== null && !x.disabled && x.tabIndex !== -1; });
    if(!f.length){ return; }
    var a = f[0], z = f[f.length - 1];
    if(e.shiftKey && document.activeElement === a){ e.preventDefault(); z.focus(); }
    else if(!e.shiftKey && document.activeElement === z){ e.preventDefault(); a.focus(); }
  }

  document.addEventListener("click", function(e){
    var a = e.target.closest('[data-rdv],a[href*="calendar.google.com/calendar/appointments"],a[href$="#rendez-vous"]');
    if(!a || e.ctrlKey || e.metaKey || e.shiftKey){ return; }
    var href = a.getAttribute("href") || "";
    // un lien #rendez-vous vers une autre page : on laisse la navigation se faire
    if(/#rendez-vous$/.test(href) && href.charAt(0) !== "#" && href.split("#")[0] !== location.pathname){ return; }
    e.preventDefault();
    ouvrir();
  });
  if(location.hash === "#rendez-vous"){ ouvrir(); }
  window.addEventListener("hashchange", function(){ if(location.hash === "#rendez-vous"){ ouvrir(); } });
})();
