import React, { useState, useEffect } from 'react';
import PlayingCard from '../shared/PlayingCard';
import {
  PLAYERS,
  PLAYER_INFO,
  createDeck,
  shuffle,
  sortHand,
  calculateAIBid,
  getValidMoves,
  determineTrickWinner,
  chooseAICard,
  computeRoundScores
} from './callBreakLogic';
import { soundManager } from '../../utils/audio';

export default function CallBreakGame({ onClose }) {
  const [roundNumber, setRoundNumber] = useState(1);
  const [phase, setPhase] = useState('bidding'); // 'bidding' | 'playing' | 'roundOver'
  const [hands, setHands] = useState({ south: [], east: [], north: [], west: [] });
  const [bids, setBids] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [tricksWon, setTricksWon] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [cumulativeScores, setCumulativeScores] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [currentTurn, setCurrentTurn] = useState('south');
  const [currentTrick, setCurrentTrick] = useState([]); // [{ player, card }]
  const [lastTrickWinner, setLastTrickWinner] = useState(null);
  const [trickCount, setTrickCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Welcome to Call Break! Place your bid.');
  const [showRules, setShowRules] = useState(false);
  const [shakeCard, setShakeCard] = useState(null);

  // Initialize new round
  const startNewRound = (roundNum) => {
    const deck = shuffle(createDeck());
    const newHands = {
      south: sortHand(deck.slice(0, 13)),
      east: sortHand(deck.slice(13, 26)),
      north: sortHand(deck.slice(26, 39)),
      west: sortHand(deck.slice(39, 52))
    };

    setHands(newHands);
    setTricksWon({ south: 0, east: 0, north: 0, west: 0 });
    setCurrentTrick([]);
    setLastTrickWinner(null);
    setTrickCount(0);
    setPhase('bidding');
    setCurrentTurn('south');
    setStatusMessage('Place your bid (1 to 8 tricks).');

    // Calculate AI bids
    const aiBids = {
      east: calculateAIBid(newHands.east),
      north: calculateAIBid(newHands.north),
      west: calculateAIBid(newHands.west)
    };
    setBids({ south: 0, ...aiBids });
  };

  useEffect(() => {
    startNewRound(1);
  }, []);

  // Handle user placing a bid
  const handleUserBid = (bidAmount) => {
    soundManager.playCardPlay();
    setBids(prev => ({ ...prev, south: bidAmount }));
    setPhase('playing');
    setCurrentTurn('south');
    setStatusMessage(`You bid ${bidAmount}. It's your turn to lead the first trick.`);
  };

  // Human player plays a card
  const handleCardClick = (card) => {
    if (phase !== 'playing' || currentTurn !== 'south') return;

    const validMoves = getValidMoves(hands.south, currentTrick);
    if (!validMoves.includes(card)) {
      setShakeCard(card);
      soundManager.playCardPlay();
      setStatusMessage('Must follow suit or play higher card according to Call Break rules!');
      setTimeout(() => setShakeCard(null), 400);
      return;
    }

    playCardForPlayer('south', card);
  };

  // Play card helper
  const playCardForPlayer = (player, card) => {
    soundManager.playCardPlay();

    setHands(prev => ({
      ...prev,
      [player]: prev[player].filter(c => c !== card)
    }));

    const newTrick = [...currentTrick, { player, card }];
    setCurrentTrick(newTrick);

    // If trick complete (4 cards)
    if (newTrick.length === 4) {
      const winner = determineTrickWinner(newTrick);
      setLastTrickWinner(winner);
      setStatusMessage(`${PLAYER_INFO[winner].name} wins trick ${trickCount + 1}!`);

      setTimeout(() => {
        soundManager.playTrickWon();
        setTricksWon(prev => ({ ...prev, [winner]: prev[winner] + 1 }));
        setCurrentTrick([]);
        const nextTrickCount = trickCount + 1;
        setTrickCount(nextTrickCount);

        if (nextTrickCount >= 13) {
          endRound({ ...tricksWon, [winner]: tricksWon[winner] + 1 });
        } else {
          setCurrentTurn(winner);
          setStatusMessage(`${PLAYER_INFO[winner].name} leads the next trick.`);
        }
      }, 1200);
    } else {
      const currentIndex = PLAYERS.indexOf(player);
      const nextPlayer = PLAYERS[(currentIndex + 1) % 4];
      setCurrentTurn(nextPlayer);
    }
  };

  // AI Turn handler
  useEffect(() => {
    if (phase !== 'playing' || currentTurn === 'south') return;
    if (currentTrick.length >= 4) return;

    const timer = setTimeout(() => {
      const aiHand = hands[currentTurn];
      if (!aiHand || aiHand.length === 0) return;

      const validMoves = getValidMoves(aiHand, currentTrick);
      const chosenCard = chooseAICard(validMoves, currentTrick, aiHand);
      playCardForPlayer(currentTurn, chosenCard);
    }, 700);

    return () => clearTimeout(timer);
  }, [phase, currentTurn, currentTrick, hands]);

  // End of Round scoring
  const endRound = (finalTricks) => {
    setPhase('roundOver');
    const roundScores = computeRoundScores(bids, finalTricks);
    setCumulativeScores(prev => {
      const updated = {};
      PLAYERS.forEach(p => {
        updated[p] = parseFloat(((prev[p] || 0) + roundScores[p]).toFixed(1));
      });
      return updated;
    });

    if (finalTricks.south >= bids.south) {
      soundManager.playWinFanfare();
      setStatusMessage(`Round ${roundNumber} Complete! You made your bid! 🎉`);
    } else {
      setStatusMessage(`Round ${roundNumber} Complete. You fell short of your bid.`);
    }
  };

  const handleNextRound = () => {
    const nextR = roundNumber + 1;
    setRoundNumber(nextR);
    startNewRound(nextR);
  };

  const handleResetGame = () => {
    setRoundNumber(1);
    setCumulativeScores({ south: 0, east: 0, north: 0, west: 0 });
    startNewRound(1);
  };

  const southValidMoves = phase === 'playing' && currentTurn === 'south'
    ? getValidMoves(hands.south, currentTrick)
    : [];

  // Helper to find card played in trick by seat
  const getTrickCardForSeat = (seat) => {
    return currentTrick.find(entry => entry.player === seat);
  };

  return (
    <div className="game-container callbreak-container">
      {/* Game Header */}
      <div className="game-topbar">
        <div className="game-title-group">
          <span className="game-badge">Tihar Card Arena</span>
          <h3>Call Break (कल ब्रेक)</h3>
          <span className="round-pill">Round {roundNumber}</span>
        </div>

        <div className="game-controls">
          <button
            className="btn-icon"
            onClick={() => setShowRules(!showRules)}
            title="Rules & How to Play"
          >
            📖 Rules
          </button>
          <button
            className="btn-icon"
            onClick={handleResetGame}
            title="Restart Game"
          >
            🔄 Restart
          </button>
          {onClose && (
            <button className="btn-icon btn-close" onClick={onClose} title="Back to Games">
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Rules Modal */}
      {showRules && (
        <div className="game-rules-modal">
          <div className="rules-content">
            <h4>📖 Call Break Rules</h4>
            <ul>
              <li><strong>Spades (♠) are permanent trump</strong> (Hukum).</li>
              <li>Each player bids 1 to 8 tricks based on hand strength.</li>
              <li>You <strong>must follow the lead suit</strong> if you have it.</li>
              <li>If you have no cards in lead suit, you can trump with a Spade.</li>
              <li>Making your bid awards: <em>bid + (extra tricks × 0.1)</em> points.</li>
              <li>Failing your bid results in <em>-bid</em> points penalty.</li>
            </ul>
            <button className="btn-primary" onClick={() => setShowRules(false)}>
              Got it, let's play!
            </button>
          </div>
        </div>
      )}

      {/* Main Playing Table */}
      <div className="card-table">
        <div className="table-felt felt-screen-fit">
          {/* Top Status Bar on Table */}
          <div className="felt-info-bar">
            <span className="trump-tag">♠ Hukum: Spades</span>
            <span className="trick-tracker">
              Trick: {Math.min(trickCount + 1, 13)} / 13
            </span>
            <span className="your-bid-tracker">
              Your Bid: {bids.south || '-'} | Won: {tricksWon.south}
            </span>
          </div>

          {/* North Seat (Opponent) */}
          <div className={`player-seat seat-north ${currentTurn === 'north' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{PLAYER_INFO.north.avatar}</span>
              <div className="player-details">
                <span className="name">{PLAYER_INFO.north.name}</span>
                <span className="bid-info">
                  Bid: {bids.north} | Won: {tricksWon.north}
                </span>
              </div>
            </div>
            <div className="opponent-hand horizontal compact-hand">
              {hands.north.map((_, i) => (
                <PlayingCard key={i} isFaceDown small />
              ))}
            </div>
          </div>

          {/* Middle Row: West, Center Trick Arena, East */}
          <div className="table-middle-row">
            {/* West Seat */}
            <div className={`player-seat seat-west-inline ${currentTurn === 'west' ? 'active-turn' : ''}`}>
              <div className="player-badge">
                <span className="avatar">{PLAYER_INFO.west.avatar}</span>
                <div className="player-details">
                  <span className="name">{PLAYER_INFO.west.name}</span>
                  <span className="bid-info">
                    Bid: {bids.west} | Won: {tricksWon.west}
                  </span>
                </div>
              </div>
              <div className="opponent-hand vertical compact-hand">
                {hands.west.slice(0, 5).map((_, i) => (
                  <PlayingCard key={i} isFaceDown small />
                ))}
              </div>
            </div>

            {/* Compass-Arranged Center Trick Zone */}
            <div className="compass-trick-zone">
              {/* North Played Card */}
              <div className="compass-slot slot-north">
                {getTrickCardForSeat('north') && (
                  <div className="trick-entry">
                    <PlayingCard card={getTrickCardForSeat('north').card} pop small />
                    <span className="trick-label">Pooja</span>
                  </div>
                )}
              </div>

              {/* West & East Middle Row */}
              <div className="compass-middle-row">
                {/* West Played Card */}
                <div className="compass-slot slot-west">
                  {getTrickCardForSeat('west') && (
                    <div className="trick-entry">
                      <PlayingCard card={getTrickCardForSeat('west').card} pop small />
                      <span className="trick-label">Kiran</span>
                    </div>
                  )}
                </div>

                {/* Center Diya Emblem / Status message */}
                <div className="compass-center-hub">
                  <span className="center-flame">🪔</span>
                  <span className="center-trick-status">
                    {currentTrick.length === 0 ? statusMessage : `${currentTrick.length}/4 Cards`}
                  </span>
                </div>

                {/* East Played Card */}
                <div className="compass-slot slot-east">
                  {getTrickCardForSeat('east') && (
                    <div className="trick-entry">
                      <PlayingCard card={getTrickCardForSeat('east').card} pop small />
                      <span className="trick-label">Ramesh</span>
                    </div>
                  )}
                </div>
              </div>

              {/* South Played Card */}
              <div className="compass-slot slot-south">
                {getTrickCardForSeat('south') && (
                  <div className="trick-entry">
                    <PlayingCard card={getTrickCardForSeat('south').card} pop small />
                    <span className="trick-label">You</span>
                  </div>
                )}
              </div>
            </div>

            {/* East Seat */}
            <div className={`player-seat seat-east-inline ${currentTurn === 'east' ? 'active-turn' : ''}`}>
              <div className="player-badge">
                <span className="avatar">{PLAYER_INFO.east.avatar}</span>
                <div className="player-details">
                  <span className="name">{PLAYER_INFO.east.name}</span>
                  <span className="bid-info">
                    Bid: {bids.east} | Won: {tricksWon.east}
                  </span>
                </div>
              </div>
              <div className="opponent-hand vertical compact-hand">
                {hands.east.slice(0, 5).map((_, i) => (
                  <PlayingCard key={i} isFaceDown small />
                ))}
              </div>
            </div>
          </div>

          {/* South Seat (Human Player) */}
          <div className={`player-seat seat-south-bottom ${currentTurn === 'south' ? 'active-turn' : ''}`}>
            <div className="south-player-controls-row">
              <div className="player-badge south-badge">
                <span className="avatar">{PLAYER_INFO.south.avatar}</span>
                <div className="player-details">
                  <span className="name">{PLAYER_INFO.south.name}</span>
                  <span className="bid-info">
                    Bid: {bids.south || 'Pending'} | Won: {tricksWon.south} | Score: {cumulativeScores.south}
                  </span>
                </div>
              </div>

              {/* Bidding Buttons */}
              {phase === 'bidding' && (
                <div className="bidding-panel-inline">
                  <span className="bid-call-prompt">Your Call:</span>
                  <div className="bids-buttons">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <button
                        key={num}
                        className="bid-pill-btn"
                        onClick={() => handleUserBid(num)}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Player Hand Fan */}
            {phase === 'playing' && (
              <div className="south-hand-fan">
                {hands.south.map((card, idx) => {
                  const isValid = southValidMoves.includes(card);
                  const isTurn = currentTurn === 'south';
                  return (
                    <div
                      key={card}
                      className="fanned-card-wrapper"
                      style={{
                        zIndex: idx + 1
                      }}
                    >
                      <PlayingCard
                        card={card}
                        disabled={!isTurn || !isValid}
                        shake={shakeCard === card}
                        onClick={() => handleCardClick(card)}
                        className={isValid && isTurn ? 'valid-highlight' : ''}
                      />
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Live Status Bar */}
        <div className="game-status-footer compact-footer">
          <div className="status-announcer">
            <span className="flame-dot">🪔</span>
            <span>{statusMessage}</span>
          </div>

          <div className="scores-ticker">
            <span>You: {cumulativeScores.south}</span>
            <span>Ramesh: {cumulativeScores.east}</span>
            <span>Pooja: {cumulativeScores.north}</span>
            <span>Kiran: {cumulativeScores.west}</span>
          </div>
        </div>
      </div>

      {/* Round Complete Modal */}
      {phase === 'roundOver' && (
        <div className="round-over-modal">
          <div className="round-over-card">
            <div className="trophy-icon">🏆</div>
            <h3>Round {roundNumber} Scoreboard</h3>
            <div className="scoreboard-table">
              <div className="scoreboard-row header">
                <span>Player</span>
                <span>Bid</span>
                <span>Won</span>
                <span>Round Pts</span>
                <span>Total</span>
              </div>
              {PLAYERS.map(p => {
                const roundPts = computeRoundScores(bids, tricksWon)[p];
                return (
                  <div key={p} className={`scoreboard-row ${p === 'south' ? 'you-row' : ''}`}>
                    <span>{PLAYER_INFO[p].name}</span>
                    <span>{bids[p]}</span>
                    <span>{tricksWon[p]}</span>
                    <span className={roundPts >= 0 ? 'score-pos' : 'score-neg'}>
                      {roundPts > 0 ? `+${roundPts}` : roundPts}
                    </span>
                    <span className="total-cell">{cumulativeScores[p]}</span>
                  </div>
                );
              })}
            </div>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleNextRound}>
                Next Round 🪔
              </button>
              <button className="btn-secondary" onClick={handleResetGame}>
                Restart Match
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
