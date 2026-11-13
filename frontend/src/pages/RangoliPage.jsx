import React from 'react';
import RangoliStudio from '../components/RangoliStudio';
import { Link } from '../router/Router';

export default function RangoliPage() {
  return (
    <div className="page-container rangoli-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Rangoli & Mandala Studio</span>
          </div>
          <div className="banner-badge-pill">
            <span>🎨 4–12 Fold Real-Time Radial Symmetry</span>
          </div>
        </div>
      </div>

      <RangoliStudio />
    </div>
  );
}
