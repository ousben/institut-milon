import { useEffect } from 'react';

/**
 * Liens internes (#…) : défilement doux vers la section. En remontant, la cible est décalée
 * de la hauteur de la barre fixe ; le focus est ensuite placé sur la section.
 * « #top » ramène en haut de page. Les liens portant data-no-smooth gardent le comportement natif.
 */
export default function useSmoothAnchors(headerRef, reduced = false) {
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target && e.target.closest ? e.target.closest('a[href^="#"]') : null;
      if (!a || a.hasAttribute('data-no-smooth')) return;
      const id = a.getAttribute('href').slice(1);
      const target = id === 'top' || !id ? document.body : document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      const y = target === document.body ? 0 : target.getBoundingClientRect().top + window.scrollY;
      const header = headerRef && headerRef.current;
      const goingUp = y < window.scrollY;
      const offset = goingUp && header ? header.offsetHeight : 0;
      window.scrollTo({ top: Math.max(0, y - offset), behavior: reduced ? 'auto' : 'smooth' });
      if (window.history.replaceState) window.history.replaceState(null, '', `#${id || 'top'}`);
      if (target !== document.body) {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        setTimeout(() => target.focus({ preventScroll: true }), reduced ? 0 : 500);
      }
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [headerRef, reduced]);
}
