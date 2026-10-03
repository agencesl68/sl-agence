"use strict";

const etat = { vue: "aujourdhui", filtre: "", statuts: {}, nbLeads: 10, enCours: false, suivi: null };

const $ = (s, el = document) => el.querySelector(s);
const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

async function api(url, options = {}) {
  const r = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(data.erreur || `Erreur ${r.status}`);
  return data;
}

function toast(texte) {
  const t = $("#toast");
  t.textContent = texte;
  t.classList.add("visible");
  clearTimeout(t._minuteur);
  t._minuteur = setTimeout(() => t.classList.remove("visible"), 2200);
}

async function copier(texte) {
  try {
    await navigator.clipboard.writeText(texte);
  } catch {
    const zone = document.createElement("textarea");
    zone.value = texte;
    document.body.appendChild(zone);
    zone.select();
    document.execCommand("copy");
    zone.remove();
  }
  toast("Copié");
}

function lienSource(url, texte = "source") {
  if (!url || !/^https?:/.test(url)) return "";
  return `<span class="source">(<a href="${esc(url)}" target="_blank" rel="noopener">${esc(texte)}</a>)</span>`;
}

function hote(url) {
  try { return new URL(url).hostname.replace(/^www\./, ""); } catch { return url; }
}

const nonTrouve = (v) => !v || String(v).toLowerCase().startsWith("non trouv");

/* ---------- En-tête et état ---------- */

async function rafraichirEtat() {
  const e = await api("/api/etat");
  etat.ordre = e.statuts;
  etat.statuts = Object.fromEntries(e.statuts);
  etat.nbLeads = e.nb_leads;
  const c = e.conso;
  $("#compteur").innerHTML =
    `Aujourd'hui : <strong>${c.appels}</strong> appels API · ` +
    `<strong>${c.cout.toFixed(2)} $</strong> sur ${Number(e.plafond).toFixed(2)} $`;
  const alerte = $("#alerte");
  if (!e.cle_presente) {
    alerte.className = "alerte";
    alerte.innerHTML = "Clé API Anthropic absente. Ouvrez le fichier <strong>.env</strong> du dossier de l'application, collez votre clé après <code>ANTHROPIC_API_KEY=</code>, puis relancez.";
  } else {
    alerte.className = "alerte cache";
  }
  majGeneration(e.generation);
  if (!etat.enCours) $("#btn-generer").textContent = `Générer ${etat.nbLeads} nouveaux leads`;
  return e;
}

/* ---------- Génération ---------- */

function majGeneration(g) {
  const bloc = $("#progression");
  if (!g || !g.voulus) { bloc.classList.add("cache"); return; }
  bloc.classList.remove("cache");
  const faits = (g.ajoutes || 0) + (g.a_completer || 0);
  const pct = g.en_cours ? Math.max(4, Math.round((100 * faits) / g.voulus)) : 100;
  $("#barre-remplie").style.width = `${Math.min(100, pct)}%`;
  $("#prog-etape").textContent = g.en_cours ? g.etape : (g.erreur ? `Arrêté : ${g.erreur}` : "Terminé");
  let compte = `${g.ajoutes || 0} ajoutés / ${g.voulus}`;
  if (g.ecartes) compte += ` · ${g.ecartes} écartés (note basse)`;
  if (g.a_completer) compte += ` · ${g.a_completer} à compléter`;
  if (!g.en_cours && g.cout_lot != null) compte += ` · coût du lot ${g.cout_lot.toFixed(2)} $`;
  $("#prog-compte").textContent = compte;
  $("#prog-journal").textContent = (g.journal || []).join("\n");
  const btn = $("#btn-generer");
  const etaitEnCours = etat.enCours;
  etat.enCours = !!g.en_cours;
  btn.disabled = etat.enCours;
  btn.textContent = etat.enCours ? "Génération en cours..." : `Générer ${etat.nbLeads} nouveaux leads`;
  if (etat.enCours && !etat.suivi) etat.suivi = setInterval(suivreGeneration, 1500);
  if (!etat.enCours && etat.suivi) { clearInterval(etat.suivi); etat.suivi = null; }
  if (etaitEnCours && !etat.enCours) { afficher(); rafraichirEtat(); }
}

