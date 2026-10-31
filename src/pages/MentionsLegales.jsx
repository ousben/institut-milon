import { Link } from 'react-router-dom';
import PageLegale, { ACompleter, Rubrique } from '../components/PageLegale.jsx';

const LIGNES = [['Mentions'], [{ fort: 'légales' }, '.']];

const SOMMAIRE = [
  { id: 'editeur', libelle: 'Éditeur du site' },
  { id: 'publication', libelle: 'Directeur de la publication' },
  { id: 'hebergement', libelle: 'Hébergement' },
  { id: 'formation', libelle: 'Activité de formation' },
  { id: 'propriete', libelle: 'Propriété intellectuelle' },
  { id: 'credits', libelle: 'Crédits photographiques' },
  { id: 'donnees', libelle: 'Données personnelles' },
];

export default function MentionsLegales() {
  return (
    <PageLegale
      titre="Mentions légales"
      lignes={LIGNES}
      intro="Les informations ci-dessous identifient l’éditeur du site de l’Institut Milon et son hébergeur."
      sommaire={SOMMAIRE}
    >
      <Rubrique id="editeur" titre="Éditeur du site">
        <p>
          Le site est édité par l’Institut Milon, société par actions simplifiée (SAS) au capital de{' '}
          <ACompleter>montant</ACompleter> €, dont le siège social est situé 8 rue du Colisée, 75008 Paris.
        </p>
        <p>
          Immatriculée au registre du commerce et des sociétés de Paris sous le numéro{' '}
          <ACompleter>SIREN</ACompleter>. Numéro de TVA intracommunautaire : <ACompleter>numéro</ACompleter>.
        </p>
        <p>
          Contact : <a href="mailto:contact@institut-milon.fr">contact@institut-milon.fr</a> ·{' '}
          <ACompleter>téléphone</ACompleter>.
        </p>
      </Rubrique>
      <Rubrique id="publication" titre="Directeur de la publication">
        <p>
          <ACompleter>Prénom Nom</ACompleter>, <ACompleter>fonction</ACompleter>.
        </p>
      </Rubrique>
      <Rubrique id="hebergement" titre="Hébergement">
        <p>
          Le site est hébergé par <ACompleter>nom de l’hébergeur</ACompleter>, <ACompleter>adresse</ACompleter>,{' '}
          <ACompleter>téléphone</ACompleter>.
        </p>
      </Rubrique>
      <Rubrique id="formation" titre="Activité de formation">
        <p>
          Déclaration d’activité enregistrée sous le numéro <ACompleter>numéro de déclaration</ACompleter> auprès
          du préfet de la région Île-de-France. Cet enregistrement ne vaut pas agrément de l’État.
        </p>
        <p className="note">À afficher uniquement lorsque la déclaration est effectivement enregistrée.</p>
      </Rubrique>
      <Rubrique id="propriete" titre="Propriété intellectuelle">
        <p>
          L’ensemble des contenus du site (textes, logo, emblème, photographies et mise en page) est protégé.
          Toute reproduction ou réutilisation, totale ou partielle, sans autorisation écrite préalable de
          l’Institut Milon est interdite.
        </p>
      </Rubrique>
      <Rubrique id="credits" titre="Crédits photographiques">
        <p>
          <ACompleter>crédits des photographies</ACompleter>.
        </p>
      </Rubrique>
      <Rubrique id="donnees" titre="Données personnelles">
        <p>
          Pour savoir comment vos données sont utilisées et comment exercer vos droits, consultez notre{' '}
          <Link to="/confidentialite">politique de confidentialité</Link> et notre page{' '}
          <Link to="/cookies">cookies</Link>.
        </p>
      </Rubrique>
    </PageLegale>
  );
}
