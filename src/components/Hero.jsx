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

/**
 * Hero commun aux pages : titre sur des lignes imposées dont la taille remplit la largeur
 * (useFitText), mots mis en avant au clic (un seul actif), paragraphe et liens en bas.
 * `lignes` : tableau de lignes, chacune étant une suite de textes et de mots `{ mot, index }`.
 */
export default function Hero({ lignes, actifInitial = 0, paragraphe, liens = [] }) {
  const titreRef = useRef(null);
  const [actif, setActif] = useState(actifInitial);
  useFitText(titreRef);

  return (
    <section className={styles.hero}>
      <div className={styles.titreZone}>
        <h1 ref={titreRef} className={styles.titre}>
          {lignes.map((segments, i) => (
            <span key={i} data-line={i + 1} className={styles.ligne}>
              {segments.map((segment, j) =>
                typeof segment === 'string' ? (
                  segment
                ) : (
                  <Mot key={j} actif={actif === segment.index} onClick={() => setActif(segment.index)}>
                    {segment.mot}
                  </Mot>
                ),
              )}
            </span>
          ))}
        </h1>
      </div>
      <div className={styles.bas}>
        <p className={styles.texte}>{paragraphe}</p>
        <div className={styles.liens}>
          {liens.map((l) =>
            l.href ? (
              <a key={l.libelle} href={l.href} className={styles.lien}>
                {l.libelle} <Fleche />
              </a>
            ) : (
              <Link key={l.libelle} to={l.to} className={styles.lien}>
                {l.libelle} <Fleche />
              </Link>
            ),
          )}
        </div>
      </div>
    </section>
  );
}
