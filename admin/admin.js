const config = window.LYANS_DAY_SUPABASE || {};
const isConfigured = Boolean(config.url && config.anonKey && window.supabase);
const client = isConfigured ? window.supabase.createClient(config.url, config.anonKey) : null;
const bucketName = config.productImagesBucket || "product-images";
const pathName = window.location.pathname.replace(/\/+$/, "");
const isLoginPage = pathName.endsWith("/admin") || pathName.endsWith("/admin/index.html");
const isProductsPage = pathName.endsWith("/admin/products") || pathName.endsWith("/admin/products/index.html");

const statusLabels = {
  published: "Publié",
  draft: "Brouillon",
  hidden: "Masqué",
};

const availabilityLabels = {
  available: "Disponible",
  on_order: "Sur commande",
};

let products = [];

const byId = id => document.getElementById(id);
const setMessage = (element, message, type = "") => {
  if (!element) return;
  element.textContent = message;
  element.classList.toggle("is-error", type === "error");
  element.classList.toggle("is-success", type === "success");
};

const friendlySupabaseError = error => {
  const message = error?.message || String(error || "");
  const code = error?.code || "";

  if (code === "PGRST205" || message.includes("Could not find the table")) {
    return "La base Supabase n’est pas initialisée : exécutez supabase/schema.sql dans SQL Editor, puis vérifiez public.products et public.admin_users.";
  }

  if (code === "PGRST202" || message.includes("is_admin")) {
    return "La fonction public.is_admin() est absente : exécutez supabase/schema.sql dans SQL Editor.";
  }

  if (message.includes("admin_users") && message.includes("does not exist")) {
    return "La table public.admin_users est absente : exécutez supabase/schema.sql avant d’ajouter l’admin.";
  }

  if (message.includes("row-level security") || message.includes("violates row-level security")) {
    return "Action refusée par les règles Supabase RLS. Vérifiez que l’utilisateur connecté existe dans public.admin_users.";
  }

  return message;
};

const escapeHtml = value =>
  String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;",
  })[character]);

const requireConfig = target => {
  if (client) return true;
  setMessage(target, "Supabase n’est pas encore configuré dans supabase-config.js.", "error");
  return false;
};

const isCurrentUserAdmin = async () => {
  const { data, error } = await client.rpc("is_admin");
  if (error) throw new Error(friendlySupabaseError(error));
  return Boolean(data);
};

const redirectToLogin = () => {
  window.location.href = "../";
};

const redirectToProducts = () => {
  window.location.href = "products/";
};

const guardAdminPage = async () => {
  if (!requireConfig(byId("products-message"))) return false;

  const { data: sessionData } = await client.auth.getSession();
  if (!sessionData.session) {
    redirectToLogin();
    return false;
  }

  try {
    if (!(await isCurrentUserAdmin())) {
      await client.auth.signOut();
      redirectToLogin();
      return false;
    }
  } catch (error) {
    setMessage(byId("products-message"), friendlySupabaseError(error), "error");
    return false;
  }

  return true;
};

const handleLoginPage = async () => {
  const form = byId("login-form");
  const message = byId("login-message");
  if (!requireConfig(message)) return;

  const { data: sessionData } = await client.auth.getSession();
  if (sessionData.session) {
    try {
      if (await isCurrentUserAdmin()) redirectToProducts();
    } catch (error) {
      setMessage(message, friendlySupabaseError(error), "error");
    }
  }

  form?.addEventListener("submit", async event => {
    event.preventDefault();
    setMessage(message, "Connexion en cours...");
    const formData = new FormData(form);
    const email = String(formData.get("email") || "");
    const password = String(formData.get("password") || "");

    const { error } = await client.auth.signInWithPassword({ email, password });
    if (error) {
      setMessage(message, "Connexion refusée. Vérifiez l’e-mail et le mot de passe.", "error");
      return;
    }

    try {
      if (!(await isCurrentUserAdmin())) {
        await client.auth.signOut();
        setMessage(message, "Ce compte n’est pas autorisé pour l’administration.", "error");
        return;
      }
      redirectToProducts();
    } catch (adminError) {
      setMessage(message, adminError.message, "error");
    }
  });
};

