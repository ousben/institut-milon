import Gabarit from '../components/Gabarit.jsx';
import Hero from '../components/Hero.jsx';
import BandeauPhoto from '../components/BandeauPhoto.jsx';
import Etapes from '../components/Etapes.jsx';
import Promesse from '../components/Promesse.jsx';
import Positionnement from '../components/Positionnement.jsx';

const TITRE = 'Notre approche | Institut Milon';

const LIGNES = [
  [{ mot: 'Comprendre', index: 0 }, '.'],
  ['Mettre en ', { mot: 'pratique', index: 1 }, '.'],
  [{ mot: 'Transmettre', index: 2 }, '.'],
];

const LIENS = [
  { href: '#etapes', libelle: 'Voir les trois étapes' },
  { to: '/contact', libelle: 'Échanger avec nous' },
];

/** Page « Notre approche ». Le bandeau photo attend son image : src à renseigner dans public/assets/photos. */
export default function Approche() {
  return (
    <Gabarit current="approche" titre={TITRE}>
      <Hero
        lignes={LIGNES}
        actifInitial={1}
        paragraphe="Une formation doit laisser des repères qui servent sur le terrain et au quotidien. Nous partons de situations concrètes, expliquons simplement les notions importantes, puis cherchons à rendre les connaissances applicables aux besoins des participants."
        liens={LIENS}
      />
      <BandeauPhoto src={null} alt="Une salle de formation, un intervenant échange avec des participants" />
      <Etapes />
      <Promesse />
      <Positionnement />
    </Gabarit>
  );
}
