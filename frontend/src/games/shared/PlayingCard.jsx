import React from 'react';

const SUIT_DATA = {
  '♠': { name: 'Spades',   color: '#1E1B26', symbol: '♠', isRed: false, isTrump: true  },
  '♥': { name: 'Hearts',   color: '#DC2626', symbol: '♥', isRed: true,  isTrump: false },
  '♦': { name: 'Diamonds', color: '#EA580C', symbol: '♦', isRed: true,  isTrump: false },
  '♣': { name: 'Clubs',    color: '#1E1B26', symbol: '♣', isRed: false, isTrump: false },
  'S': { name: 'Spades',   color: '#1E1B26', symbol: '♠', isRed: false, isTrump: true  },
  'H': { name: 'Hearts',   color: '#DC2626', symbol: '♥', isRed: true,  isTrump: false },
  'D': { name: 'Diamonds', color: '#EA580C', symbol: '♦', isRed: true,  isTrump: false },
  'C': { name: 'Clubs',    color: '#1E1B26', symbol: '♣', isRed: false, isTrump: false }
};

// Court card decorative emblems
const COURT_EMBLEMS = { J: '⚔️', Q: '🌸', K: '👑' };

export default function PlayingCard({
  card,
  onClick,
  selected   = false,
  disabled   = false,
  shake      = false,
  pop        = false,
  isFaceDown = false,
  small      = false,
  className  = ''
}) {
  // ── Face-down card back ──
  if (isFaceDown) {
    return (
      <div className={`playing-card face-down ${small ? 'card-small' : ''} ${className}`} aria-label="Face down card">
        <div className="card-back-pattern">
          <div className="cb-back-border">
            <div className="cb-back-mandala">
              <span className="cb-mandala-diya">🪔</span>
              <div className="cb-mandala-ring" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!card) return null;

  let rank = '';
  let rawSuit = '';

  if (typeof card === 'object') {
    rank    = card.rank;
    rawSuit = card.suit;
  } else {
    rawSuit = card.slice(-1);
    rank    = card.slice(0, -1);
  }

  const suitInfo  = SUIT_DATA[rawSuit] || { name: 'Spades', color: '#1E1B26', symbol: rawSuit, isRed: false, isTrump: false };
  const isRed     = suitInfo.isRed;
  const isTrump   = suitInfo.isTrump;
  const isCourt   = ['J', 'Q', 'K'].includes(rank);
  const isAce     = rank === 'A';

  const cardClasses = [
    'playing-card',
    isRed   ? 'card-red'   : 'card-black',
    isTrump ? 'card-trump' : '',
    selected   ? 'card-selected'  : '',
    disabled   ? 'card-disabled'  : '',
    shake      ? 'card-shake'     : '',
    pop        ? 'card-pop'       : '',
    small      ? 'card-small'     : '',
    onClick && !disabled ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      {/* Trump glow band at top for spades */}
      {isTrump && !small && (
        <div className="trump-glow-band" aria-hidden="true" />
      )}

      <div className="card-corner top-left">
        <span className="card-rank">{rank}</span>
        <span className="card-suit-symbol">{suitInfo.symbol}</span>
      </div>

      <div className="card-center">
        {isAce ? (
          <span className="ace-center-symbol">{suitInfo.symbol}</span>
        ) : isCourt ? (
          <div className="court-center">
            <span className="court-emblem">{COURT_EMBLEMS[rank]}</span>
            <span className="court-suit">{suitInfo.symbol}</span>
          </div>
        ) : (
          <span className="center-suit-symbol">{suitInfo.symbol}</span>
        )}
      </div>

      <div className="card-corner bottom-right">
        <span className="card-rank">{rank}</span>
        <span className="card-suit-symbol">{suitInfo.symbol}</span>
      </div>
    </>
  );

  if (onClick && !disabled) {
    return (
      <button
        type="button"
        className={cardClasses}
        onClick={() => onClick(card)}
        aria-label={`${rank} of ${suitInfo.name}${isTrump ? ' (Trump)' : ''}`}
      >
        {content}
      </button>
    );
  }

  return (
    <div className={cardClasses} aria-label={`${rank} of ${suitInfo.name}`}>
      {content}
    </div>
  );
}
