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
 * Hero commun aux pages : titre sur des lignes imposées dont la taille est commune à tout le site
 * (useFitText). Chaque ligne est une suite de textes, de mots cliquables `{ mot, index }` (un seul
 * actif, carmin avec barre pleine) ou d'un mot souligné fixe `{ fort }`.
 * En bas : soit `paragraphe` + `liens` sur une ligne, soit un paragraphe `intro` décalé à droite.
 */
export default function Hero({ lignes, actifInitial = 0, paragraphe, liens = [], intro }) {
  const titreRef = useRef(null);
  const [actif, setActif] = useState(actifInitial);
  useFitText(titreRef);

  const rendre = (segment, j) => {
    if (typeof segment === 'string') return segment;
    if (segment.fort) {
      return (
        <span key={j} className={styles.fort}>
          {segment.fort}
          <span aria-hidden="true" className={styles.barreFixe} />
        </span>
      );
    }
    return (
      <Mot key={j} actif={actif === segment.index} onClick={() => setActif(segment.index)}>
        {segment.mot}
      </Mot>
    );
  };

  return (
    <section className={styles.hero}>
      <div className={styles.titreZone}>
        <h1 ref={titreRef} className={styles.titre}>
          {lignes.map((segments, i) => (
            <span key={i} data-line={i + 1} className={styles.ligne}>
              {segments.map(rendre)}
            </span>
          ))}
        </h1>
      </div>
      {intro ? (
        <div className={styles.intro}>
          <p className={styles.introTexte}>{intro}</p>
        </div>
      ) : (
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
      )}
    </section>
  );
}
