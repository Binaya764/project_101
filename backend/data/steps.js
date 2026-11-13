// Server owns the rules and answers, so the client cannot read them.
module.exports = [
  {
    id: 1, type: 'bid', title: 'Bidding',
    tip: 'Before play, every player calls how many hands (tricks) they promise to win. Count your sure winners: aces and high spades.',
    hand: ['A♠', 'K♠', 'A♥', '9♦', '4♣'], table: [],
    expected: 'BID_3',
    success: 'Spot on! A♠, K♠ and A♥ are three safe winners, so calling 3 is smart.',
    hints: {
      BID_1: 'Too timid. You have three strong cards. Call a number you can actually reach.',
      BID_2: 'Close, but A♥ is a safe winner too. Count A♠, K♠, A♥.',
      BID_4: 'Too greedy. 9♦ and 4♣ will not win tricks. Call only what you can count.',
      BID_5: 'Way too greedy! Missing your call costs you points.',
    },
    fallback: 'Pick a call between 1 and 5.',
  },
  {
    id: 2, type: 'play', title: 'Following suit',
    tip: 'If a suit is led and you hold that suit, you must follow it. No sneaky discards!',
    hand: ['A♥', '7♠', 'J♣'], table: [{ card: 'K♥', label: 'Opponent leads' }],
    expected: 'A♥',
    success: 'Clean trick! You followed Hearts and your ace beats the king.',
    hints: {
      '7♠': 'Not allowed. Hearts were led and you hold a Heart. You must play it.',
      'J♣': 'Not allowed. You still have a Heart, so you must follow suit.',
    },
    fallback: 'Follow the led suit (♥).',
  },
  {
    id: 3, type: 'play', title: 'Trump (hukum)',
    tip: 'Spades are always trump (hukum). If you have no cards of the led suit, a spade beats any other suit.',
    hand: ['2♠', 'K♣', '9♥'], table: [{ card: 'A♦', label: 'Opponent leads' }],
    expected: '2♠',
    success: 'Hukum! Even your lowest spade crushes an Ace when you are out of Diamonds.',
    hints: {
      'K♣': 'No Diamonds in your hand, so you can cut. A lone K♣ would just lose to the Ace.',
      '9♥': 'That loses. You have no Diamonds, so use your trump spade!',
    },
    fallback: 'You have no Diamonds. Use your Spade trump card!',
  },
  {
    id: 4, type: 'play', title: 'Over-trumping',
    tip: 'If someone already trumped, you must play a higher spade to win the trick, if you can.',
    hand: ['3♠', '8♠', '9♦'],
    table: [{ card: 'Q♣', label: 'Opponent 1 leads' }, { card: '5♠', label: 'Opponent 2 cuts' }],
    expected: '8♠',
    success: 'Over-trumped! Your 8♠ beats the 5♠ and wins the trick.',
    hints: {
      '3♠': 'Legal, but 3♠ is lower than their 5♠. If you can beat it, you must.',
      '9♦': 'Not allowed. You have no Clubs, so you must trump, and you can beat their 5♠.',
    },
    fallback: 'Someone already cut with 5♠. Play a higher Spade to win!',
  },
];
