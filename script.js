const html = document.documentElement;
const header = document.querySelector('[data-scroll-header]');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('#main-nav');
const mobileNavQuery = window.matchMedia('(max-width: 1080px)');
const staticForm = document.querySelector('[data-static-form]');

const setHeaderState = () => {
  header?.classList.toggle('is-scrolled', window.scrollY > 12);
};

const setMenuState = isOpen => {
  if (!menuToggle || !nav) return;
  menuToggle.classList.toggle('is-open', isOpen);
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Fermer le menu' : 'Ouvrir le menu');
  nav.classList.toggle('is-open', isOpen);
  if (mobileNavQuery.matches) {
    nav.setAttribute('aria-hidden', String(!isOpen));
  } else {
    nav.removeAttribute('aria-hidden');
  }
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
      menuToggle.focus();
    }
  });

  mobileNavQuery.addEventListener('change', closeMenu);
}

if (staticForm instanceof HTMLFormElement) {
  const status = staticForm.querySelector('[role="status"]');

  staticForm.addEventListener('submit', event => {
    event.preventDefault();

    if (!staticForm.reportValidity()) return;

    if (status) {
      status.textContent =
        "Merci. Le formulaire est encore statique : l'adresse n'a pas été envoyée.";
    }
  });
}

if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  html.classList.add('reveal-ready');
}

window.addEventListener('scroll', setHeaderState, { passive: true });
setHeaderState();