const normalize = value =>
  String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();

const getFilteredProducts = () => {
  const query = normalize(byId("product-search")?.value || "");
  if (!query) return products;
  return products.filter(product =>
    normalize(`${product.name} ${product.brand} ${product.category} ${product.subcategory}`).includes(query)
  );
};

const renderProducts = () => {
  const list = byId("products-list");
  if (!list) return;
  const visibleProducts = getFilteredProducts();

  if (!visibleProducts.length) {
    list.innerHTML = '<tr><td colspan="8" class="empty-cell">Aucun produit à afficher.</td></tr>';
    return;
  }

  list.innerHTML = visibleProducts.map(product => `
    <tr>
      <td>
        ${product.main_image_url
          ? `<img class="product-thumb" src="${escapeHtml(product.main_image_url)}" alt="">`
          : '<div class="product-thumb" aria-label="Image manquante"></div>'}
      </td>
      <td>
        <span class="product-name">${escapeHtml(product.name)}</span>
        <span class="product-sub">${escapeHtml(product.subtitle || product.short_description || "")}</span>
      </td>
      <td>${escapeHtml(product.brand)}</td>
      <td>${escapeHtml(product.category)}${product.subcategory ? `<span class="product-sub">${escapeHtml(product.subcategory)}</span>` : ""}</td>
      <td>${escapeHtml(availabilityLabels[product.availability] || "Sur commande")}</td>
      <td><span class="status-pill status-${escapeHtml(product.status)}">${escapeHtml(statusLabels[product.status] || product.status)}</span></td>
      <td>${Number(product.display_order || 0)}</td>
      <td>
        <div class="row-actions">
          <button type="button" data-action="edit" data-id="${escapeHtml(product.id)}">Modifier</button>
          <button type="button" data-action="toggle" data-id="${escapeHtml(product.id)}">
            ${product.status === "published" ? "Masquer" : "Publier"}
          </button>
          <button class="danger" type="button" data-action="delete" data-id="${escapeHtml(product.id)}">Supprimer</button>
        </div>
      </td>
    </tr>
  `).join("");
};

const loadProducts = async () => {
  setMessage(byId("products-message"), "Chargement...");
  const { data, error } = await client
    .from("products")
    .select("*")
    .order("display_order", { ascending: true })
    .order("created_at", { ascending: false });

  if (error) {
    setMessage(byId("products-message"), friendlySupabaseError(error), "error");
    return;
  }

  products = data || [];
  renderProducts();
  setMessage(byId("products-message"), `${products.length} produit${products.length > 1 ? "s" : ""}.`, "success");
};

const openForm = product => {
  const dialog = byId("product-dialog");
  const form = byId("product-form");
  const preview = byId("image-preview");
  form.reset();
  byId("form-title").textContent = product ? "Modifier le produit" : "Ajouter un produit";
  setMessage(byId("form-message"), "");

  const values = product || {
    availability: "on_order",
    status: "draft",
    display_order: 1000,
  };

  [...form.elements].forEach(element => {
    if (!element.name || element.type === "file") return;
    element.value = element.name === "gallery_image_urls"
      ? JSON.stringify(values.gallery_image_urls || [])
      : values[element.name] ?? "";
  });

  preview.innerHTML = [
    values.main_image_url,
    ...(values.gallery_image_urls || []),
  ].filter(Boolean).map(url => `<img src="${escapeHtml(url)}" alt="">`).join("");

  dialog.showModal();
};

const uploadMainImage = async file => {
  if (!file || !file.name || !file.size) return "";
  const safeName = file.name.toLowerCase().replace(/[^a-z0-9.]+/g, "-");
  const filePath = `products/${Date.now()}-${crypto.randomUUID()}-${safeName}`;
  const { error } = await client.storage.from(bucketName).upload(filePath, file, {
    cacheControl: "3600",
    upsert: false,
  });
  if (error) throw new Error(friendlySupabaseError(error));
  const { data } = client.storage.from(bucketName).getPublicUrl(filePath);
  return data.publicUrl;
};

