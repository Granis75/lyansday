const SITE_CONFIG = {
  locale: document.documentElement.lang || "fr",
  contacts: {
    whatsappNumber: "",
    instagramUrl: "",
    email: "",
  },
};

let PRODUCTS = [
  {
    brand: "Beauty of Joseon",
    name: "Glow Deep Serum",
    category: "Soin visage",
    filter: "face",
    description: "Éclat · riz · alpha-arbutine",
    availability: "En stock",
    statusClass: "status-available",
    bestseller: true,
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
    bestseller: true,
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
    bestseller: true,
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
    bestseller: false,
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
    bestseller: true,
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
    bestseller: true,
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
    bestseller: true,
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
    bestseller: false,
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
    bestseller: true,
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
    bestseller: false,
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
    bestseller: true,
    image: "assets/images/lyan-co/product-torriden-dive-in-serum.webp",
    alt: "Flacon bleu Torriden Dive-In Serum près d’un miroir",
  },
  {
    brand: "Torriden",
    name: "Dive-In Sheet Mask",
    category: "Masques",
    filter: "masks",
    description: "Hydratation · fraîcheur · confort",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-selection.jpeg",
    alt: "Torriden Dive-In Sheet Mask sur fond bleu",
  },
  {
    brand: "Keana Nadeshiko",
    name: "Rice Mask 10 PCS",
    category: "Masques",
    filter: "masks",
    description: "Riz · douceur · éclat",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-keana-nadeshiko-rice-mask-10pcs.jpeg",
    alt: "Pack Keana Nadeshiko Rice Mask 10 PCS",
  },
  {
    brand: "Mediheal",
    name: "Tea Tree Essential Mask",
    category: "Masques",
    filter: "masks",
    description: "Tea tree · peau nette",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-mediheal-tea-tree-essential-mask.jpeg",
    alt: "Masque Mediheal Tea Tree Essential Mask",
  },
  {
    brand: "Biodance",
    name: "Bio Collagen Deep Mask",
    category: "Masques",
    filter: "masks",
    description: "Collagène · confort · rebond",
    availability: "En stock",
    statusClass: "status-available",
    bestseller: true,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-biodance-bio-collagen-deep-mask.jpeg",
    alt: "Biodance Bio Collagen Deep Mask",
  },
  {
    brand: "Torriden",
    name: "Dive-In Low Molecular Hyaluronic Acid Mask",
    category: "Masques",
    filter: "masks",
    description: "Acide hyaluronique · hydratation",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-torriden-dive-in-low-molecular-hyaluronic-acid-mask.jpeg",
    alt: "Torriden Dive-In Low Molecular Hyaluronic Acid Mask",
  },
  {
    brand: "Saborino",
    name: "Morning Face Mask Botanical",
    category: "Masques",
    filter: "masks",
    description: "Citrus leaf · routine matin",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-saborino-morning-face-mask-botanical.jpeg",
    alt: "Saborino Morning Face Mask Botanical Citrus Leaf",
  },
  {
    brand: "Medicube",
    name: "PDRN Pink Collagen Gel Mask",
    category: "Masques",
    filter: "masks",
    description: "PDRN · collagène · éclat",
    availability: "Sur commande",
    statusClass: "",
    bestseller: true,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-medicube-pdrn-pink-collagen-gel-mask.jpeg",
    alt: "Medicube PDRN Pink Collagen Gel Mask",
  },
  {
    brand: "Saborino",
    name: "Morning Face Mask",
    category: "Masques",
    filter: "masks",
    description: "Matin · fraîcheur · pratique",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-saborino-morning-face-mask.jpeg",
    alt: "Saborino Morning Face Mask",
  },
  {
    brand: "Lyan & Co Selection",
    name: "Glow Hydrate Repair Sheet Mask",
    category: "Masques",
    filter: "masks",
    description: "Glow · hydratation · réparation",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-glow-hydrate-repair-routine.jpeg",
    alt: "Sheet mask glow hydrate repair sélection Lyan & Co",
  },
  {
    brand: "CICA FACE",
    name: "Cica Sheet Mask",
    category: "Masques",
    filter: "masks",
    description: "Cica · apaisant · peau sensible",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-cica-face-sheet-mask.png",
    alt: "CICA FACE Cica Sheet Mask",
  },
  {
    brand: "Saborino",
    name: "Face Mask",
    category: "Masques",
    filter: "masks",
    description: "Routine express · peau fraîche",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-saborino-face-mask.jpeg",
    alt: "Saborino Face Mask",
  },
  {
    brand: "Lyan & Co Selection",
    name: "Sheet Mask Discovery",
    category: "Masques",
    filter: "masks",
    description: "Découverte · soin visage",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-discovery.jpg",
    alt: "Sheet mask découverte sélection Lyan & Co",
  },
  {
    brand: "CICA FACE",
    name: "Cica Visual Mask",
    category: "Masques",
    filter: "masks",
    description: "Cica · confort · apaisement",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-cica-visual.webp",
    alt: "Visuel CICA FACE Cica Visual Mask",
  },
  {
    brand: "Anua",
    name: "Peach Sheet Mask",
    category: "Masques",
    filter: "masks",
    description: "Peach · éclat · douceur",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-anua-peach-sheet-mask.jpeg",
    alt: "Anua Peach Sheet Mask",
  },
  {
    brand: "Lyan & Co Selection",
    name: "Japanese Sheet Mask Selection",
    category: "Masques",
    filter: "masks",
    description: "J-beauty · sélection douce",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-japanese-selection.jpeg",
    alt: "Sélection de sheet masks japonais Lyan & Co",
  },
  {
    brand: "Keana Nadeshiko",
    name: "Rice Mask",
    category: "Masques",
    filter: "masks",
    description: "Riz · grain de peau · douceur",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-keana-nadeshiko-rice-mask.jpeg",
    alt: "Keana Nadeshiko Rice Mask",
  },
  {
    brand: "LuLuLun",
    name: "Gold Brightening Mask",
    category: "Masques",
    filter: "masks",
    description: "Éclat · soin japonais",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-lululun-gold-brightening-mask.jpeg",
    alt: "LuLuLun Gold Brightening Mask",
  },
  {
    brand: "LuLuLun",
    name: "Balance Sheet Mask",
    category: "Masques",
    filter: "masks",
    description: "Équilibre · hydratation",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-lululun-balance-sheet-mask.jpeg",
    alt: "LuLuLun Balance Sheet Mask",
  },
  {
    brand: "Derma Laser",
    name: "Super VC100 Mask",
    category: "Masques",
    filter: "masks",
    description: "Vitamine C · éclat",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-derma-laser-super-vc100-mask.jpeg",
    alt: "Derma Laser Super VC100 Mask",
  },
  {
    brand: "Biodance",
    name: "Hydro Cera-nol Real Deep Mask",
    category: "Masques",
    filter: "masks",
    description: "Hydratation · céramides · confort",
    availability: "En stock",
    statusClass: "status-available",
    bestseller: true,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-biodance-hydro-cera-nol-real-deep-mask.jpeg",
    alt: "Biodance Hydro Cera-nol Real Deep Mask",
  },
  {
    brand: "LuLuLun",
    name: "Pure Moist Sheet Mask",
    category: "Masques",
    filter: "masks",
    description: "Hydratation · douceur",
    availability: "Sur commande",
    statusClass: "",
    bestseller: false,
    image: "assets/images/lyan-co/sheetmasque/sheetmask-lululun-pure-moist-sheet-mask.jpeg",
    alt: "LuLuLun Pure Moist Sheet Mask",
  },
];

