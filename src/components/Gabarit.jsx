import { useEffect, useRef, useState } from 'react';
import Header from './Header.jsx';
import MenuMobile from './MenuMobile.jsx';
import Footer from './Footer.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useSmoothAnchors from '../hooks/useSmoothAnchors.js';
import styles from './Gabarit.module.css';

/**
 * Gabarit des pages à barre fixe : en-tête (rubrique active `current`), menu plein écran,
 * contenu principal et pied de page. Gère le titre du document, le défilement doux des ancres,
 * le verrou du défilement et le focus pendant l'ouverture du menu.
 */
export default function Gabarit({ current = 'none', titre, cta = true, children }) {
  const headerRef = useRef(null);
  const burgerRef = useRef(null);
  const closeRef = useRef(null);
  const aEteOuvert = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useSmoothAnchors(headerRef, reduced);

  useEffect(() => {
    document.title = titre;
  }, [titre]);

  // Le menu se referme si la fenêtre repasse en mode bureau
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1100px)');
    const onChange = () => {
      if (mq.matches) setMenuOpen(false);
    };
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  // Menu ouvert : défilement de la page bloqué, focus sur la croix ; fermé : focus rendu au hamburger
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    let timer;
    if (menuOpen) {
      aEteOuvert.current = true;
      timer = setTimeout(() => closeRef.current && closeRef.current.focus(), 30);
    } else if (aEteOuvert.current) {
      aEteOuvert.current = false;
      timer = setTimeout(() => burgerRef.current && burgerRef.current.focus(), 30);
    }
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <Header
        ref={headerRef}
        burgerRef={burgerRef}
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
        current={current}
      />
      <MenuMobile open={menuOpen} onClose={() => setMenuOpen(false)} closeRef={closeRef} current={current} />
      <main id="contenu" tabIndex={-1} className={styles.main}>
        {children}
      </main>
      <Footer cta={cta} />
    </>
  );
}
