import Gabarit from './Gabarit.jsx';
import Hero from './Hero.jsx';
import styles from './PageLegale.module.css';

/**
 * Gabarit des pages d'information (mentions légales, confidentialité, cookies, accessibilité) :
 * hero, puis sommaire (collant à partir de 1024 px) à côté du texte, précédé de l'avis « À faire valider ».
 */
export default function PageLegale({ titre, lignes, intro, sommaire, children }) {
  return (
    <Gabarit current="none" titre={`${titre} | Institut Milon`}>
      <Hero lignes={lignes} intro={intro} />
      <section className={styles.contenu}>
        <div className={styles.colonnes}>
          <nav aria-label="Sommaire" className={styles.sommaire}>
            <p className={styles.sommaireTitre}>Sommaire</p>
            <ol className={styles.sommaireListe}>
              {sommaire.map((s) => (
                <li key={s.id} className={styles.sommaireItem}>
                  <a href={`#${s.id}`} className={styles.sommaireLien}>
                    {s.libelle}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className={styles.texte}>
            <p className={styles.avis}>
              <strong className={styles.avisFort}>À faire valider.</strong> Ce texte est un modèle à faire
              relire avant publication. Les éléments surlignés entre crochets sont à compléter.
            </p>
            {children}
          </div>
        </div>
      </section>
    </Gabarit>
  );
}

/** Une rubrique du texte : titre et corps, cible du sommaire. */
export function Rubrique({ id, titre, children }) {
  return (
    <section id={id} className={styles.rubrique}>
      <h2 className={styles.rubriqueTitre}>{titre}</h2>
      <div className={styles.corps}>{children}</div>
    </section>
  );
}

/** Élément surligné à compléter avant publication, affiché entre crochets. */
export function ACompleter({ children }) {
  return <span className={styles.aCompleter}>[{children}]</span>;
}

