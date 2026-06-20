-- Lyan & Co — update_remaining_product_images.sql
-- Image-only updates for reliable remaining catalogue matches.
-- Image fields only; no catalogue metadata is modified.
BEGIN;

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-round-lab-birch-juice-moisturizing-sunscreen.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Round Lab'
  AND name = 'Birch Juice Moisturizing Sunscreen SPF50+ PA++++';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-beauty-of-joseon-glow-serum-propolis-niacinamide.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Beauty of Joseon'
  AND name = 'Glow Serum Propolis + Niacinamide';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-canmake-mermaid-skin-gel-uv.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Canmake'
  AND name = 'Mermaid Skin Gel UV SPF50+ PA++++';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-vicrea-and-honey-deep-moist-shampoo.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Vicrea &honey'
  AND name = 'Deep Moist Shampoo';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-cosrx-advanced-snail-92-all-in-one-cream.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'COSRX'
  AND name = 'Advanced Snail 92 All In One Cream';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-anua-heartleaf-quercetinol-pore-deep-cleansing-foam.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Anua'
  AND name = 'Heartleaf Quercetinol Pore Deep Cleansing Foam';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-anua-niacinamide-10-txa-4-serum.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Anua'
  AND name = 'Niacinamide 10% + TXA 4% Serum';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-canmake-cream-cheek.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Canmake'
  AND name = 'Cream Cheek';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-curel-intensive-moisture-cream.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Curél'
  AND name = 'Intensive Moisture Cream';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-mixsoon-daily-mask-weekly-care-set.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'mixsoon'
  AND name = 'Daily Mask Weekly Care Set';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-shiseido-fino-premium-touch-hair-mask.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Shiseido'
  AND name = 'Fino Premium Touch Hair Mask';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-anua-heartleaf-pore-control-cleansing-oil.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Anua'
  AND name = 'Heartleaf Pore Control Cleansing Oil';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-ishizawa-lab-nadeshiko-keana-rice-pack.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Ishizawa-Lab'
  AND name = 'Nadeshiko Keana Rice Pack';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-kate-lip-monster.jpeg',
  gallery_image_urls = ARRAY['/assets/images/lyan-co/product-kate-lip-monster-gallery-1.jpeg']::text[],
  updated_at = now()
WHERE brand = 'KATE'
  AND name = 'Lip Monster';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-cosrx-low-ph-good-morning-gel-cleanser.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'COSRX'
  AND name = 'Low pH Good Morning Gel Cleanser';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-masil-8-seconds-salon-hair-mask.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Masil'
  AND name = '8 Seconds Salon Hair Mask';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-beauty-of-joseon-centella-asiatica-calming-mask.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Beauty of Joseon'
  AND name = 'Centella Asiatica Calming Mask';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-purito-seoul-mighty-bamboo-panthenol-cream.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Purito Seoul'
  AND name = 'Mighty Bamboo Panthenol Cream';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-beauty-of-joseon-relief-sun-aqua-fresh-rice-b5.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Beauty of Joseon'
  AND name = 'Relief Sun Aqua-Fresh Rice + B5 SPF50+ PA++++';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-aromatica-rosemary-scalp-scaling-shampoo.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'Aromatica'
  AND name = 'Rosemary Scalp Scaling Shampoo';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-skin1004-madagascar-centella-hyalu-cica-water-fit-sun-serum.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'SKIN1004'
  AND name = 'Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-skin1004-madagascar-centella-light-cleansing-oil.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'SKIN1004'
  AND name = 'Madagascar Centella Light Cleansing Oil';

UPDATE public.products
SET
  main_image_url = '/assets/images/lyan-co/product-skin1004-madagascar-centella-ampoule-foam.jpeg',
  gallery_image_urls = '{}'::text[],
  updated_at = now()
WHERE brand = 'SKIN1004'
  AND name = 'Madagascar Centella Ampoule Foam';

COMMIT;
