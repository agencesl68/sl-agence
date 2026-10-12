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

  var PHRASES = [
    "Mes techniciens remplissent les bons sur papier. Le soir, je ressaisis tout.",
    "Je passe mes vendredis à relancer les factures en retard.",
    "Un fichier Excel par client. Plus personne ne s'y retrouve."
  ];
  var DUREE = 9200;

  if(!atelier || !scenes.length){ return; }

  var courante = -1, minuteurs = [], visible = true, enPause = false;

  function attendre(fn, ms){ minuteurs.push(setTimeout(fn, ms)); }
  function annuler(){ minuteurs.forEach(clearTimeout); minuteurs = []; }


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

    taper(PHRASES[i], function(){ scenes[i].classList.add('bati'); });
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

  // départ : juste après l'entrée du titre
  setTimeout(function(){ montrer(0); }, REDUCE ? 0 : 700);

  /* ---- plan millimétré : la grille s'éclaire doucement sous le pointeur ---- */

  var toile = document.getElementById('plan');
  if(!toile || !toile.getContext){ return; }
  var ctx = toile.getContext('2d');
  var W = 0, H = 0, DPR = Math.min(window.devicePixelRatio || 1, 2);
  var PAS = 56;
  var souris = {x: -999, y: -999, tx: -999, ty: -999};
  var tourne = true;

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

    // lignes : plus nettes près du pointeur
    ctx.lineWidth = 1;
    for(var x = 0; x <= W; x += PAS){
      var dx = Math.abs(x - souris.x);
      var ax = .03 + Math.max(0, 1 - dx / 260) * .08;
      ctx.strokeStyle = 'rgba(169,196,159,' + ax.toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(x + .5, 0); ctx.lineTo(x + .5, H); ctx.stroke();
    }
    for(var y = 0; y <= H; y += PAS){
      var dy = Math.abs(y - souris.y);
      var ay = .03 + Math.max(0, 1 - dy / 260) * .08;
      ctx.strokeStyle = 'rgba(169,196,159,' + ay.toFixed(3) + ')';
      ctx.beginPath(); ctx.moveTo(0, y + .5); ctx.lineTo(W, y + .5); ctx.stroke();
    }
  }

  function boucle(t){
    if(!tourne){ return; }
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
