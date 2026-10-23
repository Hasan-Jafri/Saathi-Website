/* ===== Saathi pitch — interactions ===== */
(function(){
  var nav = document.getElementById('nav');
  function onScroll(){ nav.classList.toggle('scrolled', window.scrollY > 12); }
  window.addEventListener('scroll', onScroll, {passive:true}); onScroll();

  // reveal on scroll
  var revealEls = document.querySelectorAll('.kicker, .h2, .big-claim, .compare, .cost-ladder, .lrow, .ladder-foot, .mcard, .step, .tcard, .demo-stage, .founder, .stores');
  revealEls.forEach(function(el){ el.classList.add('reveal'); });
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
    }, {threshold:.1, rootMargin:'0px 0px -6% 0px'});
    revealEls.forEach(function(el){ io.observe(el); });
  } else { revealEls.forEach(function(el){ el.classList.add('in'); }); }

  // scrollspy — highlight the current section in the nav
  var links = Array.prototype.slice.call(document.querySelectorAll('.nav-links a'));
  var secs = links.map(function(a){ return document.querySelector(a.getAttribute('href')); });
  if(links.length && 'IntersectionObserver' in window){
    var spy = new IntersectionObserver(function(entries){
      entries.forEach(function(e){
        if(!e.isIntersecting) return;
        var i = secs.indexOf(e.target);
        if(i < 0) return;
        links.forEach(function(l){ l.classList.remove('active'); });
        links[i].classList.add('active');
        var active = links[i];
        if(active && active.parentNode.scrollWidth > active.parentNode.clientWidth){
          active.parentNode.scrollTo({left: active.offsetLeft - 16, behavior:'smooth'});
        }
      });
    }, {rootMargin:'-45% 0px -50% 0px'});
    secs.forEach(function(s){ if(s) spy.observe(s); });
  }

  // live prototype: strip dev chrome, center the phone
  var frame = document.getElementById('demoFrame');
  var loading = document.getElementById('demoLoading');
  var STYLE = [
    '.side-panel{display:none!important}',
    'html,body{background:#fff!important;overflow:hidden!important;margin:0!important}',
    '.stage{display:flex!important;justify-content:center!important;align-items:center!important;',
      'min-height:100vh!important;width:100%!important;padding:0!important;gap:0!important;transform:none!important}',
    '.phone-stage{margin:0!important;transform:none!important}',
    '.phone{transform:none!important}'
  ].join('');
  function cleanFrame(){
    try{
      var doc = frame.contentDocument;
      if(!doc || !doc.head) return false;
      if(!doc.getElementById('__saathi-embed')){
        var st = doc.createElement('style');
        st.id = '__saathi-embed'; st.textContent = STYLE;
        doc.head.appendChild(st);
      }
      var phone = doc.querySelector('.phone');
      if(phone && loading){ loading.style.display = 'none'; }
      return !!phone;
    }catch(e){ return false; }
  }
  if(frame){
    var tries = 0;
    var iv = setInterval(function(){
      tries++;
      var ready = cleanFrame();
      if((ready && tries > 6) || tries > 100) clearInterval(iv);
    }, 250);
  }
})();
