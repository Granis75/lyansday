# Lyan & Co.

Boutique éditoriale de K-Beauty et J-Beauty destinée au marché algérien.

Le site présente une sélection courte sans prix, panier, paiement en ligne ni backend.
Les demandes sont préparées pour WhatsApp et Instagram.

## Structure

- `index.html` : page boutique en français
- `styles.css` : direction artistique et responsive
- `script.js` : catalogue, configuration des contacts et navigation mobile
- `privacy.html` : informations de confidentialité
- `assets/images/lyan-co/` : pack visuel WebP et manifeste d’inventaire
- `assets/journal-*.webp` : visuels éditoriaux historiques conservés

## Configuration

Les coordonnées officielles sont centralisées dans `SITE_CONFIG.contacts` au début de
`script.js`. Renseigner le numéro WhatsApp au format international sans `+`, l’URL
Instagram complète et l’adresse e-mail.

Les produits sont centralisés dans le tableau `PRODUCTS`, à partir du manifeste
`assets/images/lyan-co/manifest.json`. Chaque bouton WhatsApp génère
automatiquement un message incluant le nom du produit.

## Images produit

Le pack visuel fourni par le propriétaire est stocké localement au format WebP.
Avant un usage commercial public, les droits des images sources doivent être
confirmés comme indiqué dans le manifeste.
