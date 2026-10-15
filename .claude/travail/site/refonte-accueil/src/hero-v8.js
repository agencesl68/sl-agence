<script>
/* ============ Héros v8 « Genèse » : du papier en vrac à un système qui tourne ============
   1. Désordre : des papiers dérivent et basculent (aplatissement = rotation 3D simulée).
   2. La lame : une lumière verte balaie l'écran ; chaque papier qu'elle touche s'envole.
   3. L'ordre : il se pose en tuile d'un plan isométrique (on interpole la matrice affine
      du papier vers celle de la tuile : le papier « tombe à plat » en vol). Les papiers
      en trop éclatent en poussière.
   4. Le système vit : des impulsions parcourent les rues et allument les documents ;
      sous le pointeur, les tuiles se soulèvent comme des touches.                       */
(function(){
  "use strict";
  var hero = document.querySelector('.hero--genese');
  var toile = document.getElementById('genese');
  if(!hero){ return; }
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if(!toile || !toile.getContext){ hero.classList.add('construit'); return; }

  var ctx = toile.getContext('2d');
  var DPR = Math.min(window.devicePixelRatio || 1, 2);
  var W = 0, H = 0, T = 40, S = 34, O = {x:0, y:0}, EX = {x:0, y:0}, EY = {x:0, y:0}, mobile = false;
  var GRILLE = 11, RUES = [3, 7];
  var TYPES = ['facture', 'bon', 'tableur', 'mail', 'agenda'];
  var LAME_DEBUT = 700, LAME_DUREE = 1100;
  var cartes = [], decor = [], eclats = [], impulsions = [], livraisons = [];
  var prochaineLivraison = 0, prochainEnvoi = 0;
  var ACC = '169,196,159', lectureAcc = 0, tCourant = 0, scintilles = [], prochaineScintille = 0;   // couleur d'accent, lue dans la variable CSS --accent-rgb
  var souris = {x:-1e4, y:-1e4}, t0 = null, avant = 0, visible = true, construit = false, prochaine = 0;

  function rand(a, b){ return a + Math.random() * (b - a); }
  function borne(x){ return x < 0 ? 0 : x > 1 ? 1 : x; }
  function mix(a, b, u){ return a + (b - a) * u; }
  function ease(x){ return x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2; }
  function estRue(i){ return RUES.indexOf(i) >= 0; }
  function iso(gx, gy){ return {x: O.x + gx * EX.x + gy * EY.x, y: O.y + gx * EX.y + gy * EY.y}; }

  /* ---------- mise en place ---------- */

  function dimension(){
    var r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    toile.width = Math.round(W * DPR); toile.height = Math.round(H * DPR);
    mobile = W < 760;
    T = mobile ? Math.min(W / 17, 30) : Math.max(34, Math.min(52, W / 28));
    S = T * .9;
    O = mobile ? {x: W * .5, y: H * .54} : {x: W * .67, y: H * .24};
    EX = {x: T * .866, y: T * .5}; EY = {x: -T * .866, y: T * .5};
  }

  function papier(gx, gy){
    return {
      gx: gx, gy: gy, type: TYPES[Math.floor(Math.random() * TYPES.length)],
      x: rand(-.04, 1.04) * W, y: rand(-.04, 1.04) * H,
      vx: rand(-16, 16), vy: rand(-11, 11),
      th: rand(-Math.PI, Math.PI), vth: rand(-.5, .5),
      ph: rand(0, Math.PI * 2), vph: rand(.5, 1.4),
      k: rand(.6, 1.45),
      u: 0, depart: null, duree: rand(800, 1150),
      lift: 0, flash: 0, traite: 0, attente: 0, delai: rand(3.5, 7),
      // hauteur finale de l'« immeuble » : plus haut vers le centre du plan, quelques tours
      haut: (gx < 0 ? 0 : (.1 + Math.pow(Math.random(), 2.4) * 1.5) * (1 - .55 * (Math.abs(gx - 5) + Math.abs(gy - 5)) / 10))
    };
  }

  function creer(){
    cartes = []; decor = []; eclats = []; impulsions = []; livraisons = [];
    for(var gx = 0; gx < GRILLE; gx++){
      for(var gy = 0; gy < GRILLE; gy++){
        if(!estRue(gx) && !estRue(gy)){ cartes.push(papier(gx, gy)); }
      }
    }
    var n = mobile ? 14 : 34;
    for(var i = 0; i < n; i++){ decor.push(papier(-1, -1)); }
  }

  /* ---------- dessin d'un papier / d'une tuile ---------- */

  var PAPIER = [236, 232, 220], DOS = [204, 199, 184], TUILE = [22, 30, 21];

  function rr(x, y, w, h, r){
    ctx.beginPath();
    if(ctx.roundRect){ ctx.roundRect(x, y, w, h, r); } else { ctx.rect(x, y, w, h); }
  }

  function matrice(c){
    var e = ease(c.u);
    var s = Math.cos(c.ph);                                   // bascule : on voit la tranche puis le dos
    var cw = S * 1.12 * c.k, ch = S * 1.48 * c.k * (Math.abs(s) < .08 ? .08 * (s < 0 ? -1 : 1) : s);
    var ct = Math.cos(c.th), st = Math.sin(c.th);
    var A = [ct * cw, st * cw, -st * ch, ct * ch];
    if(c.gx < 0){ return [A[0], A[1], A[2], A[3], c.x, c.y, 0, s]; }
    var p = iso(c.gx + .5, c.gy + .5), r = .86;
    var B = [EX.x * r, EX.y * r, EY.x * r, EY.y * r];
    var toit = c.cible ? c.cible.lift : 0;
    var x = mix(c.x, p.x, e);
    var y = mix(c.y, p.y - toit, e) - Math.sin(Math.PI * e) * T * (c.cible ? .6 : 1.8) - c.lift;
    return [mix(A[0], B[0], e), mix(A[1], B[1], e), mix(A[2], B[2], e), mix(A[3], B[3], e), x, y, e, s];
  }

  function contenu(type, coul){
    ctx.fillStyle = coul;
    if(type === 'facture'){
      ctx.fillRect(-.36, -.38, .34, .09);
      ctx.fillRect(-.36, -.17, .7, .045); ctx.fillRect(-.36, -.06, .62, .045); ctx.fillRect(-.36, .05, .66, .045);
      ctx.fillRect(.02, .22, .34, .1);
    } else if(type === 'bon'){
      ctx.fillRect(-.36, -.36, .5, .08);
      ctx.fillRect(-.36, -.17, .7, .045); ctx.fillRect(-.36, -.06, .5, .045);
      ctx.strokeStyle = coul; ctx.lineWidth = .045; ctx.lineCap = 'round';
      ctx.beginPath(); ctx.moveTo(-.3, .28);
      ctx.bezierCurveTo(-.2, .02, -.12, .4, -.02, .18); ctx.bezierCurveTo(.06, .02, .12, .36, .32, .16);
      ctx.stroke();
    } else if(type === 'tableur'){
      ctx.strokeStyle = coul; ctx.lineWidth = .03;
      ctx.strokeRect(-.37, -.33, .74, .66);
      ctx.beginPath();
      ctx.moveTo(-.12, -.33); ctx.lineTo(-.12, .33); ctx.moveTo(.13, -.33); ctx.lineTo(.13, .33);
      ctx.moveTo(-.37, -.11); ctx.lineTo(.37, -.11); ctx.moveTo(-.37, .11); ctx.lineTo(.37, .11);
      ctx.stroke();
      ctx.fillRect(-.37, -.33, .74, .1);
    } else if(type === 'mail'){
      ctx.strokeStyle = coul; ctx.lineWidth = .04; ctx.lineJoin = 'round';
      ctx.strokeRect(-.36, -.24, .72, .48);
      ctx.beginPath(); ctx.moveTo(-.36, -.24); ctx.lineTo(0, .06); ctx.lineTo(.36, -.24); ctx.stroke();
    } else {
      ctx.fillRect(-.37, -.38, .74, .14);
      for(var i = 0; i < 4; i++){ for(var j = 0; j < 3; j++){ ctx.fillRect(-.31 + i * .18, -.14 + j * .17, .08, .08); } }
    }
  }

  function dessinerCarte(c){
    var M = matrice(c), e = M[6];
    // un document livré arrive avec sa lueur
    if(c.cible){
      var lu = Math.sin(Math.PI * Math.min(1, c.u * 1.2)) * .5;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      var gl = ctx.createRadialGradient(M[4], M[5], 0, M[4], M[5], T * 1.3);
      gl.addColorStop(0, 'rgba(' + ACC + ',' + lu + ')'); gl.addColorStop(1, 'rgba(' + ACC + ',0)');
      ctx.fillStyle = gl; ctx.fillRect(M[4] - T * 1.3, M[5] - T * 1.3, T * 2.6, T * 2.6);
    }
    var dos = e < .5 && M[7] < 0;
    var base = dos ? DOS : PAPIER;
    var f = c.gx < 0 ? 0 : e;

    // tuile soulevée : on dessine d'abord ses deux faces avant (relief)
    if(c.lift > .6 && e >= 1){
      var L = c.lift;
      var bas = {x: M[4] + .5 * M[0] + .5 * M[2], y: M[5] + .5 * M[1] + .5 * M[3]};
      var gau = {x: M[4] - .5 * M[0] + .5 * M[2], y: M[5] - .5 * M[1] + .5 * M[3]};
      var dro = {x: M[4] + .5 * M[0] - .5 * M[2], y: M[5] + .5 * M[1] - .5 * M[3]};
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      ctx.fillStyle = '#0d130c';
      ctx.beginPath(); ctx.moveTo(gau.x, gau.y); ctx.lineTo(bas.x, bas.y); ctx.lineTo(bas.x, bas.y + L); ctx.lineTo(gau.x, gau.y + L); ctx.fill();
      ctx.fillStyle = '#080c07';
      ctx.beginPath(); ctx.moveTo(bas.x, bas.y); ctx.lineTo(dro.x, dro.y); ctx.lineTo(dro.x, dro.y + L); ctx.lineTo(bas.x, bas.y + L); ctx.fill();
      // fenêtres : de fines lignes vertes sur les façades
      ctx.strokeStyle = 'rgba(169,196,159,.13)'; ctx.lineWidth = 1;
      ctx.beginPath();
      for(var w = 7; w < L - 3; w += 7){
        ctx.moveTo(mix(gau.x, bas.x, .15), mix(gau.y, bas.y, .15) + w); ctx.lineTo(mix(gau.x, bas.x, .85), mix(gau.y, bas.y, .85) + w);
        ctx.moveTo(mix(bas.x, dro.x, .15), mix(bas.y, dro.y, .15) + w); ctx.lineTo(mix(bas.x, dro.x, .85), mix(bas.y, dro.y, .85) + w);
      }
      ctx.stroke();
      ctx.strokeStyle = 'rgba(169,196,159,.35)';
      ctx.beginPath(); ctx.moveTo(bas.x, bas.y); ctx.lineTo(bas.x, bas.y + L);
      ctx.moveTo(gau.x, gau.y + L); ctx.lineTo(bas.x, bas.y + L); ctx.lineTo(dro.x, dro.y + L); ctx.stroke();
    }

    ctx.setTransform(DPR * M[0], DPR * M[1], DPR * M[2], DPR * M[3], DPR * M[4], DPR * M[5]);
    var g = c.traite * .35;
    ctx.fillStyle = 'rgb(' + Math.round(mix(base[0], TUILE[0] + 20 * g, f)) + ',' +
                             Math.round(mix(base[1], TUILE[1] + 34 * g, f)) + ',' +
                             Math.round(mix(base[2], TUILE[2] + 20 * g, f)) + ')';
    rr(-.5, -.5, 1, 1, .09); ctx.fill();

    // reflet : une bande de lumière balaie les toits en biais
    if(e >= 1 && c.gx >= 0){
      var ph = (tCourant - LAME_DEBUT - LAME_DUREE) % 6000;
      if(ph > 0 && ph < 2400){
        var pos = mix(-14, 14, ph / 2400), dd = (c.gx - c.gy) - pos;
        var rf = Math.exp(-dd * dd / 3) * .32;
        if(rf > .01){ ctx.fillStyle = 'rgba(255,255,255,' + rf + ')'; rr(-.5, -.5, 1, 1, .09); ctx.fill(); }
      }
    }

    // travail en attente : la tuile garde la couleur d'accent jusqu'à son traitement
    var att = c.cible ? c.u : c.attente;
    if(att > .02 && f > .3){ ctx.fillStyle = 'rgba(' + ACC + ',' + (.26 * att) + ')'; rr(-.5, -.5, 1, 1, .09); ctx.fill(); }

    if(!dos){
      var a = mix(.5, .5 + c.traite * .4, f);
      contenu(c.type, f < .5 ? 'rgba(48,50,42,' + mix(.55, .2, f * 2) + ')'
                  : att > .3 ? 'rgba(' + ACC + ',' + (.75 * (f - .5) * 2) + ')'
                             : 'rgba(169,196,159,' + (a * (f - .5) * 2) + ')');
    }

    // bord : blanc à l'envol, vert une fois posé, éclat quand une impulsion passe
    var bord = Math.max(c.flash, f * .5, att * .9);
    if(bord > .02){
      ctx.strokeStyle = c.flash > f * .5 ? 'rgba(235,245,230,' + c.flash + ')'
                      : att > .3 ? 'rgba(' + ACC + ',' + (.4 + .5 * att) + ')'
                      : 'rgba(169,196,159,' + bord + ')';
      ctx.lineWidth = .035;
      rr(-.5, -.5, 1, 1, .09); ctx.stroke();
    }
  }

  /* ---------- la lame, les rues, les impulsions, la poussière ---------- */

  function lameX(t){ return mix(-.12 * W, 1.12 * W, ease(borne((t - LAME_DEBUT) / LAME_DUREE))); }

  function dessinerLame(t){
    var p = (t - LAME_DEBUT) / LAME_DUREE;
    if(p < 0 || p > 1){ return; }
    var x = lameX(t), a = Math.sin(p * Math.PI);
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var gr = ctx.createLinearGradient(x - 160, 0, x + 30, 0);
    gr.addColorStop(0, 'rgba(169,196,159,0)');
    gr.addColorStop(.85, 'rgba(169,196,159,' + .16 * a + ')');
    gr.addColorStop(1, 'rgba(223,232,216,0)');
    ctx.fillStyle = gr; ctx.fillRect(x - 160, 0, 190, H);
    ctx.fillStyle = 'rgba(235,245,230,' + .85 * a + ')';
    ctx.fillRect(x, 0, 1.5, H);
  }

  function dessinerRues(t){
    var p = borne((t - LAME_DEBUT - LAME_DUREE + 200) / 900);
    if(p <= 0){ return; }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(169,196,159,' + .22 * p + ')';
    ctx.beginPath();
    RUES.forEach(function(r){
      var a = iso(r + .5, 0), b = iso(r + .5, GRILLE * p);
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      a = iso(0, r + .5); b = iso(GRILLE * p, r + .5);
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
    });
    // le pourtour du plan
    var c0 = iso(0, 0), c1 = iso(GRILLE * p, 0), c2 = iso(GRILLE * p, GRILLE * p), c3 = iso(0, GRILLE * p);
    ctx.moveTo(c0.x, c0.y); ctx.lineTo(c1.x, c1.y); ctx.lineTo(c2.x, c2.y); ctx.lineTo(c3.x, c3.y); ctx.closePath();
    ctx.stroke();
  }

  // grande : parcourt une rue ou le pourtour du plan d'un bout à l'autre
  // fine : file entre deux rangées de documents, le long d'un îlot (3 cases)
  function lancerImpulsion(fine){
    var sens = Math.random() < .5, axe = Math.random() < .5 ? 'x' : 'y';
    if(fine){
      var bi = Math.floor(Math.random() * 3), bj = Math.floor(Math.random() * 3);
      impulsions.push({fine: true, axe: axe, r: bi * 4 + 1 + Math.floor(Math.random() * 2), debut: bj * 4, long: 3,
                       sens: sens, p: 0, v: rand(.9, 1.5), trace: []});
    } else {
      var lignes = [RUES[0] + .5, RUES[1] + .5, 0, GRILLE];
      impulsions.push({fine: false, axe: axe, r: lignes[Math.floor(Math.random() * lignes.length)], debut: 0, long: GRILLE,
                       sens: sens, p: 0, v: rand(.28, .45), trace: []});
    }
  }

  function majImpulsions(dt){
    for(var i = impulsions.length - 1; i >= 0; i--){
      var m = impulsions[i];
      m.p += m.v * dt;
      if(m.p > 1.08){ impulsions.splice(i, 1); continue; }
      var q = m.debut + (m.sens ? Math.min(1, m.p) : 1 - Math.min(1, m.p)) * m.long;
      var gx = m.axe === 'x' ? m.r : q, gy = m.axe === 'x' ? q : m.r;
      var pt = iso(gx, gy);
      m.trace.push(pt); if(m.trace.length > (m.fine ? 9 : 16)){ m.trace.shift(); }
      // les documents qu'elle frôle s'allument au passage
      var seuil = m.fine ? .75 : 1.15;
      for(var j = 0; j < cartes.length; j++){
        var c = cartes[j];
        if(c.u < 1){ continue; }
        var d = Math.abs(c.gx + .5 - gx) + Math.abs(c.gy + .5 - gy);
        if(d < seuil){ c.flash = Math.max(c.flash, m.fine ? .6 : .9); c.traite = 1; c.attente = 0; }
      }
    }
  }

  function dessinerImpulsions(){
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    impulsions.forEach(function(m){
      var tr = m.trace;
      for(var k = 1; k < tr.length; k++){
        ctx.strokeStyle = 'rgba(240,250,236,' + (k / tr.length) * (m.fine ? .8 : .9) + ')';
        ctx.lineWidth = m.fine ? .6 + 1.2 * k / tr.length : 1 + 2 * k / tr.length;
        ctx.beginPath(); ctx.moveTo(tr[k - 1].x, tr[k - 1].y); ctx.lineTo(tr[k].x, tr[k].y); ctx.stroke();
      }
      var b = tr[tr.length - 1];
      if(b){
        var R = m.fine ? 9 : 16;
        var g = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, R);
        g.addColorStop(0, 'rgba(250,255,246,.95)'); g.addColorStop(1, 'rgba(169,196,159,0)');
        ctx.fillStyle = g; ctx.fillRect(b.x - R, b.y - R, R * 2, R * 2);
      }
    });
  }

  // scintillements : de petites étoiles blanches s'allument sur les toits
  function majScintilles(t, dt){
    if(t > prochaineScintille){
      var c = cartes[Math.floor(Math.random() * cartes.length)];
      if(c && c.u >= 1){
        var p = iso(c.gx + rand(.15, .85), c.gy + rand(.15, .85));
        scintilles.push({x: p.x, y: p.y - c.lift, v: 0, d: rand(.5, .9), s: rand(3, 6)});
      }
      prochaineScintille = t + (mobile ? rand(120, 260) : rand(50, 130));
    }
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    for(var i = scintilles.length - 1; i >= 0; i--){
      var k = scintilles[i];
      k.v += dt / k.d; if(k.v >= 1){ scintilles.splice(i, 1); continue; }
      var a = Math.sin(k.v * Math.PI), r = k.s * a;
      ctx.fillStyle = 'rgba(255,255,255,' + (a * .9) + ')';
      ctx.beginPath();
      ctx.moveTo(k.x, k.y - r); ctx.lineTo(k.x + r * .22, k.y - r * .22); ctx.lineTo(k.x + r, k.y);
      ctx.lineTo(k.x + r * .22, k.y + r * .22); ctx.lineTo(k.x, k.y + r); ctx.lineTo(k.x - r * .22, k.y + r * .22);
      ctx.lineTo(k.x - r, k.y); ctx.lineTo(k.x - r * .22, k.y - r * .22); ctx.closePath(); ctx.fill();
    }
  }

  function eclater(c){
    for(var i = 0; i < 9; i++){
      eclats.push({x: c.x + rand(-12, 12), y: c.y + rand(-16, 16), vx: rand(-60, 90), vy: rand(-90, 30), v: 1, s: rand(1.5, 3.2)});
    }
  }
  function gerbe(x, y){
    for(var i = 0; i < 16; i++){
      eclats.push({x: x + rand(-8, 8), y: y + rand(-4, 4), vx: rand(-40, 40), vy: rand(-230, -110), v: 1, s: rand(1.6, 3), vert: true});
    }
  }

  function dessinerEclats(dt){
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    for(var i = eclats.length - 1; i >= 0; i--){
      var e = eclats[i];
      e.v -= dt * 1.1; if(e.v <= 0){ eclats.splice(i, 1); continue; }
      e.x += e.vx * dt; e.y += e.vy * dt; e.vy += 40 * dt;
      ctx.fillStyle = e.vert ? 'rgba(200,236,180,' + e.v + ')'
        : 'rgba(' + Math.round(mix(169, 236, e.v)) + ',' + Math.round(mix(196, 232, e.v)) + ',' + Math.round(mix(159, 220, e.v)) + ',' + e.v + ')';
      ctx.fillRect(e.x, e.y, e.s, e.s);
    }
  }

  /* ---------- la boucle ---------- */

  function majPapier(c, t, dt){
    if(c.u < 1){
      c.x += c.vx * dt; c.y += c.vy * dt; c.th += c.vth * dt; c.ph += c.vph * dt;
      var dx = c.x - souris.x, dy = c.y - souris.y, d = Math.sqrt(dx * dx + dy * dy);
      if(d < 170 && d > 0){ var f = (1 - d / 170) * 260 * dt; c.x += dx / d * f; c.y += dy / d * f; }
      if(c.x < -80){ c.x = W + 70; } if(c.x > W + 80){ c.x = -70; }
      if(c.y < -80){ c.y = H + 70; } if(c.y > H + 80){ c.y = -70; }
    }
    if(c.depart === null && t > LAME_DEBUT && lameX(t) > c.x){ c.depart = t; c.flash = 1; }
    if(c.depart !== null){ c.u = borne((t - c.depart) / c.duree); }
    c.flash = Math.max(0, c.flash - dt * 1.6);
  }

  function image(now){
    if(!visible){ return; }
    if(t0 === null){ t0 = now; avant = now; }
    var t = now - t0, dt = Math.min(.05, (now - avant) / 1000);
    tCourant = t;
    avant = now;

    if(t > lectureAcc){ ACC = getComputedStyle(hero).getPropertyValue('--accent-rgb').trim() || ACC; lectureAcc = t + 400; }

    if(!construit && t > LAME_DEBUT + 350){ construit = true; hero.classList.add('construit'); }

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, toile.width, toile.height);

    dessinerRues(t);

    // les papiers en trop éclatent au passage de la lame
    for(var i = decor.length - 1; i >= 0; i--){
      var d = decor[i];
      majPapier(d, t, dt);
      if(d.depart !== null){ eclater(d); decor.splice(i, 1); }
    }

    // soulèvement sous le pointeur (tuiles posées seulement)
    cartes.forEach(function(c){
      majPapier(c, t, dt);
      var cible = 0;
      if(c.u >= 1){
        var p = iso(c.gx + .5, c.gy + .5), dx = p.x - souris.x, dy = p.y - souris.y;
        var dd = Math.sqrt(dx * dx + dy * dy);
        cible = Math.max(0, 1 - dd / (T * 2.6)) * T * .55;
        var monte = borne((t - c.depart - c.duree - 150 - (Math.abs(c.gx - 5) + Math.abs(c.gy - 5)) * 60) / 700);
        cible += ease(monte) * c.haut * T;
      }
      c.lift += (cible - c.lift) * Math.min(1, dt * 10);
    });

    // ordre de dessin : désordre (par profondeur), puis plan (de l'arrière vers l'avant), puis vols
    majVille(t, dt);
    var tous = decor.concat(cartes, livraisons);
    tous.sort(function(a, b){ return cle(a) - cle(b); });
    tous.forEach(dessinerCarte);

    if(t > LAME_DEBUT + LAME_DUREE + 900){
      var grandes = 0, fines = 0;
      impulsions.forEach(function(m){ if(m.fine){ fines++; } else { grandes++; } });
      if(t > prochaine){
        if(grandes < (mobile ? 4 : 8)){ lancerImpulsion(false); }
        if(fines < (mobile ? 6 : 14)){ lancerImpulsion(true); }
        prochaine = t + rand(110, 260);
      }
      majImpulsions(dt);
      dessinerImpulsions();
    }
    cartes.forEach(function(c){
      if(c.attente > 0){
        c.delai -= dt;
        if(c.delai <= 0){ c.attente = 0; c.flash = .9; c.traite = 1; }
      }
      if(c.traite > 0 && c.flash <= 0){ c.traite = Math.max(0, c.traite - dt * .25); }
    });

    if(t > LAME_DEBUT + LAME_DUREE + 900){ majScintilles(t, dt); }
    dessinerEclats(dt);
    dessinerLame(t);
    requestAnimationFrame(image);
  }

  /* ---------- la ville ne s'arrête jamais ----------
     Des documents arrivent du haut et se posent sur un toit : l'immeuble prend un étage.
     Quand un immeuble est plein, il est « traité » : gerbe verte, il redescend à zéro.  */

  function livrer(t){
    var cible = cartes[Math.floor(Math.random() * cartes.length)];
    if(!cible || cible.u < 1){ return; }
    var p = iso(cible.gx + .5, cible.gy + .5);
    var l = papier(cible.gx, cible.gy);
    l.cible = cible;
    l.x = p.x + rand(-W * .18, W * .18); l.y = -60;
    l.vx = l.vy = 0; l.k = rand(.8, 1.1);
    l.depart = t; l.duree = rand(1150, 1500);
    livraisons.push(l);
  }

  function envoyer(){
    var plein = null;
    cartes.forEach(function(c){ if(c.u >= 1 && c.haut > 1.15 && (!plein || c.haut > plein.haut)){ plein = c; } });
    if(!plein){ return; }
    var p = iso(plein.gx + .5, plein.gy + .5);
    gerbe(p.x, p.y - plein.lift);
    plein.haut = .12; plein.flash = 1; plein.traite = 1; plein.attente = 0;
  }

  function majVille(t, dt){
    if(t < LAME_DEBUT + LAME_DUREE + 1300){ return; }
    if(t > prochaineLivraison){ livrer(t); prochaineLivraison = t + (mobile ? rand(500, 850) : rand(200, 420)); }
    if(t > prochainEnvoi){ envoyer(); prochainEnvoi = t + rand(1400, 2400); }
    for(var i = livraisons.length - 1; i >= 0; i--){
      var l = livraisons[i];
      l.th += l.vth * dt; l.ph += l.vph * dt;
      l.u = borne((t - l.depart) / l.duree);
      if(l.u >= 1){
        var c = l.cible;
        c.haut = Math.min(1.9, c.haut + .24); c.attente = 1; c.delai = rand(3.5, 7); c.type = l.type;
        livraisons.splice(i, 1);
      }
    }
  }

  function cle(c){
    if(c.cible){ return 400 + c.u; }
    if(c.u <= 0){ return c.k; }
    if(c.u < 1){ return 300 + c.u; }
    return 200 + c.gx + c.gy;
  }

  /* ---------- démarrage ---------- */

  dimension();
  creer();

  if(REDUCE){
    // une image fixe : le plan posé, rien ne bouge
    hero.classList.add('construit');
    decor = [];
    cartes.forEach(function(c){ c.u = 1; c.lift = c.haut * T; });
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    dessinerRues(1e9);
    cartes.sort(function(a, b){ return cle(a) - cle(b); }).forEach(dessinerCarte);
    window.addEventListener('resize', function(){
      dimension(); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, toile.width, toile.height);
      dessinerRues(1e9); cartes.forEach(dessinerCarte);
    });
    return;
  }

  hero.addEventListener('pointermove', function(e){
    var r = hero.getBoundingClientRect(); souris.x = e.clientX - r.left; souris.y = e.clientY - r.top;
  });
  hero.addEventListener('pointerleave', function(){ souris.x = souris.y = -1e4; });
  window.addEventListener('resize', function(){
    var avantW = W; dimension();
    if(Math.abs(W - avantW) > 60){ creer(); t0 = null; construit = false; hero.classList.remove('construit'); }
  });

  if(window.IntersectionObserver){
    new IntersectionObserver(function(e){
      var etait = visible; visible = e[0].isIntersecting;
      if(visible && !etait){ avant = performance.now(); requestAnimationFrame(image); }
    }).observe(hero);
  }
  document.addEventListener('visibilitychange', function(){
    if(!document.hidden && visible){ avant = performance.now(); }
  });

  // filet de sécurité : le texte apparaît quoi qu'il arrive
  setTimeout(function(){ hero.classList.add('construit'); }, 4500);
  requestAnimationFrame(image);
})();
</script>
