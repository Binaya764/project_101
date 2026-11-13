import React from 'react';
import ChhathSection from '../components/ChhathSection';
import { Link } from '../router/Router';

export default function ChhathPage() {
  return (
    <div className="page-container chhath-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Chhath Puja Mahaparva</span>
          </div>
          <div className="banner-badge-pill">
            <span>☀️ 4 Sacred Days & Ghat Locator</span>
          </div>
        </div>
      </div>

      <ChhathSection />
    </div>
  );
}
