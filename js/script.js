document.addEventListener('DOMContentLoaded', () => {

  /* ===== Navbar shadow + scroll-top button ===== */
  const nav   = document.getElementById('navbar'),
        topBtn = document.getElementById('toTopBtn');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow', scrollY > 10);
    topBtn.style.display = scrollY > 300 ? 'block' : 'none';
  });
  topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  /* ===== Chat widget ===== */
  document.getElementById('chat-toggle')
          .addEventListener('click', () => document.getElementById('chat-box').classList.toggle('d-none'));
  document.getElementById('chat-close')
          .addEventListener('click', () => document.getElementById('chat-box').classList.add('d-none'));

  /* ===== Carousels ===== */
  const heroEl    = document.querySelector('#hero-carousel');
  const reviewsEl = document.querySelector('#reviewsCarousel');

  new bootstrap.Carousel(heroEl, {
    interval: 5000,
    pause:    'hover',
    ride:     'carousel',
    touch:    true
  });
  new bootstrap.Carousel(reviewsEl, {
    interval: 6000,
    pause:    'hover',
    ride:     'carousel',
    touch:    true,
    wrap:     true      // keep looping
  });

  /* ===== Desktop dropdown hover ===== */
  document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    const dd = new bootstrap.Dropdown(item.querySelector('.dropdown-toggle'), { autoClose: 'outside' });
    item.addEventListener('mouseenter', () => innerWidth >= 992 && dd.show());
    item.addEventListener('mouseleave', () => innerWidth >= 992 && dd.hide());
  });

  /* ===== Mobile menu body-lock & auto-collapse ===== */
  const navCol = document.getElementById('navbarNav');
  navCol.addEventListener('shown.bs.collapse', () => document.body.style.overflow = 'hidden');
  navCol.addEventListener('hidden.bs.collapse', () => document.body.style.overflow = '');
  document.querySelectorAll('#navbarNav .nav-link')
          .forEach(l => l.addEventListener('click',
                   () => bootstrap.Collapse.getInstance(navCol)?.hide()));
});
