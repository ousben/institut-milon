import { useLayoutEffect } from 'react';

/*
 * Taille commune à tous les titres de hero du site : celle du hero le plus chargé
 * (« Comprendre. / Mettre en pratique. / Transmettre. », trois lignes et son paragraphe),
 * qui doit tenir dans l'écran barre comprise. Le même calcul sur chaque page donne la même
 * taille partout. Une sonde invisible mesure les lignes de référence et la hauteur du bloc
 * paragraphe + liens à la largeur du titre.
 */
const LIGNES_REFERENCE = [
  'Un champion ne se',
  'fait jamais seul.',
  'La force se transmet.',
  'Comprendre.',
  'Mettre en pratique.',
  'Transmettre.',
  'Former ceux',
  'qui accompagnent.',
];
const PARAGRAPHE_REFERENCE =
  'Une formation doit laisser des repères qui servent sur le terrain et au quotidien. Nous partons de situations concrètes, expliquons simplement les notions importantes, puis cherchons à rendre les connaissances applicables aux besoins des participants.';
const LIENS_REFERENCE = ['Voir les trois étapes →', 'Échanger avec nous →'];

function creerSonde() {
  const sonde = document.createElement('div');
  sonde.setAttribute('aria-hidden', 'true');
  sonde.style.cssText = 'position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none';
  sonde.innerHTML =
    '<div data-w style="font-size:100px;font-weight:800;line-height:1.18;letter-spacing:-0.035em;white-space:nowrap">' +
    LIGNES_REFERENCE.map((l) => `<span style="display:block;width:max-content">${l}</span>`).join('') +
    '</div>' +
    '<div data-row style="display:flex;flex-wrap:wrap;gap:16px 64px;align-items:flex-end;justify-content:space-between">' +
    `<p style="margin:0;max-width:46ch;font-size:clamp(17px, 0.9rem + 0.4vw, 20px);line-height:1.5;text-wrap:pretty">${PARAGRAPHE_REFERENCE}</p>` +
    '<div style="display:flex;flex-wrap:wrap;gap:12px 32px">' +
    LIENS_REFERENCE.map((l) => `<span style="font-size:17px;font-weight:700;padding:10px 0">${l}</span>`).join('') +
    '</div></div>';
  document.body.appendChild(sonde);
  return sonde;
}

/**
 * Pose la variable CSS --hero-fs sur le titre (h1) : max 176 px, min 24 px, limitée par la largeur
 * du titre, par la hauteur d'écran disponible et par la ligne la plus longue du titre lui-même.
 */
export default function useFitText(ref) {
  useLayoutEffect(() => {
    const h1 = ref.current;
    if (!h1) return undefined;
    const sonde = creerSonde();

    const fit = () => {
      const box = h1.parentElement;
      const section = h1.closest('section');
      const width = h1.clientWidth;
      if (!box || !section || !width) return;
      const row = sonde.querySelector('[data-row]');
      row.style.width = `${width}px`;
      let reference = 0;
      sonde.querySelectorAll('[data-w] span').forEach((s) => {
        reference = Math.max(reference, s.getBoundingClientRect().width);
      });
      if (!reference) return;
      const parLargeur = (width * 0.985) / (reference / 100);
      const vh = Math.min(window.innerHeight, document.documentElement.clientHeight || window.innerHeight);
      const header = document.querySelector('header');
      const s = getComputedStyle(section);
      const b = getComputedStyle(box);
      const occupe =
        (header ? header.offsetHeight : 72) +
        parseFloat(s.paddingTop) +
        parseFloat(s.paddingBottom) +
        parseFloat(b.paddingTop) +
        parseFloat(b.paddingBottom) +
        row.offsetHeight +
        vh * 0.04;
      const parHauteur = (vh - occupe) / (3 * 1.18 + 0.1);
      // Garde-fou : la ligne la plus longue de ce titre doit toujours tenir dans la largeur
      const fs = parseFloat(getComputedStyle(h1).fontSize);
      let propre = 0;
      h1.querySelectorAll('[data-line]').forEach((l) => {
        propre = Math.max(propre, l.getBoundingClientRect().width);
      });
      const parLigne = fs && propre ? (width * 0.985) / (propre / fs) : Infinity;
      h1.style.setProperty(
        '--hero-fs',
        `${Math.max(24, Math.min(176, parLargeur, parHauteur, parLigne)).toFixed(1)}px`,
      );
    };

    fit();
    let annule = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!annule) fit();
      });
    }
    const tardif = setTimeout(fit, 300);
    window.addEventListener('resize', fit);
    return () => {
      annule = true;
      clearTimeout(tardif);
      window.removeEventListener('resize', fit);
      sonde.remove();
    };
  }, [ref]);
}
