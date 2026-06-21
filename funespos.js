// ============================================================
// FunesPOS — Script
// ============================================================

// ---- NAVBAR scroll ----
const navbar    = document.getElementById('pos-navbar');
const mobileBtn = document.getElementById('pos-mobile-btn');
const mobileMenu = document.getElementById('pos-mobile-menu');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
}, { passive: true });

// ---- MOBILE MENU ----
function closeMobile() {
  mobileMenu.classList.add('hidden');
  mobileBtn.setAttribute('aria-expanded', 'false');
  mobileBtn.querySelector('i').className = 'bi bi-list';
}

mobileBtn.addEventListener('click', () => {
  const isOpen = !mobileMenu.classList.contains('hidden');
  if (isOpen) {
    closeMobile();
  } else {
    mobileMenu.classList.remove('hidden');
    mobileBtn.setAttribute('aria-expanded', 'true');
    mobileBtn.querySelector('i').className = 'bi bi-x-lg';
  }
});

document.querySelectorAll('.pos-mobile-link, .pos-mobile-cta').forEach(l =>
  l.addEventListener('click', closeMobile)
);

document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) closeMobile();
});

// ---- FADE IN ----
const fadeEls = document.querySelectorAll('.fade-in');
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ---- CONTACT FORM ----
const form      = document.getElementById('posContactForm');
const submitBtn = document.getElementById('pos-submit');

if (form && submitBtn) {
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const originalHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span style="opacity:.7">Enviando...</span>';
    submitBtn.disabled = true;

    try {
      const res = await fetch('https://formspree.io/f/xjgdygqb', {
        method: 'POST',
        body: new FormData(this),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        submitBtn.innerHTML = '<i class="bi bi-check-circle-fill"></i> ¡Listo! Te contactamos pronto.';
        submitBtn.style.background = '#16a34a';
        form.reset();
      } else {
        throw new Error();
      }
    } catch {
      submitBtn.innerHTML = '<i class="bi bi-exclamation-triangle-fill"></i> Error al enviar. Intentá de nuevo.';
      submitBtn.style.background = '#dc2626';
    } finally {
      setTimeout(() => {
        submitBtn.innerHTML = originalHTML;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3500);
    }
  });
}
