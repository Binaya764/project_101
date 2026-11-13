import React from 'react';

// Maps suit symbols to clean SVG or unicode representations
const SUIT_DATA = {
  '♠': { name: 'Spades', color: '#1E1B26', symbol: '♠', isRed: false },
  '♥': { name: 'Hearts', color: '#DC2626', symbol: '♥', isRed: true },
  '♦': { name: 'Diamonds', color: '#EA580C', symbol: '♦', isRed: true },
  '♣': { name: 'Clubs', color: '#1E1B26', symbol: '♣', isRed: false },
  'S': { name: 'Spades', color: '#1E1B26', symbol: '♠', isRed: false },
  'H': { name: 'Hearts', color: '#DC2626', symbol: '♥', isRed: true },
  'D': { name: 'Diamonds', color: '#EA580C', symbol: '♦', isRed: true },
  'C': { name: 'Clubs', color: '#1E1B26', symbol: '♣', isRed: false }
};

export default function PlayingCard({
  card,
  onClick,
  selected = false,
  disabled = false,
  shake = false,
  pop = false,
  isFaceDown = false,
  small = false,
  className = ''
}) {
  if (isFaceDown) {
    return (
      <div
        className={`playing-card face-down ${small ? 'small' : ''} ${className}`}
        aria-label="Face down card"
      >
        <div className="card-back-pattern">
          <div className="mandala-ring">
            <span>🪔</span>
          </div>
        </div>
      </div>
    );
  }

  if (!card) return null;

  // Normalize card string, e.g. "10♠", "A♥", "K♠" or object { rank, suit }
  let rank = '';
  let rawSuit = '';

  if (typeof card === 'object') {
    rank = card.rank;
    rawSuit = card.suit;
  } else {
    rawSuit = card.slice(-1);
    rank = card.slice(0, -1);
  }

  const suitInfo = SUIT_DATA[rawSuit] || { name: 'Spades', color: '#1E1B26', symbol: rawSuit, isRed: false };
  const isRed = suitInfo.isRed;

  const cardClasses = [
    'playing-card',
    isRed ? 'card-red' : 'card-black',
    selected ? 'card-selected' : '',
    disabled ? 'card-disabled' : '',
    shake ? 'card-shake' : '',
    pop ? 'card-pop' : '',
    small ? 'card-small' : '',
    onClick && !disabled ? 'card-clickable' : '',
    className
  ].filter(Boolean).join(' ');

  const content = (
    <>
      <div className="card-corner top-left">
        <span className="card-rank">{rank}</span>
        <span className="card-suit-symbol">{suitInfo.symbol}</span>
      </div>

      <div className="card-center">
        <span className="center-suit-symbol">{suitInfo.symbol}</span>
        {['J', 'Q', 'K'].includes(rank) && (
          <span className="court-badge">{rank}</span>
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
        aria-label={`${rank} of ${suitInfo.name}`}
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
