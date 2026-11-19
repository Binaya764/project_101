import React, { useState, useEffect, useRef, useCallback } from 'react';
import PlayingCard from '../shared/PlayingCard';
import OpponentFanHand from '../shared/OpponentFanHand';
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
  computeRoundScores,
  parseCard
} from './callBreakLogic';
import { soundManager } from '../../utils/audio';

// === Floating Trick-Winner Banner ===
function TrickBanner({ winner, playerInfo, onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1600);
    return () => clearTimeout(t);
  }, [winner]);
  if (!winner) return null;
  const info = playerInfo[winner];
  return (
    <div className="trick-banner-overlay">
      <div className="trick-banner-pill">
        <span className="trick-banner-avatar">{info.avatar}</span>
        <span className="trick-banner-text">
          {info.name} wins the trick!
        </span>
        <span className="trick-banner-emoji">🎉</span>
      </div>
    </div>
  );
}

// === Hand strength indicator for bidding phase ===
function HandStrengthMeter({ hand }) {
  const spades = hand.filter(c => parseCard(c).suit === '♠').length;
  const aces  = hand.filter(c => parseCard(c).rank === 'A').length;
  const kings = hand.filter(c => parseCard(c).rank === 'K').length;
  const strength = Math.min(100, spades * 8 + aces * 10 + kings * 6);
  const label = strength >= 70 ? 'Strong 💪' : strength >= 40 ? 'Average ⚖️' : 'Weak 🌱';
  return (
    <div className="hand-strength-meter">
      <span className="strength-label">Hand: {label}</span>
      <div className="strength-bar-track">
        <div className="strength-bar-fill" style={{ width: `${strength}%` }} />
      </div>
      <div className="strength-hints">
        <span>♠ Spades: {spades}</span>
        <span>Aces: {aces}</span>
        <span>Kings: {kings}</span>
      </div>
    </div>
  );
}

// === Scoreboard live strip ===
function ScoreStrip({ players, playerInfo, cumulativeScores, tricksWon, bids, trickCount }) {
  return (
    <div className="cb-score-strip">
      {players.map(p => {
        const made = tricksWon[p] >= bids[p];
        return (
          <div key={p} className={`score-strip-cell ${p === 'south' ? 'is-you' : ''}`}>
            <span className="ssc-avatar">{playerInfo[p].avatar}</span>
            <span className="ssc-name">{p === 'south' ? 'You' : playerInfo[p].name.split(' ')[0]}</span>
            <span className="ssc-bid-won">
              <span className={`ssc-won ${made ? 'on-track' : 'behind'}`}>{tricksWon[p]}</span>
              <span className="ssc-sep">/</span>
              <span className="ssc-bid">{bids[p] || '?'}</span>
            </span>
            <span className="ssc-total">{cumulativeScores[p]}</span>
          </div>
        );
      })}
    </div>
  );
}