const uploadGalleryImages = async fileList => {
  const files = [...(fileList || [])].filter(file => file.name && file.size);
  if (!files.length) return [];
  const urls = [];

  for (const file of files) {
    urls.push(await uploadMainImage(file));
  }

  return urls;
};

const formValue = (formData, key) => {
  const value = String(formData.get(key) || "").trim();
  return value || null;
};

const saveProduct = async event => {
  event.preventDefault();
  const form = event.currentTarget;
  const formData = new FormData(form);
  const message = byId("form-message");
  setMessage(message, "Enregistrement...");

  try {
    const uploadedImageUrl = await uploadMainImage(formData.get("main_image_file"));
    const uploadedGalleryUrls = await uploadGalleryImages(formData.getAll("gallery_image_files"));
    const existingImageUrl = formValue(formData, "main_image_url");
    const existingGalleryUrls = JSON.parse(formValue(formData, "gallery_image_urls") || "[]");
    const payload = {
      name: formValue(formData, "name"),
      brand: formValue(formData, "brand"),
      category: formValue(formData, "category"),
      subcategory: formValue(formData, "subcategory"),
      subtitle: formValue(formData, "subtitle"),
      short_description: formValue(formData, "short_description"),
      long_description: formValue(formData, "long_description"),
      main_image_url: uploadedImageUrl || existingImageUrl,
      gallery_image_urls: [...existingGalleryUrls, ...uploadedGalleryUrls],
      availability: formValue(formData, "availability") || "on_order",
      purchase_url: formValue(formData, "purchase_url"),
      tag: formValue(formData, "tag"),
      status: formValue(formData, "status") || "draft",
      display_order: Number(formData.get("display_order") || 1000),
    };

    const id = formValue(formData, "id");
    const request = id
      ? client.from("products").update(payload).eq("id", id)
      : client.from("products").insert(payload);
    const { error } = await request;
    if (error) throw new Error(friendlySupabaseError(error));

    setMessage(message, "Produit enregistré.", "success");
    byId("product-dialog").close();
    await loadProducts();
  } catch (error) {
    setMessage(message, friendlySupabaseError(error), "error");
  }
};

const handleRowAction = async event => {
  const button = event.target.closest("[data-action]");
  if (!button) return;
  const product = products.find(item => item.id === button.dataset.id);
  if (!product) return;

  if (button.dataset.action === "edit") {
    openForm(product);
    return;
  }

  if (button.dataset.action === "toggle") {
    const nextStatus = product.status === "published" ? "hidden" : "published";
    const { error } = await client.from("products").update({ status: nextStatus }).eq("id", product.id);
    if (error) {
      setMessage(byId("products-message"), friendlySupabaseError(error), "error");
      return;
    }
    await loadProducts();
    return;
  }

  if (button.dataset.action === "delete") {
    const confirmed = window.confirm(`Supprimer "${product.name}" ? Cette action retire le produit du catalogue.`);
    if (!confirmed) return;
    const { error } = await client.from("products").delete().eq("id", product.id);
    if (error) {
      setMessage(byId("products-message"), friendlySupabaseError(error), "error");
      return;
    }
    await loadProducts();
  }
};

const handleProductsPage = async () => {
  if (!(await guardAdminPage())) return;
  await loadProducts();

  byId("new-product")?.addEventListener("click", () => openForm(null));
  byId("close-dialog")?.addEventListener("click", () => byId("product-dialog")?.close());
  byId("cancel-form")?.addEventListener("click", () => byId("product-dialog")?.close());
  byId("product-form")?.addEventListener("submit", saveProduct);
  byId("products-list")?.addEventListener("click", handleRowAction);
  byId("product-search")?.addEventListener("input", renderProducts);
  byId("sign-out")?.addEventListener("click", async () => {
    await client.auth.signOut();
    redirectToLogin();
  });
};

if (isLoginPage) handleLoginPage();
if (isProductsPage) handleProductsPage();
