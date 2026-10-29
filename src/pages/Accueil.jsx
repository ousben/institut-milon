import { useEffect, useRef, useState } from 'react';
import Header from '../components/Header.jsx';
import MenuMobile from '../components/MenuMobile.jsx';
import Hero from '../components/Hero.jsx';
import BandeauThemes from '../components/BandeauThemes.jsx';
import Singulier from '../components/Singulier.jsx';
import Carrousel from '../components/Carrousel.jsx';
import Formations from '../components/Formations.jsx';
import Approche from '../components/Approche.jsx';
import BandeauContact from '../components/BandeauContact.jsx';
import Footer from '../components/Footer.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';
import useSmoothAnchors from '../hooks/useSmoothAnchors.js';
import styles from './Accueil.module.css';

const TITRE = 'Institut Milon | Former ceux qui accompagnent';

export default function Accueil() {
  const headerRef = useRef(null);
  const burgerRef = useRef(null);
  const closeRef = useRef(null);
  const aEteOuvert = useRef(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduced = useReducedMotion();

  useSmoothAnchors(headerRef, reduced);

  useEffect(() => {
    document.title = TITRE;
  }, []);

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
      <Header ref={headerRef} burgerRef={burgerRef} menuOpen={menuOpen} onOpenMenu={() => setMenuOpen(true)} />
      <MenuMobile open={menuOpen} onClose={() => setMenuOpen(false)} closeRef={closeRef} />
      <main id="contenu" tabIndex={-1} className={styles.main}>
        <Hero />
        <BandeauThemes reduced={reduced} />
        <Singulier />
        <Carrousel />
        <Formations />
        <Approche />
        <BandeauContact />
      </main>
      <Footer />
    </>
  );
}
