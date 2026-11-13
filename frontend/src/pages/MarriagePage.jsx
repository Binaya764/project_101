import React from 'react';
import MarriageGame from '../games/marriage/MarriageGame';
import { Link, useRouter } from '../router/Router';

export default function MarriagePage() {
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
            <span className="current">Marriage (म्यरिज - २१ तास)</span>
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
        <MarriageGame onClose={() => navigate('/games')} />
      </div>
    </div>
  );
}
