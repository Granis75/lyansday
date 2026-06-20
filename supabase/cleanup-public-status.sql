-- Vérifier les produits à nettoyer avant publication.
select
  id,
  name,
  brand,
  public_status,
  availability,
  status
from public.products
where public_status = 'À vérifier'
order by display_order asc, created_at desc;

-- À exécuter manuellement dans Supabase SQL Editor après vérification.
-- update public.products
-- set public_status = 'Sur commande'
-- where public_status = 'À vérifier';
