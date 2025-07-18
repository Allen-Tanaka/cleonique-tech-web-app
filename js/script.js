document.addEventListener('DOMContentLoaded', () => {
  const nav = document.getElementById('navbar');
  const topBtn = document.getElementById('toTopBtn');

  // Adjust hero margin
  const hero = document.querySelector('#hero-carousel');
  if (hero && nav) {
    const navHeight = nav.offsetHeight;
    hero.style.marginTop = `-${navHeight}px`;
  }

  // Scroll & navbar shadow
  window.addEventListener('scroll', () => {
    nav.classList.toggle('shadow', scrollY > 10);
    topBtn.style.display = scrollY > 300 ? 'block' : 'none';
  });

  topBtn.addEventListener('click', () => scrollTo({ top: 0, behavior: 'smooth' }));

  // Chat toggle
  document.getElementById('chat-toggle')?.addEventListener('click', () =>
    document.getElementById('chat-box')?.classList.toggle('d-none')
  );
  document.getElementById('chat-close')?.addEventListener('click', () =>
    document.getElementById('chat-box')?.classList.add('d-none')
  );

  // Animate hero captions
  document.querySelectorAll('.carousel-caption').forEach(caption => {
    caption.classList.add('animate__animated', 'animate__fadeInUp');
  });

  // Animate sections
  const gallery = document.querySelector('#gallery');
  const contact = document.querySelector('#contact');
  if (gallery) {
    gallery.classList.add('animate__animated', 'animate__fadeInUp');
    gallery.style.animationDelay = '0.2s';
  }
  if (contact) {
    contact.classList.add('animate__animated', 'animate__fadeInUp');
    contact.style.animationDelay = '0.4s';
  }

  // Animate service cards
  document.querySelectorAll('.service-card').forEach((card, index) => {
    card.classList.add('animate__animated', 'animate__fadeInUp');
    card.style.animationDelay = `${index * 0.15}s`;
  });

  // Carousel init
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

  // Hover dropdown fix
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

  // Mobile menu collapse
  const navCol = document.getElementById('navbarNav');
  navCol?.addEventListener('shown.bs.collapse', () => document.body.style.overflow = 'hidden');
  navCol?.addEventListener('hidden.bs.collapse', () => document.body.style.overflow = '');
  document.querySelectorAll('#navbarNav .nav-link')
    .forEach(link => link.addEventListener('click', () => bootstrap.Collapse.getInstance(navCol)?.hide()));

  // Smooth scroll w/ offset
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

  // Contact icon/text alignment
  document.querySelectorAll('#contact .bg-brand-dark div').forEach(item => {
    item.style.display = 'flex';
    item.style.alignItems = 'center';
    item.querySelector('i')?.classList.add('me-2');
  });

  // Book buttons: close modal, scroll, and show service
  document.querySelectorAll('a[href="#booking"]').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const booking = document.querySelector('#booking');
      const selectedService = this.dataset.service;
      if (booking) {
        // Close modal
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
      }
    });
  });
});
