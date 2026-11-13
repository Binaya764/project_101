import React from 'react';
import { Link } from '../router/Router';

export default function NotFoundPage() {
  return (
    <div className="page-container not-found-page">
      <div className="not-found-card">
        <span className="not-found-icon">🪔</span>
        <h2>404 — बाटो बिर्सनुभयो?</h2>
        <p className="not-found-sub">
          It looks like you’ve wandered off into the starlit night. Even in the dark, every diya leads back home.
        </p>
        <Link to="/" className="btn-return-home">
          ← Return to JHILIMILI Home
        </Link>
      </div>
    </div>
  );
}
