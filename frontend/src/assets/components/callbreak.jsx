export default function PlayingCardCallbreak({ card, onClick, shake = false, pop = false }) {
  const rank = card.slice(0, -1);
  const suit = card.slice(-1);
  const red = suit === '♥' || suit === '♦';
  const cls = `card ${red ? 'red' : ''} ${shake ? 'shake' : ''} ${pop ? 'pop' : ''} ${onClick ? '' : 'static'}`;
  const face = (
    <>
      <span>{rank}<br />{suit}</span>
      <i>{suit}</i>
      <span className="r">{rank}<br />{suit}</span>
    </>
  );
  return onClick ? (
    <button type="button" className={cls} onClick={() => onClick(card)} aria-label={`${rank} of ${suit}`}>{face}</button>
  ) : (
    <div className={cls}>{face}</div>
  );
}
