import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import LienSite from './LienSite.jsx';
import BandeauContact from './BandeauContact.jsx';
import { INFOS_SITE } from '../donnees/navigation.js';
import styles from './Footer.module.css';

/** Pied de page commun, précédé du bandeau « Échanger avec l’Institut » (désactivable avec cta={false}). */
export default function Footer({ cta = true }) {
  return (
    <>
      {cta && <BandeauContact />}
      <footer className={styles.footer}>
        <div className={styles.inner}>
          <div className={styles.haut}>
            <LienSite to="/" aria-label="Institut Milon, accueil" className={styles.logoLink}>
              <Logo />
            </LienSite>
            <div className={styles.adresse}>
              <p className={styles.nom}>Institut Milon</p>
              <p>
                8 rue du Colisée
                <br />
                75008 Paris
              </p>
            </div>
            <div className={styles.liens}>
              <Link to="/contact" className={styles.lien}>
                Nous contacter
              </Link>
              <a href="#top" className={styles.lien}>
                Gérer mes cookies
              </a>
            </div>
          </div>
          <div className={styles.bas}>
            <span className={styles.copyright}>© 2026 Institut Milon</span>
            <nav aria-label="Informations du site" className={styles.infos}>
              {INFOS_SITE.map((i) => (
                <a key={i.libelle} href={i.to} className={styles.info}>
                  {i.libelle}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </footer>
    </>
  );
}
