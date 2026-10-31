import Gabarit from '../components/Gabarit.jsx';
import Hero from '../components/Hero.jsx';
import BandeauPhoto from '../components/BandeauPhoto.jsx';
import ChampsIntervention from '../components/ChampsIntervention.jsx';
import Attentes from '../components/Attentes.jsx';

const LIGNES = [
  [{ mot: 'Former', index: 0 }, ' ceux'],
  ['qui ', { mot: 'accompagnent', index: 1 }, '.'],
];

const LIENS = [
  { href: '#publics', libelle: 'Nos champs d’intervention' },
  { to: '/contact', libelle: 'Échanger sur vos besoins' },
];

export default function Formations() {
  return (
    <Gabarit current="formations" titre="Formations | Institut Milon">
      <Hero
        lignes={LIGNES}
        actifInitial={1}
        paragraphe={
          'Nos formations sont en cours de structuration. Vous accompagnez des jeunes sportifs et souhaitez échanger sur vos besoins ? Contactez l’Institut.'
        }
        liens={LIENS}
      />
      <BandeauPhoto src={null} alt="Un atelier de formation dans un club, encadrants réunis autour d’une table" />
      <ChampsIntervention />
      <Attentes />
    </Gabarit>
  );
}
