import Photo from './Photo.jsx';
import d from './Diptyque.module.css';
import styles from './Histoire.module.css';

export default function Histoire() {
  return (
    <section id="histoire" className={`${d.section} ${styles.section}`}>
      <div className={d.titreZone}>
        <h2 className={`${d.titre} ${styles.titre}`}>Notre histoire</h2>
      </div>
      <div className={d.grille}>
        <div className={`${d.photo} ${styles.photo}`}>
          <Photo
            src="/assets/photos/formation-4.jpg"
            alt="Les tribunes vides d’un grand stade de football avant une rencontre."
            cadrage={{ x: -12.985 }}
          />
        </div>
        <div className={d.texteDroite}>
          <p className={styles.recit}>
            Il y a plus de 2&#8239;500 ans, à Crotone, vivait un lutteur nommé Milon. Six fois champion
            olympique. On raconte qu’il portait chaque jour un jeune veau, et que sa force grandissait avec
            lui.
          </p>
          <p className={styles.suite}>
            Mais Milon n’avançait pas seul. Il avait un maître et toute une ville autour de lui. À l’Institut
            Milon, nous formons aujourd’hui les adultes qui accompagnent les jeunes sportifs. Parce qu’un
            champion ne se fait jamais seul.
          </p>
        </div>
      </div>
    </section>
  );
}
