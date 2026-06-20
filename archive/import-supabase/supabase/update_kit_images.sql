-- Lyan & Co — update_kit_images.sql
-- Image-only updates for the three Lyan & Co kits.
BEGIN;

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/kit-soleil-quotidien.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Lyan & Co'
  AND name = 'Kit Soleil Quotidien';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/kit-double-nettoyage-simple.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Lyan & Co'
  AND name = 'Kit Double Nettoyage Simple';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/kit-barriere-cutanee.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Lyan & Co'
  AND name = 'Kit Barrière Cutanée';

COMMIT;
