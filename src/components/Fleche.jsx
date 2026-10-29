/**
 * Flèche décorative (→, ←, ›…). Le glissement de 5 px au survol ou au focus du lien ou bouton
 * porteur est défini dans styles/base.css à partir de l'attribut data-arrow.
 */
export default function Fleche({ direction = 'right', children = '→', className }) {
  return (
    <span data-arrow={direction} aria-hidden="true" className={className}>
      {children}
    </span>
  );
}
