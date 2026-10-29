import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Fleche from './Fleche.jsx';
import useFitText from '../hooks/useFitText.js';
import styles from './Hero.module.css';

function Mot({ actif, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={actif}
      onClick={onClick}
      className={`${styles.mot} ${actif ? styles.actif : ''}`.trim()}
    >
      {children}
      <span aria-hidden="true" className={styles.barre}>
        <span className={styles.remplissage} />
      </span>
    </button>
  );
}

/** Hero : titre sur deux lignes dont la taille remplit la largeur ; un mot mis en avant au clic. */
export default function Hero() {
  const titreRef = useRef(null);
  const [actif, setActif] = useState(0);
  useFitText(titreRef);

  return (
    <section className={styles.hero}>
      <div className={styles.titreZone}>
        <h1 ref={titreRef} className={styles.titre}>
          <span data-line="1" className={styles.ligne}>
            Un{' '}
            <Mot actif={actif === 0} onClick={() => setActif(0)}>
              champion
            </Mot>
            {' '}ne se
          </span>
          <span data-line="2" className={styles.ligne}>
            fait{' '}
            <Mot actif={actif === 1} onClick={() => setActif(1)}>
              jamais seul
            </Mot>
            .
          </span>
        </h1>
      </div>
      <div className={styles.bas}>
        <p className={styles.texte}>
          Derrière chaque jeune sportif, il y a des adultes qui le font grandir. Nous les formons pour
          mieux comprendre, mieux accompagner et transmettre.
        </p>
        <div className={styles.liens}>
          <a href="#singulier" className={styles.lien}>
            Découvrir l’Institut <Fleche />
          </a>
          <Link to="/contact" className={styles.lien}>
            Échanger avec nous <Fleche />
          </Link>
        </div>
      </div>
    </section>
  );
}
