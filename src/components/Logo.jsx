import styles from './Logo.module.css';

/**
 * Logo Institut Milon : emblème coloré par currentColor + lockup. Purement décoratif ;
 * le lien qui l'entoure porte le libellé accessible.
 */
export default function Logo({ className = '' }) {
  return (
    <span aria-hidden="true" className={`${styles.logo} ${className}`.trim()}>
      <span className={styles.embleme} />
      <span className={styles.lockup}>
        <span className={styles.institut}>INSTITUT</span>
        <span className={styles.milon}>MILON</span>
      </span>
    </span>
  );
}
