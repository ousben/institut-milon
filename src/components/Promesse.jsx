import styles from './Promesse.module.css';

export default function Promesse() {
  return (
    <section id="promesse" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>Des contenus compréhensibles, applicables et honnêtes.</h2>
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.texte}>
              Nous préférons dire ce qui est possible, ce qui est difficile et ce qui reste à valider. Nos
              contenus donnent aux adultes qui accompagnent les jeunes sportifs des repères utiles sur le
              terrain et au quotidien.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
