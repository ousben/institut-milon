import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Barre fixe : transparente en haut de page (défilement < 8 px), pleine dès qu'on défile.
 * Elle se masque quand on descend au-delà de sa hauteur et réapparaît dès qu'on remonte.
 */
export default function useScrollHeader(headerRef) {
  const [atTop, setAtTop] = useState(true);
  const [hidden, setHidden] = useState(false);
  const atTopRef = useRef(true);
  const hiddenRef = useRef(false);

  useEffect(() => {
    let lastY = Math.max(0, window.scrollY || 0);

    const onScroll = () => {
      const y = Math.max(0, window.scrollY || 0);
      const delta = y - lastY;
      const h = (headerRef.current && headerRef.current.offsetHeight) || 72;
      const top = y < 8;
      let hide = hiddenRef.current;
      if (top) hide = false;
      else if (delta > 4 && y > h) hide = true; // descente : la barre se retire
      else if (delta < -4) hide = false; // remontée : elle réapparaît
      if (Math.abs(delta) > 4 || top) lastY = y;
      if (top !== atTopRef.current) {
        atTopRef.current = top;
        setAtTop(top);
      }
      if (hide !== hiddenRef.current) {
        hiddenRef.current = hide;
        setHidden(hide);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [headerRef]);

  /** Réaffiche la barre (focus clavier dans la barre). */
  const reveal = useCallback(() => {
    if (!hiddenRef.current) return;
    hiddenRef.current = false;
    setHidden(false);
  }, []);

  return { atTop, hidden, reveal };
}