async function suivreGeneration() {
  try {
    const g = await api("/api/generation");
    majGeneration(g);
    if (g.en_cours && g.ajoutes !== etat._derniersAjoutes) {
      etat._derniersAjoutes = g.ajoutes;
      if (etat.vue === "aujourdhui" || etat.vue === "leads") afficher();
      rafraichirEtat();
    }
  } catch (e) { /* serveur arrêté : on réessaie */ }
}

$("#btn-generer").addEventListener("click", async () => {
  try {
    await api("/api/generer", { method: "POST", body: { nb: etat.nbLeads } });
    etat._derniersAjoutes = 0;
    majGeneration({ en_cours: true, voulus: etat.nbLeads, etape: "Démarrage", ajoutes: 0 });
  } catch (e) { toast(e.message); }
});

/* ---------- Carte d'un lead ---------- */

function blocMessage(l, nature) {
  const conf = {
    invitation: { titre: "Invitation", champ: "invitation", limite: 300, elt: l.invitation_element, src: l.invitation_source, copie: "Copier l'invitation" },
    suivi: { titre: "Message de suivi", champ: "message_suivi", limite: 600, elt: l.suivi_element, src: l.suivi_source, copie: "Copier le message" },
  }[nature];
  const texte = l[conf.champ] || "";
  if (!texte) return "";
  return `
    <div class="message" data-nature="${nature}">
      <div class="message-titre"><span>${conf.titre}</span>
        <span class="nb-car ${texte.length > conf.limite ? "trop" : ""}">${texte.length} / ${conf.limite}</span></div>
      <textarea data-champ="${conf.champ}" data-limite="${conf.limite}">${esc(texte)}</textarea>
      ${conf.elt ? `<div class="element">Élément cité : ${esc(conf.elt)} ${lienSource(conf.src, hote(conf.src))}</div>` : ""}
      <div class="boutons">
        <button class="bouton" data-action="copier">${conf.copie}</button>
        <button class="bouton discret" data-action="reecrire" data-nature="${nature}">Réécrire</button>
      </div>
    </div>`;
}

function blocRelance(l) {
  if (l.statut !== "message_envoye") return "";
  return `
    <div class="message" data-nature="relance" style="margin-top:1rem">
      <div class="message-titre"><span>Relance</span><span class="nb-car">${(l.relance || "").length} / 400</span></div>
      ${l.relance
        ? `<textarea data-champ="relance" data-limite="400">${esc(l.relance)}</textarea>
           <div class="boutons">
             <button class="bouton" data-action="copier">Copier la relance</button>
             <button class="bouton discret" data-action="relance">Réécrire</button>
             <button class="bouton discret" data-action="relance-envoyee">${l.relance_envoyee_le ? "Relance envoyée le " + l.relance_envoyee_le.slice(0, 10) : "J'ai envoyé la relance"}</button>
           </div>`
        : `<div class="boutons" style="margin-top:.5rem"><button class="bouton" data-action="relance">Écrire la relance</button></div>`}
    </div>`;
}

