// Marriage (21-Card Nepali Rummy) Game Logic
// 3 Players: South (Human), East (AI - Sita), West (AI - Biraj)
// 3 decks of 52 cards (156 total), 21 cards dealt per player

import { SUITS, RANKS, parseCard, shuffle } from '../callbreak/callBreakLogic';

export const MARRIAGE_PLAYERS = ['south', 'east', 'west'];

export const MARRIAGE_PLAYER_INFO = {
  south: { name: 'You (तपाईं)', avatar: '🪔', isAI: false },
  east: { name: 'Sita', avatar: '🌸', isAI: true },
  west: { name: 'Biraj', avatar: '🎴', isAI: true }
};

// Create triple deck
export function createTripleDeck() {
  const deck = [];
  for (let d = 0; d < 3; d++) {
    for (const suit of SUITS) {
      for (const rank of RANKS) {
        deck.push(`${rank}${suit}`);
      }
    }
  }
  return deck;
}

// Detect Tunnella (3 identical cards: same rank AND same suit)
export function isTunnella(cards) {
  if (cards.length !== 3) return false;
  return cards[0] === cards[1] && cards[1] === cards[2];
}

// Detect Pure Run / Pure Sequence (3 or more consecutive cards of exact same suit)
export function isPureRun(cards) {
  if (cards.length < 3) return false;
  const parsed = cards.map(c => parseCard(c));
  const suit = parsed[0].suit;
  if (!parsed.every(c => c.suit === suit)) return false;

  const sorted = [...parsed].sort((a, b) => a.value - b.value);
  for (let i = 0; i < sorted.length - 1; i++) {
    if (sorted[i + 1].value !== sorted[i].value + 1) {
      return false;
    }
  }
  return true;
}

// Analyze hand and identify all detected melds (tunnellas and pure sequences)
export function analyzeMarriageHand(hand) {
  const cardCounts = {};
  hand.forEach(c => {
    cardCounts[c] = (cardCounts[c] || 0) + 1;
  });

  const tunnellas = [];
  for (const card in cardCounts) {
    if (cardCounts[card] >= 3) {
      tunnellas.push([card, card, card]);
    }
  }

  // Group by suit to find runs
  const suitGroups = { '♠': [], '♥': [], '♦': [], '♣': [] };
  hand.forEach(c => {
    const p = parseCard(c);
    suitGroups[p.suit].push({ ...p, original: c });
  });

  const pureRuns = [];
  for (const suit in suitGroups) {
    const list = suitGroups[suit];
    // deduplicate values for run finding
    const uniqueValues = Array.from(new Set(list.map(c => c.value))).sort((a, b) => a - b);
    for (let i = 0; i < uniqueValues.length - 2; i++) {
      if (uniqueValues[i + 1] === uniqueValues[i] + 1 && uniqueValues[i + 2] === uniqueValues[i] + 2) {
        const r1 = list.find(c => c.value === uniqueValues[i])?.original;
        const r2 = list.find(c => c.value === uniqueValues[i + 1])?.original;
        const r3 = list.find(c => c.value === uniqueValues[i + 2])?.original;
        if (r1 && r2 && r3) {
          pureRuns.push([r1, r2, r3]);
        }
      }
    }
  }

  return {
    tunnellas,
    pureRuns,
    totalValidMelds: tunnellas.length + pureRuns.length
  };
}

// Sort by Suit
export function sortMarriageBySuit(hand) {
  const suitOrder = { '♠': 1, '♥': 2, '♣': 3, '♦': 4 };
  return [...hand].sort((a, b) => {
    const pa = parseCard(a);
    const pb = parseCard(b);
    if (suitOrder[pa.suit] !== suitOrder[pb.suit]) {
      return suitOrder[pa.suit] - suitOrder[pb.suit];
    }
    return pa.value - pb.value;
  });
}

// Sort by Rank
export function sortMarriageByRank(hand) {
  return [...hand].sort((a, b) => {
    const pa = parseCard(a);
    const pb = parseCard(b);
    if (pa.value !== pb.value) {
      return pa.value - pb.value;
    }
    return pa.suit.localeCompare(pb.suit);
  });
}
