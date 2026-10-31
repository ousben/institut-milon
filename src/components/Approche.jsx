import { Link } from 'react-router-dom';
import Fleche from './Fleche.jsx';
import Photo from './Photo.jsx';
import d from './Diptyque.module.css';
import styles from './Approche.module.css';

/** Section « Comprendre. Mettre en pratique. Transmettre. » de l'accueil : photo et liens. */
export default function Approche() {
  return (
    <section id="approche" className={`${d.section} ${styles.section}`}>
      <div className={d.titreZone}>
        <h2 className={`${d.titre} ${styles.titre}`}>
          Comprendre.
          <br />
          Mettre en pratique.
          <br />
          Transmettre.
        </h2>
      </div>
      <div className={d.grille}>
        <div className={`${d.photo} ${styles.photo}`}>
          <Photo
            src="/assets/photos/formation-5.jpg"
            alt="Deux joueurs de football amateur courent vers le ballon."
            cadrage={{ x: -5.987 }}
          />
        </div>
        <div className={d.texteDroite}>
          <p className={styles.texte}>
            Une formation doit laisser des repères qui servent sur le terrain et au quotidien. Nous partons
            de situations concrètes, expliquons simplement les notions importantes, puis cherchons à rendre
            les connaissances applicables.
          </p>
          <div className={styles.liens}>
            <Link to="/approche" className={styles.lien}>
              Découvrir notre approche
              <Fleche />
            </Link>
            <Link to="/formations" className={styles.lien}>
              Explorer nos formations
              <Fleche />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
