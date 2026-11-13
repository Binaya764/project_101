import React from 'react';
import DhumbalGame from '../games/dhumbal/DhumbalGame';
import { Link, useRouter } from '../router/Router';

export default function DhumbalPage() {
  const { navigate } = useRouter();

  return (
    <div className="page-container dedicated-game-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <Link to="/games" className="breadcrumb-link">Games</Link>
            <span className="sep">/</span>
            <span className="current">Dhumbal / Jhyap (धुम्बाल)</span>
          </div>
          <button
            type="button"
            className="btn-exit-game"
            onClick={() => navigate('/games')}
          >
            ← Back to All Games
          </button>
        </div>
      </div>

      <div className="dedicated-game-wrapper">
        <DhumbalGame onClose={() => navigate('/games')} />
      </div>
    </div>
  );
}
