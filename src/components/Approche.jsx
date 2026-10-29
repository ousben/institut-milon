import Fleche from './Fleche.jsx';
import styles from './Approche.module.css';

export default function Approche() {
  return (
    <section id="approche" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>
          Comprendre.
          <br />
          Mettre en pratique.
          <br />
          Transmettre.
        </h2>
        <div className={styles.intro}>
          <div className={styles.introInner}>
            <p className={styles.texte}>
              Une formation doit laisser des repères qui servent sur le terrain et au quotidien. Nous
              partons de situations concrètes, expliquons simplement les notions importantes, puis
              cherchons à rendre les connaissances applicables.
            </p>
          </div>
        </div>
        <div className={styles.liens}>
          <a href="#approche" className={styles.lien}>
            Découvrir notre approche
            <Fleche />
          </a>
          <a href="#formations" className={styles.lien}>
            Explorer nos formations
            <Fleche />
          </a>
        </div>
      </div>
    </section>
  );
}
