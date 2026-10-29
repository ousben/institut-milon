import { Link } from 'react-router-dom';
import Fleche from './Fleche.jsx';
import styles from './Formations.module.css';

const PUBLICS = [
  { titre: 'Parents et familles', texte: 'Comprendre le parcours sportif et éducatif, agir sans pression inutile.' },
  { titre: 'Éducateurs et entraîneurs', texte: 'Améliorer l’accompagnement et la communication avec les jeunes.' },
  { titre: 'Clubs et associations', texte: 'Structurer les pratiques et les compétences de toute une équipe.' },
  { titre: 'Collectivités et acteurs du sport', texte: 'Faire monter en compétence les intervenants d’un territoire.' },
];

export default function Formations() {
  return (
    <section id="formations" className={styles.section}>
      <h2 className={styles.titre}>Des formations pour chaque adulte qui accompagne</h2>
      <div className={styles.grille}>
        {PUBLICS.map((p) => (
          <Link key={p.titre} to="/contact" className={styles.carte}>
            <span className={styles.carteTitre}>{p.titre}</span>
            <span className={styles.carteTexte}>{p.texte}</span>
            <Fleche className={styles.carteFleche} />
          </Link>
        ))}
      </div>
    </section>
  );
}
