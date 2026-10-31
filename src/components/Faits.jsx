import styles from './Faits.module.css';

const SOURCES = [
  'Milon est un lutteur grec de Crotone, multiple champion des Jeux olympiques.',
  'Le récit souligne son lien avec Pythagore.',
  'Un jeune lutteur de sa ville finit par le battre.',
];

const LEGENDE = [
  'Il aurait porté quotidiennement un veau jusqu’à ce que l’animal devienne adulte.',
  'Il aurait retenu un pilier pour aider son maître et ses proches.',
  'Le récit de sa mort dans un tronc fendu appartient à la tradition légendaire.',
];

export default function Faits() {
  return (
    <section id="faits" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>Faits et légendes</h2>
        <div className={styles.grille}>
          <div>
            <h3 className={styles.sousTitre}>Ce que rapportent les sources</h3>
            <ul className={styles.liste}>
              {SOURCES.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className={`${styles.sousTitre} ${styles.legende}`}>Selon la légende</h3>
            <ul className={styles.liste}>
              {LEGENDE.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