function carte(l) {
  const fort = (l.score ?? 0) >= 70;
  const d = l.score_detail || {};
  const faits = [
    ...(l.taches || []).map((f) => `<li>${esc(f.fait)} ${lienSource(f.source, hote(f.source))}</li>`),
  ].join("");
  const signaux = (l.signaux || []).map((f) => `<li>${esc(f.fait)} ${lienSource(f.source, hote(f.source))}</li>`).join("");
  const dirigeant = nonTrouve(l.dirigeant_nom)
    ? `<span class="meta">Dirigeant : non trouvé</span>`
    : `<strong>${esc(l.dirigeant_nom)}</strong>${l.dirigeant_poste ? ", " + esc(l.dirigeant_poste) : ""} ${lienSource(l.dirigeant_source, hote(l.dirigeant_source))}`;
  const site = nonTrouve(l.site_web) ? "Site : non trouvé"
    : `<a href="${esc(/^https?:/.test(l.site_web) ? l.site_web : "https://" + l.site_web)}" target="_blank" rel="noopener">${esc(hote(/^https?:/.test(l.site_web) ? l.site_web : "https://" + l.site_web))}</a>`;
  const statuts = etat.ordre.map(([cle, lib]) =>
    `<button class="puce ${cle} ${l.statut === cle ? "actif" : ""}" data-action="statut" data-statut="${cle}">${esc(lib)}</button>`).join("");
  return `
  <article class="carte ${l.etat === "a_completer" ? "a-completer" : ""}" data-id="${l.id}">
    <div class="carte-tete">
      <div>
        <h3>${esc(l.nom)}</h3>
        <div class="meta">${esc(l.commune || "")}${l.distance_km != null ? ` · ${Math.round(l.distance_km)} km de Mulhouse` : ""} · ${esc(l.naf_libelle || l.naf || "")} · ${esc(l.tranche_libelle || "")} · ${site}</div>
      </div>
      ${l.score != null ? `<div class="score ${fort ? "fort" : ""}">${l.score}<small>/100</small></div>` : `<div class="score"><small>à compléter</small></div>`}
    </div>
    <div class="dirigeant">${dirigeant}</div>
    ${!nonTrouve(l.activite) ? `<p class="justification">${esc(l.activite)} ${lienSource(l.activite_source, hote(l.activite_source))}</p>` : ""}
    ${l.justification ? `<p class="justification"><em>${esc(l.justification)}</em></p>` : ""}
    ${l.etat === "a_completer" ? `<div class="erreur-lead">Recherche incomplète${l.erreur ? " : " + esc(l.erreur) : ""}.
       <button class="bouton" data-action="completer" style="margin-left:.5rem">Compléter la recherche</button></div>` : (l.erreur ? `<div class="erreur-lead">${esc(l.erreur)}</div>` : "")}
    ${(faits || signaux || l.score != null) ? `
    <details class="trouve"><summary>Ce qui a été trouvé</summary>
      <strong>Tâches répétitives ou papier</strong>
      ${faits ? `<ul>${faits}</ul>` : `<p class="meta">non trouvé</p>`}
      <strong>Signaux de croissance ou de charge</strong>
      ${signaux ? `<ul>${signaux}</ul>` : `<p class="meta">non trouvé</p>`}
      <p class="detail-score">Détail de la note : tâches ${d.taches ?? "?"}/35 · signaux ${d.signaux ?? "?"}/20 · taille ${d.taille ?? "?"}/10 · proximité ${d.proximite ?? "?"}/10 · dirigeant ${d.dirigeant ?? "?"}/15 · ancienneté ${d.capacite ?? "?"}/10${d.bonus_batiment ? ` · bonus bâtiment +${d.bonus_batiment}` : ""}
      · <a href="${esc(l.registre_url)}" target="_blank" rel="noopener">fiche du registre</a></p>
    </details>` : ""}
    <div class="messages">${blocMessage(l, "invitation")}${blocMessage(l, "suivi")}</div>
    ${blocRelance(l)}
    <div class="pied">
      <a class="bouton" href="${esc(l.linkedin)}" target="_blank" rel="noopener">Chercher sur LinkedIn</a>
      <div class="statuts">${statuts}</div>
      <button class="bouton danger" data-action="supprimer">Supprimer définitivement</button>
    </div>
  </article>`;
}

function remplacerCarte(l) {
  document.querySelectorAll(`.carte[data-id="${l.id}"]`).forEach((el) => {
    el.outerHTML = carte(l);
  });
}

