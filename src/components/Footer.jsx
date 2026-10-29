import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import styles from './Footer.module.css';

const MENTIONS = ['Mentions légales', 'Confidentialité', 'Cookies', 'Accessibilité'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.haut}>
          <a href="#top" aria-label="Institut Milon, retour en haut de page" className={styles.logoLink}>
            <Logo />
          </a>
          <div className={styles.colonne}>
            <Link to="/contact" className={styles.contact}>
              Nous contacter
            </Link>
          </div>
        </div>
        <div className={styles.bas}>
          <span>© 2026 Institut Milon</span>
          <span className={styles.mentions}>
            {MENTIONS.map((m) => (
              <a key={m} href="#top" className={styles.mention}>
                {m}
              </a>
            ))}
          </span>
        </div>
      </div>
    </footer>
  );
}
