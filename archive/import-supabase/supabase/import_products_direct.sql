-- Lyan & Co. — import direct catalogue Supabase depuis data/lyan_co_supabase_import_v1_clean.csv
-- Prêt pour Supabase SQL Editor. Non destructif.

-- 1) Colonnes catalogue manquantes, idempotent.
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS subcategory text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS gallery_image_urls text[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS tags text[];
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS source_url text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS image_rights_status text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS sourcing_status text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS compliance_status text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS internal_score integer;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS featured_tag text;
ALTER TABLE public.products ADD COLUMN IF NOT EXISTS public_status text;

-- status reste technique: published ou draft. Le libellé client reste dans public_status.
ALTER TABLE public.products ALTER COLUMN public_status SET DEFAULT 'Sur commande';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'products_public_status_check'
      AND conrelid = 'public.products'::regclass
  ) THEN
    ALTER TABLE public.products
      ADD CONSTRAINT products_public_status_check
      CHECK (public_status IN ('Disponible', 'Sur commande', 'Bientôt', 'À vérifier'));
  END IF;
END $$;

-- Avant de créer cet index, vérifier qu'il n'existe pas déjà de doublon exact brand + name:
-- SELECT brand, name, COUNT(*) FROM public.products GROUP BY brand, name HAVING COUNT(*) > 1;
CREATE UNIQUE INDEX IF NOT EXISTS products_brand_name_uidx ON public.products (brand, name);

