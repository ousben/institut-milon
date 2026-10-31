import Photo from './Photo.jsx';
import styles from './Etapes.module.css';

const ETAPES = [
  {
    numero: '01',
    titre: 'Écouter le besoin',
    src: '/assets/photos/formation-3.jpg',
    alt: 'Entretien avec les responsables d’un club',
  },
  {
    numero: '02',
    titre: 'Clarifier les connaissances',
    src: '/assets/photos/formation-2.jpg',
    alt: 'Atelier où une notion est expliquée simplement',
  },
  {
    numero: '03',
    titre: 'Favoriser la mise en pratique',
    src: '/assets/photos/formation-5.jpg',
    alt: 'Mise en pratique sur le terrain avec des jeunes',
  },
];

export default function Etapes() {
  return (
    <section id="etapes" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>Trois étapes</h2>
        <ol className={styles.liste}>
          {ETAPES.map((e) => (
            <li key={e.numero} className={styles.etape}>
              <span className={styles.texte}>
                <span aria-hidden="true" className={styles.numero}>
                  {e.numero}
                </span>
                <span className={styles.intitule}>{e.titre}</span>
              </span>
              <span className={styles.photo}>
                <Photo src={e.src} alt={e.alt} />
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
