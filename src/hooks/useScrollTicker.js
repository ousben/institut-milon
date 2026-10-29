import { useEffect } from 'react';

/**
 * Bandeau de lignes défilantes pilotées par le défilement de la page.
 * Chaque ligne ([data-ticker-row]) contient trois fois le même jeu de mots : la position
 * est calculée modulo la largeur d'un jeu, pour une boucle sans couture. Une ligne sur deux
 * avance dans le sens inverse. Avec « mouvement réduit », le bandeau reste immobile.
 */
export default function useScrollTicker(sectionRef, { speed = 0.6, reduced = false } = {}) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;
    const rows = Array.from(section.querySelectorAll('[data-ticker-row]'));
    let sets = [];
    let raf = 0;

    const update = () => {
      raf = 0;
      if (!sets.length) return;
      const progress = reduced ? 0 : (window.innerHeight - section.getBoundingClientRect().top) * speed;
      rows.forEach((row, i) => {
        const S = sets[i];
        if (!S) return;
        const offset = i * 0.37 * S;
        const m = (((progress + offset) % S) + S) % S;
        const x = i % 2 === 0 ? -m : m - S;
        row.style.transform = `translate3d(${x.toFixed(1)}px, 0, 0)`;
      });
    };

    const measure = () => {
      sets = rows.map((row) => row.scrollWidth / 3);
      update();
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    measure();
    let cancelled = false;
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (!cancelled) measure();
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      cancelled = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [sectionRef, speed, reduced]);
}
