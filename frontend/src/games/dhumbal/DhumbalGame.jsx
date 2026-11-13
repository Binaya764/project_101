import React, { useState, useEffect } from 'react';
import PlayingCard from '../shared/PlayingCard';
import {
  DHUMBAL_PLAYERS,
  DHUMBAL_PLAYER_INFO,
  getCardPoints,
  getHandPoints,
  isValidDiscardSet,
  findBestAIDiscard,
  shouldAICallDhumbal
} from './dhumbalLogic';
import { createDeck, shuffle, parseCard } from '../callbreak/callBreakLogic';
import { soundManager } from '../../utils/audio';

export default function DhumbalGame({ onClose }) {
  const [round, setRound] = useState(1);
  const [deck, setDeck] = useState([]);
  const [hands, setHands] = useState({ south: [], east: [], north: [], west: [] });
  const [discardPile, setDiscardPile] = useState([]);
  const [scores, setScores] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [currentTurn, setCurrentTurn] = useState('south');
  const [turnStep, setTurnStep] = useState('discard'); // 'discard' | 'draw'
  const [selectedCards, setSelectedCards] = useState([]);
  const [statusMessage, setStatusMessage] = useState('Select card(s) to discard or call Dhumbal if points <= 10.');
  const [showdown, setShowdown] = useState(null); // { caller, winner, caught, pointsMap }
  const [showRules, setShowRules] = useState(false);

  // Initialize a new game/round
  const startRound = (roundNum) => {
    const fullDeck = shuffle(createDeck());
    const newHands = {
      south: fullDeck.slice(0, 5),
      east: fullDeck.slice(5, 10),
      north: fullDeck.slice(10, 15),
      west: fullDeck.slice(15, 20)
    };
    const topDiscard = fullDeck[20];
    const remainingDeck = fullDeck.slice(21);

    setDeck(remainingDeck);
    setHands(newHands);
    setDiscardPile([topDiscard]);
    setSelectedCards([]);
    setShowdown(null);
    setCurrentTurn('south');
    setTurnStep('discard');
    setStatusMessage('Select 1 or more matching cards to discard, or call Dhumbal if ≤10 pts.');
  };

  useEffect(() => {
    startRound(1);
  }, []);

  // South selects/unselects cards
  const handleToggleCardSelection = (card) => {
    if (currentTurn !== 'south' || turnStep !== 'discard') return;

    soundManager.playCardPlay();
    if (selectedCards.includes(card)) {
      setSelectedCards(selectedCards.filter(c => c !== card));
    } else {
      setSelectedCards([...selectedCards, card]);
    }
  };

  // South executes discard
  const handleUserDiscard = () => {
    if (selectedCards.length === 0) {
      setStatusMessage('Please select at least 1 card to discard.');
      return;
    }

    if (!isValidDiscardSet(selectedCards)) {
      setStatusMessage('Invalid set! Discard a single card, pair/triplet of same rank, or 3+ same-suit run.');
      return;
    }

    soundManager.playCardPlay();
    // Remove selected from South's hand
    const remainingHand = hands.south.filter(c => !selectedCards.includes(c));
    setHands(prev => ({ ...prev, south: remainingHand }));
    // Add to discard pile
    setDiscardPile(prev => [...selectedCards, ...prev]);
    setSelectedCards([]);
    setTurnStep('draw');
    setStatusMessage('Now draw 1 card from the Draw Pile or the Discard Pile.');
  };

  // South executes draw
  const handleUserDraw = (source) => {
    if (currentTurn !== 'south' || turnStep !== 'draw') return;

    soundManager.playCardPlay();
    let drawnCard = null;
    let newDeck = [...deck];
    let newDiscard = [...discardPile];

    if (source === 'deck') {
      if (newDeck.length === 0) {
        // reshuffle discard except top
        const recycled = shuffle(newDiscard.slice(1));
        newDeck = recycled;
        newDiscard = [newDiscard[0]];
      }
      drawnCard = newDeck[0];
      newDeck = newDeck.slice(1);
    } else if (source === 'discard') {
      if (newDiscard.length > 0) {
        drawnCard = newDiscard[0];
        newDiscard = newDiscard.slice(1);
      }
    }

    if (!drawnCard) return;

    setDeck(newDeck);
    setDiscardPile(newDiscard);
    setHands(prev => ({ ...prev, south: [...prev.south, drawnCard] }));
    setTurnStep('discard');

    // Pass turn to next player
    passTurnToNext('south');
  };

  // Human calls DHUMBAL!
  const handleCallDhumbal = () => {
    const southPoints = getHandPoints(hands.south);
    if (southPoints > 10) {
      setStatusMessage('You can only call Dhumbal when your hand has 10 points or fewer!');
      return;
    }
    triggerShowdown('south');
  };

  // Trigger Showdown when someone calls Dhumbal
  const triggerShowdown = (caller) => {
    const pointsMap = {};
    DHUMBAL_PLAYERS.forEach(p => {
      pointsMap[p] = getHandPoints(hands[p]);
    });

    const callerPoints = pointsMap[caller];
    let minPoints = 999;
    let minPlayer = caller;

    DHUMBAL_PLAYERS.forEach(p => {
      if (pointsMap[p] < minPoints) {
        minPoints = pointsMap[p];
        minPlayer = p;
      }
    });

    const isCaught = minPlayer !== caller || Object.entries(pointsMap).some(([p, pts]) => p !== caller && pts <= callerPoints);

    let roundPenalty = {};
    if (!isCaught) {
      // Caller wins cleanly!
      DHUMBAL_PLAYERS.forEach(p => {
        roundPenalty[p] = p === caller ? 0 : pointsMap[p];
      });
      soundManager.playWinFanfare();
      setStatusMessage(`${DHUMBAL_PLAYER_INFO[caller].name} successfully called DHUMBAL! 🏆`);
    } else {
      // Caller was caught ("फाउल")! Penalty of 20
      DHUMBAL_PLAYERS.forEach(p => {
        if (p === caller) {
          roundPenalty[p] = 20;
        } else if (p === minPlayer) {
          roundPenalty[p] = 0;
        } else {
          roundPenalty[p] = pointsMap[p];
        }
      });
      soundManager.playTrickWon();
      setStatusMessage(`${DHUMBAL_PLAYER_INFO[caller].name} was CAUGHT by ${DHUMBAL_PLAYER_INFO[minPlayer].name}! 20 Penalty points!`);
    }

    // Update cumulative scores
    setScores(prev => {
      const updated = {};
      DHUMBAL_PLAYERS.forEach(p => {
        updated[p] = (prev[p] || 0) + roundPenalty[p];
      });
      return updated;
    });

    setShowdown({
      caller,
      winner: isCaught ? minPlayer : caller,
      caught: isCaught,
      pointsMap,
      penalties: roundPenalty
    });
  };

  // Advance turn clockwise
  const passTurnToNext = (fromPlayer) => {
    const idx = DHUMBAL_PLAYERS.indexOf(fromPlayer);
    const nextPlayer = DHUMBAL_PLAYERS[(idx + 1) % 4];
    setCurrentTurn(nextPlayer);
  };

  // AI Turn handler with lifelike pacing
  useEffect(() => {
    if (showdown || currentTurn === 'south') return;

    const timer = setTimeout(() => {
      const aiHand = hands[currentTurn];
      if (!aiHand || aiHand.length === 0) return;

      // 1. Check if AI should call Dhumbal
      if (shouldAICallDhumbal(aiHand, round)) {
        triggerShowdown(currentTurn);
        return;
      }

      // 2. Select AI discard
      const cardsToDiscard = findBestAIDiscard(aiHand);
      soundManager.playCardPlay();

      const remainingAIHand = aiHand.filter(c => !cardsToDiscard.includes(c));
      const newDiscardPile = [...cardsToDiscard, ...discardPile];

      // 3. AI decides to draw from deck or top discard
      let newDeck = [...deck];
      let finalDiscardPile = newDiscardPile;
      let drawnCard = null;

      const topDiscardCard = discardPile[0];
      const topDiscardPoints = topDiscardCard ? getCardPoints(topDiscardCard) : 99;

      // Draw from discard if it's very low points (Ace or 2)
      if (topDiscardPoints <= 2 && Math.random() < 0.6) {
        drawnCard = topDiscardCard;
        finalDiscardPile = newDiscardPile.slice(1);
      } else {
        if (newDeck.length === 0) {
          newDeck = shuffle(finalDiscardPile.slice(1));
          finalDiscardPile = [finalDiscardPile[0]];
        }
        drawnCard = newDeck[0];
        newDeck = newDeck.slice(1);
      }

      setDeck(newDeck);
      setDiscardPile(finalDiscardPile);
      setHands(prev => ({
        ...prev,
        [currentTurn]: [...remainingAIHand, drawnCard]
      }));

      setStatusMessage(`${DHUMBAL_PLAYER_INFO[currentTurn].name} discarded ${cardsToDiscard.length} card(s) and drew a card.`);
      passTurnToNext(currentTurn);
    }, 900);

    return () => clearTimeout(timer);
  }, [currentTurn, hands, deck, discardPile, showdown]);

  const southPoints = getHandPoints(hands.south);
  const isValidSelection = isValidDiscardSet(selectedCards);

  return (
    <div className="game-container dhumbal-container">
      {/* Top Bar */}
      <div className="game-topbar">
        <div className="game-title-group">
          <span className="game-badge">Nepali Fast Taas</span>
          <h3>Dhumbal / Jhyap (धुम्बाल)</h3>
          <span className="round-pill">Round {round}</span>
        </div>

        <div className="game-controls">
          <button className="btn-icon" onClick={() => setShowRules(!showRules)}>
            📖 Rules
          </button>
          <button className="btn-icon" onClick={() => startRound(1)}>
            🔄 Restart
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
            <h4>📖 Dhumbal / Jhyap Rules</h4>
            <ul>
              <li><strong>Objective:</strong> Lower your hand's total point value.</li>
              <li>A = 1 pt, 2-10 = face value, J = 11, Q = 12, K = 13.</li>
              <li>Discard 1 card, matching pairs/triplets, or same-suit sequences (3+ cards).</li>
              <li>Draw 1 card from the Draw pile or the Discard pile.</li>
              <li>When your points are <strong>10 or less</strong>, hit <strong>DHUMBAL!</strong></li>
              <li>If another player has ≤ your points, you get caught (20 penalty pts)!</li>
            </ul>
            <button className="btn-primary" onClick={() => setShowRules(false)}>
              Got it!
            </button>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="card-table dhumbal-table">
        <div className="table-felt">
          {/* North Opponent (Puja) */}
          <div className={`player-seat seat-north ${currentTurn === 'north' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{DHUMBAL_PLAYER_INFO.north.avatar}</span>
              <div className="player-details">
                <span className="name">{DHUMBAL_PLAYER_INFO.north.name}</span>
                <span className="bid-info">Penalties: {scores.north} pts</span>
              </div>
            </div>
            <div className="opponent-hand horizontal">
              {hands.north.map((_, i) => (
                <PlayingCard key={i} isFaceDown small />
              ))}
            </div>
          </div>

          {/* West Opponent (Bikash) */}
          <div className={`player-seat seat-west ${currentTurn === 'west' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{DHUMBAL_PLAYER_INFO.west.avatar}</span>
              <div className="player-details">
                <span className="name">{DHUMBAL_PLAYER_INFO.west.name}</span>
                <span className="bid-info">Penalties: {scores.west} pts</span>
              </div>
            </div>
            <div className="opponent-hand vertical">
              {hands.west.map((_, i) => (
                <PlayingCard key={i} isFaceDown small />
              ))}
            </div>
          </div>

          {/* Center Table: Draw Pile & Discard Pile */}
          <div className="dhumbal-center-piles">
            {/* Draw Pile */}
            <div className="pile-container draw-pile">
              <span className="pile-label">Draw Pile ({deck.length})</span>
              <div
                className={`card-deck-stack ${currentTurn === 'south' && turnStep === 'draw' ? 'clickable-pile' : ''}`}
                onClick={() => currentTurn === 'south' && turnStep === 'draw' && handleUserDraw('deck')}
              >
                <PlayingCard isFaceDown />
              </div>
            </div>

            {/* Discard Pile */}
            <div className="pile-container discard-pile">
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

          {/* East Opponent (Rohan) */}
          <div className={`player-seat seat-east ${currentTurn === 'east' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{DHUMBAL_PLAYER_INFO.east.avatar}</span>
              <div className="player-details">
                <span className="name">{DHUMBAL_PLAYER_INFO.east.name}</span>
                <span className="bid-info">Penalties: {scores.east} pts</span>
              </div>
            </div>
            <div className="opponent-hand vertical">
              {hands.east.map((_, i) => (
                <PlayingCard key={i} isFaceDown small />
              ))}
            </div>
          </div>

          {/* South Player (Human) */}
          <div className={`player-seat seat-south ${currentTurn === 'south' ? 'active-turn' : ''}`}>
            <div className="south-dashboard">
              <div className="player-badge south-badge">
                <span className="avatar">{DHUMBAL_PLAYER_INFO.south.avatar}</span>
                <div className="player-details">
                  <span className="name">{DHUMBAL_PLAYER_INFO.south.name}</span>
                  <span className="bid-info">
                    Total Hand Points: <strong>{southPoints} pts</strong> | Penalties: {scores.south} pts
                  </span>
                </div>
              </div>

              {/* Action Buttons for South */}
              {currentTurn === 'south' && (
                <div className="south-actions">
                  {turnStep === 'discard' && (
                    <>
                      <button
                        className="btn-action-discard"
                        disabled={selectedCards.length === 0 || !isValidSelection}
                        onClick={handleUserDiscard}
                      >
                        Discard Selected ({selectedCards.length})
                      </button>

                      {southPoints <= 10 && (
                        <button
                          className="btn-action-dhumbal glow-gold"
                          onClick={handleCallDhumbal}
                        >
                          ⚡ DHUMBAL! ({southPoints} pts)
                        </button>
                      )}
                    </>
                  )}

                  {turnStep === 'draw' && (
                    <div className="draw-hint-pill">
                      Click the <strong>Draw Pile</strong> or <strong>Discard Pile</strong> above to draw 1 card.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* South's Cards */}
            <div className="south-hand">
              {hands.south.map(card => {
                const isSelected = selectedCards.includes(card);
                return (
                  <PlayingCard
                    key={card}
                    card={card}
                    selected={isSelected}
                    onClick={() => handleToggleCardSelection(card)}
                    className={isSelected ? 'card-lift' : ''}
                  />
                );
              })}
            </div>
          </div>
        </div>

        {/* Status Bar */}
        <div className="game-status-footer">
          <div className="status-announcer">
            <span className="flame-dot">🪔</span>
            <span>{statusMessage}</span>
          </div>
          <div className="scores-ticker">
            <span>You: {scores.south} pts</span>
            <span>Rohan: {scores.east} pts</span>
            <span>Puja: {scores.north} pts</span>
            <span>Bikash: {scores.west} pts</span>
          </div>
        </div>
      </div>

      {/* Showdown Modal */}
      {showdown && (
        <div className="round-over-modal">
          <div className="round-over-card dhumbal-showdown-card">
            <div className="trophy-icon">
              {showdown.caught ? '⚠️' : '🎉'}
            </div>
            <h3>
              {showdown.caught
                ? 'CAUGHT! Cheating / फाउल'
                : `${DHUMBAL_PLAYER_INFO[showdown.caller].name} Wins the Hand!`}
            </h3>
            <p className="showdown-sub">
              {showdown.caught
                ? `${DHUMBAL_PLAYER_INFO[showdown.caller].name} called Dhumbal with ${showdown.pointsMap[showdown.caller]} pts, but ${DHUMBAL_PLAYER_INFO[showdown.winner].name} had ${showdown.pointsMap[showdown.winner]} pts!`
                : `${DHUMBAL_PLAYER_INFO[showdown.caller].name} called with lowest points (${showdown.pointsMap[showdown.caller]} pts)!`}
            </p>

            <div className="showdown-hands-grid">
              {DHUMBAL_PLAYERS.map(p => (
                <div key={p} className={`showdown-player-card ${p === showdown.winner ? 'winner-card' : ''}`}>
                  <div className="p-header">
                    <span>{DHUMBAL_PLAYER_INFO[p].avatar} {DHUMBAL_PLAYER_INFO[p].name}</span>
                    <span className="pts-pill">{showdown.pointsMap[p]} pts</span>
                  </div>
                  <div className="p-cards">
                    {hands[p].map(c => (
                      <PlayingCard key={c} card={c} small />
                    ))}
                  </div>
                  <div className="p-penalty">
                    Round Penalty: +{showdown.penalties[p]} pts
                  </div>
                </div>
              ))}
            </div>

            <div className="modal-actions">
              <button className="btn-primary" onClick={() => {
                setRound(r => r + 1);
                startRound(round + 1);
              }}>
                Next Hand 🪔
              </button>
              <button className="btn-secondary" onClick={() => {
                setScores({ south: 0, east: 0, north: 0, west: 0 });
                setRound(1);
                startRound(1);
              }}>
                Restart Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
