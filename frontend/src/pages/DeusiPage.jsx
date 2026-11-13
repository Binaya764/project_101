import React from 'react';
import DeusiBhailoStudio from '../components/DeusiBhailoStudio';
import { Link } from '../router/Router';

export default function DeusiPage() {
  return (
    <div className="page-container deusi-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Deusi-Bhailo Rhythm Jam</span>
          </div>
          <div className="banner-badge-pill">
            <span>🪘 Madal Percussion & Couplet Generator</span>
          </div>
        </div>
      </div>

      <DeusiBhailoStudio />
    </div>
  );
}