const FILTER_LABELS = {
  bestsellers: "Best-Sellers",
  face: "Soin visage",
  sun: "Soin solaire",
  masks: "Masques",
  hair: "Soin cheveux",
  makeup: "Maquillage",
  home: "Maison & Ambiance",
  kits: "Kits & Routines",
};

const SUPABASE_CONFIG = window.LYANS_DAY_SUPABASE || {};
const supabaseClient = SUPABASE_CONFIG.url && SUPABASE_CONFIG.anonKey && window.supabase
  ? window.supabase.createClient(SUPABASE_CONFIG.url, SUPABASE_CONFIG.anonKey)
  : null;

const CATEGORY_FILTERS = {
  "Soin visage": "face",
  "Masques": "masks",
  "Soin solaire": "sun",
  "Soin cheveux": "hair",
  "Maquillage": "makeup",
  "Maison & Ambiance": "home",
  "Kits & Routines": "kits",
};

const FEATURED_TAGS = new Set(["nouveaute", "favori", "essentiel", "selection"]);

const html = document.documentElement;
const header = document.querySelector("[data-scroll-header]");
const menuToggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("#main-nav");
const productGrid = document.querySelector("#product-grid");
const filterStatus = document.querySelector("#filter-status");
const filterButtons = [...document.querySelectorAll("[data-filter]")];
const searchInput = document.querySelector("#catalog-search");
const previousPageButton = document.querySelector("#page-previous");
const nextPageButton = document.querySelector("#page-next");
const pageIndicator = document.querySelector("#page-indicator");
const productDialog = document.querySelector("#product-dialog");
const dialogClose = document.querySelector("[data-dialog-close]");
const mobileNavQuery = window.matchMedia("(max-width: 1120px)");
const PRODUCTS_PER_PAGE = 8;
let activeFilter = "bestsellers";
let searchQuery = "";
let activePage = 1;
let renderTimer;

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

