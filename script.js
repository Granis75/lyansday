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
    description: "Éclat · riz · alpha-arbutine",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-boj-glow-deep-serum.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon Beauty of Joseon Glow Deep Serum avec riz et lumière naturelle",
  },
  {
    brand: "Beauty of Joseon",
    name: "Relief Sun SPF50+",
    category: "Soin solaire · K-Beauty",
    description: "Protection quotidienne · texture légère",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-boj-relief-sun.webp",
    width: 1200,
    height: 1600,
    alt: "Tube Beauty of Joseon Relief Sun dans un décor coréen lumineux",
  },
  {
    brand: "Beauty of Joseon",
    name: "Dynasty Cream",
    category: "Soin visage",
    description: "Nutrition · confort · éclat",
    availability: "Stock limité",
    statusClass: "status-limited",
    image: "assets/images/lyan-co/product-boj-dynasty-cream.webp",
    width: 1200,
    height: 1600,
    alt: "Pot Beauty of Joseon Dynasty Cream avec fleurs et lin crème",
  },
  {
    brand: "Beauty of Joseon",
    name: "Rice Milk Toner",
    category: "Soin visage",
    description: "Hydratation · riz · confort",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-boj-rice-milk-toner.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon Beauty of Joseon Rice Milk Toner avec riz, céramique et serviette blanche",
  },
  {
    brand: "SKIN1004",
    name: "Madagascar Centella Ampoule",
    category: "Soin visage",
    description: "Apaisant · réparation · peau sensible",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-skin1004-centella-ampoule.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon SKIN1004 Madagascar Centella Ampoule avec matières naturelles",
  },
  {
    brand: "Anua",
    name: "Heartleaf 77 Toner",
    category: "Soin visage",
    description: "Apaisant · peau sensible",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-anua-heartleaf-77-toner.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon Anua Heartleaf 77 Toner sur un plateau en pierre claire",
  },
  {
    brand: "Anua",
    name: "Rice 70 Toner",
    category: "Soin visage",
    description: "Éclat · hydratation · barrière cutanée",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-anua-rice-70-toner.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon Anua Rice 70 Toner entouré de riz dans une lumière crème",
  },
  {
    brand: "Mixsoon",
    name: "Bean Essence",
    category: "Soin visage",
    description: "Texture · éclat · peau lisse",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-mixsoon-bean-essence.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon Mixsoon Bean Essence dans une composition éditoriale claire",
  },
  {
    brand: "Mixsoon",
    name: "Bean Cream",
    category: "Soin visage",
    description: "Hydratation · confort · douceur",
    availability: "Sur commande",
    statusClass: "",
    image: "assets/images/lyan-co/product-mixsoon-bean-cream.webp",
    width: 1200,
    height: 1600,
    alt: "Pot Mixsoon Bean Cream ouvert sur du lin, avec graines de soja et coton",
  },
  {
    brand: "Torriden",
    name: "Dive-In Serum",
    category: "Soin visage",
    description: "Acide hyaluronique · hydratation légère",
    availability: "En stock",
    statusClass: "status-available",
    image: "assets/images/lyan-co/product-torriden-dive-in-serum.webp",
    width: 1200,
    height: 1600,
    alt: "Flacon bleu Torriden Dive-In Serum près d’un miroir",
  },
];

const html = document.documentElement;
const header = document.querySelector("[data-scroll-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const productGrid = document.querySelector("#product-grid");
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
  `Bonjour Lyan & Co.,\nJe suis intéressé(e) par ${productName}.\nPouvez-vous me communiquer la disponibilité ?`;

const whatsappUrl = message => {
  const number = SITE_CONFIG.contacts.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "#commander";
};

const renderProducts = () => {
  if (!productGrid) return;

  productGrid.innerHTML = PRODUCTS.map(product => `
    <article class="product-card reveal">
      <figure class="product-image">
        <img
          src="${escapeHtml(product.image)}"
          width="${product.width}"
          height="${product.height}"
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
            ${SITE_CONFIG.contacts.whatsappNumber ? 'target="_blank" rel="noopener noreferrer"' : ""}
          >Commander sur WhatsApp</a>
          <a
            href="${SITE_CONFIG.contacts.instagramUrl || "#commander"}"
            ${SITE_CONFIG.contacts.instagramUrl ? 'target="_blank" rel="noopener noreferrer"' : ""}
          >Demander sur Instagram</a>
        </div>
      </div>
    </article>
  `).join("");
};

const configureContactLinks = () => {
  document.querySelectorAll('[data-contact="whatsapp"]').forEach(link => {
    if (!SITE_CONFIG.contacts.whatsappNumber) return;
    link.href = whatsappUrl("Bonjour Lyan & Co., je souhaite obtenir des informations sur votre sélection.");
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
    if (SITE_CONFIG.contacts.email) link.href = `mailto:${SITE_CONFIG.contacts.email}`;
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
