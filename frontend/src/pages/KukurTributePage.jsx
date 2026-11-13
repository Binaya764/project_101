import React from 'react';
import KukurTiharTribute from '../components/KukurTiharTribute';
import { Link } from '../router/Router';

export default function KukurTributePage() {
  return (
    <div className="page-container kukur-tribute-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Kukur Tihar Tribute</span>
          </div>
          <div className="banner-badge-pill">
            <span>🐕 Honoring Humankind's Loyal Companions</span>
          </div>
        </div>
      </div>

      <KukurTiharTribute />
    </div>
  );
}
