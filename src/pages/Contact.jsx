import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../components/Logo.jsx';
import Fleche from '../components/Fleche.jsx';
import styles from './Contact.module.css';

const CLE_WEB3FORMS = import.meta.env.VITE_WEB3FORMS_KEY;
const EMAIL = import.meta.env.VITE_CONTACT_EMAIL || 'contact@institut-milon.fr';
const ORDRE = ['profil', 'nom', 'email', 'message', 'consent'];
const EMAIL_VALIDE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PROFILS = [
  'Parent ou famille',
  'Éducateur ou entraîneur',
  'Club ou association',
  'Collectivité ou structure sportive',
  'Autre',
];

function valider(d) {
  const v = (k) => String(d.get(k) || '').trim();
  const erreurs = {};
  if (!v('profil')) erreurs.profil = 'Indiquez votre profil.';
  if (!v('nom')) erreurs.nom = 'Indiquez votre nom et votre prénom.';
  if (!v('email')) erreurs.email = 'Indiquez votre adresse e-mail.';
  else if (!EMAIL_VALIDE.test(v('email'))) {
    erreurs.email = 'Indiquez une adresse e-mail valide, par exemple nom@domaine.fr.';
  }
  if (!v('message')) erreurs.message = 'Décrivez brièvement votre demande.';
  if (!d.get('consent')) erreurs.consent = 'Votre accord est nécessaire pour traiter votre demande.';
  return erreurs;
}

function Obligatoire() {
  return <span className={styles.precision}>(obligatoire)</span>;
}

/**
 * Page de contact. Envoi via Web3Forms si VITE_WEB3FORMS_KEY est définie ; sinon, ouverture
 * d'un mailto prérempli vers VITE_CONTACT_EMAIL.
 */
