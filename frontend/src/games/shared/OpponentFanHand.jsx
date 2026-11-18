import React from 'react';

/**
 * OpponentFanHand
 * Renders an opponent's hand as a compact fanned deck stack of facedown cards
 * matching the reference layout (cards fanned out in an arc/angle instead of full-size flat cards).
 *
 * @param {'north' | 'west' | 'east'} position - Table position of the opponent
 * @param {number} count - Number of cards remaining in hand
 * @param {string} className - Optional additional CSS class
 */
export default function OpponentFanHand({ position = 'north', count = 13, className = '' }) {
  // Cap displayed visual cards to avoid excessive DOM nodes (min 1, max 10 cards displayed in the fan)
  const displayCount = Math.max(1, Math.min(count, 10));

  return (
    <div className={`opponent-fanned-hand opponent-fan-${position} ${className}`} aria-label={`${count} cards`}>
      <div className="opponent-fan-cards-wrap">
        {Array.from({ length: displayCount }).map((_, i) => {
          // Calculate spread angles and offsets depending on position
          let transform = '';
          const centerIdx = (displayCount - 1) / 2;
          const offset = i - centerIdx;

          if (position === 'north') {
            // Fanned slightly downward like top deck
            const angle = offset * 4.5;
            const translateX = offset * 11;
            const translateY = Math.abs(offset) * 2;
            transform = `translateX(${translateX}px) translateY(${translateY}px) rotate(${angle}deg)`;
          } else if (position === 'west') {
            // Fanned to the right toward table center (top-left to bottom-right fan)
            const angle = 28 + offset * 5;
            const translateX = offset * 5;
            const translateY = offset * 8;
            transform = `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;
          } else if (position === 'east') {
            // Fanned to the left toward table center (mirror of west)
            const angle = -28 - offset * 5;
            const translateX = -offset * 5;
            const translateY = offset * 8;
            transform = `translate(${translateX}px, ${translateY}px) rotate(${angle}deg)`;
          }

          return (
            <div
              key={i}
              className="opponent-fan-card-item"
              style={{
                transform,
                zIndex: i + 1
              }}
            >
              <div className="fan-card-red-back">
                <div className="fan-card-filigree">
                  <span className="fan-card-symbol">🪔</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <span className="opponent-fan-count-pill">{count}</span>
    </div>
  );
}
