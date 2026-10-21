/* SL Agence — menu : ouverture au clic / clavier, Échap, accordéon mobile. Le survol est géré en CSS. */
(function(){
  var root=document.documentElement; root.classList.add('mn-js');
  var head=document.getElementById('siteHead'); if(!head) return;
  var nav=document.getElementById('mnNav'), burger=document.getElementById('mnBurger');
  var items=[].slice.call(head.querySelectorAll('.mn-item'));
  var desktop=window.matchMedia('(min-width:901px)');

  function set(item,open){
    item.classList.toggle('is-open',open);
    item.querySelector('.mn-top').setAttribute('aria-expanded',open?'true':'false');
  }
  function closeAll(except){ items.forEach(function(i){ if(i!==except) set(i,false); }); }
  function setBurger(open){
    nav.classList.toggle('is-open',open);
    burger.setAttribute('aria-expanded',open?'true':'false');
    burger.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');
    if(!open) closeAll();
  }

  items.forEach(function(item){
    var top=item.querySelector('.mn-top');
    top.addEventListener('click',function(){ var o=!item.classList.contains('is-open'); closeAll(item); set(item,o); head.classList.remove('mn-esc'); });
    /* ordinateur : aria-expanded suit le survol */
    item.addEventListener('mouseenter',function(){ if(desktop.matches) top.setAttribute('aria-expanded','true'); });
    item.addEventListener('mouseleave',function(){ if(desktop.matches && !item.classList.contains('is-open')) top.setAttribute('aria-expanded','false'); });
    /* ordinateur : le focus qui sort du panneau le ferme */
    item.addEventListener('focusout',function(e){ if(desktop.matches && e.relatedTarget && !item.contains(e.relatedTarget)) set(item,false); });
  });

  burger.addEventListener('click',function(){ setBurger(!nav.classList.contains('is-open')); });

  /* un lien choisi referme le menu mobile */
  nav.addEventListener('click',function(e){ if(e.target.closest('a')) setBurger(false); });

  /* clic ailleurs */
  document.addEventListener('click',function(e){ if(!head.contains(e.target)){ closeAll(); if(!desktop.matches) setBurger(false); } });

  /* Échap : ferme et rend le focus au bouton */
  document.addEventListener('keydown',function(e){
    if(e.key!=='Escape') return;
    var ouvert=items.filter(function(i){ return i.classList.contains('is-open')||i.matches(':hover')||i.contains(document.activeElement); })[0];
    var menuOuvert=nav.classList.contains('is-open')&&!desktop.matches;
    if(!ouvert&&!menuOuvert) return;
    closeAll(); head.classList.add('mn-esc');
    items.forEach(function(i){ i.querySelector('.mn-top').setAttribute('aria-expanded','false'); });
    if(menuOuvert){ setBurger(false); burger.focus(); }
    else if(ouvert){ ouvert.querySelector('.mn-top').focus(); }
  });
  ['mouseenter','mouseleave'].forEach(function(ev){ head.addEventListener(ev,function(){ head.classList.remove('mn-esc'); }); });

  /* changement de taille : on repart d'un état propre */
  (desktop.addEventListener?desktop.addEventListener.bind(desktop,'change'):desktop.addListener.bind(desktop))(function(){ setBurger(false); closeAll(); });
})();
