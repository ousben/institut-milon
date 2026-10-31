import { Link } from 'react-router-dom';
import Gabarit from '../components/Gabarit.jsx';
import Hero from '../components/Hero.jsx';
import Fleche from '../components/Fleche.jsx';
import { PLAN_LEGAL, PLAN_SITE } from '../donnees/navigation.js';
import styles from './PlanDuSite.module.css';

const LIGNES = [['Plan du ', { fort: 'site' }, '.']];

function Colonne({ titre, liens }) {
  return (
    <nav aria-label={titre}>
      <h2 className={styles.rubrique}>{titre}</h2>
      <div className={styles.liste}>
        {liens.map((l) => (
          <Link key={l.to} to={l.to} className={styles.lien}>
            {l.libelle}
            <Fleche />
          </Link>
        ))}
      </div>
    </nav>
  );
}

export default function PlanDuSite() {
  return (
    <Gabarit current="none" titre="Plan du site | Institut Milon">
      <Hero lignes={LIGNES} intro="Toutes les pages du site de l’Institut Milon." />
      <section className={styles.contenu}>
        <div className={styles.grille}>
          <Colonne titre="Le site" liens={PLAN_SITE} />
          <Colonne titre="Informations légales" liens={PLAN_LEGAL} />
        </div>
      </section>
    </Gabarit>
  );
}
