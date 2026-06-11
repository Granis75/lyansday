# Lyan's Day — site statique V1.1

Site éditorial statique basé sur le moodboard Lyan's Day : journal visuel du quotidien, espaces calmes, objets utiles, soins naturels, parfums d'intérieur et simple living.

## Fichiers

- `index.html` : page principale
- `privacy.html` : modèle de politique de confidentialité à compléter avant lancement public
- `styles.css` : système visuel responsive
- `script.js` : navigation mobile, animations progressives, validation newsletter de maquette
- `assets/moodboard.png` : moodboard de référence

## Corrections intégrées

- Navigation mobile avec bouton menu accessible
- Contenu visible même sans JavaScript
- Support `prefers-reduced-motion`
- Focus clavier visible globalement
- Offset d'ancres pour éviter le header sticky
- CTA newsletter remonté dans le hero
- Consentement newsletter + lien confidentialité
- Validation locale email / consentement
- Contraste renforcé sur les petits textes bleus
- Overlay renforcé sur les images avec labels
- Hauteur minimale de CTA à 44px
- Hiérarchie H2 réduite pour préserver la primauté du H1

## À faire avant lancement public

1. Remplacer le moodboard par vos propres photos originales.
2. Connecter la newsletter à Brevo, Mailchimp, ConvertKit ou autre.
3. Compléter la politique de confidentialité avec le vrai responsable de traitement, l'outil utilisé et l'adresse de contact.
4. Ajouter favicon, URL canonique et structured data quand le domaine final est choisi.
5. Exporter les images finales en WebP/AVIF pour améliorer le LCP.
