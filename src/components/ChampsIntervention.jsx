import { Link } from 'react-router-dom';
import Fleche from './Fleche.jsx';
import Photo from './Photo.jsx';
import styles from './ChampsIntervention.module.css';

const PUBLICS = [
  {
    titre: 'Parents et familles',
    photo: 'Un parent et son enfant au bord du terrain',
    besoin: 'Comprendre le parcours sportif et éducatif, agir sans pression inutile.',
    reponse: 'Explications simples, repères concrets, pédagogie.',
  },
  {
    titre: 'Éducateurs et entraîneurs',
    photo: 'Un entraîneur explique un exercice à un jeune',
    besoin: 'Améliorer l’accompagnement et la communication.',
    reponse: 'Méthodes, exemples, formation.',
  },
  {
    titre: 'Clubs et associations',
    photo: 'Des encadrants de club réunis pour une session',
    besoin: 'Structurer les pratiques et les compétences.',
    reponse: 'Parcours adaptés, ateliers, accompagnement.',
  },
  {
    titre: 'Collectivités et acteurs du sport',
    photo: 'Des intervenants d’une collectivité en formation',
    besoin: 'Faire monter en compétence leurs intervenants.',
    reponse: 'Clarté de l’offre, réalisations vérifiables, interlocuteur identifié.',
  },
];

/** Quatre publics : carte carmin avec emplacement photo (16:9), besoin principal et réponse. */
export default function ChampsIntervention() {
  return (
    <section id="publics" className={styles.section}>
      <div className={styles.inner}>
        <h2 className={styles.titre}>Nos champs d’intervention</h2>
        <div className={styles.grille}>
          {PUBLICS.map((p) => (
            <div key={p.titre} className={styles.carte}>
              <div className={styles.photo}>
                <Photo src={null} alt={p.photo} />
              </div>
              <Link to="/contact" className={styles.lien}>
                <span className={styles.carteTitre}>{p.titre}</span>
                <span className={styles.details}>
                  <span className={styles.detail}>
                    <span className={styles.detailTitre}>Besoin principal</span>
                    <span className={styles.detailTexte}>{p.besoin}</span>
                  </span>
                  <span className={styles.detail}>
                    <span className={styles.detailTitre}>Notre réponse</span>
                    <span className={styles.detailTexte}>{p.reponse}</span>
                  </span>
                </span>
                <Fleche className={styles.fleche} />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
