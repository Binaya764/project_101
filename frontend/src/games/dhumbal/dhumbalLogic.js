// Dhumbal (Jhyap) Card Game Logic
// Authentic Nepali card game for 4 players
// Objective: Minimize total hand points and declare Dhumbal when points <= 10

import { parseCard, shuffle, createDeck } from '../callbreak/callBreakLogic';

export const DHUMBAL_PLAYERS = ['south', 'east', 'north', 'west'];

export const DHUMBAL_PLAYER_INFO = {
  south: { name: 'You (तपाईं)', avatar: '🪔', isAI: false },
  east: { name: 'Rohan', avatar: '😎', isAI: true },
  north: { name: 'Puja', avatar: '🌺', isAI: true },
  west: { name: 'Bikash', avatar: '🎲', isAI: true }
};

// Calculate point value of a single card
export function getCardPoints(card) {
  if (!card) return 0;
  const rank = typeof card === 'string' ? card.slice(0, -1) : card.rank;
  if (rank === 'A') return 1;
  if (rank === 'J') return 11;
  if (rank === 'Q') return 12;
  if (rank === 'K') return 13;
  return parseInt(rank, 10) || 0;
}

// Total hand points
export function getHandPoints(hand) {
  return hand.reduce((sum, card) => sum + getCardPoints(card), 0);
}

// Validate if selected cards can be legally discarded together
export function isValidDiscardSet(cards) {
  if (!cards || cards.length === 0) return false;
  if (cards.length === 1) return true; // Any single card is valid

  const parsed = cards.map(c => parseCard(c));

  // Check 1: Same rank (pair, triplet, quad)
  const firstRank = parsed[0].rank;
  const allSameRank = parsed.every(c => c.rank === firstRank);
  if (allSameRank) return true;

  // Check 2: Same suit sequence of 3 or more (e.g. 5♠, 6♠, 7♠)
  if (cards.length >= 3) {
    const firstSuit = parsed[0].suit;
    const allSameSuit = parsed.every(c => c.suit === firstSuit);
    if (allSameSuit) {
      // Sort by rank value
      const sortedValues = parsed.map(c => c.value).sort((a, b) => a - b);
      let isConsecutive = true;
      for (let i = 0; i < sortedValues.length - 1; i++) {
        if (sortedValues[i + 1] !== sortedValues[i] + 1) {
          isConsecutive = false;
          break;
        }
      }
      if (isConsecutive) return true;
    }
  }

  return false;
}

// AI evaluation: Find best cards to discard to drop maximum points
export function findBestAIDiscard(hand) {
  const parsed = hand.map((c, idx) => ({ ...parseCard(c), original: c, idx }));

  // Check pairs/triplets first
  const rankGroups = {};
  parsed.forEach(c => {
    rankGroups[c.rank] = rankGroups[c.rank] || [];
    rankGroups[c.rank].push(c);
  });

  let bestSet = null;
  let maxPointsSaved = -1;

  for (const rank in rankGroups) {
    const group = rankGroups[rank];
    if (group.length >= 2) {
      const points = group.reduce((sum, c) => sum + getCardPoints(c.original), 0);
      if (points > maxPointsSaved) {
        maxPointsSaved = points;
        bestSet = group.map(c => c.original);
      }
    }
  }

  if (bestSet) return bestSet;

  // If no multi-card match, discard the single highest point card
  const sorted = [...hand].sort((a, b) => getCardPoints(b) - getCardPoints(a));
  return [sorted[0]];
}

// AI decision to call Dhumbal
export function shouldAICallDhumbal(hand, roundNumber) {
  const points = getHandPoints(hand);
  // If points <= 5, almost definitely call
  if (points <= 5) return true;
  // If points <= 8, call with high probability
  if (points <= 8 && Math.random() < 0.75) return true;
  // If points <= 10 and late in round
  if (points <= 10 && Math.random() < 0.4) return true;
  return false;
}
