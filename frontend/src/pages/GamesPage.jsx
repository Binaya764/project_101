import React from 'react';
import { GAMES_DATA } from '../data/gamesData';
import { Link, useRouter } from '../router/Router';
import { soundManager } from '../utils/audio';

export default function GamesPage() {
  const { navigate } = useRouter();

  const handleLaunch = (gameId) => {
    soundManager.playCardPlay();
    navigate(`/games/${gameId}`);
  };

  return (
    <div className="page-container games-hub-page">
      {/* Breadcrumb Header */}
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Games of Tihar</span>
          </div>
          <div className="banner-badge-pill">
            <span>🎴 3 Playable Nepali Card Classics</span>
          </div>
        </div>
      </div>

      <div className="section-header-centered" style={{ marginTop: '20px' }}>
        <div className="festive-pill-badge">
          <span>🎴</span>
          <span>तिहारका तास • The Card Parlor</span>
        </div>
        <h1 className="section-title">
          Traditional Games of <span className="gradient-gold-text">Tihar</span>
        </h1>
        <p className="section-subtitle">
          In Nepali households, late-night card sessions during Laxmi Puja and Bhai Tika are an unmissable tradition. Choose your table below to play with intelligent AI opponents!
        </p>
      </div>

      {/* Game Cards */}
      <div className="games-showcase-grid" style={{ maxWidth: '1240px', margin: '0 auto 60px', padding: '0 20px' }}>
        {GAMES_DATA.map((game) => (
          <div key={game.id} className="game-showcase-card">
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

            <div className="game-card-body">
              <div className="game-title-row">
                <h3 className="game-title">{game.title}</h3>
                <span className="game-nepali-title">{game.nepaliTitle}</span>
              </div>

              <p className="game-tagline">{game.tagline}</p>
              <p className="game-description">{game.description}</p>

              <div className="game-specs-pills">
                <span className="spec-pill">⏱️ {game.duration}</span>
                <span className="spec-pill">🎯 {game.difficulty}</span>
                <span className="spec-pill">🤖 Smart AI</span>
              </div>

              <div className="game-card-footer">
                <button
                  type="button"
                  className="btn-play-game"
                  onClick={() => handleLaunch(game.id)}
                >
                  <span className="play-icon">▶</span>
                  <span>Play {game.title} (Dedicated Table)</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cultural Card Lore Box */}
      <div className="card-lore-box" style={{ maxWidth: '980px', margin: '0 auto 80px', padding: '0 20px' }}>
        <div className="lore-inner-card">
          <h4>🪔 Why Do Nepalis Play Cards (Taas) on Tihar?</h4>
          <p>
            During Tihar—especially on the night of <strong>Laxmi Puja</strong> and <strong>Govardhan Puja</strong>—families stay awake late into the night waiting for Goddess Laxmi's blessing. Playing cards (Taas) evolved as a joyous social ritual to keep everyone awake, fostering light-hearted family bonding, banter, and friendly competition over sweets and tea.
          </p>
        </div>
      </div>
    </div>
  );
}
