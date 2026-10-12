<script>
/* ============ 01 · Le constat : la double saisie au défilement ============ */
(function(){
  "use strict";
  var piste = document.getElementById('constatPiste');
  var ligne = document.getElementById('ressaisie');
  if(!piste || !ligne || window.matchMedia('(prefers-reduced-motion: reduce)').matches){ return; }

  var texte = ligne.textContent, attente = false;
  function borne(a, b, p){ return Math.min(1, Math.max(0, (p - a) / (b - a))); }

  function maj(){
    attente = false;
    var r = piste.getBoundingClientRect();
    var p = Math.min(1, Math.max(0, -r.top / (r.height - window.innerHeight)));
    ligne.textContent = texte.slice(0, Math.round(borne(.1, .42, p) * texte.length));
    piste.style.setProperty('--d', (1 - borne(.46, .7, p)).toFixed(3));
    piste.style.setProperty('--l', borne(.64, .8, p).toFixed(3));
    piste.style.setProperty('--c', borne(.8, .92, p).toFixed(3));
    piste.classList.toggle('attente', p < .72);
  }
  function demande(){ if(!attente){ attente = true; requestAnimationFrame(maj); } }

  window.addEventListener('scroll', demande, {passive:true});
  window.addEventListener('resize', demande);
  maj();
})();
</script>
