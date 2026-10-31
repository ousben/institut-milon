import { useState } from 'react';
import { Link } from 'react-router-dom';
import PageLegale, { ACompleter, Rubrique } from '../components/PageLegale.jsx';
import styles from './Cookies.module.css';

const CLE = 'milon-cookies';
const LIGNES = [['Gestion des'], [{ fort: 'cookies' }, '.']];

const SOMMAIRE = [
  { id: 'necessaires', libelle: 'Cookies nécessaires' },
  { id: 'audience', libelle: 'Mesure d’audience' },
  { id: 'preferences', libelle: 'Gérer mes choix' },
  { id: 'duree', libelle: 'Durée de conservation de vos choix' },
  { id: 'en-savoir-plus', libelle: 'En savoir plus' },
];

function lireChoix() {
  try {
    const v = JSON.parse(window.localStorage.getItem(CLE) || 'null');
    return v && typeof v === 'object' ? { audience: !!v.audience, date: v.date } : null;
  } catch {
    return null;
  }
}

function texteEtat(enregistre, vientDEnregistrer) {
  if (!enregistre) return 'Aucun choix enregistré pour le moment : la mesure d’audience reste désactivée.';
  const choix = `mesure d’audience ${enregistre.audience ? 'acceptée.' : 'refusée.'}`;
  if (vientDEnregistrer) return `Vos choix ont été enregistrés : ${choix}`;
  let date;
  try {
    date = new Date(enregistre.date).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
  } catch {
    date = '';
  }
  return `Choix enregistré le ${date} : ${choix}`;
}

/** Page cookies : information et réglages, mémorisés dans le navigateur (localStorage). */
export default function Cookies() {
  const [enregistre, setEnregistre] = useState(lireChoix);
  const [audience, setAudience] = useState(() => !!(lireChoix() || {}).audience);
  const [vientDEnregistrer, setVientDEnregistrer] = useState(false);

  const enregistrer = (valeur) => {
    const v = { audience: !!valeur, date: new Date().toISOString() };
    try {
      window.localStorage.setItem(CLE, JSON.stringify(v));
    } catch {
      /* stockage indisponible : le choix vaut pour la page en cours */
    }
    setAudience(v.audience);
    setEnregistre(v);
    setVientDEnregistrer(true);
  };

  return (
    <PageLegale
      titre="Gestion des cookies"
      lignes={LIGNES}
      intro="Un cookie est un petit fichier déposé sur votre appareil quand vous consultez un site. Vous pouvez accepter ou refuser ceux qui ne sont pas indispensables, et changer d’avis à tout moment."
      sommaire={SOMMAIRE}
    >
      <Rubrique id="necessaires" titre="Cookies nécessaires">
        <p>
          Ils sont indispensables au fonctionnement du site, par exemple pour mémoriser vos choix sur cette
          page. Ils ne peuvent pas être désactivés.
        </p>
      </Rubrique>
      <Rubrique id="audience" titre="Mesure d’audience">
        <p>
          Ces cookies nous permettent de compter les visites et de voir quelles pages sont consultées, afin
          d’améliorer nos contenus. Outil utilisé : <ACompleter>outil de mesure à confirmer</ACompleter>.
        </p>
        <p>Ils ne sont déposés qu’avec votre accord. Aucun traceur non essentiel n’est déposé avant votre choix.</p>
      </Rubrique>
      <Rubrique id="preferences" titre="Gérer mes choix">
        <div className={styles.reglages}>
          <div className={styles.ligne}>
            <div>
              <p className={styles.nom}>Cookies nécessaires</p>
              <p className={styles.detail}>Toujours actifs.</p>
            </div>
            <input
              type="checkbox"
              checked
              disabled
              readOnly
              aria-label="Cookies nécessaires, toujours actifs"
              className={styles.case}
            />
          </div>
          <label className={`${styles.ligne} ${styles.cliquable}`}>
            <span>
              <span className={styles.nom}>Mesure d’audience</span>
              <span className={styles.detail}>Désactivée tant que vous ne l’avez pas acceptée.</span>
            </span>
            <input
              type="checkbox"
              checked={audience}
              onChange={(e) => setAudience(e.target.checked)}
              className={styles.case}
            />
          </label>
        </div>
        <div className={styles.boutons}>
          <button type="button" onClick={() => enregistrer(false)} className={styles.bouton}>
            Tout refuser
          </button>
          <button type="button" onClick={() => enregistrer(true)} className={styles.bouton}>
            Tout accepter
          </button>
          <button type="button" onClick={() => enregistrer(audience)} className={`${styles.bouton} ${styles.principal}`}>
            Enregistrer mes choix
          </button>
        </div>
        <p role="status" className={styles.etat}>
          {texteEtat(enregistre, vientDEnregistrer)}
        </p>
      </Rubrique>
      <Rubrique id="duree" titre="Durée de conservation de vos choix">
        <p>
          Vos choix sont conservés <ACompleter>durée à définir</ACompleter>. Vous pouvez les modifier à tout
          moment depuis cette page, accessible par le lien « Gérer mes cookies » en bas de chaque page.
        </p>
      </Rubrique>
      <Rubrique id="en-savoir-plus" titre="En savoir plus">
        <p>
          Pour savoir comment nous utilisons vos données personnelles, consultez notre{' '}
          <Link to="/confidentialite">politique de confidentialité</Link>. La CNIL explique le fonctionnement
          des cookies sur{' '}
          <a
            href="https://www.cnil.fr/fr/cookies-et-autres-traceurs/que-dit-la-loi"
            target="_blank"
            rel="noopener noreferrer"
          >
            cnil.fr
          </a>
          .
        </p>
      </Rubrique>
    </PageLegale>
  );
}
