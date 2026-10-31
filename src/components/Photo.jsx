import styles from './Photo.module.css';

/**
 * Emplacement de photo : l'image remplit son conteneur (object-fit: cover), avec un cadrage
 * facultatif `{ s, x, y }` (échelle et décalage en % du cadre, comme dans la maquette).
 * Sans `src`, l'emplacement reste visible avec sa légende, comme dans la maquette.
 */
export default function Photo({ src, alt = '', cadrage }) {
  if (!src) {
    return (
      <div className={styles.vide}>
        <span className={styles.legende}>{alt}</span>
      </div>
    );
  }
  const { s = 1, x = 0, y = 0 } = cadrage || {};
  const style = s !== 1 || x || y ? { transform: `translate(${x}%, ${y}%) scale(${s})` } : undefined;
  return <img src={src} alt={alt} loading="lazy" decoding="async" className={styles.image} style={style} />;
}
