import React, { useState, useEffect } from 'react';

export default function Statistics({ totalDiyosCount }) {
  // Base demonstration metrics
  const baseWishes = 8920 + Math.max(0, totalDiyosCount - 12480);
  const countriesCount = 64;
  const participantsCount = 35240 + Math.max(0, (totalDiyosCount - 12480) * 3);

  const stats = [
    {
      id: 'diyos',
      icon: '🪔',
      label: 'Diyos Lit Globally',
      labelNe: 'प्रज्वलित कुल दियो',
      value: totalDiyosCount.toLocaleString(),
      suffix: '+',
      change: '+142 lit today',
      color: '#FFD36A'
    },
    {
      id: 'wishes',
      icon: '💌',
      label: 'Wishes & Prayers Shared',
      labelNe: 'साटिएका शुभकामना',
      value: baseWishes.toLocaleString(),
      suffix: '+',
      change: 'Nepali & English',
      color: '#FF9F43'
    },
    {
      id: 'countries',
      icon: '🌏',
      label: 'Countries Represented',
      labelNe: 'सहभागी देशहरू',
      value: countriesCount,
      suffix: ' Nations',
      change: 'Across 6 Continents',
      color: '#F59E0B'
    },
    {
      id: 'participants',
      icon: '✨',
      label: 'Festive Community Reach',
      labelNe: 'महोत्सव सहभागिता',
      value: participantsCount.toLocaleString(),
      suffix: '+',
      change: 'Global diaspora & friends',
      color: '#D94A32'
    }
  ];

  const regions = [
    { name: 'Nepal (मातृभूमि)', percentage: '68%', flag: '🇳🇵' },
    { name: 'Australia & Oceania', percentage: '12%', flag: '🇦🇺' },
    { name: 'United States & Canada', percentage: '11%', flag: '🇺🇸' },
    { name: 'Europe & UK', percentage: '5%', flag: '🇬🇧' },
    { name: 'Middle East & Asia', percentage: '4%', flag: '🇦🇪' }
  ];

  return (
    <section id="stats" className="stats-section">
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>📊</span>
          <span>महोत्सव तथ्यांक • Celebration Pulse</span>
        </div>

        <h2 className="section-title">
          The Light That <span className="gradient-gold-text">Connects Us All</span>
        </h2>

        <p className="section-subtitle">
          Every lamp lit on JHILIMILI represents a home, a memory, and a prayer for light over darkness.
        </p>

        <div className="demo-data-disclaimer">
          <span>ℹ️ Community & Demonstration Metrics: Blending real visitor submissions with sample global diaspora benchmarks.</span>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="stats-cards-grid">
        {stats.map((stat) => (
          <div key={stat.id} className="stat-card">
            <div className="stat-card-glow" style={{ backgroundColor: stat.color }} />
            <div className="stat-icon-bubble">{stat.icon}</div>
            <div className="stat-value-group">
              <span className="stat-value-number">{stat.value}</span>
              <span className="stat-suffix">{stat.suffix}</span>
            </div>
            <span className="stat-label-en">{stat.label}</span>
            <span className="stat-label-ne">{stat.labelNe}</span>
            <span className="stat-badge-trend">{stat.change}</span>
          </div>
        ))}
      </div>

      {/* Global Regional Distribution Banner */}
      <div className="regions-distribution-card">
        <div className="distribution-header">
          <span className="globe-icon">🌐</span>
          <h4>Global Celebration Footprint</h4>
          <span className="distribution-note">Where our community diyos are shining from</span>
        </div>

        <div className="distribution-bars">
          {regions.map((reg) => (
            <div key={reg.name} className="region-bar-item">
              <div className="region-meta">
                <span className="reg-name">{reg.flag} {reg.name}</span>
                <span className="reg-percent">{reg.percentage}</span>
              </div>
              <div className="progress-track">
                <div
                  className="progress-fill"
                  style={{ width: reg.percentage }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