-- 2) Insert/update catalogue. Les champs vides sont NULL; les tags sont des tableaux Postgres.
-- Les lignes public_status = 'À vérifier' sont importées en status = 'draft'.
INSERT INTO public.products (
  name,
  brand,
  category,
  subcategory,
  short_description,
  main_image_url,
  gallery_image_urls,
  purchase_url,
  status,
  display_order,
  tags,
  source_url,
  image_rights_status,
  sourcing_status,
  compliance_status,
  internal_score,
  public_status
)
VALUES
  ('Madagascar Centella Hyalu-Cica Water-Fit Sun Serum SPF50+ PA++++', 'SKIN1004', 'Soin solaire', 'Crèmes solaires', 'Un solaire sérum très demandé, intéressant pour les peaux sensibles et les routines minimalistes.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Madagascar%20Centella%20Hyalu-Cica%20Water-Fit%20Sun%20Serum%20SPF50%2B%20PA%2B%2B%2B%2B', 'draft', 1, ARRAY['spf', 'centella', 'hyalu-cica', 'sensible']::text[], 'https://www.stylevana.com/fr_FR/vana-award.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 92, 'À vérifier'),
  ('Relief Sun Rice + Probiotics SPF50+ PA++++', 'Beauty of Joseon', 'Soin solaire', 'Crèmes solaires', 'Un solaire culte à la texture confortable, pensé pour protéger sans alourdir la routine.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Relief%20Sun%20Rice%20%2B%20Probiotics%20SPF50%2B%20PA%2B%2B%2B%2B', 'draft', 2, ARRAY['spf', 'culte', 'quotidien', 'riz', 'probiotiques']::text[], 'https://www.stylevana.com/fr_FR/vana-award.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 89, 'À vérifier'),
  ('Relief Sun Aqua-Fresh Rice + B5 SPF50+ PA++++', 'Beauty of Joseon', 'Soin solaire', 'Crèmes solaires', 'Une version plus fraîche du solaire Beauty of Joseon, adaptée aux routines légères.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Relief%20Sun%20Aqua-Fresh%20Rice%20%2B%20B5%20SPF50%2B%20PA%2B%2B%2B%2B', 'draft', 3, ARRAY['spf', 'frais', 'quotidien', 'peau mixte']::text[], 'https://www.stylevana.com/fr_FR/meilleures-ventes.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 87, 'À vérifier'),
  ('Birch Juice Moisturizing Sunscreen SPF50+ PA++++', 'Round Lab', 'Soin solaire', 'Crèmes solaires', 'Un solaire hydratant et facile à comprendre, cohérent avec une sélection douce et quotidienne.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Birch%20Juice%20Moisturizing%20Sunscreen%20SPF50%2B%20PA%2B%2B%2B%2B', 'draft', 4, ARRAY['spf', 'bouleau', 'hydratant', 'quotidien']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 83, 'À vérifier'),
  ('Mermaid Skin Gel UV SPF50+ PA++++', 'Canmake', 'Soin solaire', 'Gels solaires', 'Un gel solaire japonais léger, utile pour une sélection J-Beauty accessible.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Mermaid%20Skin%20Gel%20UV%20SPF50%2B%20PA%2B%2B%2B%2B', 'draft', 5, ARRAY['j-beauty', 'spf', 'gel', 'léger']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 79, 'À vérifier'),
  ('Madagascar Centella Ampoule', 'SKIN1004', 'Soin visage', 'Sérums & Ampoules', 'Une ampoule minimaliste à la Centella pour calmer la routine sans multiplier les actifs.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Madagascar%20Centella%20Ampoule', 'draft', 6, ARRAY['ampoule', 'centella', 'apaisant', 'minimaliste']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 92, 'À vérifier'),
  ('Dynasty Cream', 'Beauty of Joseon', 'Soin visage', 'Crèmes', 'Une crème emblématique, intéressante pour une sélection courte autour du confort et de l’éclat.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Dynasty%20Cream', 'draft', 7, ARRAY['crème', 'hydratation', 'riz', 'ginseng']::text[], 'https://www.yesstyle.com/fr/beauty-of-joseon-dynasty/info.html/pid.1127785129', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 89, 'À vérifier'),
  ('Madagascar Centella Light Cleansing Oil', 'SKIN1004', 'Soin visage', 'Double nettoyage', 'Une huile nettoyante légère pour introduire le double nettoyage sans sensation de surcharge.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Madagascar%20Centella%20Light%20Cleansing%20Oil', 'draft', 8, ARRAY['double nettoyage', 'huile', 'centella', 'léger']::text[], 'https://www.yesstyle.com/fr/skin1004-madagascar/info.html/pid.1077182361', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 89, 'À vérifier'),
  ('Heartleaf Pore Control Cleansing Oil', 'Anua', 'Soin visage', 'Double nettoyage', 'Une huile nettoyante populaire pour une routine simple orientée peau nette et confortable.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Heartleaf%20Pore%20Control%20Cleansing%20Oil', 'draft', 9, ARRAY['double nettoyage', 'heartleaf', 'pores', 'huile']::text[], 'https://www.stylevana.com/fr_FR/marques/anua.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 87, 'À vérifier'),
  ('Advanced Snail 96 Mucin Power Essence', 'COSRX', 'Soin visage', 'Essences & Lotions', 'Une essence iconique pour hydrater et lisser visuellement la peau avec une seule étape.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Advanced%20Snail%2096%20Mucin%20Power%20Essence', 'draft', 10, ARRAY['essence', 'mucine', 'hydratation', 'culte']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 87, 'À vérifier'),
  ('Low pH Good Morning Gel Cleanser', 'COSRX', 'Soin visage', 'Nettoyants', 'Un nettoyant gel connu, pratique pour une routine simple matin ou soir.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Low%20pH%20Good%20Morning%20Gel%20Cleanser', 'draft', 11, ARRAY['nettoyant', 'gel', 'low ph', 'quotidien']::text[], 'https://www.asianbeautywholesale.com/en/face-washes/list.html/bcc.16138_bpt.46', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 87, 'À vérifier'),
  ('Madagascar Centella Ampoule Foam', 'SKIN1004', 'Soin visage', 'Nettoyants', 'Un nettoyant doux à la Centella, facile à vendre dans une routine peau sensible.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Madagascar%20Centella%20Ampoule%20Foam', 'draft', 12, ARRAY['nettoyant', 'centella', 'peau sensible']::text[], 'https://www.asianbeautywholesale.com/en/face-washes/list.html/bcc.16138_bpt.46', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 87, 'À vérifier'),
  ('Niacinamide 10% + TXA 4% Serum', 'Anua', 'Soin visage', 'Sérums & Ampoules', 'Un sérum très demandé pour l’éclat, à proposer avec une communication prudente et simple.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Niacinamide%2010%25%20%2B%20TXA%204%25%20Serum', 'draft', 13, ARRAY['serum', 'niacinamide', 'txa', 'éclat']::text[], 'https://www.stylevana.com/fr_FR/marques/anua.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 86, 'À vérifier'),
  ('Glow Serum Propolis + Niacinamide', 'Beauty of Joseon', 'Soin visage', 'Sérums & Ampoules', 'Un sérum éclat facile à expliquer, cohérent avec une routine courte et lumineuse.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Glow%20Serum%20Propolis%20%2B%20Niacinamide', 'draft', 14, ARRAY['serum', 'propolis', 'niacinamide', 'éclat']::text[], 'https://www.stylevana.com/fr_FR/blog/post/meilleur-serum-coreen/', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 86, 'À vérifier'),
  ('Advanced Snail 92 All In One Cream', 'COSRX', 'Soin visage', 'Crèmes', 'Une crème tout-en-un connue, pertinente pour le positionnement skip-care.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Advanced%20Snail%2092%20All%20In%20One%20Cream', 'draft', 15, ARRAY['crème', 'mucine', 'all-in-one', 'hydratation']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 85, 'À vérifier'),
  ('Mighty Bamboo Panthenol Cream', 'Purito Seoul', 'Soin visage', 'Crèmes', 'Une crème barrière simple à positionner pour les peaux qui recherchent du confort.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Mighty%20Bamboo%20Panthenol%20Cream', 'draft', 16, ARRAY['crème', 'panthenol', 'barrière', 'sensible']::text[], 'https://www.stylevana.com/fr_FR/vana-award.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 85, 'À vérifier'),
  ('Heartleaf Quercetinol Pore Deep Cleansing Foam', 'Anua', 'Soin visage', 'Nettoyants', 'Un nettoyant mousse à associer à une huile pour une routine claire en deux étapes.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Heartleaf%20Quercetinol%20Pore%20Deep%20Cleansing%20Foam', 'draft', 17, ARRAY['nettoyant', 'heartleaf', 'pores', 'mousse']::text[], 'https://www.stylevana.com/fr_FR/marques/anua.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 84, 'À vérifier'),
  ('Dive-In Low Molecular Hyaluronic Acid Serum', 'Torriden', 'Soin visage', 'Sérums & Ampoules', 'Un sérum hydratant clair et simple à vendre pour les routines peau déshydratée.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Dive-In%20Low%20Molecular%20Hyaluronic%20Acid%20Serum', 'draft', 18, ARRAY['serum', 'acide hyaluronique', 'hydratation']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 80, 'À vérifier'),
  ('Intensive Moisture Cream', 'Curél', 'Soin visage', 'Crèmes', 'Une crème japonaise rassurante pour une sélection orientée peau sensible et barrière cutanée.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Intensive%20Moisture%20Cream', 'draft', 19, ARRAY['j-beauty', 'crème', 'céramides', 'sensible']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 79, 'À vérifier'),
  ('No.3 Super Glowing Essence Toner', 'numbuzin', 'Soin visage', 'Essences & Lotions', 'Une essence-toner lumineuse pour les clients qui veulent une étape hydratation + éclat.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20No.3%20Super%20Glowing%20Essence%20Toner', 'draft', 20, ARRAY['toner', 'essence', 'éclat', 'glow']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 79, 'À vérifier'),
  ('Centella Asiatica Calming Mask', 'Beauty of Joseon', 'Masques', 'Masques tissu', 'Un masque tissu apaisant à vendre comme booster ponctuel, pas comme étape obligatoire.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Centella%20Asiatica%20Calming%20Mask', 'draft', 21, ARRAY['masque tissu', 'centella', 'apaisant']::text[], 'https://www.asianbeautywholesale.com/en/list.html/bcc.15055_bpt.46?pn=4', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 88, 'À vérifier'),
  ('Bio-Collagen Real Deep Mask', 'Biodance', 'Masques', 'Masques hydrogel', 'Un masque hydrogel très visuel, intéressant pour l’effet cadeau et contenu social.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Bio-Collagen%20Real%20Deep%20Mask', 'draft', 22, ARRAY['hydrogel', 'masque', 'collagen', 'viral']::text[], 'https://www.asianbeautywholesale.com/en/list.html/bcc.15055_bpt.46?pn=4', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 86, 'À vérifier'),
  ('Daily Mask Weekly Care Set', 'mixsoon', 'Masques', 'Masques tissu', 'Un set de masques à proposer comme routine hebdomadaire simple, sans accumulation quotidienne.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Daily%20Mask%20Weekly%20Care%20Set', 'draft', 23, ARRAY['masque', 'set', 'hebdomadaire', 'soin simple']::text[], 'https://www.asianbeautywholesale.com/en/list.html/bcc.15055_bpt.46?pn=4', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 83, 'À vérifier'),
  ('Nadeshiko Keana Rice Pack', 'Ishizawa-Lab', 'Masques', 'Masques rinçables', 'Un masque japonais au riz, cohérent avec une direction J-Beauty douce et texturée.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Nadeshiko%20Keana%20Rice%20Pack', 'draft', 24, ARRAY['j-beauty', 'riz', 'masque', 'pores']::text[], 'https://www.asianbeautywholesale.com/en/list.html/bcc.15055_bpt.46?pn=4', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 81, 'À vérifier'),
  ('Madagascar Centella Poremizing Clarifying Mask', 'SKIN1004', 'Masques', 'Masques rinçables', 'Un masque ciblé pores à garder comme option complémentaire, sans complexifier la routine.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Madagascar%20Centella%20Poremizing%20Clarifying%20Mask', 'draft', 25, ARRAY['masque', 'centella', 'pores', 'clarifiant']::text[], 'https://www.asianbeautywholesale.com/en/list.html/bcc.15055_bpt.46?pn=4', 'needs_authorized_supplier_media', 'À vérifier ABW', 'À vérifier CPNP / RP UE', 81, 'À vérifier'),
  ('Fino Premium Touch Hair Mask', 'Shiseido', 'Soin cheveux', 'Masques cheveux', 'Un masque cheveux japonais très demandé, parfait pour ouvrir une petite sélection capillaire.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Fino%20Premium%20Touch%20Hair%20Mask', 'draft', 26, ARRAY['j-beauty', 'cheveux', 'masque', 'culte']::text[], 'https://www.stylevana.com/fr_FR/vana-award.html', 'needs_authorized_supplier_media', 'À vérifier ABW / fournisseur UE', 'À vérifier CPNP / RP UE', 91, 'À vérifier'),
  ('8 Seconds Salon Hair Mask', 'Masil', 'Soin cheveux', 'Masques cheveux', 'Un soin cheveux rapide et facile à comprendre, orienté résultat immédiat sans routine longue.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%208%20Seconds%20Salon%20Hair%20Mask', 'draft', 27, ARRAY['cheveux', 'masque', 'rapide', 'k-beauty']::text[], 'https://www.stylevana.com/fr_FR/vana-award.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 83, 'À vérifier'),
  ('Deep Moist Shampoo', 'Vicrea &honey', 'Soin cheveux', 'Shampooings', 'Un shampooing japonais très esthétique, intéressant si tu veux une ligne cheveux plus premium.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Deep%20Moist%20Shampoo', 'draft', 28, ARRAY['j-beauty', 'shampooing', 'miel', 'hydratation']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 76, 'À vérifier'),
  ('Rosemary Scalp Scaling Shampoo', 'Aromatica', 'Soin cheveux', 'Cuir chevelu', 'Un soin cuir chevelu clair, adapté à une sélection naturelle et fonctionnelle.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Rosemary%20Scalp%20Scaling%20Shampoo', 'draft', 29, ARRAY['cuir chevelu', 'romarin', 'shampooing']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 74, 'À vérifier'),
  ('Heroine Make Long & Curl Mascara Advanced Film', 'KissMe / Heroine Make', 'Maquillage', 'Mascara', 'Un mascara japonais culte à proposer comme indispensable maquillage simple.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Heroine%20Make%20Long%20%26%20Curl%20Mascara%20Advanced%20Film', 'draft', 30, ARRAY['j-beauty', 'mascara', 'culte', 'yeux']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 82, 'À vérifier'),
  ('Cream Cheek', 'Canmake', 'Maquillage', 'Blush', 'Un blush compact et accessible pour compléter la sélection sans l’élargir trop vite.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Cream%20Cheek', 'draft', 31, ARRAY['j-beauty', 'blush', 'compact', 'naturel']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 78, 'À vérifier'),
  ('Lip Monster', 'KATE', 'Maquillage', 'Lèvres', 'Un produit lèvres japonais très identifiable, à tester en petite quantité si sourcing propre.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Lip%20Monster', 'draft', 32, ARRAY['j-beauty', 'lèvres', 'maquillage']::text[], 'https://www.yesstyle.com/fr/home.html', 'needs_authorized_supplier_media', 'À vérifier', 'À vérifier CPNP / RP UE', 78, 'À vérifier'),
  ('Kit Soleil Quotidien', 'Lyan & Co', 'Kits & Routines', 'Protection solaire', 'Une routine ultra-courte autour d’un solaire confortable et facile à porter tous les jours.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Kit%20Soleil%20Quotidien', 'published', 33, ARRAY['kit', 'solaire', 'quotidien', 'minimaliste']::text[], 'https://www.stylevana.com/fr_FR/blog/post/cremes-solaires-meilleures-ventes/', 'needs_own_shooting', 'Composer avec BOJ / SKIN1004 / Round Lab', 'Vérifier chaque produit du kit', 90, 'Sur commande'),
  ('Kit Double Nettoyage Simple', 'Lyan & Co', 'Kits & Routines', 'Double nettoyage', 'Deux gestes seulement : une huile nettoyante puis un nettoyant doux pour une base propre.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Kit%20Double%20Nettoyage%20Simple', 'published', 34, ARRAY['kit', 'double nettoyage', 'débutant', 'minimaliste']::text[], 'https://www.yesstyle.com/fr/skin1004-madagascar/info.html/pid.1077182361', 'needs_own_shooting', 'Composer avec SKIN1004 / Anua / COSRX', 'Vérifier chaque produit du kit', 88, 'Sur commande'),
  ('Kit Barrière Cutanée', 'Lyan & Co', 'Kits & Routines', 'Peau sensible', 'Une sélection courte pour calmer, hydrater et renforcer une peau sensibilisée.', NULL, NULL, 'https://wa.me/33766033929?text=Bonjour%20Lyan%20%26%20Co%2C%20je%20souhaite%20commander%20Kit%20Barri%C3%A8re%20Cutan%C3%A9e', 'published', 35, ARRAY['kit', 'peau sensible', 'barrière', 'centella']::text[], 'https://www.stylevana.com/fr_FR/vana-award.html', 'needs_own_shooting', 'Composer avec SKIN1004 / Purito / Curél', 'Vérifier chaque produit du kit', 86, 'Sur commande')
ON CONFLICT (brand, name) DO UPDATE SET
  category = EXCLUDED.category,
  subcategory = EXCLUDED.subcategory,
  short_description = EXCLUDED.short_description,
  main_image_url = EXCLUDED.main_image_url,
  gallery_image_urls = EXCLUDED.gallery_image_urls,
  purchase_url = EXCLUDED.purchase_url,
  status = EXCLUDED.status,
  display_order = EXCLUDED.display_order,
  tags = EXCLUDED.tags,
  source_url = EXCLUDED.source_url,
  image_rights_status = EXCLUDED.image_rights_status,
  sourcing_status = EXCLUDED.sourcing_status,
  compliance_status = EXCLUDED.compliance_status,
  internal_score = EXCLUDED.internal_score,
  public_status = EXCLUDED.public_status;

-- Vérification rapide après exécution:
SELECT status, public_status, COUNT(*)
FROM public.products
GROUP BY status, public_status
ORDER BY status, public_status;
