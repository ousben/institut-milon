import Fleche from './Fleche.jsx';
import styles from './Singulier.module.css';

const VALEURS = [
  { article: 'La ', mot: 'patience', texte: 'La progression quotidienne est plus forte que l’éclat d’un seul jour.' },
  { article: 'L’', mot: 'entourage', texte: 'Un jeune ne se construit pas seul ; adultes et communauté ont un rôle.' },
  { article: 'La ', mot: 'transmission', texte: 'L’expérience est utile si elle passe à ceux qui viennent après.' },
  { article: 'La ', mot: 'clarté', texte: 'Expliquer avec des phrases courtes et un exemple visible.' },
  { article: 'La ', mot: 'franchise', texte: 'Dire ce qui est possible, difficile, inconnu ou encore non validé.' },
];

export default function Singulier() {
  return (
    <section id="singulier" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>Qu’est-ce qui rend l’Institut Milon singulier ?</h2>
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.texte}>
              Nous croyons que les jeunes sportifs ont besoin d’un environnement qui comprend leur réalité.
              Nous aidons les parents, les éducateurs, les clubs et les structures sportives à développer
              leurs connaissances et leurs pratiques d’accompagnement.
            </p>
            <a href="#approche" className={styles.lien}>
              En savoir plus sur l’Institut <Fleche />
            </a>
          </div>
        </div>
        <div className={styles.valeurs}>
          {VALEURS.map((v) => (
            <div key={v.mot} className={styles.valeur}>
              <h3 className={styles.valeurTitre}>
                <span className={styles.article}>{v.article}</span>
                {v.mot}.
              </h3>
              <p className={styles.valeurTexte}>{v.texte}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
