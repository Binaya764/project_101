import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

export default function Hero({ totalDiyosCount, onOpenLightModal, onExploreWall }) {
  const [flameFlared, setFlameFlared] = useState(false);

  const handleDiyaClick = () => {
    soundManager.playDiyaChime();
    setFlameFlared(true);
    setTimeout(() => setFlameFlared(false), 900);
  };

  return (
    <section id="home" className="hero-section">
      {/* Decorative Traditional Rangoli Backdrop */}
      <div className="hero-rangoli-bg" aria-hidden="true">
        <svg className="mandala-svg" viewBox="0 0 600 600">
          <circle cx="300" cy="300" r="280" fill="none" stroke="rgba(245, 158, 11, 0.08)" strokeWidth="1.5" strokeDasharray="6,6" />
          <circle cx="300" cy="300" r="230" fill="none" stroke="rgba(255, 211, 106, 0.12)" strokeWidth="2" />
          <circle cx="300" cy="300" r="170" fill="none" stroke="rgba(217, 74, 50, 0.1)" strokeWidth="2" />
          {/* Petal Geometry */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`rotate(${i * 30} 300 300)`}>
              <path
                d="M300,100 C325,160 325,240 300,280 C275,240 275,160 300,100 Z"
                fill="none"
                stroke="rgba(245, 158, 11, 0.14)"
                strokeWidth="1.2"
              />
              <circle cx="300" cy="115" r="4" fill="rgba(255, 211, 106, 0.25)" />
            </g>
          ))}
        </svg>
      </div>

      <div className="hero-content-wrapper">
        {/* Left Column: Festive Story & Headings */}
        <div className="hero-text-column">
          {/* Nepali Subtitle Badge */}
          <div className="festive-pill-badge">
            <span className="pill-flame">✨</span>
            <span className="nepali-motto">उज्यालो बाँडौँ, खुशी साटौँ</span>
            <span className="pill-dot">•</span>
            <span className="pill-year">शुभ दीपावली २०८३</span>
          </div>

          <h1 className="hero-main-title">
            Light Up the World, <br />
            <span className="gradient-gold-text">One Diya at a Time.</span>
          </h1>

          <p className="hero-description">
            Celebrate the timeless warmth and radiant spirit of Tihar. Light a virtual diya, dedicate your wishes to loved ones near and far, play cherished card games, and connect with communities across the globe.
          </p>

          {/* Action CTAs */}
          <div className="hero-actions-group">
            <button
              type="button"
              className="btn-hero-primary"
              onClick={onOpenLightModal}
            >
              <span className="btn-icon">🪔</span>
              <span className="btn-label">Light a Diya</span>
            </button>

            <button
              type="button"
              className="btn-hero-secondary"
              onClick={onExploreWall}
            >
              <span>Explore the Wall</span>
              <span className="arrow-icon">↓</span>
            </button>
          </div>

          {/* Prominent Live Counter */}
          <div className="hero-counter-card">
            <div className="counter-icon-box">
              <span className="counter-flame">🪔</span>
              <div className="counter-pulse-ring" />
            </div>
            <div className="counter-stats-text">
              <div className="counter-number-row">
                <span className="counter-number">
                  {totalDiyosCount.toLocaleString()}+
                </span>
                <span className="counter-status-live">● LIVE</span>
              </div>
              <p className="counter-caption">
                Diyos Glowing Across 64+ Countries Worldwide
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Hero Visual Diya Artwork */}
        <div className="hero-diya-column">
          <div
            className={`hero-diya-stage ${flameFlared ? 'diya-flared' : ''}`}
            onClick={handleDiyaClick}
            title="Click to nourish the flame"
          >
            {/* Ambient Halo behind flame */}
            <div className="diya-ambient-halo" />
            <div className="diya-light-beam" />

            {/* Marigold Garland Ring around Diya Base */}
            <div className="marigold-ring" aria-hidden="true">
              <span className="flower f-1">🌼</span>
              <span className="flower f-2">🏵️</span>
              <span className="flower f-3">🌼</span>
              <span className="flower f-4">🏵️</span>
              <span className="flower f-5">🌼</span>
              <span className="flower f-6">🏵️</span>
              <span className="flower f-7">🌼</span>
              <span className="flower f-8">🏵️</span>
            </div>

            {/* SVG Illustration of Majestic Nepali Diya */}
            <svg
              className="hero-diya-svg"
              viewBox="0 0 340 320"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Flame Gradient */}
                <radialGradient id="flameInnerGrad" cx="50%" cy="65%" r="50%">
                  <stop offset="0%" stopColor="#FFFFFF" />
                  <stop offset="25%" stopColor="#FFF176" />
                  <stop offset="55%" stopColor="#FF9800" />
                  <stop offset="85%" stopColor="#E65100" />
                  <stop offset="100%" stopColor="#B71C1C" stopOpacity="0.1" />
                </radialGradient>

                <linearGradient id="flameBaseBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity="0" />
                </linearGradient>

                {/* Terracotta Clay Diya Bowl Gradients */}
                <linearGradient id="clayRimGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#873516" />
                  <stop offset="35%" stopColor="#C45A25" />
                  <stop offset="70%" stopColor="#E87A38" />
                  <stop offset="100%" stopColor="#6C2A11" />
                </linearGradient>

                <linearGradient id="clayBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#B84E20" />
                  <stop offset="60%" stopColor="#8A3412" />
                  <stop offset="100%" stopColor="#541F0A" />
                </linearGradient>

                {/* Golden Oil Surface Gradient */}
                <radialGradient id="goldenOilGrad" cx="50%" cy="40%" r="50%">
                  <stop offset="0%" stopColor="#FFE082" />
                  <stop offset="45%" stopColor="#FFB300" />
                  <stop offset="85%" stopColor="#BF360C" />
                </radialGradient>

                {/* Drop shadow */}
                <filter id="diyaShadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feDropShadow dx="0" dy="16" stdDeviation="18" floodColor="#000000" floodOpacity="0.7" />
                </filter>
              </defs>

              {/* Shadow Base */}
              <ellipse cx="170" cy="275" rx="110" ry="24" fill="rgba(0,0,0,0.55)" />

              {/* Terracotta Diya Foot / Stand */}
              <path
                d="M130,250 C130,268 145,274 170,274 C195,274 210,268 210,250 Z"
                fill="url(#clayBodyGrad)"
              />

              {/* Main Clay Bowl */}
              <g filter="url(#diyaShadow)">
                <path
                  d="M50,195 C55,250 115,268 170,268 C225,268 285,250 290,195 C293,178 260,165 170,165 C80,165 47,178 50,195 Z"
                  fill="url(#clayBodyGrad)"
                  stroke="#E87A38"
                  strokeWidth="1.5"
                />

                {/* Carved Traditional Relief Border */}
                <path
                  d="M75,205 Q170,250 265,205"
                  fill="none"
                  stroke="#FFD36A"
                  strokeWidth="2.5"
                  strokeDasharray="4,6"
                  strokeLinecap="round"
                />

                {/* Upper Rim */}
                <ellipse cx="170" cy="185" rx="112" ry="28" fill="url(#clayRimGrad)" />

                {/* Oil Pool Inside */}
                <ellipse cx="170" cy="186" rx="96" ry="21" fill="url(#goldenOilGrad)" />

                {/* Spout Lip pointing upward */}
                <path
                  d="M152,174 C162,168 170,158 170,155 C170,158 178,168 188,174 Z"
                  fill="#782E0F"
                />

                {/* Cotton Wick (Batti) */}
                <path
                  d="M170,184 C170,172 169,158 170,148"
                  stroke="#3D1D09"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </g>

              {/* Realistic Animated Flame */}
              <g className="hero-flame-group">
                {/* Outer Glow Teardrop */}
                <path
                  className="flame-layer flame-outer"
                  d="M170,55 C188,95 210,125 198,154 C188,172 152,172 142,154 C130,125 152,95 170,55 Z"
                  fill="url(#flameInnerGrad)"
                />

                {/* Inner Bright Core */}
                <path
                  className="flame-layer flame-inner"
                  d="M170,78 C182,108 194,128 186,150 C178,162 162,162 154,150 C146,128 158,108 170,78 Z"
                  fill="#FFFDE7"
                />

                {/* Blue Base of flame */}
                <ellipse
                  cx="170"
                  cy="153"
                  rx="10"
                  ry="5"
                  fill="url(#flameBaseBlue)"
                />
              </g>
            </svg>

            {/* Click Prompt */}
            <div className="diya-click-hint">
              <span>✨ Tap diya to ignite warmth</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
