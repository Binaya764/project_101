import React, { useState, useEffect } from 'react';
import PlayingCard from '../shared/PlayingCard';
import {
  MARRIAGE_PLAYERS,
  MARRIAGE_PLAYER_INFO,
  createTripleDeck,
  analyzeMarriageHand,
  sortMarriageBySuit,
  sortMarriageByRank
} from './marriageLogic';
import { shuffle } from '../callbreak/callBreakLogic';
import { soundManager } from '../../utils/audio';

export default function MarriageGame({ onClose }) {
  const [deck, setDeck] = useState([]);
  const [hands, setHands] = useState({ south: [], east: [], west: [] });
  const [discardPile, setDiscardPile] = useState([]);
  const [currentTurn, setCurrentTurn] = useState('south');
  const [turnStep, setTurnStep] = useState('draw'); // 'draw' | 'discard'
  const [selectedCard, setSelectedCard] = useState(null);
  const [statusMessage, setStatusMessage] = useState('Draw 1 card from the Closed Deck or Discard Pile.');
  const [winner, setWinner] = useState(null);
  const [showRules, setShowRules] = useState(false);
  const [sortMode, setSortMode] = useState('suit'); // 'suit' | 'rank'

  const startNewGame = () => {
    const fullDeck = shuffle(createTripleDeck());
    const southHand = sortMarriageBySuit(fullDeck.slice(0, 21));
    const eastHand = sortMarriageBySuit(fullDeck.slice(21, 42));
    const westHand = sortMarriageBySuit(fullDeck.slice(42, 63));
    const topDiscard = fullDeck[63];
    const remainingDeck = fullDeck.slice(64);

    setDeck(remainingDeck);
    setHands({ south: southHand, east: eastHand, west: westHand });
    setDiscardPile([topDiscard]);
    setSelectedCard(null);
    setWinner(null);
    setCurrentTurn('south');
    setTurnStep('draw');
    setStatusMessage('Your turn! Draw 1 card from the Closed Deck or Discard Pile.');
  };

  useEffect(() => {
    startNewGame();
  }, []);

  // Sort human hand
  const handleSort = (mode) => {
    setSortMode(mode);
    soundManager.playCardPlay();
    if (mode === 'suit') {
      setHands(prev => ({ ...prev, south: sortMarriageBySuit(prev.south) }));
    } else {
      setHands(prev => ({ ...prev, south: sortMarriageByRank(prev.south) }));
    }
  };

  // Human draws card
  const handleUserDraw = (source) => {
    if (currentTurn !== 'south' || turnStep !== 'draw') return;

    soundManager.playCardPlay();
    let drawn = null;
    let newDeck = [...deck];
    let newDiscard = [...discardPile];

    if (source === 'deck') {
      drawn = newDeck[0];
      newDeck = newDeck.slice(1);
    } else {
      drawn = newDiscard[0];
      newDiscard = newDiscard.slice(1);
    }

    if (!drawn) return;

    const newSouth = sortMode === 'suit'
      ? sortMarriageBySuit([...hands.south, drawn])
      : sortMarriageByRank([...hands.south, drawn]);

    setDeck(newDeck);
    setDiscardPile(newDiscard);
    setHands(prev => ({ ...prev, south: newSouth }));
    setTurnStep('discard');
    setStatusMessage('Select 1 card from your 22 cards to discard.');
  };

  // Human selects card to discard
  const handleSelectCard = (card) => {
    if (currentTurn !== 'south' || turnStep !== 'discard') return;
    soundManager.playCardPlay();
    setSelectedCard(card === selectedCard ? null : card);
  };

  // Human executes discard
  const handleUserDiscard = () => {
    if (!selectedCard) {
      setStatusMessage('Please click a card from your hand to discard.');
      return;
    }

    soundManager.playCardPlay();
    const idx = hands.south.indexOf(selectedCard);
    const newHand = [...hands.south.slice(0, idx), ...hands.south.slice(idx + 1)];

    setHands(prev => ({ ...prev, south: newHand }));
    setDiscardPile(prev => [selectedCard, ...prev]);
    setSelectedCard(null);
    setTurnStep('draw');

    // Check if south declared
    const analysis = analyzeMarriageHand(newHand);
    if (analysis.totalValidMelds >= 3) {
      // Can declare!
    }

    // Pass turn to East
    setCurrentTurn('east');
    setStatusMessage('Sita is taking her turn...');
  };

  // Human declares Show / Win
  const handleDeclareShow = () => {
    const analysis = analyzeMarriageHand(hands.south);
    if (analysis.totalValidMelds >= 3) {
      soundManager.playWinFanfare();
      setWinner('south');
      setStatusMessage('Congratulations! You declared a winning Marriage hand! 🎉🪔');
    } else {
      setStatusMessage('You need at least 3 valid pure sequences or tunnellas to declare Show!');
    }
  };

  // AI Turn simulator
  useEffect(() => {
    if (winner || currentTurn === 'south') return;

    const timer = setTimeout(() => {
      const aiHand = hands[currentTurn];
      if (!aiHand || aiHand.length === 0) return;

      // Draw from deck
      let newDeck = [...deck];
      const drawn = newDeck[0] || '10♠';
      newDeck = newDeck.slice(1);

      // Discard a random card not part of pure sequence
      const discarded = aiHand[Math.floor(Math.random() * aiHand.length)];
      const updatedHand = aiHand.filter(c => c !== discarded);

      setDeck(newDeck);
      setDiscardPile(prev => [discarded, ...prev]);
      setHands(prev => ({
        ...prev,
        [currentTurn]: [...updatedHand, drawn]
      }));

      soundManager.playCardPlay();

      // Check if AI randomly completes
      const aiAnalysis = analyzeMarriageHand(updatedHand);
      if (aiAnalysis.totalValidMelds >= 4) {
        soundManager.playTrickWon();
        setWinner(currentTurn);
        setStatusMessage(`${MARRIAGE_PLAYER_INFO[currentTurn].name} has declared Show and won!`);
        return;
      }

      // Next player
      if (currentTurn === 'east') {
        setCurrentTurn('west');
        setStatusMessage('Biraj is taking his turn...');
      } else {
        setCurrentTurn('south');
        setTurnStep('draw');
        setStatusMessage('Your turn! Draw 1 card from the Deck or Discard pile.');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [currentTurn, hands, deck, discardPile, winner]);

  const southAnalysis = analyzeMarriageHand(hands.south);

  return (
    <div className="game-container marriage-container">
      {/* Top Bar */}
      <div className="game-topbar">
        <div className="game-title-group">
          <span className="game-badge">Nepali 21-Card Classic</span>
          <h3>Marriage (म्यरिज - २१ तास)</h3>
        </div>

        <div className="game-controls">
          <button className="btn-icon" onClick={() => setShowRules(!showRules)}>
            📖 Rules
          </button>
          <button className="btn-icon" onClick={startNewGame}>
            🔄 New Game
          </button>
          {onClose && (
            <button className="btn-icon btn-close" onClick={onClose}>
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="game-rules-modal">
          <div className="rules-content">
            <h4>📖 Simplified Nepali Marriage Rules</h4>
            <ul>
              <li>Played with <strong>3 decks (156 cards)</strong>. 3 players receive 21 cards each.</li>
              <li><strong>Objective:</strong> Group 21 cards into Pure Runs and Tunnellas.</li>
              <li><strong>Pure Run:</strong> 3 or more consecutive cards of the exact same suit (e.g. 7♦ 8♦ 9♦).</li>
              <li><strong>Tunnella:</strong> 3 identical cards (same rank and same suit, e.g. Q♠ Q♠ Q♠).</li>
              <li>Draw 1 card from the deck or discard pile, then discard 1 card.</li>
              <li>When you have at least <strong>3 valid melds</strong>, hit <strong>Declare Show</strong>!</li>
            </ul>
            <button className="btn-primary" onClick={() => setShowRules(false)}>
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Game Table */}
      <div className="card-table marriage-table">
        <div className="table-felt">
          {/* Opponents Row */}
          <div className="marriage-opponents-row">
            {/* Sita (East) */}
            <div className={`marriage-opponent ${currentTurn === 'east' ? 'active-turn' : ''}`}>
              <div className="player-badge">
                <span className="avatar">{MARRIAGE_PLAYER_INFO.east.avatar}</span>
                <span className="name">{MARRIAGE_PLAYER_INFO.east.name}</span>
                <span className="card-count">21 Cards</span>
              </div>
            </div>

            {/* Center Piles */}
            <div className="marriage-center-piles">
              {/* Draw Pile */}
              <div className="pile-container">
                <span className="pile-label">Deck ({deck.length})</span>
                <div
                  className={`card-deck-stack ${currentTurn === 'south' && turnStep === 'draw' ? 'clickable-pile' : ''}`}
                  onClick={() => currentTurn === 'south' && turnStep === 'draw' && handleUserDraw('deck')}
                >
                  <PlayingCard isFaceDown />
                </div>
              </div>

              {/* Discard Pile */}
              <div className="pile-container">
                <span className="pile-label">Discard Pile</span>
                <div
                  className={`discard-top-card ${currentTurn === 'south' && turnStep === 'draw' ? 'clickable-pile' : ''}`}
                  onClick={() => currentTurn === 'south' && turnStep === 'draw' && handleUserDraw('discard')}
                >
                  {discardPile.length > 0 ? (
                    <PlayingCard card={discardPile[0]} pop />
                  ) : (
                    <div className="empty-pile">Empty</div>
                  )}
                </div>
              </div>
            </div>

            {/* Biraj (West) */}
            <div className={`marriage-opponent ${currentTurn === 'west' ? 'active-turn' : ''}`}>
              <div className="player-badge">
                <span className="avatar">{MARRIAGE_PLAYER_INFO.west.avatar}</span>
                <span className="name">{MARRIAGE_PLAYER_INFO.west.name}</span>
                <span className="card-count">21 Cards</span>
              </div>
            </div>
          </div>

          {/* South Dashboard */}
          <div className="marriage-south-panel">
            <div className="marriage-meld-stats">
              <div className="stats-badges">
                <span className="meld-badge">
                  🎯 Pure Runs: <strong>{southAnalysis.pureRuns.length}</strong>
                </span>
                <span className="meld-badge">
                  💎 Tunnellas: <strong>{southAnalysis.tunnellas.length}</strong>
                </span>
                <span className="meld-badge highlight">
                  Total Melds: <strong>{southAnalysis.totalValidMelds} / 3 needed</strong>
                </span>
              </div>

              <div className="marriage-hand-sorters">
                <button
                  className={`btn-sort ${sortMode === 'suit' ? 'active' : ''}`}
                  onClick={() => handleSort('suit')}
                >
                  ♠ Sort by Suit
                </button>
                <button
                  className={`btn-sort ${sortMode === 'rank' ? 'active' : ''}`}
                  onClick={() => handleSort('rank')}
                >
                  🔢 Sort by Rank
                </button>

                {currentTurn === 'south' && turnStep === 'discard' && (
                  <button
                    className="btn-action-discard"
                    disabled={!selectedCard}
                    onClick={handleUserDiscard}
                  >
                    Discard {selectedCard || 'Card'}
                  </button>
                )}

                {southAnalysis.totalValidMelds >= 3 && (
                  <button
                    className="btn-action-dhumbal glow-gold"
                    onClick={handleDeclareShow}
                  >
                    🏆 Declare Show!
                  </button>
                )}
              </div>
            </div>

            {/* 21 Cards Hand */}
            <div className="marriage-hand-tray">
              {hands.south.map((card, idx) => {
                const isSelected = selectedCard === card;
                return (
                  <PlayingCard
                    key={`${card}-${idx}`}
                    card={card}
                    selected={isSelected}
                    onClick={() => handleSelectCard(card)}
                    className="marriage-fan-card"
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Status bar */}
        <div className="game-status-footer">
          <div className="status-announcer">
            <span className="flame-dot">🪔</span>
            <span>{statusMessage}</span>
          </div>
        </div>
      </div>

      {/* Win Modal */}
      {winner && (
        <div className="round-over-modal">
          <div className="round-over-card">
            <div className="trophy-icon">🏆</div>
            <h3>
              {winner === 'south'
                ? 'Congratulations! You Won Marriage!'
                : `${MARRIAGE_PLAYER_INFO[winner].name} Won the Game!`}
            </h3>
            <p className="showdown-sub">
              {winner === 'south'
                ? 'Your pure runs and tunnellas were verified. Tihar Mubarak!'
                : 'Better luck in the next round of Marriage!'}
            </p>
            <div className="modal-actions">
              <button className="btn-primary" onClick={startNewGame}>
                Play Another Game 🪔
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
