/* Cleonique main script */
document.addEventListener('DOMContentLoaded',()=>{

  /* Navbar shadow + scroll‑to‑top */
  const nav=document.getElementById('navbar');
  const topBtn=document.getElementById('toTopBtn');
  window.addEventListener('scroll',()=>{
    nav.classList.toggle('shadow',scrollY>10);
    topBtn.style.display=scrollY>300?'block':'none';
  });
  topBtn.addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

  /* Chat widget */
  document.getElementById('chat-toggle')
          .addEventListener('click',()=>document.getElementById('chat-box').classList.toggle('d-none'));
  document.getElementById('chat-close')
          .addEventListener('click',()=>document.getElementById('chat-box').classList.add('d-none'));

  /* Carousel */
  new bootstrap.Carousel('#hero-carousel',{interval:5000,pause:'hover',ride:'carousel',touch:true});

  /* Dropdown hover */
  document.querySelectorAll('.nav-item.dropdown').forEach(el=>{
    const dd=new bootstrap.Dropdown(el.querySelector('.dropdown-toggle'),{autoClose:'outside'});
    el.addEventListener('mouseenter',()=>innerWidth>=992&&dd.show());
    el.addEventListener('mouseleave',()=>innerWidth>=992&&dd.hide());
  });

  /* Mobile menu lock & auto‑collapse */
  const navCollapse=document.getElementById('navbarNav');
  navCollapse.addEventListener('shown.bs.collapse',()=>document.body.style.overflow='hidden');
  navCollapse.addEventListener('hidden.bs.collapse',()=>document.body.style.overflow='');
  document.querySelectorAll('#navbarNav .nav-link').forEach(l=>{
    l.addEventListener('click',()=>bootstrap.Collapse.getInstance(navCollapse)?.hide());
  });
});
