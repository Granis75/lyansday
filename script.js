const SITE_CONFIG = {
  locale: document.documentElement.lang || "fr",
  contacts: {
    whatsappNumber: "",
    instagramUrl: "",
    email: "",
  },
};

let PRODUCTS = [
  {"brand": "Anua", "name": "Heartleaf 77 Toner", "category": "Soin visage", "filter": "face", "description": "Apaisant · heartleaf · peau réactive", "availability": "on_order", "status": "published", "featured": true, "image": "assets/images/lyan-co/product-anua-heartleaf-77-toner.webp", "alt": "Flacon Anua Heartleaf 77 Toner en lumière naturelle"},
  {"brand": "Anua", "name": "Rice 70 Toner", "category": "Soin visage", "filter": "face", "description": "Hydratant · riz · teint unifié", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-anua-rice-70-toner.webp", "alt": "Flacon Anua Rice 70 sur fond clair"},
  {"brand": "Torriden", "name": "Dive-In Serum", "category": "Soin visage", "filter": "face", "description": "Hydratation · acide hyaluronique · léger", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-torriden-dive-in-serum.webp", "alt": "Flacon Torriden Dive-In Serum avec eucalyptus"},
  {"brand": "Beauty of Joseon", "name": "Dynasty Cream", "category": "Soin visage", "filter": "face", "description": "Nourrissant · actifs traditionnels · confort", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-beauty-of-joseon-dynasty-cream.webp", "alt": "Pot Beauty of Joseon Dynasty Cream"},
  {"brand": "Beauty of Joseon", "name": "Glow Deep Serum", "category": "Soin visage", "filter": "face", "description": "Éclat · riz · alpha-arbutine", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-beauty-of-joseon-glow-deep-serum.webp", "alt": "Flacon Beauty of Joseon Glow Deep Serum, ambre"},
  {"brand": "SKIN1004", "name": "Madagascar Centella Ampoule", "category": "Soin visage", "filter": "face", "description": "Apaisant · centella · peau sensible", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-skin1004-centella-ampoule.webp", "alt": "Flacon SKIN1004 Madagascar Centella Ampoule, ambre"},
  {"brand": "Mixsoon", "name": "Bean Essence", "category": "Soin visage", "filter": "face", "description": "Hydratant · soja fermenté · glass skin", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-mixsoon-bean-essence.webp", "alt": "Flacon pompe Mixsoon Bean Essence"},
  {"brand": "Beauty of Joseon", "name": "Glow Replenishing Rice Milk Toner", "category": "Soin visage", "filter": "face", "description": "Hydratant · riz · teint repulpé", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-beauty-of-joseon-glow-replenishing-rice-milk-toner.webp", "alt": "Flacon Beauty of Joseon Glow Replenishing Rice Milk Toner"},
  {"brand": "Mixsoon", "name": "Bean Cream", "category": "Soin visage", "filter": "face", "description": "Nutrition · soja · glass skin", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-mixsoon-bean-cream.webp", "alt": "Pot Mixsoon Bean Cream avec graines de soja"},
  {"brand": "SKIN1004", "name": "Madagascar Centella Tea-Trica Relief Ampoule", "category": "Soin visage", "filter": "face", "description": "Purifiant · tea-tree · centella", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-skin1004-tea-trica-relief-ampoule.webp", "alt": "Flacon SKIN1004 Tea-Trica Relief Ampoule"},
  {"brand": "SKIN1004", "name": "Hyalu-Cica Blue Serum", "category": "Soin visage", "filter": "face", "description": "Hydratant · centella · frais", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-skin1004-hyalu-cica-blue-serum.webp", "alt": "Flacon SKIN1004 Hyalu-Cica Blue Serum"},
  {"brand": "SKIN1004", "name": "Madagascar Centella Poremizing Fresh Ampoule", "category": "Soin visage", "filter": "face", "description": "Pores · centella · Madagascar", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-skin1004-poremizing-fresh-ampoule.webp", "alt": "Flacon SKIN1004 Poremizing Fresh Ampoule, rose"},
  {"brand": "COSRX", "name": "Advanced Snail 96 Mucin Power Essence", "category": "Soin visage", "filter": "face", "description": "Réparateur · mucine d'escargot · hydratant", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-cosrx-advanced-snail-96-mucin-power-essence.webp", "alt": "Flacon COSRX Advanced Snail 96 Mucin Power Essence"},
  {"brand": "Medicube", "name": "PDRN Pink Cica Soothing Toner", "category": "Soin visage", "filter": "face", "description": "Apaisant · PDRN · cica", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-medicube-pdrn-pink-cica-soothing-toner.webp", "alt": "Flacon Medicube PDRN Pink Cica Soothing Toner"},
  {"brand": "Beauty of Joseon", "name": "Relief Sun Rice + Probiotics SPF50+", "category": "Soin solaire", "filter": "sun", "description": "SPF50+ · riz · fini naturel", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/product-beauty-of-joseon-relief-sun-spf50.webp", "alt": "Tube Beauty of Joseon Relief Sun SPF50+"},
  {"brand": "Biodance", "name": "Bio-Collagen Real Deep Mask", "category": "Masques", "filter": "masks", "description": "Masque · collagène · hydratation intense", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-biodance-bio-collagen-real-deep-mask.webp", "alt": "Masque Biodance Bio-Collagen Real Deep"},
  {"brand": "Torriden", "name": "Dive-In Mask", "category": "Masques", "filter": "masks", "description": "Masque · acide hyaluronique · hydratant", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-torriden-dive-in-mask.webp", "alt": "Masque Torriden Dive-In, sachet bleu"},
  {"brand": "Torriden", "name": "Balanceful Cica Mask", "category": "Masques", "filter": "masks", "description": "Masque · centella · apaisant", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-torriden-balanceful-cica-mask.webp", "alt": "Masque Torriden Balanceful Cica, sachet vert"},
  {"brand": "Anua", "name": "Peach 70 Niacin Serum Mask", "category": "Masques", "filter": "masks", "description": "Masque · pêche · niacinamide", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-anua-peach-70-niacin-serum-mask.webp", "alt": "Masque Anua Peach 70 Niacin Serum, sachet rose"},
  {"brand": "Mediheal", "name": "Tea Tree Essential Mask", "category": "Masques", "filter": "masks", "description": "Masque · tea-tree · purifiant", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-mediheal-tea-tree-mask.webp", "alt": "Masque Mediheal Tea Tree, sachet vert"},
  {"brand": "Saborino", "name": "Morning Face Mask (Citrus)", "category": "Masques", "filter": "masks", "description": "Masque · matin 3-en-1 · agrumes", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-saborino-morning-mask-citrus.webp", "alt": "Masque Saborino Morning Citrus, 30 feuilles"},
  {"brand": "Saborino", "name": "Morning Mask (Fruits rouges)", "category": "Masques", "filter": "masks", "description": "Masque · matin 3-en-1 · fruité", "availability": "on_order", "status": "draft", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-saborino-morning-mask-fruits-rouges.webp", "alt": "Masque Saborino Morning, version fruits rouges"},
  {"brand": "LuLuLun", "name": "Pure Moist Sheet Mask", "category": "Masques", "filter": "masks", "description": "Masque · hydratant · quotidien", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-lululun-pure-moist-mask.webp", "alt": "Masque LuLuLun Pure Moist, sachet bleu"},
  {"brand": "LuLuLun", "name": "Balance Sheet Mask", "category": "Masques", "filter": "masks", "description": "Masque · équilibrant · quotidien", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-lululun-balance-mask.webp", "alt": "Masque LuLuLun Balance, sachet rose"},
  {"brand": "LuLuLun", "name": "Masque Premium (doré)", "category": "Masques", "filter": "masks", "description": "Masque · premium · éclat", "availability": "on_order", "status": "draft", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-lululun-gold-premium-mask.webp", "alt": "Masque LuLuLun, sachet doré"},
  {"brand": "Ishizawa Keana Nadeshiko", "name": "Rice Mask", "category": "Masques", "filter": "masks", "description": "Masque · riz · pores", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-keana-nadeshiko-rice-mask.webp", "alt": "Masque Keana Nadeshiko Rice, 10 feuilles"},
  {"brand": "Quality 1st", "name": "Derma Laser Super VC100 Mask", "category": "Masques", "filter": "masks", "description": "Masque · vitamine C · éclat", "availability": "on_order", "status": "draft", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-quality-1st-derma-laser-super-vc100-mask.webp", "alt": "Masques Quality 1st Derma Laser"},
  {"brand": "Medicube", "name": "PDRN Pink Collagen Gel Mask", "category": "Masques", "filter": "masks", "description": "Masque · collagène · PDRN", "availability": "on_order", "status": "published", "featured": false, "image": "assets/images/lyan-co/sheetmasque/sheetmask-medicube-pdrn-pink-collagen-gel-mask.webp", "alt": "Masque Medicube PDRN Pink Collagen Gel"},
];

const FILTER_LABELS = {
  selection: "Notre sélection",
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
let isSupabaseCatalogLoaded = false;

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
let activeFilter = "selection";
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

const AVAILABILITY_LABELS = {
  available: "Disponible",
  on_order: "Sur commande",
};

function normalizeImageUrl(url) {
  if (!url) return "";
  if (url.startsWith("http://") || url.startsWith("https://") || url.startsWith("/")) return url;
  if (url.startsWith("assets/")) return "/" + url;
  return url;
}


const normalizeAvailability = value =>
  value === "available" || value === "on_order" ? value : "on_order";

const getAvailabilityLabel = value =>
  AVAILABILITY_LABELS[normalizeAvailability(value)];

const getAvailabilityClass = value =>
  normalizeAvailability(value) === "available" ? "status-available" : "status-order";

const productMessage = product =>
  `Bonjour, je souhaite avoir plus d’informations sur ${product.brand} — ${product.name}. Est-il disponible ?`;

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
  description: product.short_description || product.subtitle,
  longDescription: product.long_description,
  availability: normalizeAvailability(product.availability),
  status: product.status,
  featured: FEATURED_TAGS.has(product.tag),
  image: product.main_image_url || "assets/images/lyan-co/product-anua-heartleaf-77-toner.webp",
  alt: `${product.name} ${product.brand}`,
  tag: product.tag,
});

const loadPublishedProducts = async () => {
  if (!supabaseClient) return;

  console.info("Supabase configured");

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
  isSupabaseCatalogLoaded = true;
  console.info("Products loaded", {
    count: PRODUCTS.length,
    products: PRODUCTS.map(product => ({
      id: product.id,
      name: product.name,
      category: product.category,
      tag: product.tag,
    })),
  });
};

const getFilteredProducts = () => {
  const normalizedQuery = normalizeSearchValue(searchQuery.trim());

  return PRODUCTS.filter(product => {
    if (product.status && product.status !== "published") return false;

    const matchesFilter = activeFilter === "selection"
      ? product.featured || isSupabaseCatalogLoaded
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
        <article
          class="product-card"
          data-product-index="${PRODUCTS.indexOf(product)}"
          tabindex="0"
          role="button"
          aria-label="Voir ${escapeHtml(product.name)} de ${escapeHtml(product.brand)}"
        >
          <div class="product-image" aria-hidden="true">
            <img
              src="${escapeHtml(normalizeImageUrl(product.image))}"
              width="1200"
              height="1600"
              loading="lazy"
              decoding="async"
              onerror="this.closest('.product-image').classList.add('has-broken-image'); this.remove();"
              alt="${escapeHtml(product.alt)}"
            />
            <span class="product-status ${escapeHtml(getAvailabilityClass(product.availability))}">${escapeHtml(getAvailabilityLabel(product.availability))}</span>
          </div>
          <div class="product-copy">
            <p class="product-brand">${escapeHtml(product.brand)}</p>
            <h3>${escapeHtml(product.name)}</h3>
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

  image.src = normalizeImageUrl(product.image || "");
  image.alt = product.alt;
  document.querySelector("#dialog-product-brand").textContent = product.brand;
  document.querySelector("#dialog-product-name").textContent = product.name;
  document.querySelector("#dialog-product-category").textContent = product.category;
  document.querySelector("#dialog-product-benefit").textContent = product.description;
  document.querySelector("#dialog-product-availability").textContent = getAvailabilityLabel(product.availability);

  whatsappLink.href = whatsappUrl(productMessage(product));
  instagramLink.href = SITE_CONFIG.contacts.instagramUrl || "#commander";

  if (SITE_CONFIG.contacts.whatsappNumber) {
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

document.querySelector(".selection")?.addEventListener("keydown", event => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const trigger = event.target.closest(".product-card[data-product-index]");
  if (!trigger) return;
  event.preventDefault();
  openProduct(trigger.dataset.productIndex);
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
