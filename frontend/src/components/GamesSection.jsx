import React, { useState } from 'react';
import { GAMES_DATA } from '../data/gamesData';
import CallBreakGame from '../games/callbreak/CallBreakGame';
import DhumbalGame from '../games/dhumbal/DhumbalGame';
import MarriageGame from '../games/marriage/MarriageGame';
import { soundManager } from '../utils/audio';

export default function GamesSection() {
  const [activeGame, setActiveGame] = useState(null); // 'callbreak' | 'dhumbal' | 'marriage' | null

  const handleLaunchGame = (gameId) => {
    soundManager.playCardPlay();
    setActiveGame(gameId);
  };

  return (
    <section id="games" className="games-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>🎴</span>
          <span>तिहारका तास • Festival Game Corner</span>
        </div>

        <h2 className="section-title">
          Games of <span className="gradient-gold-text">Tihar</span>
        </h2>

        <p className="section-subtitle">
          "Celebrate, Play, and Share the Joy." In Nepali tradition, no Tihar night is complete without card games, laughter, and light-hearted bets with family and friends!
        </p>
      </div>

      {/* Active Game Modal Arena if a game is opened */}
      {activeGame && (
        <div className="game-arena-overlay">
          <div className="game-arena-modal-card">
            {activeGame === 'callbreak' && (
              <CallBreakGame onClose={() => setActiveGame(null)} />
            )}
            {activeGame === 'dhumbal' && (
              <DhumbalGame onClose={() => setActiveGame(null)} />
            )}
            {activeGame === 'marriage' && (
              <MarriageGame onClose={() => setActiveGame(null)} />
            )}
          </div>
        </div>
      )}

      {/* 3 Game Showcase Cards */}
      <div className="games-showcase-grid">
        {GAMES_DATA.map((game) => (
          <div key={game.id} className="game-showcase-card">
            {/* Card Graphic Banner */}
            <div className={`game-art-banner art-${game.id}`}>
              <div className="game-card-badges">
                <span className="badge-popularity">{game.badge}</span>
                <span className="badge-players">👥 {game.players}</span>
              </div>
              <div className="game-illustration-center">
                {game.id === 'callbreak' && (
                  <div className="art-stack callbreak-art">
                    <span className="art-trump">♠</span>
                    <span className="art-icon">🪔</span>
                  </div>
                )}
                {game.id === 'dhumbal' && (
                  <div className="art-stack dhumbal-art">
                    <span className="art-trump">⚡</span>
                    <span className="art-icon">🎲</span>
                  </div>
                )}
                {game.id === 'marriage' && (
                  <div className="art-stack marriage-art">
                    <span className="art-trump">💎</span>
                    <span className="art-icon">🎴</span>
                  </div>
                )}
              </div>
            </div>

            {/* Game Content */}
            <div className="game-card-body">
              <div className="game-title-row">
                <h3 className="game-title">{game.title}</h3>
                <span className="game-nepali-title">{game.nepaliTitle}</span>
              </div>

              <p className="game-tagline">{game.tagline}</p>
              <p className="game-description">{game.description}</p>

              {/* Quick Specs */}
              <div className="game-specs-pills">
                <span className="spec-pill">⏱️ {game.duration}</span>
                <span className="spec-pill">🎯 {game.difficulty}</span>
                <span className="spec-pill">🤖 Smart AI</span>
              </div>

              {/* Play Button */}
              <div className="game-card-footer">
                <button
                  type="button"
                  className="btn-play-game"
                  onClick={() => handleLaunchGame(game.id)}
                >
                  <span className="play-icon">▶</span>
                  <span>Play {game.title}</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