export default function Contact() {
  const [etat, setEtat] = useState('formulaire'); // formulaire | envoi | envoye | mailto
  const [erreurs, setErreurs] = useState({});
  const [echec, setEchec] = useState(false);

  useEffect(() => {
    document.title = 'Nous contacter | Institut Milon';
  }, []);

  const reinitialiser = () => {
    setEtat('formulaire');
    setErreurs({});
    setEchec(false);
  };

  const submit = async (e) => {
    e.preventDefault();
    const f = e.currentTarget;
    const d = new FormData(f);
    const v = (k) => String(d.get(k) || '').trim();
    const err = valider(d);
    setErreurs(err);
    setEchec(false);
    const premier = ORDRE.find((k) => err[k]);
    if (premier) {
      const el = f.elements[premier];
      if (el && el.focus) el.focus();
      return;
    }
    const sujet = `Demande de contact – ${v('profil')}`;

    if (CLE_WEB3FORMS) {
      setEtat('envoi');
      try {
        const res = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            access_key: CLE_WEB3FORMS,
            subject: sujet,
            from_name: 'Site Institut Milon',
            name: v('nom'),
            email: v('email'),
            profil: v('profil'),
            structure: v('structure') || '—',
            message: v('message'),
            botcheck: d.get('botcheck') ? 'on' : '',
          }),
        });
        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json.success) throw new Error('Envoi refusé');
        setEtat('envoye');
      } catch {
        setEtat('formulaire');
        setEchec(true);
      }
      return;
    }

    const corps = [
      `Profil : ${v('profil')}`,
      `Nom : ${v('nom')}`,
      `E-mail : ${v('email')}`,
      `Structure : ${v('structure') || '—'}`,
      '',
      v('message'),
    ].join('\n');
    setEtat('mailto');
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(sujet)}&body=${encodeURIComponent(corps)}`;
  };

  const nbErreurs = Object.keys(erreurs).length;
  const resume =
    nbErreurs === 1
      ? 'Le formulaire contient une erreur, signalée sous le champ concerné.'
      : `Le formulaire contient ${nbErreurs} erreurs, signalées sous les champs concernés.`;
  const envoi = etat === 'envoi';

  return (
    <>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <Link to="/" aria-label="Institut Milon, accueil" className={styles.logoLink}>
            <Logo />
          </Link>
          <Link to="/" className={styles.retour}>
            <Fleche direction="left">←</Fleche>&nbsp;Retour à l’accueil
          </Link>
        </div>
      </header>

      <main id="contenu" tabIndex={-1} className={styles.main}>
        <h1 className={styles.titre}>Parlons de vos besoins.</h1>
        <div className={styles.intro}>
          <p className={styles.introTexte}>
            Vous représentez un club, une structure ou vous accompagnez un jeune sportif&#8239;?
            Décrivez-nous brièvement votre demande. Nous reviendrons vers vous avec une réponse adaptée.
          </p>
        </div>

        {etat === 'envoye' && (
          <div role="status" className={styles.confirmation}>
            <p className={styles.confirmationTitre}>Votre demande a bien été envoyée.</p>
            <p className={styles.confirmationTexte}>
              Pour toute précision, écrivez-nous directement à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
            <button type="button" onClick={reinitialiser} className={styles.secondaire}>
              Écrire un autre message
            </button>
          </div>
        )}

        {etat === 'mailto' && (
          <div role="status" className={styles.confirmation}>
            <p className={styles.confirmationTitre}>Votre message est prêt.</p>
            <p className={styles.confirmationTexte}>
              Votre messagerie s’ouvre avec votre demande déjà rédigée&#8239;: il ne reste qu’à l’envoyer.
              Si rien ne s’ouvre, écrivez-nous directement à <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
            </p>
            <button type="button" onClick={reinitialiser} className={styles.secondaire}>
              Écrire un autre message
            </button>
          </div>
        )}

        {(etat === 'formulaire' || envoi) && (
          <form noValidate onSubmit={submit} className={styles.form}>
            {nbErreurs > 0 && (
              <p role="alert" className={styles.alerte}>
                {resume}
              </p>
            )}
            {echec && (
              <p role="alert" className={styles.alerte}>
                L’envoi n’a pas abouti. Réessayez dans un instant ou écrivez-nous directement à{' '}
                <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.
              </p>
            )}
            <div className={styles.grille}>
              <label className={styles.champ}>
                <span>
                  Vous êtes <Obligatoire />
                </span>
                <select
                  name="profil"
                  required
                  defaultValue=""
                  aria-invalid={erreurs.profil ? 'true' : undefined}
                  aria-describedby="err-profil"
                  className={styles.select}
                >
                  <option value="">Sélectionnez votre profil</option>
                  {PROFILS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
                <span id="err-profil" className={styles.erreur}>
                  {erreurs.profil || ''}
                </span>
              </label>
              <label className={styles.champ}>
                <span>
                  Nom et prénom <Obligatoire />
                </span>
                <input
                  name="nom"
                  autoComplete="name"
                  required
                  aria-invalid={erreurs.nom ? 'true' : undefined}
                  aria-describedby="err-nom"
                  className={styles.input}
                />
                <span id="err-nom" className={styles.erreur}>
                  {erreurs.nom || ''}
                </span>
              </label>
              <label className={styles.champ}>
                <span>
                  Adresse e-mail <Obligatoire />
                </span>
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  aria-invalid={erreurs.email ? 'true' : undefined}
                  aria-describedby="err-email"
                  className={styles.input}
                />
                <span id="err-email" className={styles.erreur}>
                  {erreurs.email || ''}
                </span>
              </label>
              <label className={styles.champ}>
                <span>
                  Structure <span className={styles.precision}>(facultatif)</span>
                </span>
                <input name="structure" autoComplete="organization" className={styles.input} />
              </label>
              <label className={`${styles.champ} ${styles.large}`}>
                <span>
                  Votre demande <Obligatoire />
                </span>
                <textarea
                  name="message"
                  rows={7}
                  required
                  aria-invalid={erreurs.message ? 'true' : undefined}
                  aria-describedby="err-message"
                  className={styles.textarea}
                />
                <span id="err-message" className={styles.erreur}>
                  {erreurs.message || ''}
                </span>
              </label>
            </div>
            <label className={styles.consentement}>
              <input
                name="consent"
                type="checkbox"
                required
                aria-invalid={erreurs.consent ? 'true' : undefined}
                aria-describedby="err-consent"
                className={styles.checkbox}
              />
              <span>
                J’accepte que ces informations soient utilisées pour traiter ma demande. <Obligatoire />
                <span id="err-consent" className={styles.erreurConsent}>
                  {erreurs.consent || ''}
                </span>
              </span>
            </label>
            <input
              type="checkbox"
              name="botcheck"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              className={styles.honeypot}
            />
            <button type="submit" disabled={envoi} className={styles.envoyer}>
              {envoi ? 'Envoi en cours…' : 'Envoyer ma demande'} <Fleche />
            </button>
            {!CLE_WEB3FORMS && (
              <p className={styles.note}>L’envoi ouvre votre messagerie avec un message adressé à {EMAIL}.</p>
            )}
          </form>
        )}
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerInner}>
          <span>© 2026 Institut Milon</span>
          <Link to="/" className={styles.footerLien}>
            Retour à l’accueil
          </Link>
        </div>
      </footer>
    </>
  );
}