export default function CallBreakGame({ onClose }) {
  const [roundNumber, setRoundNumber] = useState(1);
  const [phase, setPhase] = useState('dealing'); // 'dealing' | 'bidding' | 'playing' | 'roundOver'
  const [hands, setHands] = useState({ south: [], east: [], north: [], west: [] });
  const [bids, setBids] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [tricksWon, setTricksWon] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [cumulativeScores, setCumulativeScores] = useState({ south: 0, east: 0, north: 0, west: 0 });
  const [currentTurn, setCurrentTurn] = useState('south');
  const [currentTrick, setCurrentTrick] = useState([]);
  const [lastTrickWinner, setLastTrickWinner] = useState(null);
  const [showTrickBanner, setShowTrickBanner] = useState(false);
  const [trickCount, setTrickCount] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Welcome to Call Break! Dealing cards…');
  const [showRules, setShowRules] = useState(false);
  const [shakeCard, setShakeCard] = useState(null);
  const [lastPlayedCard, setLastPlayedCard] = useState(null);
  const [bidHovered, setBidHovered] = useState(null);
  const tricksWonRef = useRef(tricksWon);
  useEffect(() => { tricksWonRef.current = tricksWon; }, [tricksWon]);

  // Suggested bid based on hand
  const suggestedBid = hands.south.length > 0 ? calculateAIBid(hands.south) : null;

  const startNewRound = useCallback((roundNum) => {
    const deck = shuffle(createDeck());
    const newHands = {
      south: sortHand(deck.slice(0, 13)),
      east:  sortHand(deck.slice(13, 26)),
      north: sortHand(deck.slice(26, 39)),
      west:  sortHand(deck.slice(39, 52))
    };
    setHands(newHands);
    setTricksWon({ south: 0, east: 0, north: 0, west: 0 });
    tricksWonRef.current = { south: 0, east: 0, north: 0, west: 0 };
    setCurrentTrick([]);
    setLastTrickWinner(null);
    setShowTrickBanner(false);
    setTrickCount(0);
    setLastPlayedCard(null);
    setPhase('dealing');
    setCurrentTurn('south');
    setStatusMessage(`Round ${roundNum} — Dealing cards…`);

    const aiBids = {
      east:  calculateAIBid(newHands.east),
      north: calculateAIBid(newHands.north),
      west:  calculateAIBid(newHands.west),
    };
    setBids({ south: 0, ...aiBids });

    // Brief dealing animation delay then go to bidding
    setTimeout(() => {
      setPhase('bidding');
      setStatusMessage('Make your bid (1–8). How many tricks can you win?');
    }, 900);
  }, []);

  useEffect(() => { startNewRound(1); }, []);

  const handleUserBid = (bidAmount) => {
    soundManager.playCardPlay();
    setBids(prev => ({ ...prev, south: bidAmount }));
    setPhase('playing');
    setCurrentTurn('south');
    setStatusMessage(`You called ${bidAmount} trick${bidAmount > 1 ? 's' : ''}. Lead the first trick!`);
  };

  const handleCardClick = (card) => {
    if (phase !== 'playing' || currentTurn !== 'south') return;
    const validMoves = getValidMoves(hands.south, currentTrick);
    if (!validMoves.includes(card)) {
      setShakeCard(card);
      soundManager.playCardPlay();
      setStatusMessage('❌ You must follow suit or play higher — invalid move!');
      setTimeout(() => setShakeCard(null), 450);
      return;
    }
    playCardForPlayer('south', card);
  };

  const playCardForPlayer = (player, card) => {
    soundManager.playCardPlay();
    setLastPlayedCard(card);

    setHands(prev => ({
      ...prev,
      [player]: prev[player].filter(c => c !== card)
    }));

    const newTrick = [...currentTrick, { player, card }];
    setCurrentTrick(newTrick);

    if (newTrick.length === 4) {
      const winner = determineTrickWinner(newTrick);
      setLastTrickWinner(winner);
      setShowTrickBanner(true);
      setStatusMessage(`${PLAYER_INFO[winner].name} wins trick ${trickCount + 1}! 🪔`);

      setTimeout(() => {
        soundManager.playTrickWon();
        const updatedTricks = { ...tricksWonRef.current, [winner]: tricksWonRef.current[winner] + 1 };
        setTricksWon(updatedTricks);
        setCurrentTrick([]);
        const nextTrickCount = trickCount + 1;
        setTrickCount(nextTrickCount);
        setLastPlayedCard(null);

        if (nextTrickCount >= 13) {
          endRound(updatedTricks);
        } else {
          setCurrentTurn(winner);
          setStatusMessage(`${PLAYER_INFO[winner].name} leads trick ${nextTrickCount + 1}.`);
        }
      }, 1400);
    } else {
      const currentIndex = PLAYERS.indexOf(player);
      const nextPlayer = PLAYERS[(currentIndex + 1) % 4];
      setCurrentTurn(nextPlayer);
      if (nextPlayer !== 'south') {
        setStatusMessage(`${PLAYER_INFO[nextPlayer].name} is thinking…`);
      } else {
        setStatusMessage('Your turn — choose a card to play!');
      }
    }
  };

  // AI turn
  useEffect(() => {
    if (phase !== 'playing' || currentTurn === 'south') return;
    if (currentTrick.length >= 4) return;

    const timer = setTimeout(() => {
      const aiHand = hands[currentTurn];
      if (!aiHand || aiHand.length === 0) return;
      const validMoves = getValidMoves(aiHand, currentTrick);
      const chosenCard = chooseAICard(validMoves, currentTrick, aiHand);
      playCardForPlayer(currentTurn, chosenCard);
    }, 820);

    return () => clearTimeout(timer);
  }, [phase, currentTurn, currentTrick, hands]);

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
      setStatusMessage(`🎉 Round ${roundNumber} complete — you made your bid!`);
    } else {
      setStatusMessage(`Round ${roundNumber} done. You fell short of your bid.`);
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

  // Leading card in current trick
  const leadSuit = currentTrick.length > 0 ? parseCard(currentTrick[0].card).suit : null;

  return (
    <div className="game-container callbreak-container">

      {/* ── Top Bar ── */}
      <div className="game-topbar">
        <div className="game-title-group">
          <span className="game-badge">🪔 Tihar Card Arena</span>
          <h3>Call Break <span className="title-nepali">कल ब्रेक</span></h3>
          <span className="round-pill">Round {roundNumber}</span>
        </div>
        <div className="game-controls">
          <button className="btn-icon" onClick={() => setShowRules(!showRules)} title="Rules">
            📖 Rules
          </button>
          <button className="btn-icon" onClick={handleResetGame} title="Restart">
            🔄 Restart
          </button>
          {onClose && (
            <button className="btn-icon btn-close" onClick={onClose} title="Close">✕</button>
          )}
        </div>
      </div>

      {/* ── Rules Modal ── */}
      {showRules && (
        <div className="game-rules-modal" onClick={() => setShowRules(false)}>
          <div className="rules-content" onClick={e => e.stopPropagation()}>
            <div className="rules-header">
              <span className="rules-diya">🪔</span>
              <h4>Call Break — कल ब्रेक</h4>
            </div>
            <ul>
              <li><strong>♠ Spades are eternal trump</strong> (Hukum — हुकुम)</li>
              <li>Each player calls (bids) 1–8 tricks before play begins</li>
              <li><strong>Follow the lead suit</strong> if you hold it</li>
              <li>You must play <strong>higher</strong> in the lead suit if you can</li>
              <li>If void in lead suit, you <strong>may trump with Spades</strong></li>
              <li>Making bid: <em>bid + (overtricks × 0.1)</em> points</li>
              <li>Failing bid: <em>−bid</em> penalty</li>
            </ul>
            <div className="rules-tip">
              💡 <strong>Tip:</strong> High spades + Aces = strong hand. Bid confidently!
            </div>
            <button className="btn-primary" onClick={() => setShowRules(false)}>
              Let's Play! 🃏
            </button>
          </div>
        </div>
      )}

      {/* ── Live Score Strip ── */}
      <ScoreStrip
        players={PLAYERS}
        playerInfo={PLAYER_INFO}
        cumulativeScores={cumulativeScores}
        tricksWon={tricksWon}
        bids={bids}
        trickCount={trickCount}
      />

      {/* ── Main Table ── */}
      <div className="card-table">
        <div className="table-felt">

          {/* Trick-winner floating banner */}
          {showTrickBanner && lastTrickWinner && (
            <TrickBanner
              winner={lastTrickWinner}
              playerInfo={PLAYER_INFO}
              onDone={() => setShowTrickBanner(false)}
            />
          )}

          {/* Info bar */}
          <div className="felt-info-bar">
            <span className="trump-tag">♠ Hukum: Spades</span>
            <span className="trick-tracker">
              Trick {Math.min(trickCount + 1, 13)} / 13
            </span>
            {leadSuit && (
              <span className="lead-suit-tag">Lead: {leadSuit}</span>
            )}
            <span className="your-bid-tracker">
              Your Bid: <strong>{bids.south || '—'}</strong> | Won: <strong>{tricksWon.south}</strong>
            </span>
          </div>

          {/* North */}
          <div className={`player-seat seat-north ${currentTurn === 'north' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{PLAYER_INFO.north.avatar}</span>
              <div className="player-details">
                <span className="name">{PLAYER_INFO.north.name}</span>
                <span className="bid-info">
                  Bid {bids.north} · Won {tricksWon.north}
                </span>
              </div>
              {currentTurn === 'north' && <span className="thinking-dot" />}
            </div>
            <OpponentFanHand position="north" count={hands.north.length} />
          </div>

          {/* West */}
          <div className={`player-seat seat-west ${currentTurn === 'west' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{PLAYER_INFO.west.avatar}</span>
              <div className="player-details">
                <span className="name">{PLAYER_INFO.west.name}</span>
                <span className="bid-info">Bid {bids.west} · Won {tricksWon.west}</span>
              </div>
              {currentTurn === 'west' && <span className="thinking-dot" />}
            </div>
            <OpponentFanHand position="west" count={hands.west.length} />
          </div>

          {/* Center Trick Arena */}
          <div className="trick-arena">
            <div className="trick-center-zone">
              {currentTrick.map(entry => (
                <div key={entry.player} className={`trick-card-slot slot-${entry.player}`}>
                  <PlayingCard card={entry.card} pop />
                  <span className="card-owner-tag">
                    {entry.player === 'south' ? 'You' : PLAYER_INFO[entry.player].name.split(' ')[0]}
                  </span>
                </div>
              ))}
              {currentTrick.length === 0 && (
                <div className="empty-trick-hint">
                  <span className="empty-diya-icon">🪔</span>
                  <p>{statusMessage}</p>
                </div>
              )}
            </div>
          </div>

          {/* East */}
          <div className={`player-seat seat-east ${currentTurn === 'east' ? 'active-turn' : ''}`}>
            <div className="player-badge">
              <span className="avatar">{PLAYER_INFO.east.avatar}</span>
              <div className="player-details">
                <span className="name">{PLAYER_INFO.east.name}</span>
                <span className="bid-info">Bid {bids.east} · Won {tricksWon.east}</span>
              </div>
              {currentTurn === 'east' && <span className="thinking-dot" />}
            </div>
            <OpponentFanHand position="east" count={hands.east.length} />
          </div>

          {/* South (Human) */}
          <div className={`player-seat seat-south ${currentTurn === 'south' && phase === 'playing' ? 'active-turn' : ''}`}>
            <div className="player-badge south-badge">
              <span className="avatar">{PLAYER_INFO.south.avatar}</span>
              <div className="player-details">
                <span className="name">{PLAYER_INFO.south.name}</span>
                <span className="bid-info">
                  Bid: {bids.south || 'Pending'} · Won: {tricksWon.south} · Score: {cumulativeScores.south}
                </span>
              </div>
            </div>

            {/* Bidding Phase */}
            {phase === 'bidding' && (
              <div className="bidding-panel">
                <div className="bidding-top">
                  <h4>🪔 Make Your Call — कति ट्रिक जित्ने?</h4>
                  <HandStrengthMeter hand={hands.south} />
                </div>
                <div className="bids-buttons">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                    <button
                      key={num}
                      className={`bid-pill-btn ${bidHovered === num ? 'hovered' : ''} ${num === suggestedBid ? 'suggested' : ''}`}
                      onMouseEnter={() => setBidHovered(num)}
                      onMouseLeave={() => setBidHovered(null)}
                      onClick={() => handleUserBid(num)}
                    >
                      <span className="bid-num">{num}</span>
                      {num === suggestedBid && <span className="bid-suggested-tag">★ Suggested</span>}
                    </button>
                  ))}
                </div>
                {bidHovered && (
                  <p className="bid-hover-hint">
                    {bidHovered <= 2 ? '🌱 Conservative — safe but low reward' :
                     bidHovered <= 4 ? '⚖️ Balanced — good risk/reward' :
                     bidHovered <= 6 ? '🔥 Aggressive — high reward, high risk' :
                     '💀 Very ambitious — only if you have many spades + aces!'}
                  </p>
                )}
              </div>
            )}

            {/* Dealing animation */}
            {phase === 'dealing' && (
              <div className="dealing-animation">
                <div className="dealing-cards-row">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="deal-card-anim" style={{ animationDelay: `${i * 0.12}s` }}>
                      <div className="fan-card-red-back">
                        <div className="fan-card-filigree"><span className="fan-card-symbol">🪔</span></div>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="dealing-text">Shuffling & Dealing…</p>
              </div>
            )}

            {/* Player Hand */}
            {phase === 'playing' && (
              <div className="south-hand">
                {hands.south.map(card => {
                  const isValid = southValidMoves.includes(card);
                  const isTurn = currentTurn === 'south';
                  const { suit } = parseCard(card);
                  const isSpade = suit === '♠';
                  return (
                    <PlayingCard
                      key={card}
                      card={card}
                      disabled={!isTurn || !isValid}
                      shake={shakeCard === card}
                      onClick={() => handleCardClick(card)}
                      className={[
                        isValid && isTurn ? 'valid-highlight' : '',
                        isSpade ? 'is-spade' : '',
                      ].filter(Boolean).join(' ')}
                    />
                  );
                })}
              </div>
            )}

            {/* Waiting indicator when not your turn */}
            {phase === 'playing' && currentTurn !== 'south' && (
              <div className="waiting-hint">
                <span className="waiting-dots">
                  <span /><span /><span />
                </span>
                <span>{PLAYER_INFO[currentTurn]?.name} is playing…</span>
              </div>
            )}
          </div>
        </div>

        {/* Status Bar */}
        <div className="game-status-footer">
          <div className="status-announcer">
            <span className="flame-dot">🪔</span>
            <span>{statusMessage}</span>
          </div>
          <div className="scores-ticker">
            {PLAYERS.map(p => (
              <span key={p} className={p === 'south' ? 'ticker-you' : ''}>
                {p === 'south' ? 'You' : PLAYER_INFO[p].name.split(' ')[0]}: {cumulativeScores[p]}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Round Over Modal ── */}
      {phase === 'roundOver' && (
        <div className="round-over-modal">
          <div className="round-over-card">
            <div className="round-over-diya-row" aria-hidden="true">
              🪔 🪔 🪔 🪔 🪔
            </div>
            <div className="trophy-icon">
              {tricksWon.south >= bids.south ? '🏆' : '🌙'}
            </div>
            <h3>
              {tricksWon.south >= bids.south
                ? `Round ${roundNumber} — Shabash! 🎉`
                : `Round ${roundNumber} — Better luck next time!`}
            </h3>
            <p className="round-over-sub">
              {tricksWon.south >= bids.south
                ? `You called ${bids.south} and won ${tricksWon.south} tricks!`
                : `You called ${bids.south} but only won ${tricksWon.south} tricks.`}
            </p>

            <div className="scoreboard-table">
              <div className="scoreboard-row header">
                <span>Player</span>
                <span>Bid</span>
                <span>Won</span>
                <span>Round</span>
                <span>Total</span>
              </div>
              {PLAYERS.map(p => {
                const roundPts = computeRoundScores(bids, tricksWon)[p];
                return (
                  <div key={p} className={`scoreboard-row ${p === 'south' ? 'you-row' : ''}`}>
                    <span className="sb-name">
                      <span className="sb-avatar">{PLAYER_INFO[p].avatar}</span>
                      {p === 'south' ? 'You' : PLAYER_INFO[p].name}
                    </span>
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
                Next Round 🃏
              </button>
              <button className="btn-secondary" onClick={handleResetGame}>
                New Match 🔄
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
