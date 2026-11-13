// Call Break Complete Card Game Logic
// 4 Players: South (Human), East (AI), North (AI), West (AI)
// Standard 52-card deck, Spades are permanent trump (Hukum)

export const SUITS = ['♠', '♥', '♦', '♣'];
export const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

export const RANK_VALUES = {
  '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9,
  '10': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14
};

export const SUIT_ORDER = { '♠': 4, '♥': 3, '♦': 2, '♣': 1 };

export const PLAYERS = ['south', 'east', 'north', 'west'];

export const PLAYER_INFO = {
  south: { name: 'You (तपाईं)', avatar: '🪔', isAI: false },
  east: { name: 'Ramesh Dai', avatar: '🧔', isAI: true },
  north: { name: 'Pooja Didi', avatar: '👩', isAI: true },
  west: { name: 'Kiran Kaji', avatar: '👨‍💼', isAI: true }
};

// Create a full 52-card deck
export function createDeck() {
  const deck = [];
  for (const suit of SUITS) {
    for (const rank of RANKS) {
      deck.push(`${rank}${suit}`);
    }
  }
  return deck;
}

// Fisher-Yates shuffle
export function shuffle(deck) {
  const arr = [...deck];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Split card into rank and suit
export function parseCard(card) {
  const suit = card.slice(-1);
  const rank = card.slice(0, -1);
  return { rank, suit, value: RANK_VALUES[rank] || 0 };
}

// Sort hand by Spades first, then Hearts, Diamonds, Clubs; low to high within suit
export function sortHand(cards) {
  return [...cards].sort((a, b) => {
    const cardA = parseCard(a);
    const cardB = parseCard(b);
    if (SUIT_ORDER[cardA.suit] !== SUIT_ORDER[cardB.suit]) {
      return SUIT_ORDER[cardB.suit] - SUIT_ORDER[cardA.suit];
    }
    return cardA.value - cardB.value;
  });
}

// AI Bid calculation based on hand strength
export function calculateAIBid(hand) {
  let score = 0;
  const suitCounts = { '♠': 0, '♥': 0, '♦': 0, '♣': 0 };

  for (const card of hand) {
    const { rank, suit } = parseCard(card);
    suitCounts[suit] = (suitCounts[suit] || 0) + 1;
    if (rank === 'A') score += 1.2;
    else if (rank === 'K') score += 0.8;
    else if (rank === 'Q') score += 0.4;
  }

  // Bonus for spades length
  if (suitCounts['♠'] >= 4) {
    score += (suitCounts['♠'] - 3) * 0.7;
  }

  let bid = Math.round(score);
  if (bid < 1) bid = 1;
  if (bid > 6) bid = 6;
  return bid;
}

// Determine valid moves for a player given the current trick
export function getValidMoves(hand, currentTrick) {
  if (currentTrick.length === 0) {
    // Lead player can play anything
    return [...hand];
  }

  const leadCard = parseCard(currentTrick[0].card);
  const leadSuit = leadCard.suit;

  // Find all cards of the lead suit in hand
  const sameSuitCards = hand.filter(c => parseCard(c).suit === leadSuit);

  if (sameSuitCards.length > 0) {
    // Must follow suit!
    // In Call Break, players must try to play higher than current winning lead card if possible
    let currentHighLeadValue = 0;
    for (const t of currentTrick) {
      const tc = parseCard(t.card);
      if (tc.suit === leadSuit && tc.value > currentHighLeadValue) {
        currentHighLeadValue = tc.value;
      }
    }

    const higherSameSuit = sameSuitCards.filter(c => parseCard(c).value > currentHighLeadValue);
    if (higherSameSuit.length > 0) {
      return higherSameSuit;
    }
    return sameSuitCards;
  }

  // If void in lead suit, player can play Spade (trump) or discard anything
  const spadeCards = hand.filter(c => parseCard(c).suit === '♠');
  if (spadeCards.length > 0) {
    // If spades have already been played, player must beat the highest spade if possible
    let currentHighSpade = 0;
    for (const t of currentTrick) {
      const tc = parseCard(t.card);
      if (tc.suit === '♠' && tc.value > currentHighSpade) {
        currentHighSpade = tc.value;
      }
    }

    if (currentHighSpade > 0) {
      const higherSpades = spadeCards.filter(c => parseCard(c).value > currentHighSpade);
      if (higherSpades.length > 0) {
        // Can also discard off-suit if choosing not to trump, but standard Callbreak requires trumping if possible or discarding
        return [...higherSpades, ...hand.filter(c => parseCard(c).suit !== '♠')];
      }
    }
    return [...hand];
  }

  // Completely void of lead suit and no spades: can play any card
  return [...hand];
}

// Determine winner of a completed 4-card trick
export function determineTrickWinner(trick) {
  if (trick.length !== 4) return null;

  const leadCard = parseCard(trick[0].card);
  let winningEntry = trick[0];
  let winningCard = leadCard;
  let winningIsTrump = leadCard.suit === '♠';

  for (let i = 1; i < 4; i++) {
    const entry = trick[i];
    const card = parseCard(entry.card);

    if (card.suit === '♠') {
      if (!winningIsTrump) {
        winningEntry = entry;
        winningCard = card;
        winningIsTrump = true;
      } else if (card.value > winningCard.value) {
        winningEntry = entry;
        winningCard = card;
      }
    } else if (!winningIsTrump && card.suit === leadCard.suit) {
      if (card.value > winningCard.value) {
        winningEntry = entry;
        winningCard = card;
      }
    }
  }

  return winningEntry.player;
}

// AI decision for selecting a card from valid options
export function chooseAICard(validCards, currentTrick, hand) {
  if (validCards.length === 1) return validCards[0];

  if (currentTrick.length === 0) {
    // Leading: prefer leading high card of non-spade suit or low card
    const nonSpades = validCards.filter(c => parseCard(c).suit !== '♠');
    if (nonSpades.length > 0) {
      // Find Aces or Kings to lead
      const aces = nonSpades.filter(c => parseCard(c).rank === 'A');
      if (aces.length > 0) return aces[0];
      // Otherwise lead a low card
      nonSpades.sort((a, b) => parseCard(a).value - parseCard(b).value);
      return nonSpades[0];
    }
    // If only spades, lead lowest spade
    validCards.sort((a, b) => parseCard(a).value - parseCard(b).value);
    return validCards[0];
  }

  // Following:
  const leadSuit = parseCard(currentTrick[0].card).suit;
  const leadCards = validCards.filter(c => parseCard(c).suit === leadSuit);

  if (leadCards.length > 0) {
    // Try to win with the lowest possible winning card
    leadCards.sort((a, b) => parseCard(a).value - parseCard(b).value);
    return leadCards[leadCards.length - 1]; // or smart choice
  }

  // Trumping: if choosing to trump, play lowest trump that can win
  const spades = validCards.filter(c => parseCard(c).suit === '♠');
  if (spades.length > 0) {
    spades.sort((a, b) => parseCard(a).value - parseCard(b).value);
    return spades[0];
  }

  // Throw away lowest card
  const sorted = [...validCards].sort((a, b) => parseCard(a).value - parseCard(b).value);
  return sorted[0];
}

// Compute scores at the end of round
export function computeRoundScores(bids, tricksWon) {
  const roundScores = {};
  for (const player of PLAYERS) {
    const bid = bids[player] || 1;
    const won = tricksWon[player] || 0;
    if (won >= bid) {
      roundScores[player] = parseFloat((bid + (won - bid) * 0.1).toFixed(1));
    } else {
      roundScores[player] = -bid;
    }
  }
  return roundScores;
}
