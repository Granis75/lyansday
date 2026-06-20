-- Lyan's Day — Pre-schema fix
-- À lancer AVANT supabase/schema.sql si le projet Supabase existe déjà.
-- Objectif : aligner la base distante avec les colonnes attendues par le code actuel,
-- sans supprimer la table products et sans perdre les données existantes.

create extension if not exists "pgcrypto";

-- 1. Créer admin_users si elle manque
create table if not exists public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;

-- 2. Créer products si elle manque complètement
create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null default '',
  brand text,
  category text,
  subcategory text,
  subtitle text,
  short_description text,
  long_description text,
  availability text not null default 'on_order',
  public_status text not null default 'Sur commande',
  price_label text,
  tags text[] default '{}',
  source_url text,
  image_rights_status text,
  sourcing_status text,
  compliance_status text,
  internal_score integer,
  featured_tag text,
  purchase_url text,
  main_image_url text,
  gallery_image_urls text[] default '{}',
  tag text,
  status text not null default 'draft',
  display_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 3. Ajouter toutes les colonnes manquantes si la table existait déjà
alter table public.products
add column if not exists brand text;

alter table public.products
add column if not exists category text;

alter table public.products
add column if not exists subcategory text;

alter table public.products
add column if not exists subtitle text;

alter table public.products
add column if not exists short_description text;

alter table public.products
add column if not exists long_description text;

alter table public.products
add column if not exists availability text default 'on_order';

alter table public.products
add column if not exists public_status text default 'Sur commande';

alter table public.products
add column if not exists tags text[] default '{}';

alter table public.products
add column if not exists source_url text;

alter table public.products
add column if not exists image_rights_status text;

alter table public.products
add column if not exists sourcing_status text;

alter table public.products
add column if not exists compliance_status text;

alter table public.products
add column if not exists internal_score integer;

alter table public.products
add column if not exists featured_tag text;

alter table public.products
add column if not exists price_label text;

alter table public.products
add column if not exists purchase_url text;

alter table public.products
add column if not exists main_image_url text;

alter table public.products
add column if not exists gallery_image_urls text[] default '{}';

alter table public.products
add column if not exists tag text;

alter table public.products
add column if not exists status text default 'draft';

alter table public.products
add column if not exists created_at timestamptz default now();

alter table public.products
add column if not exists updated_at timestamptz default now();

-- 4. Gérer display_order proprement
do $$
begin
  if not exists (
    select 1
    from information_schema.columns
    where table_schema = 'public'
      and table_name = 'products'
      and column_name = 'display_order'
  ) then
    alter table public.products
    add column display_order integer not null default 0;
  end if;
end $$;

-- Si display_order existe mais en text, convertir en integer
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
    set display_order = '0'
    where display_order is null
       or trim(display_order) = ''
       or display_order !~ '^-?[0-9]+$';

    alter table public.products
    alter column display_order drop default;

    alter table public.products
    alter column display_order type integer
    using display_order::integer;

    alter table public.products
    alter column display_order set default 0;

    alter table public.products
    alter column display_order set not null;
  end if;
end $$;

-- 5. Harmoniser les anciennes colonnes vers les noms officiels si elles existent
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
      set main_image_url = image_url
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
      set purchase_url = external_url
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

-- 6. Sécuriser les valeurs null importantes
update public.products
set status = 'draft'
where status is null;

update public.products
set display_order = 0
where display_order is null;

alter table public.products
alter column status set default 'draft';

alter table public.products
alter column status set not null;

alter table public.products
alter column display_order set default 0;

alter table public.products
alter column display_order set not null;

alter table public.products
alter column created_at set default now();

alter table public.products
alter column updated_at set default now();

-- 7. Activer RLS
alter table public.products enable row level security;
alter table public.admin_users enable row level security;

-- 8. Créer ou remplacer la fonction admin
create or replace function public.is_admin()
returns boolean
language sql
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_users
    where admin_users.user_id = auth.uid()
  );
$$;

grant execute on function public.is_admin() to authenticated;
grant execute on function public.is_admin() to anon;

-- 9. Créer le bucket product-images si nécessaire
insert into storage.buckets (id, name, public)
values ('product-images', 'product-images', true)
on conflict (id) do update
set public = excluded.public;

-- 10. Recharger le cache PostgREST
notify pgrst, 'reload schema';
