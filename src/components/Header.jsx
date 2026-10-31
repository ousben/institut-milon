import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import LienSite from './LienSite.jsx';
import useScrollHeader from '../hooks/useScrollHeader.js';
import { RUBRIQUES } from '../donnees/navigation.js';
import styles from './Header.module.css';

/**
 * Barre de navigation fixe, commune aux pages. `current` souligne la rubrique active.
 * Sa hauteur est mesurée (ResizeObserver) et exposée dans --header-h sur <html>.
 */
export default function Header({ ref, burgerRef, menuOpen, onOpenMenu, current = 'none' }) {
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
        <LienSite to="/" aria-label="Institut Milon, accueil" className={styles.logoLink}>
          <Logo />
        </LienSite>
        <nav aria-label="Navigation principale" className={styles.nav}>
          {RUBRIQUES.map((r) => (
            <LienSite
              key={r.cle}
              to={r.to}
              aria-current={current === r.cle ? 'page' : undefined}
              className={`${styles.lien} ${current === r.cle ? styles.actif : ''}`.trim()}
            >
              {r.libelle}
            </LienSite>
          ))}
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
