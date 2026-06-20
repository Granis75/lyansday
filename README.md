# Lyan & Co.

Boutique éditoriale de K-Beauty et J-Beauty destinée au marché algérien.

Le site présente une sélection courte sans panier ni paiement en ligne.
Les demandes sont préparées pour WhatsApp et Instagram.

## Structure

- `index.html` : page boutique en français
- `styles.css` : direction artistique et responsive
- `script.js` : catalogue, configuration des contacts et navigation mobile
- `admin/` : back-office privé du catalogue produits
- `supabase/schema.sql` : table produits, stockage images et règles de sécurité
- `supabase-config.js` : configuration publique Supabase côté navigateur
- `privacy.html` : informations de confidentialité
- `assets/images/lyan-co/` : pack visuel WebP et manifeste d’inventaire
- `archive/import-supabase/` : anciens imports SQL/CSV et rapports de contrôle Supabase

## Configuration

Les coordonnées officielles sont centralisées dans `supabase-config.js`, dans
`window.LYANS_DAY_SUPABASE.contacts`.

```js
contacts: {
  whatsappNumber: "", // format international sans +, ex. 213...
  instagramUrl: "",
  email: "",
}
```

Ne renseignez pas de numéro approximatif. Si WhatsApp est vide, le site utilise
Instagram si une URL est configurée, sinon il renvoie vers la section contact.
Pour un produit, l’ordre de priorité est : `purchase_url`, WhatsApp avec message
prérempli, Instagram, puis section contact.

Quand Supabase est configuré, le catalogue public lit automatiquement les produits
publiés depuis la table `products`. Les brouillons et produits masqués ne sont pas
affichés. Si Supabase n’est pas configuré, le tableau local `PRODUCTS` dans
`script.js` reste utilisé comme secours. Si Supabase est configuré mais retourne
une erreur ou aucun produit publié, le site conserve cette sélection locale de
démonstration et écrit un avertissement en console.

Renseigner `supabase-config.js` avec les valeurs publiques du projet Supabase :

```js
window.LYANS_DAY_SUPABASE = {
  url: "https://votre-projet.supabase.co",
  anonKey: "votre-cle-anon-publique",
  productImagesBucket: "product-images",
  contacts: {
    whatsappNumber: "",
    instagramUrl: "",
    email: "",
  },
};
```

## Back-office catalogue

Routes :

- `/admin` : connexion privée
- `/admin/products` : gestion des produits

Le back-office permet d’ajouter, modifier, supprimer, publier, masquer et
réordonner les produits. Il permet aussi de remplacer l’image principale et
d’ajouter une galerie via Supabase Storage. La colonne officielle pour l’image
principale produit est `main_image_url`. La galerie utilise
`gallery_image_urls`. Le lien de commande direct utilise `purchase_url`.

Les statuts visibles attendus sont `Disponible` et `Sur commande`. Si d’anciennes
données contiennent un autre libellé, l’interface publique l’affiche comme
`Sur commande`; corrigez ensuite la fiche depuis l’admin.

## Routines

Les routines affichées sur la page publique sont encore une structure locale
statique dans `index.html`. Chaque routine contient un objectif, plusieurs
produits inclus, un statut et une courte explication. Pour les rendre dynamiques,
créer plus tard une table Supabase dédiée, par exemple `routines`, avec :

- `name`
- `objective`
- `description`
- `status`
- `image_url`
- `product_ids`
- `display_order`

Ne pas convertir une routine en simple produit isolé : elle doit toujours
représenter un ensemble cohérent de plusieurs produits.

## Installation Supabase

1. Créer un projet Supabase.
2. Récupérer `Project URL` dans Project Settings > API.
3. Récupérer la clé `anon public` dans Project Settings > API.
4. Renseigner `supabase-config.js` avec ces deux valeurs publiques. Ne jamais y
   mettre de `service_role` key.
5. Si la base Supabase existe déjà ou a été partiellement créée, consulter d’abord
   `archive/import-supabase/supabase/pre-schema-fix.sql`.
6. Dans SQL Editor, exécuter tout le contenu de `supabase/schema.sql`.
7. Vérifier que le script a bien créé :
   - `public.products`
   - `public.admin_users`
   - la fonction `public.is_admin()`
   - le bucket Storage public `product-images`
