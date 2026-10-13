<script>
/* ============ 01 · Le constat : la double saisie, jouée une fois à l'apparition ============ */
(function(){
  "use strict";
  var piste = document.getElementById('constatPiste');
  var ligne = document.getElementById('ressaisie');
  if(!piste || !ligne || !window.IntersectionObserver ||
     window.matchMedia('(prefers-reduced-motion: reduce)').matches){ return; }

  var texte = ligne.textContent, DUREE = 4200;
  function borne(a, b, p){ return Math.min(1, Math.max(0, (p - a) / (b - a))); }

  function etat(p){
    ligne.textContent = texte.slice(0, Math.round(borne(.12, .45, p) * texte.length));
    piste.style.setProperty('--d', (1 - borne(.45, .7, p)).toFixed(3));
    piste.style.setProperty('--l', borne(.66, .8, p).toFixed(3));
    piste.style.setProperty('--c', borne(.8, .95, p).toFixed(3));
    piste.classList.toggle('attente', p < .72);
  }
  etat(0);

  new IntersectionObserver(function(e, obs){
    if(!e[0].isIntersecting){ return; }
    obs.disconnect();
    var t0 = null;
    (function pas(t){
      if(t0 === null){ t0 = t; }
      var p = Math.min(1, (t - t0) / DUREE);
      etat(p);
      if(p < 1){ requestAnimationFrame(pas); }
    })(performance.now());
  }, {threshold:.3}).observe(piste);
})();
</script>
