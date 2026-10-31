import Gabarit from '../components/Gabarit.jsx';
import Hero from '../components/Hero.jsx';

const LIGNES = [['Page'], [{ fort: 'introuvable' }, '.']];

const LIENS = [
  { to: '/', libelle: 'Revenir à l’accueil' },
  { to: '/plan-du-site', libelle: 'Voir le plan du site' },
  { to: '/contact', libelle: 'Nous contacter' },
];

/** Page 404 : toute adresse inconnue. */
export default function PageIntrouvable() {
  return (
    <Gabarit current="none" titre="Page introuvable | Institut Milon">
      <Hero lignes={LIGNES} paragraphe="La page que vous cherchez n’existe pas ou a été déplacée." liens={LIENS} />
    </Gabarit>
  );
}
