import { Link } from 'react-router-dom';
import Fleche from './Fleche.jsx';
import styles from './BandeauContact.module.css';

export default function BandeauContact() {
  return (
    <Link id="contact" to="/contact" className={styles.bandeau}>
      <span className={styles.inner}>
        <span className={styles.titre}>Échanger avec l’Institut</span>
        <span className={styles.texte}>Parce qu’un jeune ne grandit jamais seul.</span>
        <Fleche className={styles.fleche} />
      </span>
    </Link>
  );
}
