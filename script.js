const SITE_CONFIG = {
  locale: document.documentElement.lang || "fr",
  contacts: {
    whatsappNumber: "",
    instagramUrl: "",
    email: "",
  },
};

const PRODUCTS = [
  {
    brand: "Beauty of Joseon",
    name: "Glow Deep Serum",
    category: "Soin visage",
    filter: "face",
    description: "Éclat · riz · alpha-arbutine",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-boj-glow-deep-serum.webp",
    alt: "Flacon Beauty of Joseon Glow Deep Serum avec riz et lumière naturelle",
  },
  {
    brand: "Beauty of Joseon",
    name: "Relief Sun SPF50+",
    category: "Soin solaire",
    filter: "sun",
    description: "Protection quotidienne · texture légère",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-boj-relief-sun.webp",
    alt: "Tube Beauty of Joseon Relief Sun dans un décor coréen lumineux",
  },
  {
    brand: "Beauty of Joseon",
    name: "Dynasty Cream",
    category: "Soin visage",
    filter: "face",
    description: "Nutrition · confort · éclat",
    availability: "Stock limité",
    statusClass: "status-limited",
    image: "assets/images/lyan-co/product-boj-dynasty-cream.webp",
    alt: "Pot Beauty of Joseon Dynasty Cream avec fleurs et lin crème",
  },
  {
    brand: "Beauty of Joseon",
    name: "Rice Milk Toner",
    category: "Soin visage",
    filter: "face",
    description: "Hydratation · riz · confort",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-boj-rice-milk-toner.webp",
    alt: "Flacon Beauty of Joseon Rice Milk Toner avec riz et céramique",
  },
  {
    brand: "SKIN1004",
    name: "Madagascar Centella Ampoule",
    category: "Soin visage",
    filter: "face",
    description: "Apaisant · réparation · peau sensible",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-skin1004-centella-ampoule.webp",
    alt: "Flacon SKIN1004 Madagascar Centella Ampoule avec matières naturelles",
  },
  {
    brand: "SKIN1004",
    name: "Centella Routine",
    category: "Kits & Routines",
    filter: "kits",
    description: "Peau sensible · apaisement",
    availability: "Stock limité",
    statusClass: "status-limited",
    image: "assets/images/lyan-co/product-skin1004-centella-routine.webp",
    alt: "Ensemble de soins SKIN1004 à la Centella",
  },
  {
    brand: "Anua",
    name: "Heartleaf 77 Toner",
    category: "Soin visage",
    filter: "face",
    description: "Apaisant · peau sensible",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-anua-heartleaf-77-toner.webp",
    alt: "Flacon Anua Heartleaf 77 Toner sur un plateau en pierre claire",
  },
  {
    brand: "Anua",
    name: "Rice 70 Toner",
    category: "Soin visage",
    filter: "face",
    description: "Éclat · hydratation · barrière cutanée",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-anua-rice-70-toner.webp",
    alt: "Flacon Anua Rice 70 Toner entouré de riz dans une lumière crème",
  },
  {
    brand: "Mixsoon",
    name: "Bean Essence",
    category: "Soin visage",
    filter: "face",
    description: "Texture · éclat · peau lisse",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-mixsoon-bean-essence.webp",
    alt: "Flacon Mixsoon Bean Essence dans une composition éditoriale claire",
  },
  {
    brand: "Mixsoon",
    name: "Bean Cream",
    category: "Soin visage",
    filter: "face",
    description: "Hydratation · confort · douceur",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-mixsoon-bean-cream.webp",
    alt: "Pot Mixsoon Bean Cream sur du lin avec graines de soja",
  },
  {
    brand: "Torriden",
    name: "Dive-In Serum",
    category: "Soin visage",
    filter: "face",
    description: "Acide hyaluronique · hydratation légère",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-torriden-dive-in-serum.webp",
    alt: "Flacon bleu Torriden Dive-In Serum près d’un miroir",
  },
];

const FILTER_LABELS = {
  all: "Tous",
  face: "Soin visage",
  sun: "Soin solaire",
  masks: "Masques",
  hair: "Soin cheveux",
  makeup: "Maquillage",
  home: "Maison & Ambiance",
  kits: "Kits & Routines",
};

const html = document.documentElement;
const header = document.querySelector("[data-scroll-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const productGrid = document.querySelector("#product-grid");
const filterStatus = document.querySelector("#filter-status");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const mobileNavQuery = window.matchMedia("(max-width: 1120px)");

const escapeHtml = value =>
  String(value).replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);

const productMessage = productName =>
  `Bonjour Lyan & Co.\nJe suis intéressé(e) par ${productName}.\nPouvez-vous me communiquer la disponibilité ?`;

const routineMessage = routineName =>
  `Bonjour Lyan & Co.\nJe suis intéressé(e) par la ${routineName}.\nPouvez-vous me communiquer la disponibilité ?`;

const whatsappUrl = message => {
  const number = SITE_CONFIG.contacts.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "#commander";
};

