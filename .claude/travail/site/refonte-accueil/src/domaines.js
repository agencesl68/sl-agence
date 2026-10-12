<script>
/* ============ 02 · Le schéma : traits entre les cartes et le centre ============ */
(function(){
  "use strict";
  var schema = document.getElementById('schema');
  var svg = document.getElementById('schemaLiens');
  if(!schema || !svg){ return; }
  var NS = 'http://www.w3.org/2000/svg';
  var noeuds = schema.querySelectorAll('.noeud');
  var moyeu = schema.querySelector('.moyeu');

  function trace(){
    svg.innerHTML = '';
    if(window.innerWidth < 1000){ return; }
    var s = schema.getBoundingClientRect(), m = moyeu.getBoundingClientRect();
    var cx = m.left - s.left + m.width / 2, cy = m.top - s.top + m.height / 2, R = m.width / 2 + 16;
    noeuds.forEach(function(n){
      var r = n.getBoundingClientRect();
      var entree = n.dataset.sens === 'entree';
      var x = entree ? r.right - s.left : r.left - s.left, y = r.top - s.top + r.height / 2;
      var ang = Math.atan2(y - cy, x - cx);
      var hx = cx + Math.cos(ang) * R, hy = cy + Math.sin(ang) * R;
      var mx = (x + hx) / 2;
      // tracé dans le sens de l'information : carte → centre à gauche, centre → carte à droite
      var d = entree
        ? 'M' + x + ',' + y + ' C' + mx + ',' + y + ' ' + mx + ',' + hy + ' ' + hx + ',' + hy
        : 'M' + hx + ',' + hy + ' C' + mx + ',' + hy + ' ' + mx + ',' + y + ' ' + x + ',' + y;
      var lien = [];
      ['fond', 'flux'].forEach(function(c){
        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', d); p.setAttribute('class', c);
        svg.appendChild(p); lien.push(p);
      });
      n._lien = lien;
    });
  }
  noeuds.forEach(function(n){
    function bascule(on){ (n._lien || []).forEach(function(p){ p.classList.toggle('actif', on); }); }
    n.addEventListener('pointerenter', function(){ bascule(true); });
    n.addEventListener('pointerleave', function(){ bascule(false); });
    n.addEventListener('focusin', function(){ bascule(true); });
    n.addEventListener('focusout', function(){ bascule(false); });
  });
  trace();
  window.addEventListener('resize', trace);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(trace); }
  // les cartes glissent en apparaissant : on retrace une fois l'entrée finie
  setTimeout(trace, 1500);
  if(window.IntersectionObserver){
    new IntersectionObserver(function(e){ if(e[0].isIntersecting){ setTimeout(trace, 1200); } }).observe(schema);
  }
})();
</script>
