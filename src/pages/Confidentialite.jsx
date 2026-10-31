import { Link } from 'react-router-dom';
import PageLegale, { ACompleter, Rubrique } from '../components/PageLegale.jsx';

const LIGNES = [['Politique de'], [{ fort: 'confidentialité' }, '.']];

const SOMMAIRE = [
  { id: 'responsable', libelle: 'Responsable du traitement' },
  { id: 'donnees', libelle: 'Données recueillies' },
  { id: 'finalite', libelle: 'Pourquoi nous les utilisons' },
  { id: 'destinataires', libelle: 'Qui y a accès' },
  { id: 'duree', libelle: 'Durée de conservation' },
  { id: 'droits', libelle: 'Vos droits' },
  { id: 'cookies-info', libelle: 'Cookies' },
  { id: 'mise-a-jour', libelle: 'Mise à jour' },
];

export default function Confidentialite() {
  return (
    <PageLegale
      titre="Politique de confidentialité"
      lignes={LIGNES}
      intro="Cette page explique quelles données nous recueillons, pourquoi nous les utilisons, combien de temps nous les gardons et comment exercer vos droits."
      sommaire={SOMMAIRE}
    >
      <Rubrique id="responsable" titre="Responsable du traitement">
        <p>
          L’Institut Milon, 8 rue du Colisée, 75008 Paris, est responsable du traitement de vos données. Pour
          toute question : <a href="mailto:contact@institut-milon.fr">contact@institut-milon.fr</a>.
        </p>
      </Rubrique>
      <Rubrique id="donnees" titre="Données recueillies">
        <p>Lorsque vous utilisez le formulaire de contact, nous recueillons :</p>
        <ul>
          <li>votre profil (parent, éducateur, club, collectivité…)</li>
          <li>votre nom et votre prénom</li>
          <li>votre adresse e-mail</li>
          <li>le nom de votre structure, si vous l’indiquez</li>
          <li>le contenu de votre demande</li>
        </ul>
      </Rubrique>
      <Rubrique id="finalite" titre="Pourquoi nous les utilisons">
        <p>
          Ces données servent uniquement à traiter votre demande et à vous répondre. Elles sont traitées avec
          votre consentement, recueilli dans le formulaire. Vous pouvez le retirer à tout moment.
        </p>
      </Rubrique>
      <Rubrique id="destinataires" titre="Qui y a accès">
        <p>
          Seules les personnes de l’Institut Milon chargées de traiter votre demande y ont accès, ainsi que nos
          prestataires techniques : <ACompleter>hébergeur</ACompleter>, <ACompleter>service de messagerie</ACompleter>.
          Vos données ne sont ni vendues ni cédées.
        </p>
      </Rubrique>
      <Rubrique id="duree" titre="Durée de conservation">
        <p>
          Vos données sont conservées <ACompleter>durée à définir</ACompleter> après notre dernier échange, puis
          supprimées.
        </p>
      </Rubrique>
      <Rubrique id="droits" titre="Vos droits">
        <p>
          Vous pouvez demander à accéder à vos données, à les rectifier ou à les effacer, limiter leur
          utilisation, vous y opposer, les récupérer dans un format lisible ou retirer votre consentement.
        </p>
        <p>
          Pour exercer ces droits, écrivez-nous à{' '}
          <a href="mailto:contact@institut-milon.fr">contact@institut-milon.fr</a>. Si vous estimez que vos
          droits ne sont pas respectés, vous pouvez adresser une réclamation à la CNIL sur{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer">
            cnil.fr
          </a>
          .
        </p>
      </Rubrique>
      <Rubrique id="cookies-info" titre="Cookies">
        <p>
          Pour connaître les cookies utilisés sur ce site et modifier vos choix, consultez notre page{' '}
          <Link to="/cookies">cookies</Link>.
        </p>
      </Rubrique>
      <Rubrique id="mise-a-jour" titre="Mise à jour">
        <p>
          Dernière mise à jour : <ACompleter>date</ACompleter>.
        </p>
      </Rubrique>
    </PageLegale>
  );
}
