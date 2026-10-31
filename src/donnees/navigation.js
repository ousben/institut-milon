/**
 * Rubriques de la navigation principale. Les pages « L’Institut » et « Formations » n'existent pas
 * encore dans le site : en attendant, leurs liens mènent aux sections correspondantes de l'accueil.
 */
export const RUBRIQUES = [
  { cle: 'institut', libelle: 'L’Institut', to: '/#singulier' },
  { cle: 'approche', libelle: 'Notre approche', to: '/approche' },
  { cle: 'formations', libelle: 'Formations', to: '/#formations' },
];

/** Liens d'information du pied de page (pages à venir : lien provisoire vers le haut de page). */
export const INFOS_SITE = [
  { libelle: 'Plan du site', to: '#top' },
  { libelle: 'Mentions légales', to: '#top' },
  { libelle: 'Confidentialité', to: '#top' },
  { libelle: 'Cookies', to: '#top' },
  { libelle: 'Accessibilité', to: '#top' },
];
