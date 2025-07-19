document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const topBtn = document.getElementById('toTopBtn');

  initStickyNavbar(nav, topBtn);
  initChatToggle();
  initAnimations();
  initScrollToAnchors(nav);
  initDropdownHover();
  initModalBookButtons(nav);
});

// Sticky header & scroll-to-top button
function initStickyNavbar(nav, topBtn) {
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow', scrollY > 10);
    topBtn.style.display = scrollY > 300 ? 'block' : 'none';
  });

  topBtn?.addEventListener('click', () => {
    scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Chat icon toggle logic
function initChatToggle() {
  document.getElementById('chat-toggle')?.addEventListener('click', () =>
    document.getElementById('chat-box')?.classList.toggle('d-none')
  );
  document.getElementById('chat-close')?.addEventListener('click', () =>
    document.getElementById('chat-box')?.classList.add('d-none')
  );
}

// Animations for hero and sections
function initAnimations() {
  document.querySelectorAll('.carousel-caption').forEach(caption => {
    caption.classList.add('animate__animated', 'animate__fadeInUp');
  });

  document.querySelectorAll('.service-card').forEach((card, i) => {
    card.classList.add('animate__animated', 'animate__fadeInUp');
    card.style.animationDelay = `${i * 0.15}s`;
  });

  ['#gallery', '#contact'].forEach(selector => {
    const el = document.querySelector(selector);
    if (el) {
      el.classList.add('animate__animated', 'animate__fadeInUp');
      el.style.animationDelay = selector === '#gallery' ? '0.2s' : '0.4s';
    }
  });

  new bootstrap.Carousel(document.querySelector('#hero-carousel'), {
    interval: 5000, pause: 'hover', ride: 'carousel', touch: true
  });

  new bootstrap.Carousel(document.querySelector('#reviewsCarousel'), {
    interval: 6000, pause: 'hover', ride: 'carousel', touch: true, wrap: true
  });
}

// Nav smooth scroll
function initScrollToAnchors(nav) {
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

  const navCol = document.getElementById('navbarNav');
  navCol?.addEventListener('shown.bs.collapse', () => document.body.style.overflow = 'hidden');
  navCol?.addEventListener('hidden.bs.collapse', () => document.body.style.overflow = '');
  document.querySelectorAll('#navbarNav .nav-link')
    .forEach(link => link.addEventListener('click', () => bootstrap.Collapse.getInstance(navCol)?.hide()));
}

// Hover dropdown for desktop
function initDropdownHover() {
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
}

// Modal book buttons close and scroll
function initModalBookButtons(nav) {
  const OFFSET = nav.offsetHeight + 10;
  document.querySelectorAll('[data-bs-target="#booking"], a[href="#booking"]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      e.preventDefault();
      const booking = document.querySelector('#booking');
      const selectedService = this.dataset.service || this.textContent.trim();
      const modals = document.querySelectorAll('.modal.show');
      modals.forEach(modal => bootstrap.Modal.getInstance(modal)?.hide());

      setTimeout(() => {
        const top = booking.getBoundingClientRect().top + window.pageYOffset - OFFSET;
        window.scrollTo({ top, behavior: 'smooth' });

        const banner = document.getElementById('selected-service-banner');
        if (selectedService && banner) {
          banner.textContent = `Booking for: ${selectedService}`;
          banner.style.display = 'block';
        }
      }, 400);
    });
  });
}
