const html = document.documentElement;
const header = document.querySelector('[data-scroll-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const reveals = document.querySelectorAll('.reveal');
const newsletterForm = document.querySelector('.newsletter-form');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

const setMenuState = isOpen => {
  if (!menuToggle || !nav) return;
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('is-open', isOpen);
  nav.setAttribute('aria-hidden', String(!isOpen));
};

const closeMenu = () => setMenuState(false);

if (menuToggle && nav) {
  setMenuState(false);

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
    setMenuState(!isOpen);
  });

  document.addEventListener('click', event => {
    if (
      menuToggle.getAttribute('aria-expanded') === 'true' &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  nav.addEventListener('click', event => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
      closeMenu();
    }
  });
}


if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  html.classList.add('reveal-ready');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  reveals.forEach(el => observer.observe(el));
} else {
  reveals.forEach(el => el.classList.add('is-visible'));
}

newsletterForm?.addEventListener('submit', event => {
  event.preventDefault();

  const form = event.currentTarget;
  const email = form.querySelector('input[type="email"]');
  const consent = form.querySelector('input[name="consent"]');
  const status = form.querySelector('.form-status');

  if (!email?.checkValidity()) {
    status.textContent = 'Ajoutez une adresse email valide.';
    status.classList.add('is-error');
    email?.focus();
    return;
  }

  if (!consent?.checked) {
    status.textContent = 'Cochez le consentement avant de vous inscrire.';
    status.classList.add('is-error');
    consent?.focus();
    return;
  }

  status.textContent = 'Merci. La connexion au service newsletter pourra être ajoutée ensuite.';
  status.classList.remove('is-error');
  form.reset();
});

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
