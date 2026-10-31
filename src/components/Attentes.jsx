import { Link } from 'react-router-dom';
import Fleche from './Fleche.jsx';
import styles from './Attentes.module.css';

export default function Attentes() {
  return (
    <section id="attentes" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>Que peut-on attendre d’une formation&#8239;?</h2>
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.texte}>
              Des contenus compréhensibles, applicables et honnêtes. Sans garantie de réussite professionnelle.
            </p>
            <Link to="/approche" className={styles.lien}>
              Découvrir notre approche <Fleche />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
