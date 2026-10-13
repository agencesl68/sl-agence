<script>
/* ============ 02 · Le schéma : traits, ports et lueurs qui circulent ============ */
(function(){
  "use strict";
  var schema = document.getElementById('schema');
  var svg = document.getElementById('schemaLiens');
  if(!schema || !svg){ return; }
  var NS = 'http://www.w3.org/2000/svg';
  var REDUCE = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var noeuds = Array.prototype.slice.call(schema.querySelectorAll('.noeud'));
  var disque = schema.querySelector('.moyeu-disque');
  var liens = [];   // {trait, lueurs:[g], L, decal}

  function el(nom, attrs){
    var e = document.createElementNS(NS, nom);
    for(var k in attrs){ e.setAttribute(k, attrs[k]); }
    return e;
  }

  function trace(){
    svg.innerHTML = '';
    liens = [];
    if(window.innerWidth < 1000){ return; }

    // flou de la lueur
    var defs = el('defs', {});
    var f = el('filter', {id:'lueurFlou', x:'-200%', y:'-200%', width:'500%', height:'500%'});
    f.appendChild(el('feGaussianBlur', {stdDeviation:'2.6'}));
    defs.appendChild(f);
    svg.appendChild(defs);

    var s = schema.getBoundingClientRect(), m = disque.getBoundingClientRect();
    var cx = m.left - s.left + m.width / 2, cy = m.top - s.top + m.height / 2, R = m.width / 2;

    noeuds.forEach(function(n, i){
      var r = n.getBoundingClientRect();
      var entree = n.dataset.sens === 'entree';
      var x = entree ? r.right - s.left : r.left - s.left, y = r.top - s.top + r.height / 2;
      // le trait arrive sur le disque, réparti en éventail sur son bord
      var ang = Math.atan2(y - cy, x - cx);
      var hx = cx + Math.cos(ang) * R, hy = cy + Math.sin(ang) * R;
      var k = Math.abs(hx - x) * .55;
      var d = entree
        ? 'M' + x + ',' + y + ' C' + (x + k) + ',' + y + ' ' + (hx - k * .6) + ',' + hy + ' ' + hx + ',' + hy
        : 'M' + hx + ',' + hy + ' C' + (hx + k * .6) + ',' + hy + ' ' + (x - k) + ',' + y + ' ' + x + ',' + y;

      var trait = el('path', {d:d, 'class':'trait'});
      svg.appendChild(trait);
      svg.appendChild(el('circle', {cx:x, cy:y, r:3.5, 'class':'port'}));
      svg.appendChild(el('circle', {cx:hx, cy:hy, r:2.5, 'class':'port'}));

      var g = el('g', {});
      g.appendChild(el('circle', {r:4.5, 'class':'lueur'}));
      g.appendChild(el('circle', {r:1.6, 'class':'lueur-coeur'}));
      g.style.opacity = 0;
      svg.appendChild(g);

      liens.push({n:n, trait:trait, g:g, L:trait.getTotalLength(), decal:(i * .37) % 1});
      n._trait = trait;
    });
    if(REDUCE){ liens.forEach(function(l){ l.g.style.display = 'none'; }); }
  }

  // les lueurs parcourent chaque trait, en décalé, dans le sens de l'information
  var visible = false, T = 2600;
  function boucle(t){
    if(!visible){ return; }
    for(var i = 0; i < liens.length; i++){
      var l = liens[i];
      var p = ((t / T) + l.decal) % 1;
      var pt = l.trait.getPointAtLength(l.L * p);
      l.g.setAttribute('transform', 'translate(' + pt.x.toFixed(1) + ',' + pt.y.toFixed(1) + ')');
      l.g.style.opacity = Math.sin(p * Math.PI).toFixed(2);   // apparaît et s'éteint aux extrémités
    }
    requestAnimationFrame(boucle);
  }

  noeuds.forEach(function(n){
    function bascule(on){ if(n._trait){ n._trait.classList.toggle('actif', on); } }
    n.addEventListener('pointerenter', function(){ bascule(true); });
    n.addEventListener('pointerleave', function(){ bascule(false); });
    n.addEventListener('focusin', function(){ bascule(true); });
    n.addEventListener('focusout', function(){ bascule(false); });
  });

  trace();
  window.addEventListener('resize', trace);
  if(document.fonts && document.fonts.ready){ document.fonts.ready.then(trace); }

  if(window.IntersectionObserver){
    new IntersectionObserver(function(e){
      var avant = visible;
      visible = e[0].isIntersecting;
      if(visible){ setTimeout(trace, 1200); }   // après l'apparition des cartes
      if(visible && !avant && !REDUCE){ requestAnimationFrame(boucle); }
    }).observe(schema);
  }
})();
</script>
