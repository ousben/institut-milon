import { Link } from 'react-router-dom';
import PageLegale, { ACompleter, Rubrique } from '../components/PageLegale.jsx';
import Fleche from '../components/Fleche.jsx';
import stylesLegale from '../components/PageLegale.module.css';

const LIGNES = [['Déclaration'], ['d’', { fort: 'accessibilité' }, '.']];

const SOMMAIRE = [
  { id: 'engagement', libelle: 'Notre engagement' },
  { id: 'conformite', libelle: 'État de conformité' },
  { id: 'conception', libelle: 'Ce que nous avons prévu' },
  { id: 'signaler', libelle: 'Signaler un problème' },
  { id: 'recours', libelle: 'Voies de recours' },
];

export default function Accessibilite() {
  return (
    <PageLegale
      titre="Déclaration d’accessibilité"
      lignes={LIGNES}
      intro="Cette page présente l’état d’accessibilité du site de l’Institut Milon et la manière de nous signaler un problème."
      sommaire={SOMMAIRE}
    >
      <Rubrique id="engagement" titre="Notre engagement">
        <p>
          L’Institut Milon s’engage à rendre son site accessible au plus grand nombre. Cette déclaration
          s’appuie sur le référentiel général d’amélioration de l’accessibilité (RGAA).
        </p>
      </Rubrique>
      <Rubrique id="conformite" titre="État de conformité">
        <p>
          Le site n’a pas encore fait l’objet d’un audit. Son état de conformité sera publié ici à l’issue de
          cet audit : <ACompleter>date et résultat de l’audit</ACompleter>.
        </p>
      </Rubrique>
      <Rubrique id="conception" titre="Ce que nous avons prévu">
        <p>Le site a été conçu pour offrir :</p>
        <ul>
          <li>une navigation complète au clavier, avec un repère de focus visible ;</li>
          <li>des contrastes de texte suffisants ;</li>
          <li>des titres hiérarchisés pour se repérer dans chaque page ;</li>
          <li>le respect du réglage « réduire les animations » de votre appareil ;</li>
          <li>des textes alternatifs pour les images porteuses d’information.</li>
        </ul>
      </Rubrique>
      <Rubrique id="signaler" titre="Signaler un problème">
        <p>
          Si vous n’arrivez pas à accéder à un contenu ou à un service, écrivez-nous : nous chercherons avec
          vous une solution adaptée.
        </p>
        <Link to="/contact" className={stylesLegale.lienFleche}>
          Nous contacter <Fleche />
        </Link>
      </Rubrique>
      <Rubrique id="recours" titre="Voies de recours">
        <p>
          Si vous nous avez signalé un défaut d’accessibilité sans obtenir de réponse satisfaisante, vous
          pouvez saisir le Défenseur des droits sur{' '}
          <a href="https://www.defenseurdesdroits.fr" target="_blank" rel="noopener noreferrer">
            defenseurdesdroits.fr
          </a>
          .
        </p>
      </Rubrique>
    </PageLegale>
  );
}