const externalAttributes = isConfigured =>
  isConfigured ? 'target="_blank" rel="noopener noreferrer"' : "";

const renderProducts = (filter = "all") => {
  if (!productGrid) return;

  const visibleProducts = filter === "all"
    ? PRODUCTS
    : PRODUCTS.filter(product => product.filter === filter);

  productGrid.classList.add("is-updating");

  window.setTimeout(() => {
    if (!visibleProducts.length) {
      productGrid.innerHTML = `
        <div class="empty-selection">
          <p class="eyebrow">${escapeHtml(FILTER_LABELS[filter])}</p>
          <h3>Sélection en préparation.</h3>
          <p>Aucun produit de cette catégorie n’est présenté pour le moment.</p>
          <a class="text-link" href="#commander">Nous poser une question <span aria-hidden="true">↗</span></a>
        </div>
      `;
    } else {
      productGrid.innerHTML = visibleProducts.map(product => `
        <article class="product-card">
          <figure class="product-image">
            <img
              src="${escapeHtml(product.image)}"
              width="1200"
              height="1600"
              loading="lazy"
              decoding="async"
              alt="${escapeHtml(product.alt)}"
            />
            <figcaption class="product-status ${escapeHtml(product.statusClass)}">${escapeHtml(product.availability)}</figcaption>
          </figure>
          <div class="product-copy">
            <p class="product-brand">${escapeHtml(product.brand)}</p>
            <h3>${escapeHtml(product.name)}</h3>
            <p class="product-category">${escapeHtml(product.category)}</p>
            <p class="product-description">${escapeHtml(product.description)}</p>
            <div class="product-actions">
              <a
                href="${whatsappUrl(productMessage(product.name))}"
                data-product-whatsapp
                ${externalAttributes(Boolean(SITE_CONFIG.contacts.whatsappNumber))}
              >Commander sur WhatsApp</a>
              <a
                href="${SITE_CONFIG.contacts.instagramUrl || "#commander"}"
                ${externalAttributes(Boolean(SITE_CONFIG.contacts.instagramUrl))}
              >Demander sur Instagram</a>
            </div>
          </div>
        </article>
      `).join("");
    }

    productGrid.classList.remove("is-updating");
    if (filterStatus) {
      const count = visibleProducts.length;
      filterStatus.textContent = count
        ? `${count} ${count > 1 ? "produits affichés" : "produit affiché"} dans ${FILTER_LABELS[filter]}.`
        : `Aucun produit affiché dans ${FILTER_LABELS[filter]}.`;
    }
  }, 120);
};

const configureContactLinks = () => {
  document.querySelectorAll('[data-contact="whatsapp"]').forEach(link => {
    if (!SITE_CONFIG.contacts.whatsappNumber) return;
    link.href = whatsappUrl("Bonjour Lyan & Co.\nJe souhaite obtenir des informations sur votre sélection.");
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll("[data-routine]").forEach(link => {
    const routineName = link.dataset.routine;
    if (!SITE_CONFIG.contacts.whatsappNumber || !routineName) return;
    link.href = whatsappUrl(routineMessage(routineName));
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll('[data-contact="instagram"]').forEach(link => {
    if (!SITE_CONFIG.contacts.instagramUrl) return;
    link.href = SITE_CONFIG.contacts.instagramUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
  });

  document.querySelectorAll('[data-contact="email"]').forEach(link => {
    if (!SITE_CONFIG.contacts.email) return;
    link.href = `mailto:${SITE_CONFIG.contacts.email}`;
    link.textContent = SITE_CONFIG.contacts.email;
  });
};

const setHeaderState = () => {
  header?.classList.toggle("is-scrolled", window.scrollY > 12);
};

const setMenuState = isOpen => {
  if (!menuToggle || !nav) return;
  menuToggle.classList.toggle("is-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Fermer le menu" : "Ouvrir le menu");
  nav.classList.toggle("is-open", isOpen);

  if (mobileNavQuery.matches) {
    nav.setAttribute("aria-hidden", String(!isOpen));
  } else {
    nav.removeAttribute("aria-hidden");
  }
};

const closeMenu = () => setMenuState(false);

renderProducts();
configureContactLinks();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    renderProducts(button.dataset.filter);
  });
});

if (menuToggle && nav) {
  setMenuState(false);

  menuToggle.addEventListener("click", () => {
    setMenuState(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  document.addEventListener("click", event => {
    if (
      menuToggle.getAttribute("aria-expanded") === "true" &&
      !nav.contains(event.target) &&
      !menuToggle.contains(event.target)
    ) {
      closeMenu();
    }
  });

  nav.addEventListener("click", event => {
    if (event.target instanceof HTMLAnchorElement) closeMenu();
  });

  document.addEventListener("keydown", event => {
    if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
      menuToggle.focus();
    }
  });

  mobileNavQuery.addEventListener("change", closeMenu);
}

if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  html.classList.add("reveal-ready");
}

window.addEventListener("scroll", setHeaderState, { passive: true });
setHeaderState();
