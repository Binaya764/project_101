import React from 'react';
import AboutTihar from '../components/AboutTihar';
import { Link } from '../router/Router';

export default function AboutTiharPage() {
  return (
    <div className="page-container about-tihar-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">About Yamapanchak</span>
          </div>
          <div className="banner-badge-pill">
            <span>🏵️ The 5 Auspicious Days of Tihar</span>
          </div>
        </div>
      </div>

      <AboutTihar />
    </div>
  );
}
