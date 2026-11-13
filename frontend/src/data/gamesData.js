// Metadata and rules for Tihar Traditional Card Games

export const GAMES_DATA = [
  {
    id: "callbreak",
    title: "Call Break",
    nepaliTitle: "कल ब्रेक",
    players: "4 Players",
    duration: "5 - 10 mins",
    difficulty: "Medium",
    badge: "Most Popular",
    tagline: "Strategic trick-taking where Spades rule supreme",
    description: "The undisputed king of Nepali card nights. Bid your tricks accurately, follow suit, trump with Spades (Hukum), and outsmart the AI table.",
    rules: [
      "Standard 52-card deck dealt equally (13 cards each) to 4 players.",
      "Spades (♠) are permanent trump (Hukum).",
      "Each player bids (calls) the number of tricks they expect to win (1 to 8).",
      "You MUST follow the suit led if you have it.",
      "If you cannot follow suit, you may play a Spade trump to win the trick.",
      "Making your bid awards your bid points (plus 0.1 for each extra trick / 'over-trick'). Failing your bid subtracts the bid value!"
    ]
  },
  {
    id: "dhumbal",
    title: "Dhumbal (Jhyap)",
    nepaliTitle: "धुम्बाल / झ्याप",
    players: "4 Players",
    duration: "3 - 5 mins",
    difficulty: "Easy / Fast",
    badge: "Festive Favorite",
    tagline: "Shed high cards, bluff your opponents, and call Jhyap!",
    description: "The fast-paced, addictive Nepali classic. Discard pairs, triplets, or runs to lower your total points, and claim victory when your hand is 10 or less.",
    rules: [
      "Each player receives 5 cards.",
      "Card values: Ace = 1, 2-10 = face value, Jack = 11, Queen = 12, King = 13.",
      "On your turn, discard 1 or more matching cards (single, pair, triplet, or 3+ same-suit sequence) and draw 1 card.",
      "When your total card sum is 10 or less, you can hit 'DHUMBAL!' instead of discarding.",
      "If you have the lowest points, you win 0 penalty points! But beware: if an opponent has equal or fewer points, you get caught ('Cheating/फाउल') and suffer 20 penalty points!"
    ]
  },
  {
    id: "marriage",
    title: "Marriage (21 Cards)",
    nepaliTitle: "म्यरिज",
    players: "3 Players",
    duration: "8 - 12 mins",
    difficulty: "Advanced",
    badge: "Traditional Classic",
    tagline: "The legendary 21-card rummy game of Nepali households",
    description: "No Tihar night is complete without Marriage. Group your 21 cards into pure sequences (runs) and tunnellas (three identical cards) to declare victory.",
    rules: [
      "Played with 3 decks of 52 cards shuffled together (total 156 cards).",
      "Each player is dealt 21 cards.",
      "Objective: Group cards into valid combinations: Pure Sequences (3+ consecutive same suit) and Tunnellas (3 identical cards).",
      "Turn sequence: Draw 1 card from the closed deck or top discard, organize your melds, then discard 1 card.",
      "Use 'Sort by Suit' or 'Sort by Rank' to quickly organize your hand.",
      "Declare 'Show' when you have formed required pure sequences!"
    ]
  }
];
