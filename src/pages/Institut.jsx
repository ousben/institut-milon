import Gabarit from '../components/Gabarit.jsx';
import Hero from '../components/Hero.jsx';
import BandeauPhoto from '../components/BandeauPhoto.jsx';
import Histoire from '../components/Histoire.jsx';
import Faits from '../components/Faits.jsx';
import Manifeste from '../components/Manifeste.jsx';
import Valeurs from '../components/Valeurs.jsx';

const LIGNES = [['La ', { mot: 'force', index: 0 }, ' se ', { mot: 'transmet', index: 1 }, '.']];

const LIENS = [
  { href: '#histoire', libelle: 'Découvrir notre histoire' },
  { to: '/contact', libelle: 'Échanger avec nous' },
];

export default function Institut() {
  return (
    <Gabarit current="institut" titre="L’Institut | Institut Milon">
      <Hero
        lignes={LIGNES}
        actifInitial={1}
        paragraphe="À l’Institut Milon, nous croyons que les jeunes ne se construisent pas seuls. Un parent qui comprend, un entraîneur qui explique et un club qui accompagne peuvent changer la qualité d’un parcours. Notre rôle est de transmettre des connaissances utiles aux adultes qui les entourent."
        liens={LIENS}
      />
      <BandeauPhoto
        src="/assets/photos/institut-bandeau.webp"
        alt="Un éducateur échange avec un jeune sportif, lumière naturelle"
        cadrage={{ y: -5.003 }}
      />
      <Histoire />
      <Faits />
      <Manifeste />
      <Valeurs />
    </Gabarit>
  );
}
