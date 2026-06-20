-- 1. Verifier les tables attendues
select table_schema, table_name
from information_schema.tables
where table_schema = 'public'
and table_name in ('products', 'admin_users');

-- 2. Verifier l'utilisateur Auth
select id, email
from auth.users
where email = 'TON_EMAIL_ADMIN';

-- 3. Inserer ou mettre a jour l'admin autorise
insert into public.admin_users (user_id, email)
select id, email
from auth.users
where email = 'TON_EMAIL_ADMIN'
on conflict (user_id) do update
set email = excluded.email;

-- 4. Verifier les admins autorises
select *
from public.admin_users;

-- 5. Verifier les produits
select id, name, status, main_image_url, gallery_image_urls, purchase_url, created_at
from public.products
order by created_at desc;

-- 6. Verifier les colonnes officielles et les anciennes colonnes eventuelles
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

-- 7. Verifier la fonction admin
select public.is_admin();

-- 8. Verifier le bucket images
select id, name, public
from storage.buckets
where id = 'product-images';
