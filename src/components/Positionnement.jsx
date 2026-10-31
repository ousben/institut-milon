import Fleche from './Fleche.jsx';
import LienSite from './LienSite.jsx';
import styles from './Positionnement.module.css';

export default function Positionnement() {
  return (
    <section id="positionnement" className={styles.section}>
      <div className={styles.grille}>
        <div className={styles.bloc}>
          <h2 className={styles.titre}>Ce que nous sommes</h2>
          <p className={styles.texte}>
            Une institution contemporaine qui aide les adultes à progresser dans leur manière de transmettre.
          </p>
        </div>
        <div className={styles.bloc}>
          <h2 className={styles.titre}>Ce que nous ne sommes pas</h2>
          <p className={styles.texte}>
            Une marque de coaching miracle, un club sportif, une académie de performance physique ou un
            organisme qui promet de fabriquer des professionnels.
          </p>
        </div>
      </div>
      <div className={styles.liens}>
        <LienSite to="/#singulier" className={styles.lien}>
          Découvrir l’Institut
          <Fleche />
        </LienSite>
        <LienSite to="/#formations" className={styles.lien}>
          Explorer nos formations
          <Fleche />
        </LienSite>
      </div>
    </section>
  );
}
