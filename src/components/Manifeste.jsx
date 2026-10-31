import Photo from './Photo.jsx';
import d from './Diptyque.module.css';
import styles from './Manifeste.module.css';

export default function Manifeste() {
  return (
    <section id="manifeste" className={`${d.section} ${styles.section}`}>
      <div className={d.titreZone}>
        <h2 className={`${d.titre} ${styles.titre}`}>Le sport fait grandir. Mais personne ne grandit seul.</h2>
      </div>
      <div className={d.grille}>
        <div className={`${d.texteGauche} ${styles.texte}`}>
          <p>
            Derrière chaque jeune sportif, il y a des parents qui soutiennent, des entraîneurs qui guident,
            des clubs qui accueillent et des adultes qui transmettent.
          </p>
          <p>
            Ces personnes ont besoin de repères. De mots simples. De connaissances concrètes. Nous croyons au
            travail patient, aux progrès du quotidien et à la responsabilité de transmettre ce que l’on
            apprend.
          </p>
          <p className={styles.fort}>
            C’est pourquoi l’Institut Milon forme celles et ceux qui accompagnent. Pour mieux comprendre.
            Pour mieux agir. Pour grandir ensemble.
          </p>
        </div>
        <div className={`${d.photo} ${styles.photo}`}>
          <Photo
            src="/assets/photos/formation-3.jpg"
            alt="Une équipe de jeunes footballeurs pose, souriante, sur le terrain le soir."
          />
        </div>
      </div>
    </section>
  );
}