document.addEventListener("click", async (ev) => {
  const b = ev.target.closest("[data-action]");
  if (!b) return;
  const c = b.closest(".carte");
  const id = c?.dataset.id;
  const action = b.dataset.action;
  try {
    if (action === "copier") {
      await copier(b.closest(".message").querySelector("textarea").value);
    } else if (action === "statut") {
      const l = await api(`/api/leads/${id}/statut`, { method: "POST", body: { statut: b.dataset.statut } });
      if (etat.vue === "aujourdhui" || (etat.filtre && etat.filtre !== l.statut)) afficher(); else remplacerCarte(l);
      toast(l.statut_libelle);
    } else if (action === "reecrire") {
      b.disabled = true; b.textContent = "Réécriture...";
      remplacerCarte(await api(`/api/leads/${id}/reecrire`, { method: "POST", body: { nature: b.dataset.nature } }));
      rafraichirEtat();
    } else if (action === "relance") {
      b.disabled = true; b.textContent = "Écriture...";
      remplacerCarte(await api(`/api/leads/${id}/relance`, { method: "POST" }));
      rafraichirEtat();
    } else if (action === "relance-envoyee") {
      await api(`/api/leads/${id}/relance_envoyee`, { method: "POST" });
      afficher();
    } else if (action === "completer") {
      b.disabled = true; b.textContent = "Recherche en cours (1 à 2 min)...";
      remplacerCarte(await api(`/api/leads/${id}/completer`, { method: "POST" }));
      rafraichirEtat();
    } else if (action === "supprimer") {
      if (!confirm("Supprimer définitivement ce lead ? Toutes ses données seront effacées, et l'entreprise ne sera plus jamais proposée.")) return;
      await api(`/api/leads/${id}`, { method: "DELETE" });
      c.remove();
      toast("Supprimé");
    }
  } catch (e) {
    toast(e.message);
    if (b.disabled) afficher();
  }
});

document.addEventListener("input", (ev) => {
  const z = ev.target;
  if (z.tagName !== "TEXTAREA" || !z.dataset.champ) return;
  const compteur = z.closest(".message").querySelector(".nb-car");
  compteur.textContent = `${z.value.length} / ${z.dataset.limite}`;
  compteur.classList.toggle("trop", z.value.length > Number(z.dataset.limite));
});

document.addEventListener("change", async (ev) => {
  const z = ev.target;
  if (z.tagName !== "TEXTAREA" || !z.dataset.champ) return;
  const id = z.closest(".carte").dataset.id;
  try {
    await api(`/api/leads/${id}/texte`, { method: "POST", body: { champ: z.dataset.champ, texte: z.value } });
    toast("Modification enregistrée");
  } catch (e) { toast(e.message); }
});

/* ---------- Vues ---------- */

async function vueAujourdhui() {
  const d = await api("/api/aujourdhui");
  const section = (titre, liste, vide) =>
    `<h2>${titre}<span class="nb">${liste.length}</span></h2>` +
    (liste.length ? liste.map(carte).join("") : `<p class="vide">${vide}</p>`);
  $("#vue-aujourdhui").innerHTML =
    section("Message de suivi à envoyer", d.suivis, "Aucune invitation acceptée en attente.") +
    section("Relances à faire", d.relances, "Aucune relance due (7 jours après un message sans réponse).") +
    section("À contacter", d.a_contacter, "Aucun lead à contacter. Cliquez sur « Générer » pour en trouver.");
}

async function vueLeads() {
  const leads = await api("/api/leads" + (etat.filtre ? `?statut=${etat.filtre}` : ""));
  const puces = [["", "Tous"], ...etat.ordre].map(([cle, lib]) =>
    `<button class="puce ${etat.filtre === cle ? "actif" : ""}" data-filtre="${cle}">${esc(lib)}</button>`).join("");
  $("#vue-leads").innerHTML = `
    <div class="filtres">${puces}<span class="espace"></span>
      <a class="bouton discret" href="/api/export.csv">Exporter en CSV</a></div>
    ${leads.length ? leads.map(carte).join("") : `<p class="vide">Aucun lead ici.</p>`}`;
  document.querySelectorAll("[data-filtre]").forEach((b) => b.addEventListener("click", () => {
    etat.filtre = b.dataset.filtre; vueLeads();
  }));
}

