import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import useScrollHeader from '../hooks/useScrollHeader.js';
import styles from './Header.module.css';

/**
 * Barre de navigation fixe de l'accueil. Sa hauteur est mesurée (ResizeObserver) et exposée
 * dans --header-h sur <html> ; le <main> s'en sert pour son padding-top.
 */
export default function Header({ ref, burgerRef, menuOpen, onOpenMenu }) {
  const { atTop, hidden, reveal } = useScrollHeader(ref);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const root = document.documentElement;
    const measure = () => {
      root.style.setProperty('--header-h', `${Math.round(el.getBoundingClientRect().height)}px`);
    };
    measure();
    let observer;
    if (typeof ResizeObserver !== 'undefined') {
      observer = new ResizeObserver(measure);
      observer.observe(el);
    }
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('resize', measure);
      if (observer) observer.disconnect();
      root.style.removeProperty('--header-h');
    };
  }, [ref]);

  const classes = [styles.header, atTop ? '' : styles.plein, hidden ? styles.masque : '']
    .filter(Boolean)
    .join(' ');

  return (
    <header ref={ref} className={classes} onFocus={reveal}>
      <div className={styles.inner}>
        <a href="#top" aria-label="Institut Milon, accueil" className={styles.logoLink}>
          <Logo />
        </a>
        <nav aria-label="Navigation principale" className={styles.nav}>
          <a href="#singulier" className={styles.lien}>
            L’Institut
          </a>
          <a href="#approche" className={styles.lien}>
            Notre approche
          </a>
          <a href="#formations" className={styles.lien}>
            Formations
          </a>
        </nav>
        <div className={styles.actions}>
          <Link to="/contact" className={styles.cta}>
            Nous contacter
          </Link>
          <button
            ref={burgerRef}
            type="button"
            aria-label="Ouvrir le menu"
            aria-expanded={menuOpen}
            aria-controls="milon-menu"
            onClick={onOpenMenu}
            className={styles.burger}
          >
            <span aria-hidden="true" />
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
    </header>
  );
}
