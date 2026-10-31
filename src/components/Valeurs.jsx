import styles from './Valeurs.module.css';

const VALEURS = [
  { mot: 'patience', texte: 'Ne pas vendre de transformation instantanée ; montrer le progrès dans la durée.' },
  { mot: 'transmission', texte: 'Toujours relier savoir et accompagnement : ce que l’on apprend sert à d’autres.' },
  { mot: 'clarté', texte: 'Expliquer avec des phrases courtes et un exemple visible.' },
  { mot: 'franchise', texte: 'Dire ce qui est possible, difficile, inconnu ou encore non validé.' },
];

export default function Valeurs() {
  return (
    <section id="valeurs" className={styles.section}>
      <h2 className={styles.titre}>Nos quatre valeurs</h2>
      <div className={styles.liste}>
        {VALEURS.map((v) => (
          <div key={v.mot} className={styles.valeur}>
            <h3 className={styles.valeurTitre}>
              <span className={styles.article}>La </span>
              {v.mot}.
            </h3>
            <p className={styles.valeurTexte}>{v.texte}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