async function vueTableau() {
  const t = await api("/api/tableau");
  const tot = t.semaines.reduce((a, s) => {
    for (const k of ["contactes", "acceptees", "messages", "reponses", "rdv"]) a[k] = (a[k] || 0) + s[k];
    return a;
  }, {});
  const taux = (n, d) => (d ? `${Math.round((100 * n) / d)} %` : "·");
  const lignes = t.semaines.map((s) => `
    <tr><td>Semaine du ${new Date(s.debut).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })}</td>
    <td>${s.contactes}</td><td>${s.acceptees}</td><td>${taux(s.acceptees, s.contactes)}</td>
    <td>${s.messages}</td><td>${s.reponses}</td><td>${s.rdv}</td></tr>`).join("");
  const enCours = Object.entries(t.statuts_actuels).map(([k, n]) => `${esc(etat.statuts[k] || k)} : ${n}`).join(" · ");
  $("#vue-tableau").innerHTML = `
    <h2>Par semaine</h2>
    ${t.semaines.length ? `<table>
      <thead><tr><th>Semaine</th><th>Contactés</th><th>Acceptées</th><th>Taux d'acceptation</th><th>Messages</th><th>Réponses</th><th>Rendez-vous</th></tr></thead>
      <tbody>${lignes}
      <tr class="total"><td>Total (12 dernières semaines)</td><td>${tot.contactes}</td><td>${tot.acceptees}</td><td>${taux(tot.acceptees, tot.contactes)}</td><td>${tot.messages}</td><td>${tot.reponses}</td><td>${tot.rdv}</td></tr>
      </tbody></table>` : `<p class="vide">Les chiffres apparaîtront dès que vous changerez le statut de vos premiers leads.</p>`}
    <p class="meta" style="margin-top:1rem">« Contactés » compte les invitations envoyées dans la semaine. Leads en base aujourd'hui : ${enCours || "aucun"}.</p>`;
}

async function vueProfil() {
  const p = await api("/api/profil");
  const liste = (x) => (x && x.length ? `<ul>${x.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>` : `<p class="vide">non renseigné</p>`);
  $("#vue-profil").innerHTML = `
    <div class="filtres"><span class="meta">${p ? `Mis à jour le ${esc(p.maj_le.replace("T", " à ").slice(0, 18))}${p.mode === "base" ? " (profil de base : ajoutez la clé API pour une synthèse du site)" : ""}` : "Profil pas encore construit."}</span>
      <span class="espace"></span><button class="bouton" id="btn-profil">Mettre à jour le profil agence</button></div>
    ${p ? `
    <div class="bloc"><h3>Offre</h3><p>${esc(p.offre)}</p></div>
    <div class="bloc"><h3>Tâches que nous supprimons</h3>${liste(p.taches_supprimees)}</div>
    ${p.services ? `<div class="bloc"><h3>Services</h3>${liste(p.services)}</div>` : ""}
    <div class="bloc"><h3>Preuves</h3>${liste(p.preuves)}</div>
    <div class="bloc"><h3>Réalisations (jamais de nom de client)</h3>${liste(p.realisations)}</div>
    <div class="bloc"><h3>Ton</h3><p>${esc(p.ton)}</p></div>
    <div class="bloc"><h3>Pages lues</h3><ul>${(p.pages_lues || []).map((x) => `<li><a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.titre || x.url)}</a></li>`).join("")}</ul></div>` : ""}`;
  $("#btn-profil").addEventListener("click", async (ev) => {
    ev.target.disabled = true; ev.target.textContent = "Lecture du site...";
    try { await api("/api/profil/maj", { method: "POST" }); toast("Profil mis à jour"); } catch (e) { toast(e.message); }
    vueProfil(); rafraichirEtat();
  });
}

