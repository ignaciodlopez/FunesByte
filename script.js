// ============================================================
// FunesByte — Main Script
// ============================================================

// ---- NAVBAR: scroll effect ----
const navbar     = document.getElementById('navbar');
const mobileBtn  = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 24);
}, { passive: true });

// ---- MOBILE MENU ----
if (mobileBtn && mobileMenu) {
  const iconMenu  = mobileBtn.querySelector('.icon-menu');
  const iconClose = mobileBtn.querySelector('.icon-close');

  const setMenu = (open) => {
    mobileMenu.classList.toggle('hidden', !open);
    mobileBtn.setAttribute('aria-expanded', String(open));
    mobileBtn.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    iconMenu.classList.toggle('hidden', open);
    iconClose.classList.toggle('hidden', !open);
  };

  mobileBtn.addEventListener('click', () => {
    setMenu(mobileMenu.classList.contains('hidden'));
  });

  mobileMenu.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => setMenu(false))
  );

  document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) setMenu(false);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') setMenu(false);
  });
}

// ---- ACTIVE NAV LINK ----
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

if (sections.length && navLinks.length) {
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px -30% 0px' });

  sections.forEach(s => sectionObserver.observe(s));
}

// ---- SCROLL REVEAL ----
const fadeEls = document.querySelectorAll('.fade-in');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reducedMotion || !('IntersectionObserver' in window)) {
  fadeEls.forEach(el => el.classList.add('visible'));
} else {
  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

  fadeEls.forEach(el => fadeObserver.observe(el));
}

// ---- CONTACT FORM ----
const form      = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

if (form && submitBtn) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const originalHTML = submitBtn.innerHTML;
    submitBtn.textContent = 'Enviando…';
    submitBtn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });

      if (!res.ok) throw new Error('Server error');

      submitBtn.textContent = '✓ ¡Mensaje enviado!';
      submitBtn.style.background = '#1a7f4b';
      form.reset();
    } catch {
      submitBtn.textContent = 'Error al enviar. Intentá de nuevo.';
      submitBtn.style.background = '#b3261e';
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3500);
    }
  });
}
