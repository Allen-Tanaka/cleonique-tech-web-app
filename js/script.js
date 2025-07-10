/*  Bootstrap & AOS helpers for Cleonique Tech site  */

document.addEventListener('DOMContentLoaded', () => {

  /* ───── Navbar shadow + Scroll‑to‑Top ───── */
  const nav   = document.getElementById('navbar');
  const topBtn = document.getElementById('toTopBtn');

  const onScroll = () => {
    const scY = window.scrollY;
    nav.classList.toggle('shadow', scY > 10);
    if (topBtn) topBtn.style.display = scY > 300 ? 'block' : 'none';
  };
  window.addEventListener('scroll', onScroll);

  if (topBtn) {
    topBtn.addEventListener('click', () =>
      window.scrollTo({ top: 0, behavior: 'smooth' })
    );
  }

  /* ───── Chat Widget ───── */
  const chatToggle = document.getElementById('chat-toggle');
  const chatBox    = document.getElementById('chat-box');
  const chatClose  = document.getElementById('chat-close');

  if (chatToggle && chatBox) {
    chatToggle.addEventListener('click', () => chatBox.classList.toggle('d-none'));
    if (chatClose) chatClose.addEventListener('click', () => chatBox.classList.add('d-none'));
  }

  /* ───── Bootstrap Carousel (auto‑play) ───── */
  if (document.querySelector('#hero-carousel')) {
    new bootstrap.Carousel('#hero-carousel', {
      interval: 5000,
      pause: 'hover',
      ride: 'carousel',
      touch: true
    });
  }

  /* ───── Dropdowns open on hover (desktop) ───── */
  document.querySelectorAll('.nav-item.dropdown').forEach(item => {
    const ddTrigger = item.querySelector('.dropdown-toggle');
    if (!ddTrigger) return;
    const dd = new bootstrap.Dropdown(ddTrigger, { autoClose: 'outside' });
    item.addEventListener('mouseenter', () => window.innerWidth >= 992 && dd.show());
    item.addEventListener('mouseleave', () => window.innerWidth >= 992 && dd.hide());
  });

  /* ───── AOS (Animate‑On‑Scroll) ───── */
  if (typeof AOS !== 'undefined') AOS.init({
    once: true,
    duration: 800,
    easing: 'ease-out-cubic'
  });

});
