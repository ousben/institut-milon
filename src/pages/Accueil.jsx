import Gabarit from '../components/Gabarit.jsx';
import Hero from '../components/Hero.jsx';
import BandeauThemes from '../components/BandeauThemes.jsx';
import Singulier from '../components/Singulier.jsx';
import Carrousel from '../components/Carrousel.jsx';
import Formations from '../components/Formations.jsx';
import Approche from '../components/Approche.jsx';
import useReducedMotion from '../hooks/useReducedMotion.js';

const TITRE = 'Institut Milon | Former ceux qui accompagnent';

const LIGNES = [
  ['Un ', { mot: 'champion', index: 0 }, ' ne se'],
  ['fait ', { mot: 'jamais seul', index: 1 }, '.'],
];

const LIENS = [
  { href: '#singulier', libelle: 'Découvrir l’Institut' },
  { to: '/contact', libelle: 'Échanger avec nous' },
];

export default function Accueil() {
  const reduced = useReducedMotion();
  return (
    <Gabarit current="none" titre={TITRE}>
      <Hero
        lignes={LIGNES}
        actifInitial={0}
        paragraphe="Derrière chaque jeune sportif, il y a des adultes qui le font grandir. Nous les formons pour mieux comprendre, mieux accompagner et transmettre."
        liens={LIENS}
      />
      <BandeauThemes reduced={reduced} />
      <Singulier />
      <Carrousel />
      <Formations />
      <Approche />
    </Gabarit>
  );
}
