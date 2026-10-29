# Institut Milon — site vitrine

Site vitrine de l'Institut Milon : React 19 + Vite 8, JavaScript (pas de TypeScript), CSS classique
et CSS Modules avec variables CSS. Deux routes : `/` (accueil) et `/contact`.

Les pages de référence du design system (`reference/Landing Milon.dc.html`, `reference/Contact Milon.dc.html`)
et les tokens (`reference/tokens/*.css`) sont la source de vérité : textes, ordre des sections, tailles,
couleurs et comportements sont repris de ces fichiers.

## Prérequis

- Node.js 20 ou plus récent
- npm 10 ou plus récent

## Installation

```bash
npm install
cp .env.example .env      # puis renseignez les variables (facultatif en développement)
npm run dev               # http://localhost:5173
```

## Scripts

| Commande           | Rôle                                                                 |
| ------------------ | -------------------------------------------------------------------- |
| `npm run dev`      | Serveur de développement                                             |
| `npm run build`    | Build de production dans `dist/`                                     |
| `npm run preview`  | Prévisualisation locale du build                                     |
| `npm run lint`     | ESLint                                                               |
| `npm run favicons` | Régénère les favicons à partir du masque de l'emblème (sans dépendance) |

## Variables d'environnement

Copiez `.env.example` vers `.env`. Les variables préfixées `VITE_` sont intégrées au moment du build :
sur Netlify ou Vercel, définissez-les dans l'interface d'hébergement avant de lancer le build.

| Variable             | Rôle                                                                                                   |
| -------------------- | ------------------------------------------------------------------------------------------------------ |
| `VITE_WEB3FORMS_KEY` | Clé d'accès [Web3Forms](https://web3forms.com). Si elle est absente, le formulaire ouvre la messagerie de l'internaute avec un message prérempli (`mailto`). |
| `VITE_CONTACT_EMAIL` | Adresse de réception : destinataire du `mailto`, affichée dans la page de contact. Défaut : `contact@institut-milon.fr`. |

Avec une clé Web3Forms, l'envoi se fait en `POST` JSON vers `https://api.web3forms.com/submit`
(champs `name`, `email`, `profil`, `structure`, `message`, plus un pot de miel `botcheck`) et la page
affiche « Votre demande a bien été envoyée. ».

## Déploiement

### Netlify

1. Nouveau site depuis le dépôt Git.
2. Commande de build `npm run build`, dossier de publication `dist` (déjà définis dans `netlify.toml`).
3. Variables d'environnement : *Site configuration → Environment variables*.
4. La réécriture SPA (`/* → /index.html`) est fournie par `netlify.toml` et `public/_redirects`,
   pour que `/contact` réponde aussi en accès direct.

### Vercel

1. Importer le dépôt ; le preset *Vite* est détecté (build `vite build`, sortie `dist`).
2. Variables d'environnement : *Settings → Environment Variables*, puis redéployer.
3. La réécriture SPA est fournie par `vercel.json`.

## Structure

```
index.html                 titre, description, favicons, préchargement d'Inter
public/
  fonts/                   Inter variable (axes wght + opsz), Fontsource 5.3.0, licence SIL OFL 1.1
  assets/logo/             masque alpha de l'emblème (coloré en CSS par currentColor)
  assets/photos/           six photographies du carrousel (1800 × 1200)
  favicon-*.png, apple-touch-icon.png
reference/                 pages et tokens du design system (source de vérité)
scripts/favicons.mjs       génération des favicons
src/
  main.jsx, App.jsx        routeur, lien d'évitement, retour en haut à chaque changement de route
  pages/Accueil.jsx        assemble les sections de l'accueil, menu mobile, défilement doux
  pages/Contact.jsx        formulaire (validation, Web3Forms ou mailto)
  components/              Header, MenuMobile, Hero, BandeauThemes, Singulier, Carrousel,
                           Formations, Approche, BandeauContact, Footer, Logo, Fleche
  hooks/                   useScrollHeader, useFitText, useScrollTicker, useSmoothAnchors,
                           useReducedMotion
  styles/tokens.css        @font-face, couleurs, mouvement, mise en page
  styles/base.css          reset léger, liens et boutons, flèches, focus, lien d'évitement
```

## Comportements notables

- Barre fixe transparente en haut de page, carmin dès qu'on défile ; elle se masque en descendant,
  réapparaît en remontant ou au focus clavier. Sa hauteur mesurée est exposée dans `--header-h`.
- Sous 1100 px, menu plein écran : focus piégé, fermeture par la croix, Échap ou un lien, défilement
  de la page bloqué, focus rendu au bouton hamburger.
- Titre du hero sur deux lignes dont la taille est calculée pour remplir la largeur (max 176 px et
  24 % de la hauteur d'écran) ; le mot actif est carmin avec sa barre pleine.
- Bandeau des thèmes piloté par le défilement (boucle sans couture, lignes alternées).
- Carrousel : glisser (résistance aux extrémités), défilement horizontal, flèches du clavier, clic sur
  une voisine, boutons et points.
- Liens internes avec défilement doux, décalage de la barre en remontant, focus sur la section.
- `prefers-reduced-motion` : pas de glissement des flèches, pas de défilement doux, bandeau immobile.

## Écarts par rapport à la référence

- Le lien « Design system » du pied de page de la référence renvoie vers une page du design system
  qui ne fait pas partie du site ; il n'est pas repris.
- Les photos sont les originaux Pexels (mêmes clichés que la référence) recadrés en 1800 × 1200.

## Licences

Inter est distribuée sous licence SIL Open Font License 1.1. Les photographies proviennent de Pexels
(licence Pexels).