const routineMessage = routineName =>
  `Bonjour Lyan & Co.\nJe suis intéressé(e) par la ${routineName}.\nPouvez-vous me communiquer la disponibilité ?`;

const whatsappUrl = message => {
  const number = SITE_CONFIG.contacts.whatsappNumber.replace(/\D/g, "");
  return number ? `https://wa.me/${number}?text=${encodeURIComponent(message)}` : "#commander";
};

const externalAttributes = isConfigured =>
  isConfigured ? 'target="_blank" rel="noopener noreferrer"' : "";

const normalizeSearchValue = value =>
  String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase(SITE_CONFIG.locale);

const productFromSupabase = product => ({
  id: product.id,
  brand: product.brand,
  name: product.name,
  category: product.category,
  subcategory: product.subcategory,
  filter: CATEGORY_FILTERS[product.category] || "face",
  description: product.subtitle || product.short_description,
  longDescription: product.long_description,
  availability: product.price_label || "Disponibilité à confirmer",
  statusClass: product.price_label ? "status-available" : "",
  bestseller: FEATURED_TAGS.has(product.tag),
  image: product.main_image_url || "assets/images/lyan-co/product-anua-heartleaf-77-toner.webp",
  alt: `${product.name} ${product.brand}`,
  purchaseUrl: product.purchase_url,
  tag: product.tag,
});

const loadPublishedProducts = async () => {
  if (!supabaseClient) return;

  const { data, error } = await supabaseClient
    .from("products")
    .select("*")
    .eq("status", "published")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    PRODUCTS = [];
    console.error(
      "Catalogue Supabase configuré mais indisponible. Vérifiez supabase/schema.sql, la table public.products et les policies RLS.",
      error
    );
    return;
  }

  PRODUCTS = (data || []).map(productFromSupabase);
};

const getFilteredProducts = () => {
  const normalizedQuery = normalizeSearchValue(searchQuery.trim());

  return PRODUCTS.filter(product => {
    const matchesFilter = activeFilter === "bestsellers"
      ? product.bestseller
      : product.filter === activeFilter;
    const searchableText = normalizeSearchValue(
      `${product.brand} ${product.name} ${product.description} ${product.category}`
    );

    return matchesFilter && (!normalizedQuery || searchableText.includes(normalizedQuery));
  });
};

const renderProducts = () => {
  if (!productGrid) return;

  const filteredProducts = getFilteredProducts();
  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  activePage = Math.min(activePage, pageCount);
  const pageStart = (activePage - 1) * PRODUCTS_PER_PAGE;
  const visibleProducts = filteredProducts.slice(pageStart, pageStart + PRODUCTS_PER_PAGE);

  productGrid.classList.add("is-updating");

  window.clearTimeout(renderTimer);
  renderTimer = window.setTimeout(() => {
    if (!visibleProducts.length) {
      productGrid.innerHTML = `
        <div class="empty-selection">
          <p class="eyebrow">${escapeHtml(FILTER_LABELS[activeFilter])}</p>
          <h3>Sélection en préparation.</h3>
          <p>Aucun produit ne correspond à cette recherche pour le moment.</p>
          <a class="text-link" href="#commander">Nous poser une question <span aria-hidden="true">↗</span></a>
        </div>
      `;
    } else {
      productGrid.innerHTML = visibleProducts.map(product => `
        <article class="product-card">
          <button
            class="product-image"
            type="button"
            data-product-index="${PRODUCTS.indexOf(product)}"
            aria-label="Voir ${escapeHtml(product.name)} de ${escapeHtml(product.brand)}"
          >
            <img
              src="${escapeHtml(product.image)}"
              width="1200"
              height="1600"
              loading="lazy"
              decoding="async"
              onerror="this.closest('.product-image').classList.add('has-broken-image'); this.remove();"
              alt="${escapeHtml(product.alt)}"
            />
            <span class="product-status ${escapeHtml(product.statusClass)}">${escapeHtml(product.availability)}</span>
          </button>
          <div class="product-copy">
            <p class="product-brand">${escapeHtml(product.brand)}</p>
            <h3>
              <button type="button" data-product-index="${PRODUCTS.indexOf(product)}">
                ${escapeHtml(product.name)}
              </button>
            </h3>
            <p class="product-category">${escapeHtml(product.category)}</p>
            <p class="product-description">${escapeHtml(product.description)}</p>
          </div>
        </article>
      `).join("");
    }

    productGrid.classList.remove("is-updating");
    if (filterStatus) {
      const count = filteredProducts.length;
      filterStatus.textContent = count
        ? `${count} ${count > 1 ? "produits trouvés" : "produit trouvé"} dans ${FILTER_LABELS[activeFilter]}.`
        : `Aucun produit trouvé dans ${FILTER_LABELS[activeFilter]}.`;
    }

    if (pageIndicator) pageIndicator.textContent = `${activePage} / ${pageCount}`;
    if (previousPageButton) previousPageButton.disabled = activePage <= 1;
    if (nextPageButton) nextPageButton.disabled = activePage >= pageCount;
  }, 120);
};

