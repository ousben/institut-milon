import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import Fleche from './Fleche.jsx';
import styles from './MenuMobile.module.css';

const LIENS = [
  ['#singulier', 'L’Institut'],
  ['#approche', 'Notre approche'],
  ['#formations', 'Formations'],
];

/**
 * Menu plein écran : fermeture par la croix, Échap ou un clic sur un lien ; focus piégé.
 * Le verrou du défilement et le retour du focus au hamburger sont gérés par la page Accueil.
 */
export default function MenuMobile({ open, onClose, closeRef }) {
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
        <a href="#top" onClick={onClose} aria-label="Institut Milon, accueil" className={styles.logoLink}>
          <Logo />
        </a>
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
          {LIENS.map(([href, libelle]) => (
            <a key={href} href={href} onClick={onClose} className={styles.lien}>
              {libelle}
              <Fleche className={styles.chevron}>›</Fleche>
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
}
