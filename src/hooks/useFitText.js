import { useLayoutEffect } from 'react';

/**
 * Titre sur un nombre de lignes imposé : la taille de police est calculée pour que la ligne
 * la plus longue (éléments [data-line]) remplisse la largeur du titre, dans les limites données.
 * La valeur est posée dans la variable CSS --hero-fs de l'élément.
 */
export default function useFitText(
  ref,
  { min = 30, max = 176, viewportRatio = 0.24, fill = 0.985 } = {},
) {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return undefined;

    const fit = () => {
      const fs = parseFloat(getComputedStyle(el).fontSize);
      let maxW = 0;
      el.querySelectorAll('[data-line]').forEach((line) => {
        maxW = Math.max(maxW, line.getBoundingClientRect().width);
      });
      if (!fs || !maxW) return;
      const target = Math.max(
        min,
        Math.min((el.clientWidth * fill) / (maxW / fs), max, window.innerHeight * viewportRatio),
      );
      el.style.setProperty('--hero-fs', `${target.toFixed(1)}px`);
    };

    fit();
    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) fit();
      });
    }
    window.addEventListener('resize', fit);
    return () => {
      cancelled = true;
      window.removeEventListener('resize', fit);
    };
  }, [ref, min, max, viewportRatio, fill]);
}