const openProduct = productIndex => {
  const product = PRODUCTS[Number(productIndex)];
  if (!product || !productDialog) return;

  const image = document.querySelector("#dialog-product-image");
  const whatsappLink = document.querySelector("#dialog-whatsapp");
  const instagramLink = document.querySelector("#dialog-instagram");

  image.src = product.image;
  image.alt = product.alt;
  document.querySelector("#dialog-product-brand").textContent = product.brand;
  document.querySelector("#dialog-product-name").textContent = product.name;
  document.querySelector("#dialog-product-category").textContent = product.category;
  document.querySelector("#dialog-product-benefit").textContent = product.description;
  document.querySelector("#dialog-product-availability").textContent = product.availability;

  whatsappLink.href = product.purchaseUrl || whatsappUrl(productMessage(product.name));
  instagramLink.href = SITE_CONFIG.contacts.instagramUrl || "#commander";

  if (product.purchaseUrl || SITE_CONFIG.contacts.whatsappNumber) {
    whatsappLink.target = "_blank";
    whatsappLink.rel = "noopener noreferrer";
  } else {
    whatsappLink.removeAttribute("target");
    whatsappLink.removeAttribute("rel");
  }

  if (SITE_CONFIG.contacts.instagramUrl) {
    instagramLink.target = "_blank";
    instagramLink.rel = "noopener noreferrer";
  } else {
    instagramLink.removeAttribute("target");
    instagramLink.removeAttribute("rel");
  }

  productDialog.showModal();
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

const initializeSite = async () => {
  configureContactLinks();
  await loadPublishedProducts();
  renderProducts();
};

initializeSite();

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => item.setAttribute("aria-pressed", String(item === button)));
    activeFilter = button.dataset.filter;
    activePage = 1;
    renderProducts();
  });
});

searchInput?.addEventListener("input", () => {
  searchQuery = searchInput.value;
  activePage = 1;
  renderProducts();
});

previousPageButton?.addEventListener("click", () => {
  if (activePage <= 1) return;
  activePage -= 1;
  renderProducts();
});

nextPageButton?.addEventListener("click", () => {
  const pageCount = Math.max(1, Math.ceil(getFilteredProducts().length / PRODUCTS_PER_PAGE));
  if (activePage >= pageCount) return;
  activePage += 1;
  renderProducts();
});

document.querySelector(".selection")?.addEventListener("click", event => {
  const trigger = event.target.closest("[data-product-index]");
  if (trigger) openProduct(trigger.dataset.productIndex);
});

dialogClose?.addEventListener("click", () => productDialog?.close());

productDialog?.addEventListener("click", event => {
  if (event.target === productDialog) productDialog.close();
  if (event.target.closest('a[href="#commander"]')) productDialog.close();
});

productDialog?.addEventListener("close", () => {
  if (location.hash === "#commander") return;
  document.querySelector(`[data-product-index]`)?.focus();
});

document.querySelectorAll(".accordion-list details").forEach(details => {
  const symbol = details.querySelector("summary span");
  details.addEventListener("toggle", () => {
    if (symbol) symbol.textContent = details.open ? "−" : "+";
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
