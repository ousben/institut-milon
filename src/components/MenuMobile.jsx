import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Fleche from './Fleche.jsx';
import LienSite from './LienSite.jsx';
import { RUBRIQUES } from '../donnees/navigation.js';
import styles from './MenuMobile.module.css';

/**
 * Menu plein écran : fermeture par la croix, Échap ou un clic sur un lien ; focus piégé.
 * Le verrou du défilement et le retour du focus au hamburger sont gérés par le gabarit de page.
 */
export default function MenuMobile({ open, onClose, closeRef, current = 'none' }) {
  const onKeyDown = (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      onClose();
      return;
    }
    if (e.key !== 'Tab') return;
    const items = e.currentTarget.querySelectorAll('a[href], button');
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <div
      id="milon-menu"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!open}
      onKeyDown={onKeyDown}
      className={styles.menu}
    >
      <div className={styles.barre}>
        <LienSite to="/" onClick={onClose} aria-label="Institut Milon, accueil" className={styles.logoLink}>
          <Logo />
        </LienSite>
        <div className={styles.actions}>
          <Link to="/contact" onClick={onClose} className={styles.cta}>
            Nous contacter
          </Link>
          <button ref={closeRef} type="button" aria-label="Fermer le menu" onClick={onClose} className={styles.fermer}>
            <span aria-hidden="true" />
            <span aria-hidden="true" />
          </button>
        </div>
      </div>
      <nav aria-label="Menu principal" className={styles.nav}>
        <div className={styles.liens}>
          {RUBRIQUES.map((r) => (
            <LienSite
              key={r.cle}
              to={r.to}
              onClick={onClose}
              aria-current={current === r.cle ? 'page' : undefined}
              className={`${styles.lien} ${current === r.cle ? styles.actif : ''}`.trim()}
            >
              {r.libelle}
              <Fleche className={styles.chevron}>›</Fleche>
            </LienSite>
          ))}
        </div>
      </nav>
    </div>
  );
}