async function vueReglages() {
  const { valeurs: v, tranches } = await api("/api/reglages");
  const cases = Object.entries(tranches).sort(([a], [b]) => a.localeCompare(b)).map(([k, lib]) =>
    `<label><input type="checkbox" name="tranche" value="${k}" ${v.tranches.includes(k) ? "checked" : ""}> ${esc(lib)}</label>`).join("");
  const champ = (id, label, aide, val, pas = "1") => `
    <div class="champ"><label for="${id}">${label}<small>${aide}</small></label>
      <input type="number" id="${id}" value="${val}" step="${pas}" min="0"></div>`;
  $("#vue-reglages").innerHTML = `
    <div class="bloc">
      ${champ("nb_leads", "Leads par clic", "Nombre de nouveaux leads à chaque génération", v.nb_leads)}
      <div class="champ"><label for="departements">Départements<small>Dans l'ordre de priorité, séparés par des virgules</small></label>
        <input type="text" id="departements" value="${esc(v.departements.join(", "))}"></div>
      <div class="champ"><label for="poids">Priorité du premier département<small>Nombre de passages pour 1 passage des suivants</small></label>
        <input type="number" id="poids" min="1" value="${v.poids_departements[v.departements[0]] || 1}"></div>
      <div class="champ"><label>Taille<small>Tranches d'effectif retenues</small></label><div class="cases">${cases}</div></div>
      ${champ("bonus_batiment", "Bonus bâtiment", "Points ajoutés aux entreprises du bâtiment (0 à 30)", v.bonus_batiment)}
      ${champ("seuil_score", "Note minimale", "Les entreprises sous cette note sont écartées", v.seuil_score)}
      ${champ("plafond_cout_jour", "Plafond de coût par jour ($)", "La génération s'arrête quand il est atteint", v.plafond_cout_jour, "0.5")}
      ${champ("recherches_web_max", "Recherches web par entreprise", "Plus = plus complet mais plus cher (1 à 15)", v.recherches_web_max)}
      ${champ("recherches_paralleles", "Recherches en parallèle", "Entreprises étudiées en même temps (1 à 5)", v.recherches_paralleles)}
      <div class="champ"><label>Modèle<small>Fixe</small></label><span>${esc(v.modele)}</span></div>
    </div>
    <p class="meta">Entreprises actives uniquement. Tous les secteurs sont acceptés (hors administrations publiques) ; les secteurs et les communes tournent d'un lot à l'autre.</p>
    <button class="bouton principal" id="btn-reglages">Enregistrer</button>`;
  $("#btn-reglages").addEventListener("click", async () => {
    const deps = $("#departements").value.split(",").map((s) => s.trim()).filter(Boolean);
    const poids = {}; deps.forEach((d, i) => { poids[d] = i === 0 ? Number($("#poids").value) || 1 : 1; });
    try {
      await api("/api/reglages", { method: "POST", body: {
        nb_leads: $("#nb_leads").value, departements: deps, poids_departements: poids,
        tranches: [...document.querySelectorAll("input[name=tranche]:checked")].map((x) => x.value),
        bonus_batiment: $("#bonus_batiment").value, seuil_score: $("#seuil_score").value,
        plafond_cout_jour: $("#plafond_cout_jour").value, recherches_web_max: $("#recherches_web_max").value,
        recherches_paralleles: $("#recherches_paralleles").value,
      } });
      toast("Réglages enregistrés");
      rafraichirEtat();
    } catch (e) { toast(e.message); }
  });
}

const VUES = { aujourdhui: vueAujourdhui, leads: vueLeads, tableau: vueTableau, profil: vueProfil, reglages: vueReglages };

async function afficher() {
  document.querySelectorAll(".vue").forEach((s) => s.classList.toggle("cache", s.id !== `vue-${etat.vue}`));
  try { await VUES[etat.vue](); } catch (e) { toast(e.message); }
}

$("#onglets").addEventListener("click", (ev) => {
  const b = ev.target.closest("button[data-vue]");
  if (!b) return;
  document.querySelectorAll("#onglets button").forEach((x) => x.classList.toggle("actif", x === b));
  etat.vue = b.dataset.vue;
  afficher();
});

(async () => {
  await rafraichirEtat();
  afficher();
  setInterval(rafraichirEtat, 20000);
})();
