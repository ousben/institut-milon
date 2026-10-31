# Institut Milon — site vitrine

Site vitrine de l'Institut Milon : React 19 + Vite 8, JavaScript (pas de TypeScript), CSS classique
et CSS Modules avec variables CSS.

Routes : `/` (accueil), `/institut` (L’Institut), `/approche` (Notre approche), `/formations`, `/contact`,
`/plan-du-site`, `/mentions-legales`, `/confidentialite`, `/cookies`, `/accessibilite` ; toute autre adresse
affiche la page « Page introuvable ».

Les pages de référence du design system (`reference/*.dc.html`, une par page du site plus l'en-tête et le pied de
page partagés) et les tokens (`reference/tokens/*.css`) sont la source de vérité : textes, ordre des sections,
tailles, couleurs et comportements sont repris de ces fichiers.

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
  assets/photos/           six photographies (carrousel, sections), 1800 × 1200, et le bandeau de la
                           page L’Institut (institut-bandeau.webp, image déposée dans la maquette)
  favicon-*.png, apple-touch-icon.png
reference/                 pages et tokens du design system (source de vérité)
scripts/favicons.mjs       génération des favicons
src/
  main.jsx, App.jsx        routeur, lien d'évitement, retour en haut (ou à l'ancre) à chaque route
  pages/Accueil.jsx        accueil : hero, bandeau photo, thèmes, singulier, carrousel, formations, approche
  pages/Institut.jsx       L’Institut : hero, bandeau photo, histoire, faits et légendes, manifeste, valeurs
  pages/Approche.jsx       Notre approche : hero, bandeau photo, trois étapes, promesse, positionnement
  pages/Formations.jsx     Formations : hero, bandeau photo, champs d'intervention, attentes
  pages/Contact.jsx        formulaire (validation, Web3Forms ou mailto)
  pages/PlanDuSite.jsx     plan du site (deux listes : le site, informations légales)
  pages/MentionsLegales.jsx, Confidentialite.jsx, Cookies.jsx, Accessibilite.jsx
                           pages d'information sur le gabarit PageLegale (sommaire collant + rubriques) ;
                           la page cookies mémorise les choix dans localStorage (clé milon-cookies)
  pages/PageIntrouvable.jsx  page 404 (route *)
  components/Gabarit.jsx   gabarit commun : en-tête fixe, menu plein écran, contenu, pied de page
  components/PageLegale.jsx  gabarit des pages d'information (Rubrique, ACompleter)
  components/              Header, MenuMobile, Footer, BandeauContact, Logo, Fleche, LienSite, Hero,
                           BandeauThemes, Singulier, Carrousel, Formations, Approche (section de
                           l'accueil), BandeauPhoto, Photo, Etapes, Promesse, Positionnement,
                           Histoire, Faits, Manifeste, Valeurs, ChampsIntervention, Attentes ;
                           Diptyque.module.css = mise en page « titre, puis photo et texte »
  donnees/navigation.js    rubriques de la navigation, liens du pied de page et du plan du site
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
- Titres de hero (toutes les pages) à une taille commune calculée en JS : celle du hero le plus
  chargé (trois lignes et son paragraphe) qui tient dans l'écran, barre comprise, max 176 px ; sur
  l'accueil, L’Institut, Formations et Notre approche, le mot actif est carmin avec sa barre pleine
  (cliquable) ; sur les autres pages, un mot carmin souligné fixe.
- Cartes des formations (accueil) : fond noir au survol en 400 ms ; cartes des champs d'intervention
  (Formations) : carmin foncé au survol.
- Bandeau des thèmes piloté par le défilement (boucle sans couture, lignes alternées).
- Carrousel : glisser (résistance aux extrémités), défilement horizontal, flèches du clavier, clic sur
  une voisine, boutons et points.
- Liens internes avec défilement doux, décalage de la barre en remontant, focus sur la section.
- `prefers-reduced-motion` : pas de glissement des flèches, pas de défilement doux, bandeau immobile.

## Écarts par rapport à la référence

- Plusieurs emplacements de photo sont vides dans la maquette ou contiennent une image non exportable
  (bandeau de l'accueil, bandeau de Notre approche, bandeau de Formations, quatre vignettes des champs
  d'intervention) : ils affichent leur légende, comme dans la maquette. Pour les remplir, déposez
  l'image dans `public/assets/photos/` et renseignez `src` dans la page concernée.
- Les textes des pages légales sont des modèles, avec un avis « À faire valider » et des éléments
  entre crochets à compléter, comme dans la maquette.
- Les photos sont les originaux Pexels (mêmes clichés que la référence) recadrés en 1800 × 1200.

## Licences

Inter est distribuée sous licence SIL Open Font License 1.1. Les photographies proviennent de Pexels
(licence Pexels).
