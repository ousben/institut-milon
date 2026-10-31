import { Link, useLocation } from 'react-router-dom';

/**
 * Lien vers une page ou une section du site.
 * - « /#id » devient un lien d'ancre (#id, défilement doux) quand on est déjà sur l'accueil ;
 * - « / » devient « #top » sur l'accueil (retour en haut) ;
 * - « #id » reste un lien d'ancre de la page courante ;
 * - sinon, navigation par le routeur.
 */
export default function LienSite({ to, children, ...rest }) {
  const { pathname } = useLocation();
  const accueil = pathname === '/';
  if (to.startsWith('#')) {
    return (
      <a href={to} {...rest}>
        {children}
      </a>
    );
  }
  if (accueil && to.startsWith('/#')) {
    return (
      <a href={to.slice(1)} {...rest}>
        {children}
      </a>
    );
  }
  if (accueil && to === '/') {
    return (
      <a href="#top" {...rest}>
        {children}
      </a>
    );
  }
  return (
    <Link to={to} {...rest}>
      {children}
    </Link>
  );
}
