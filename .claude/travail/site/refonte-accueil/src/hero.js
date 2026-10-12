<script>
/* ============ Héros : titre, atelier, plan millimétré ============ */
(function(){
  "use strict";

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.hero');
  if(!hero){ return; }

  /* ---- titre : « le décrire » se tape, « le construire » se bâtit ---- */

  var decrire = document.getElementById('decrire');
  var construire = document.getElementById('construire');

  if(!REDUCE && decrire && construire){
    var texteD = decrire.textContent;
    var texteC = construire.textContent;
    decrire.setAttribute('aria-label', texteD);
    construire.setAttribute('aria-label', texteC);

    // lettres de « le construire » : chacune avec son rang et une légère rotation
    construire.innerHTML = '';
    for(var i = 0; i < texteC.length; i++){
      var l = document.createElement('span');
      l.className = 'l';
      l.setAttribute('aria-hidden', 'true');
      l.textContent = texteC[i];
      l.style.setProperty('--i', i);
      l.style.setProperty('--r', (((i * 37) % 13) - 6) + 'deg');
      construire.appendChild(l);
    }

    // « le décrire » : vidé puis tapé, curseur à la fin
    var zone = document.createElement('span');
    zone.setAttribute('aria-hidden', 'true');
    var curseur = document.createElement('span');
    curseur.className = 'curseur-titre';
    decrire.textContent = '';
    decrire.appendChild(zone);
    decrire.appendChild(curseur);

    var lance = false;
    var lancer = function(){
      if(lance){ return; }
      lance = true;
      var n = 0;
      setTimeout(function tape(){
        n++;
        zone.textContent = texteD.slice(0, n);
        if(n < texteD.length){ setTimeout(tape, 62 + Math.random() * 50); }
        else{
          decrire.classList.add('fini');
          setTimeout(function(){ hero.classList.add('bati-titre'); }, 180);
        }
      }, 520);
    };
    if(hero.classList.contains('play')){ lancer(); }
    else{
      new MutationObserver(function(m, o){
        if(hero.classList.contains('play')){ o.disconnect(); lancer(); }
      }).observe(hero, {attributes:true, attributeFilter:['class']});
    }
  }

  /* ---- atelier : la phrase devient un outil ---- */

  var atelier = document.getElementById('atelier');
  var scenes = atelier ? atelier.querySelectorAll('.scene') : [];
  var onglets = document.querySelectorAll('.onglet');
  var bulle = document.getElementById('bulleTexte');
  var lien = document.getElementById('sceneLien');
  var chemin = document.getElementById('filChemin');
  var point = document.getElementById('filPoint');
  var fil = document.getElementById('fil');

  var PHRASES = [
    "Mes techniciens remplissent les bons sur papier. Le soir, je ressaisis tout.",
    "Je passe mes vendredis à relancer les factures en retard.",
    "Un fichier Excel par client. Plus personne ne s'y retrouve."
  ];
  var LIENS = [
    ['/bon-intervention-numerique', "Voir comment nous faisons les bons d'intervention"],
    ['/relance-factures-automatique', "Voir comment nous automatisons les relances"],
    ['/remplacer-excel', "Voir comment nous remplaçons vos fichiers Excel"]
  ];
  var DUREE = 9200;

  if(!atelier || !scenes.length){ return; }

  var courante = -1, minuteurs = [], visible = true, enPause = false;

  function attendre(fn, ms){ minuteurs.push(setTimeout(fn, ms)); }
  function annuler(){ minuteurs.forEach(clearTimeout); minuteurs = []; }

  function tracerFil(){
    if(!fil || !chemin || window.innerWidth < 1040){ return; }
    var a = atelier.getBoundingClientRect();
    var b = atelier.querySelector('.bulle').getBoundingClientRect();
    var t = atelier.querySelector('.tel-cadre').getBoundingClientRect();
    var x1 = b.left - a.left + b.width * .42, y1 = b.bottom - a.top;
    var x2 = t.left - a.left, y2 = t.top - a.top + t.height * .36;
    chemin.setAttribute('d', 'M' + x1 + ',' + y1 + ' C' + x1 + ',' + (y1 + 90) + ' ' + (x2 - 90) + ',' + y2 + ' ' + x2 + ',' + y2);
  }

  function voyage(fin){
    // un point lumineux parcourt le fil, de la phrase vers le téléphone
    if(!chemin || !point || window.innerWidth < 1040 || !chemin.getTotalLength){ fin(); return; }
    var L = chemin.getTotalLength(), t0 = null, D = 650;
    atelier.classList.add('envoi');
    point.style.opacity = 1;
    function pas(t){
      if(t0 === null){ t0 = t; }
      var k = Math.min(1, (t - t0) / D);
      k = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      var p = chemin.getPointAtLength(L * k);
      point.setAttribute('cx', p.x); point.setAttribute('cy', p.y);
      if(k < 1){ requestAnimationFrame(pas); }
      else{ point.style.opacity = 0; atelier.classList.remove('envoi'); fin(); }
    }
    requestAnimationFrame(pas);
  }

  function taper(texte, fin){
    var n = 0, cadre = bulle.parentNode.parentNode;
    cadre.classList.remove('tapee');
    bulle.textContent = '';
    (function suite(){
      n++;
      bulle.textContent = texte.slice(0, n);
      if(n < texte.length){ attendre(suite, 22 + Math.random() * 30); }
      else{ cadre.classList.add('tapee'); attendre(fin, 380); }
    })();
  }

  function montrer(i, auto){
    annuler();
    courante = i;
    scenes.forEach(function(s, j){
      s.classList.remove('bati');
      s.classList.toggle('on', j === i);
      s.classList.toggle('off', j !== i);
    });
    onglets.forEach(function(o, j){ o.setAttribute('aria-pressed', j === i ? 'true' : 'false'); });
    if(lien){ lien.href = LIENS[i][0]; lien.textContent = LIENS[i][1]; }

    if(REDUCE){
      bulle.textContent = PHRASES[i];
      scenes[i].classList.add('bati');
      return;
    }

    // relance la jauge de l'onglet
    atelier.classList.remove('tourne');
    void atelier.offsetWidth;
    atelier.style.setProperty('--duree', DUREE + 'ms');
    if(auto !== false){ atelier.parentNode.style.setProperty('--duree', DUREE + 'ms'); atelier.classList.add('tourne'); }

    tracerFil();
    taper(PHRASES[i], function(){
      voyage(function(){
        scenes[i].classList.add('bati');
      });
    });
    attendre(function(){ if(visible && !enPause){ montrer((i + 1) % scenes.length); } }, DUREE);
  }

  onglets.forEach(function(o, j){
    o.addEventListener('click', function(){ montrer(j); });
  });

  // on ne fait tourner l'atelier que lorsqu'il est à l'écran
  if(window.IntersectionObserver && !REDUCE){
    new IntersectionObserver(function(e){
      var avant = visible;
      visible = e[0].isIntersecting;
      if(visible && !avant){ montrer((courante + 1) % scenes.length); }
      if(!visible){ annuler(); atelier.classList.remove('tourne'); }
    }, {threshold:.15}).observe(atelier);
  }
  document.addEventListener('visibilitychange', function(){
    if(document.hidden){ annuler(); atelier.classList.remove('tourne'); enPause = true; }
    else if(enPause){ enPause = false; if(visible){ montrer((courante + 1) % scenes.length); } }
  });
  window.addEventListener('resize', tracerFil);

  // départ : juste après l'entrée du titre
  setTimeout(function(){ montrer(0); }, REDUCE ? 0 : 700);

  /* ---- plan millimétré : la grille s'allume sous le pointeur ---- */

  var toile = document.getElementById('plan');
  if(!toile || !toile.getContext){ return; }
  var ctx = toile.getContext('2d');
  var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  var PAS = 56;
  var souris = {x: -999, y: -999, tx: -999, ty: -999};
  var cellules = [];   // cases qui s'allument puis s'éteignent, comme une pièce posée
  var tourne = true, dernier = 0;

  function dimension(){
    var r = hero.getBoundingClientRect();
    W = r.width; H = r.height;
    toile.width = W * DPR; toile.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
  }

  function dessiner(t){
    ctx.clearRect(0, 0, W, H);
    souris.x += (souris.tx - souris.x) * .08;
    souris.y += (souris.ty - souris.y) * .08;

    // cases allumées
    for(var c = cellules.length - 1; c >= 0; c--){
      var ce = cellules[c];
      var age = (t - ce.t) / 2600;
      if(age >= 1){ cellules.splice(c, 1); continue; }
      var a = Math.sin(age * Math.PI) * .07;
      ctx.fillStyle = 'rgba(169,196,159,' + a.toFixed(3) + ')';
      ctx.fillRect(ce.x * PAS + 1, ce.y * PAS + 1, PAS - 1, PAS - 1);
    }

    // lignes : plus nettes près du pointeur
    ctx.lineWidth = 1;
    for(var x = 0; x <= W; x += PAS){
      var dx = Math.abs(x - souris.x);
      var ax = .045 + Math.max(0, 1 - dx / 260) * .12;
      ctx.strokeStyle = 'rgba(169,196,159,' + ax.toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke();
    }
    for(var y = 0; y <= H; y += PAS){
      var dy = Math.abs(y - souris.y);
      var ay = .045 + Math.max(0, 1 - dy / 260) * .12;
      ctx.strokeStyle = 'rgba(169,196,159,' + ay.toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke();
    }

    // croisements : petites croix de repère près du pointeur
    var r0 = 220;
    var gx0 = Math.max(0, Math.floor((souris.x - r0) / PAS)), gx1 = Math.min(Math.ceil(W / PAS), Math.ceil((souris.x + r0) / PAS));
    var gy0 = Math.max(0, Math.floor((souris.y - r0) / PAS)), gy1 = Math.min(Math.ceil(H / PAS), Math.ceil((souris.y + r0) / PAS));
    for(var gx = gx0; gx <= gx1; gx++){
      for(var gy = gy0; gy <= gy1; gy++){
        var px = gx * PAS, py = gy * PAS;
        var d = Math.hypot(px - souris.x, py - souris.y);
        if(d > r0){ continue; }
        ctx.strokeStyle = 'rgba(169,196,159,' + ((1 - d / r0) * .55).toFixed(3) + ')';
        ctx.beginPath();
        ctx.moveTo(px - 4, py + .5); ctx.lineTo(px + 5, py + .5);
        ctx.moveTo(px + .5, py - 4); ctx.lineTo(px + .5, py + 5);
        ctx.stroke();
      }
    }
  }

  function boucle(t){
    if(!tourne){ return; }
    if(t - dernier > 420 && cellules.length < 14){
      dernier = t;
      cellules.push({x: Math.floor(Math.random() * (W / PAS)), y: Math.floor(Math.random() * (H / PAS)), t: t});
    }
    dessiner(t);
    requestAnimationFrame(boucle);
  }

  dimension();
  window.addEventListener('resize', function(){ dimension(); if(REDUCE){ dessiner(0); } });

  if(REDUCE){ dessiner(0); return; }

  hero.addEventListener('pointermove', function(e){
    var r = hero.getBoundingClientRect();
    souris.tx = e.clientX - r.left; souris.ty = e.clientY - r.top;
    if(souris.x < -900){ souris.x = souris.tx; souris.y = souris.ty; }
  });
  hero.addEventListener('pointerleave', function(){ souris.tx = W * .74; souris.ty = H * .46; });
  souris.tx = W * .74; souris.ty = H * .46; souris.x = souris.tx; souris.y = souris.ty;

  if(window.IntersectionObserver){
    new IntersectionObserver(function(e){
      var avant = tourne;
      tourne = e[0].isIntersecting;
      if(tourne && !avant){ requestAnimationFrame(boucle); }
    }).observe(hero);
  }
  requestAnimationFrame(boucle);
})();
</script>
