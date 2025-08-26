// script.js

// ─── Loader overlay ─────────────────────────────────────────────────────────
(function(){
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.innerHTML = '<div class="loader-logo-wrapper"><img src="images/web-white.png" alt="Cleonique Logo" class="loader-logo" height="56" style="margin-bottom:1.5rem;"><div class="spinner"></div></div>';
  document.body.appendChild(loader);
  window.addEventListener('load', () => {
    loader.classList.add('loaded');
    setTimeout(() => loader.remove(), 300);
  });
})();

// ─── Main JS on DOM ready ───────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  // Navbar and back-to-top button
  const nav = document.getElementById('navbar');
  const topBtn = document.getElementById('toTopBtn');

  // Hero carousel margin fix
  const hero = document.querySelector('#hero-carousel');
  if (hero && nav) {
    const navHeight = nav.offsetHeight;
    hero.style.marginTop = `-${navHeight}px`;
  }

  // Scroll events: shadow on navbar & back-to-top visibility
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow', window.scrollY > 10);
    topBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
  });

  // Back-to-top click
  topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Section animations
  const animateSection = (selector, delay) => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('animate__animated', 'animate__fadeInUp');
      el.style.animationDelay = delay;
    }
  };
  animateSection('#about', '0.2s');
  animateSection('#services', '0.3s');
  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.classList.add('animate__animated', 'animate__fadeInUp');
    card.style.animationDelay = `${i * 0.15}s`;
  });
  animateSection('#contact', '0.4s');

  // Initialize carousels
  new bootstrap.Carousel(document.querySelector('#hero-carousel'), {
    interval: 5000,
    pause: 'hover',
    ride: 'carousel',
    touch: true
  });
  new bootstrap.Carousel(document.querySelector('#reviewsCarousel'), {
    interval: 6000,
    pause: 'hover',
    ride: 'carousel',
    touch: true,
    wrap: true
  });

  // Dropdown hover behavior
  const dropdown = document.querySelector('.nav-item.dropdown');
  if (dropdown) {
    const menu = dropdown.querySelector('.dropdown-menu');
    let timer;
    dropdown.addEventListener('mouseenter', () => {
      clearTimeout(timer);
      menu.style.opacity = '1';
      menu.style.pointerEvents = 'auto';
      menu.classList.add('show');
    });
    dropdown.addEventListener('mouseleave', () => {
      timer = setTimeout(() => {
        menu.style.opacity = '0';
        menu.style.pointerEvents = 'none';
        menu.classList.remove('show');
      }, 250);
    });
  }

  // Smooth scroll for anchor links (excluding data-bs-toggle)
  const OFFSET = nav.offsetHeight + 10;
  document.querySelectorAll('a[href^="#"]:not([data-bs-toggle])').forEach(link => {
    link.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.pageYOffset - OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // Style contact icons in contact section
  document.querySelectorAll('#contact .bg-brand-dark div').forEach(item => {
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.querySelector('i')?.classList.add('me-2');
  });

  // Navbar collapse (mobile): prevent body scroll when open
  const navColEl = document.getElementById('navbarNav');
  navColEl?.addEventListener('shown.bs.collapse', () => document.body.style.overflow = 'hidden');
  navColEl?.addEventListener('hidden.bs.collapse', () => document.body.style.overflow = '');

  // ─── Add close-icon into mobile nav ────────────────────────────────────────
  const bsNavCollapse = bootstrap.Collapse.getOrCreateInstance(navColEl, { toggle: false });
  if (navColEl) {
    navColEl.insertAdjacentHTML(
      'afterbegin',
      '<button type="button" id="navCloseBtn" class="nav-close-btn">&times;</button>'
    );
    document.getElementById('navCloseBtn').addEventListener('click', () => {
      bsNavCollapse.hide();
    });
  }

  // Collapse mobile nav when any real link or dropdown-item is clicked
  document
    .querySelectorAll('#navbarNav .nav-link:not(.dropdown-toggle), #navbarNav .dropdown-item')
    .forEach(el => {
      el.addEventListener('click', () => {
        if (window.innerWidth < 992) {
          bsNavCollapse.hide();
        }
      });
    });

  // Booking buttons: open booking section in new tab/window
  document.querySelectorAll('a.booking-btn').forEach(button => {
    button.addEventListener('click', e => {
      e.preventDefault();
      // Close any open Bootstrap modals
      document.querySelectorAll('.modal.show').forEach(modalEl => {
        bootstrap.Modal.getInstance(modalEl)?.hide();
      });
      // Open booking section (#booking) in a new tab
      const bookingUrl = `${window.location.origin}${window.location.pathname}#booking`;
      window.open(bookingUrl, '_blank');
    });
  });

  // OPTIONAL: Redirect back to homepage after booking completion
  if (window.opener) {
    document.addEventListener('bookingCompleted', () => {
      window.close();
      window.opener.focus();
    });
  }
});
