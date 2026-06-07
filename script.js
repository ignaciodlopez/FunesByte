// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));

// Contact form — Formspree submission
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();
  const btn = this.querySelector('button[type=submit]');
  const originalHTML = btn.innerHTML;

  btn.innerHTML = 'Enviando...';
  btn.disabled = true;

  try {
    const res = await fetch('https://formspree.io/f/xjgdygqb', {
      method: 'POST',
      body: new FormData(this),
      headers: { 'Accept': 'application/json' }
    });

    if (res.ok) {
      btn.textContent = '¡Mensaje enviado!';
      btn.style.background = '#28c840';
      btn.style.borderColor = '#28c840';
      this.reset();
    } else {
      throw new Error();
    }
  } catch {
    btn.textContent = 'Error al enviar. Intentá de nuevo.';
    btn.style.background = '#c42b1c';
    btn.style.borderColor = '#c42b1c';
  } finally {
    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.disabled = false;
      btn.style.background = '';
      btn.style.borderColor = '';
    }, 3500);
  }
});

// Fade-in on scroll
const fadeEls = document.querySelectorAll('.service-card, .timeline-step, .tech-icon-card, .project-card');

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = '';
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObserver.observe(el);
});
