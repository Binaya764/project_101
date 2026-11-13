import React from 'react';
import Statistics from '../components/Statistics';
import { Link } from '../router/Router';

export default function StatsPage({ totalCount }) {
  return (
    <div className="page-container stats-page">
      <div className="page-breadcrumb-banner">
        <div className="breadcrumb-container">
          <div className="breadcrumb-nav">
            <Link to="/" className="breadcrumb-link">Home</Link>
            <span className="sep">/</span>
            <span className="current">Celebration Statistics</span>
          </div>
          <div className="banner-badge-pill">
            <span>📊 Live Community Analytics</span>
          </div>
        </div>
      </div>

      <Statistics totalDiyosCount={totalCount} />
    </div>
  );
}
