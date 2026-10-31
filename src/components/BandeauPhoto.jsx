import Photo from './Photo.jsx';
import styles from './BandeauPhoto.module.css';

/** Photographie pleine largeur sous le hero. Sans `src`, l'emplacement reste visible avec sa légende. */
export default function BandeauPhoto({ src, alt, cadrage }) {
  return (
    <div className={styles.cadre}>
      <div className={styles.photo}>
        <Photo src={src} alt={alt} cadrage={cadrage} />
      </div>
    </div>
  );
}
