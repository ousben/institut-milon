import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Carrousel.module.css';

const DIAPOS = [
  { titre: 'Football américain', alt: 'Un joueur de football américain court ballon en main, poursuivi par un défenseur.' },
  { titre: 'Basket-ball', alt: 'Un joueur de basket-ball tire en suspension pendant un match en salle.' },
  { titre: 'La vie de club', alt: 'Une équipe de jeunes footballeurs pose, souriante, sur le terrain le soir.' },
  { titre: 'Le jour du match', alt: 'Les tribunes vides d’un grand stade de football avant une rencontre.' },
  { titre: 'Football amateur', alt: 'Deux joueurs de football amateur courent vers le ballon.' },
  { titre: 'L’esprit d’équipe', alt: 'Trois basketteurs posent avec leurs médailles et un trophée.' },
].map((d, i) => ({ ...d, src: `/assets/photos/formation-${i + 1}.jpg` }));

const N = DIAPOS.length;
const SEUIL_GLISSER = 60; // px avant de changer de diapositive au relâcher
const SEUIL_MOLETTE = 40; // delta horizontal cumulé avant de changer de diapositive
const VERROU_MOLETTE = 650; // ms pendant lesquelles la molette est ignorée après un changement

/**
 * Carrousel : diapositive active centrée, navigation au glisser (résistance aux extrémités),
 * au défilement horizontal, aux flèches du clavier et au clic sur une voisine.
 * La position passe par des variables CSS posées sur la piste.
 */
export default function Carrousel() {
  const [index, setIndex] = useState(0);
  const indexRef = useRef(0);
  const viewportRef = useRef(null);
  const pisteRef = useRef(null);
  const glisser = useRef({ actif: false, deplace: false, depart: 0, dx: 0 });
  const molette = useRef({ cumul: 0, verrou: 0 });

  const go = useCallback((i) => {
    const k = Math.max(0, Math.min(N - 1, i));
    indexRef.current = k;
    const piste = pisteRef.current;
    if (piste) {
      piste.style.transition = '';
      piste.style.setProperty('--car-i', String(k));
    }
    setIndex(k);
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return undefined;

    const onDown = (e) => {
      if (e.button != null && e.button !== 0) return;
      glisser.current = { actif: true, deplace: false, depart: e.clientX, dx: 0 };
      if (pisteRef.current) pisteRef.current.style.transition = 'none';
    };
    const onMove = (e) => {
      const g = glisser.current;
      if (!g.actif) return;
      g.dx = e.clientX - g.depart;
      if (Math.abs(g.dx) > 6) g.deplace = true;
      const i = indexRef.current;
      const auBord = (i === 0 && g.dx > 0) || (i === N - 1 && g.dx < 0);
      if (pisteRef.current) {
        pisteRef.current.style.setProperty('--car-drag', `${(auBord ? g.dx / 3 : g.dx).toFixed(1)}px`);
      }
    };
    const onUp = () => {
      const g = glisser.current;
      if (!g.actif) return;
      g.actif = false;
      const dx = g.dx || 0;
      if (pisteRef.current) pisteRef.current.style.setProperty('--car-drag', '0px');
      go(Math.abs(dx) > SEUIL_GLISSER ? indexRef.current + (dx < 0 ? 1 : -1) : indexRef.current);
      setTimeout(() => {
        glisser.current.deplace = false;
      }, 0);
    };
    const onWheel = (e) => {
      const dx = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.shiftKey ? e.deltaY : 0;
      if (!dx) return;
      e.preventDefault();
      const now = Date.now();
      const m = molette.current;
      if (now < m.verrou) {
        m.cumul = 0;
        return;
      }
      m.cumul += dx;
      if (Math.abs(m.cumul) > SEUIL_MOLETTE) {
        const dir = m.cumul > 0 ? 1 : -1;
        m.cumul = 0;
        m.verrou = now + VERROU_MOLETTE;
        go(indexRef.current + dir);
      }
    };

    viewport.addEventListener('pointerdown', onDown);
    viewport.addEventListener('wheel', onWheel, { passive: false });
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    window.addEventListener('pointercancel', onUp);
    return () => {
      viewport.removeEventListener('pointerdown', onDown);
      viewport.removeEventListener('wheel', onWheel);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [go]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      go(indexRef.current + 1);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      go(indexRef.current - 1);
    }
  };

  const aller = (i) => {
    if (!glisser.current.deplace) go(i);
  };

  return (
    <section
      aria-roledescription="carrousel"
      aria-label="Photographies de terrain (flèches gauche et droite pour naviguer)"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={styles.carrousel}
    >
      <div ref={viewportRef} className={styles.viewport}>
        <div ref={pisteRef} className={styles.piste}>
          {DIAPOS.map((d, i) => (
            <div
              key={d.src}
              role="group"
              aria-roledescription="diapositive"
              aria-label={`${i + 1} sur ${N}`}
              onClick={() => aller(i)}
              className={styles.diapo}
            >
              <div
                role="img"
                aria-label={d.alt}
                className={styles.image}
                style={{ backgroundImage: `url("${d.src}")` }}
              />
              <div aria-hidden="true" className={styles.voile} />
              <p className={styles.legende}>{d.titre}</p>
            </div>
          ))}
        </div>
        <button
          type="button"
          aria-label="Photo précédente"
          onClick={() => go(indexRef.current - 1)}
          hidden={index === 0}
          className={`${styles.bouton} ${styles.precedent}`}
        >
          <svg
            data-arrow="left"
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Photo suivante"
          onClick={() => go(indexRef.current + 1)}
          hidden={index === N - 1}
          className={`${styles.bouton} ${styles.suivant}`}
        >
          <svg
            data-arrow="right"
            aria-hidden="true"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000000"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
      <div className={styles.points}>
        {DIAPOS.map((d, i) => (
          <button
            key={d.src}
            type="button"
            aria-label={`Aller à la photo ${i + 1}`}
            aria-current={index === i ? 'true' : 'false'}
            onClick={() => aller(i)}
            className={styles.point}
          >
            <span />
          </button>
        ))}
      </div>
    </section>
  );
}
