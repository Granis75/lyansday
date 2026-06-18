create extension if not exists pgcrypto;

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  brand text not null,
  category text not null,
  subcategory text,
  subtitle text,
  short_description text not null,
  long_description text,
  main_image_url text,
  gallery_image_urls text[] not null default '{}',
  price_label text,
  purchase_url text,
  tag text check (tag is null or tag in ('nouveaute', 'favori', 'essentiel', 'selection')),
  status text not null default 'draft' check (status in ('published', 'draft', 'hidden')),
  display_order integer not null default 1000,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.products
  add column if not exists name text,
  add column if not exists brand text,
  add column if not exists category text,
  add column if not exists subcategory text,
  add column if not exists subtitle text,
  add column if not exists short_description text,
  add column if not exists long_description text,
  add column if not exists main_image_url text,
  add column if not exists gallery_image_urls text[] not null default '{}',
  add column if not exists price_label text,
  add column if not exists purchase_url text,
  add column if not exists tag text,
  add column if not exists status text default 'draft',
  add column if not exists display_order integer default 1000,
  add column if not exists created_at timestamptz default now(),
  add column if not exists updated_at timestamptz default now();

do $$
begin
  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'image_url'
  ) then
    execute '
      update public.products
      set main_image_url = coalesce(main_image_url, image_url)
      where main_image_url is null
        and image_url is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'external_url'
  ) then
    execute '
      update public.products
      set purchase_url = coalesce(purchase_url, external_url)
      where purchase_url is null
        and external_url is not null
    ';
  end if;

  if exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'secondary_images'
  ) then
    execute '
      update public.products
      set gallery_image_urls = secondary_images
      where (gallery_image_urls is null or gallery_image_urls = ''{}''::text[])
        and secondary_images is not null
    ';
  end if;
end $$;

do $$
declare
  column_type text;
begin
  select data_type
  into column_type
  from information_schema.columns
  where table_schema = 'public'
    and table_name = 'products'
    and column_name = 'display_order';

  if column_type = 'text' then
    update public.products
    set display_order = '1000'
    where display_order is null
       or trim(display_order) = ''
       or display_order !~ '^-?[0-9]+$';

    alter table public.products
    alter column display_order drop default;

    alter table public.products
    alter column display_order type integer
    using display_order::integer;
  end if;
end $$;

update public.products
set status = 'draft'
where status is null;

update public.products
set display_order = 1000
where display_order is null;

update public.products
set gallery_image_urls = '{}'
where gallery_image_urls is null;

alter table public.products
  alter column status set default 'draft',
  alter column status set not null,
  alter column display_order set default 1000,
  alter column display_order set not null,
  alter column gallery_image_urls set default '{}',
  alter column gallery_image_urls set not null,
  alter column created_at set default now(),
  alter column updated_at set default now();

create index if not exists products_public_catalog_idx
  on public.products (status, display_order, created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to anon, authenticated;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists products_set_updated_at on public.products;
create trigger products_set_updated_at
before update on public.products
for each row execute function public.set_updated_at();

alter table public.admin_users enable row level security;
alter table public.products enable row level security;

drop policy if exists "Admins can read admins" on public.admin_users;
create policy "Admins can read admins"
on public.admin_users
for select
to authenticated
using (public.is_admin());

drop policy if exists "Public can read published products" on public.products;
create policy "Public can read published products"
on public.products
for select
to anon, authenticated
using (status = 'published' or public.is_admin());

drop policy if exists "Admins can insert products" on public.products;
create policy "Admins can insert products"
on public.products
for insert
to authenticated
with check (public.is_admin());

drop policy if exists "Admins can update products" on public.products;
create policy "Admins can update products"
on public.products
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

drop policy if exists "Admins can delete products" on public.products;
create policy "Admins can delete products"
on public.products
for delete
to authenticated
using (public.is_admin());

insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can read product images" on storage.objects;
create policy "Public can read product images"
on storage.objects
for select
to anon, authenticated
using (bucket_id = 'product-images');

drop policy if exists "Admins can upload product images" on storage.objects;
create policy "Admins can upload product images"
on storage.objects
for insert
to authenticated
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can update product images" on storage.objects;
create policy "Admins can update product images"
on storage.objects
for update
to authenticated
using (bucket_id = 'product-images' and public.is_admin())
with check (bucket_id = 'product-images' and public.is_admin());

drop policy if exists "Admins can delete product images" on storage.objects;
create policy "Admins can delete product images"
on storage.objects
for delete
to authenticated
using (bucket_id = 'product-images' and public.is_admin());

insert into public.products (
  name,
  brand,
  category,
  subcategory,
  subtitle,
  short_description,
  long_description,
  main_image_url,
  price_label,
  purchase_url,
  tag,
  status,
  display_order
) select
  'Heartleaf 77 Toner',
  'Anua',
  'Soin visage',
  'Toner',
  'Apaisant · peau sensible',
  'Une lotion légère pensée pour apaiser et hydrater sans alourdir la routine.',
  'Produit de démonstration. Remplacez son image et ses textes depuis l’admin avant mise en ligne.',
  'assets/images/lyan-co/product-anua-heartleaf-77-toner.webp',
  null,
  null,
  'favori',
  'draft',
  10
 
where not exists (
  select 1
  from public.products
  where brand = 'Anua' and name = 'Heartleaf 77 Toner'
);

notify pgrst, 'reload schema';
