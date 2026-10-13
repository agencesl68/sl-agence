<script>
/* ============ Héros : l'atelier (une phrase devient un outil) ============ */
(function(){
  "use strict";

  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.hero');
  if(!hero){ return; }


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
  var DUREE = 8200;   // durée indicative d'une scène (jauge de l'onglet)

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
      if(n < texte.length){ attendre(suite, 12 + Math.random() * 16); }
      else{ cadre.classList.add('tapee'); attendre(fin, 250); }
    })();
  }

  // après chaque scène, le téléphone s'ouvre en écran d'ordinateur : même outil, sur PC comme sur mobile
  function ordinateur(on){
    atelier.classList.add('bascule');
    atelier.classList.toggle('pc', on);
    attendre(function(){ atelier.classList.remove('bascule'); }, 900);
  }

  function montrer(i, auto){
    annuler();
    if(atelier.classList.contains('pc') && !REDUCE){
      ordinateur(false);
      attendre(function(){ lancer(i, auto); }, 950);
      return;
    }
    lancer(i, auto);
  }

  function lancer(i, auto){
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
    if(auto !== false){ atelier.parentNode.style.setProperty('--duree', DUREE + 'ms'); atelier.classList.add('tourne'); }

    taper(PHRASES[i], function(){
      scenes[i].classList.add('bati');
      attendre(function(){ ordinateur(true); }, 2600);
      attendre(function(){ if(visible && !enPause){ montrer((i + 1) % scenes.length); } }, 2600 + 3600);
    });
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
  setTimeout(function(){ montrer(0); }, REDUCE ? 0 : 300);

})();
</script>
