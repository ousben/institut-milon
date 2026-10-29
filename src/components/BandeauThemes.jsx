import { useRef } from 'react';
import useScrollTicker from '../hooks/useScrollTicker.js';
import styles from './BandeauThemes.module.css';

const LIGNES = [
  ['Rôle des parents', 'Progression', 'Communication', 'Éducation sportive'],
  ['Transmission', 'Vie de club', 'Accompagnement', 'Formation des éducateurs'],
  ['Patience', 'Clarté', 'Franchise', 'Entourage'],
  ['Repères', 'Écoute', 'Confiance', 'Pédagogie'],
  ['Grandir', 'Accompagner', 'Transmettre', 'Comprendre'],
];

const LABEL =
  'Nos thèmes : rôle des parents, progression, communication, éducation sportive, transmission, vie de club, accompagnement, formation des éducateurs, patience, clarté, franchise, entourage, repères, écoute, confiance, pédagogie, grandir, accompagner, transmettre, comprendre';

/** Bandeau des thèmes : cinq lignes qui ne bougent qu'au défilement (items triplés, boucle sans couture). */
export default function BandeauThemes({ reduced = false }) {
  const ref = useRef(null);
  useScrollTicker(ref, { speed: 0.6, reduced });

  return (
    <section ref={ref} aria-label={LABEL} className={styles.bandeau}>
      {LIGNES.map((ligne, i) => (
        <div key={i} data-ticker-row={i} aria-hidden="true" className={styles.ligne}>
          {[...ligne, ...ligne, ...ligne].map((mot, j) => (
            <span key={j} className={styles.mot}>
              {mot}
              <span className={styles.oblique}>/</span>
            </span>
          ))}
        </div>
      ))}
    </section>
  );
}