8. Dans Authentication, créer le compte utilisateur admin avec e-mail et mot de passe.
9. Dans SQL Editor, autoriser ce compte comme administrateur :

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'TON_EMAIL_ADMIN'
on conflict (user_id) do update
set email = excluded.email;
```

10. Exécuter les requêtes de `archive/import-supabase/supabase/verification.sql` pour confirmer l’état.
11. Dans Authentication > URL Configuration, ajouter les Redirect URLs :
    - `http://127.0.0.1:8080/admin/`
    - `http://127.0.0.1:8080/admin/products/`
    - `https://votre-site.vercel.app/admin/`
    - `https://votre-site.vercel.app/admin/products/`

## Vérification Storage

Dans Supabase > Storage, vérifier que le bucket `product-images` existe, qu’il
est public et que les policies de `supabase/schema.sql` sont appliquées. Les URLs
publiques doivent ressembler à :

```text
https://PROJECT_REF.supabase.co/storage/v1/object/public/product-images/products/...
```

Si l’upload admin échoue, le message d’erreur indique de contrôler ce bucket et
les policies Storage.

## Requêtes de vérification Supabase

Vérifier les tables :

```sql
select table_schema, table_name
from information_schema.tables
where table_schema = 'public'
and table_name in ('products', 'admin_users');
```

Vérifier l’utilisateur Auth :

```sql
select id, email
from auth.users
where email = 'TON_EMAIL_ADMIN';
```

Insérer l’admin :

```sql
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'TON_EMAIL_ADMIN'
on conflict (user_id) do update
set email = excluded.email;
```

Vérifier l’admin :

```sql
select *
from public.admin_users;
```

Vérifier les produits :

```sql
select id, name, status, main_image_url, gallery_image_urls, purchase_url, created_at
from public.products
order by created_at desc;
```

Vérifier les colonnes officielles et les anciennes colonnes éventuelles :

```sql
select column_name, data_type
from information_schema.columns
where table_schema = 'public'
  and table_name = 'products'
  and column_name in (
    'main_image_url',
    'gallery_image_urls',
    'purchase_url',
    'image_url',
    'secondary_images',
    'external_url'
  )
order by column_name;
```

`main_image_url`, `gallery_image_urls` et `purchase_url` doivent exister.
`image_url`, `secondary_images` ou `external_url`, si elles apparaissent, sont
seulement d’anciennes colonnes à migrer ; le code applicatif ne les utilise pas.

Vérifier la fonction admin et le bucket :

```sql
select public.is_admin();

select id, name, public
from storage.buckets
where id = 'product-images';
```

## Tests locaux

Lancer le site statique :

```bash
python3 -m http.server 8080
```

Ouvrir :

- `http://127.0.0.1:8080/`
- `http://127.0.0.1:8080/admin/`
- `http://127.0.0.1:8080/admin/products/`

Tester :

- connexion admin ;
- ajout produit ;
- upload image principale ;
- upload images secondaires si besoin ;
- publication produit ;
- apparition côté public ;
- invisibilité des produits `draft` et `hidden` ;
- refus d’accès avec un utilisateur connecté non-admin ;
- refus d’accès en navigation privée non connectée.

## Variables et déploiement Vercel

Ce site statique lit Supabase depuis `supabase-config.js`. Sur Vercel, vérifier :

- `supabase-config.js` contient l’URL et la clé anon du bon projet.
- Les URL autorisées Supabase Auth incluent le domaine Vercel, par exemple
  `https://votre-site.vercel.app`.
- Les règles RLS sont actives sur `products` et `admin_users`.
- Le compte admin existe dans `auth.users` et `public.admin_users`.
- Un produit publié avec une image s’affiche sur la page publique.
- Un produit en brouillon ou masqué n’apparaît pas sur la page publique.
- L’upload d’image fonctionne depuis `/admin/products`.

## Images produit

Le pack visuel fourni par le propriétaire est stocké localement au format WebP.
Toutes les sections visibles utilisent désormais cette bibliothèque de vrais produits.
Avant un usage commercial public, les droits des images sources doivent être
confirmés comme indiqué dans le manifeste.
