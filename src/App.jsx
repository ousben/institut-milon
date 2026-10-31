import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Accueil from './pages/Accueil.jsx';
import Institut from './pages/Institut.jsx';
import Approche from './pages/Approche.jsx';
import Formations from './pages/Formations.jsx';
import Contact from './pages/Contact.jsx';
import PlanDuSite from './pages/PlanDuSite.jsx';
import MentionsLegales from './pages/MentionsLegales.jsx';
import Confidentialite from './pages/Confidentialite.jsx';
import Cookies from './pages/Cookies.jsx';
import Accessibilite from './pages/Accessibilite.jsx';
import PageIntrouvable from './pages/PageIntrouvable.jsx';

/**
 * À chaque changement de route : retour en haut, ou saut vers l'ancre demandée. Après un saut, la barre
 * fixe reste visible : la cible est décalée de sa hauteur pour ne pas passer dessous. Le saut est rejoué
 * peu après, une fois la taille du titre de hero calculée (la page s'est alors déjà déplacée) et le
 * défilement natif vers le fragment passé.
 */
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    const target = hash ? document.getElementById(hash.slice(1)) : null;
    if (!target) {
      window.scrollTo(0, 0);
      return undefined;
    }
    const aller = () => {
      target.scrollIntoView();
      const header = document.querySelector('header');
      if (header) window.scrollBy(0, -header.offsetHeight);
    };
    aller();
    const timer = setTimeout(aller, 450);
    return () => clearTimeout(timer);
  }, [pathname, hash]);
  return null;
}

export default function App() {
  return (
    <>
      <div id="top" />
      <a href="#contenu" className="skip-link" data-no-smooth>
        Aller au contenu
      </a>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/institut" element={<Institut />} />
        <Route path="/approche" element={<Approche />} />
        <Route path="/formations" element={<Formations />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plan-du-site" element={<PlanDuSite />} />
        <Route path="/mentions-legales" element={<MentionsLegales />} />
        <Route path="/confidentialite" element={<Confidentialite />} />
        <Route path="/cookies" element={<Cookies />} />
        <Route path="/accessibilite" element={<Accessibilite />} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </>
  );
}
