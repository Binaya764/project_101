import React, { useState } from 'react';
import { TIHAR_DAYS, TIHAR_SYMBOLS } from '../data/tiharDays';
import { soundManager } from '../utils/audio';

export default function AboutTihar() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2); // Default to Laxmi Puja (Day 3)
  const currentDay = TIHAR_DAYS[selectedDayIndex];

  return (
    <section id="about-tihar" className="about-tihar-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>🏵️</span>
          <span>यमपञ्चक • The Festival of Lights & Kinship</span>
        </div>

        <h2 className="section-title">
          The Five Days of <span className="gradient-gold-text">Yamapanchak</span>
        </h2>

        <p className="section-subtitle">
          Tihar (तिहार) is Nepal's second largest festival—a five-day celebration of nature, sacred animals, cosmic light, and the unbreakable bond of family.
        </p>
      </div>

      {/* 5-Day Interactive Timeline Navigation */}
      <div className="tihar-days-selector-bar" role="tablist">
        {TIHAR_DAYS.map((dayObj, idx) => (
          <button
            key={dayObj.day}
            type="button"
            role="tab"
            aria-selected={selectedDayIndex === idx}
            className={`day-tab-btn ${selectedDayIndex === idx ? 'is-active' : ''}`}
            onClick={() => {
              soundManager.playCardPlay();
              setSelectedDayIndex(idx);
            }}
          >
            <span className="day-number">Day {dayObj.day}</span>
            <span className="day-symbol-emoji">{dayObj.symbol}</span>
            <span className="day-name-en">{dayObj.nameEn}</span>
            <span className="day-name-ne">{dayObj.nameNe}</span>
          </button>
        ))}
      </div>

      {/* Featured Editorial Day Showcase */}
      <div className="editorial-day-feature-card">
        <div className="feature-card-grid">
          {/* Left Column: Visual & Sacred Rituals */}
          <div className="feature-visual-panel">
            <div className="day-visual-badge">
              <span className="large-symbol-icon">{currentDay.symbol}</span>
              <div className="visual-halo-glow" />
            </div>

            <div className="tithi-box">
              <span className="tithi-label">Sacred Lunar Tithi:</span>
              <span className="tithi-val">{currentDay.tithi}</span>
            </div>

            <div className="rituals-card">
              <h4>✨ Sacred Rituals of the Day:</h4>
              <ul className="rituals-list">
                {currentDay.rituals.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Deep Cultural Narrative */}
          <div className="feature-narrative-panel">
            <div className="day-header-meta">
              <span className="day-counter-pill">Day {currentDay.day} of 5</span>
              <h3 className="narrative-day-title">{currentDay.nameEn}</h3>
              <h4 className="narrative-nepali-title">{currentDay.nameNe}</h4>
              <p className="narrative-tagline">"{currentDay.tagline}"</p>
            </div>

            <p className="narrative-body-text">{currentDay.description}</p>

            <div className="cultural-callout-quote">
              <span className="lamp-bullet">🪔</span>
              <div>
                <strong>Cultural Significance:</strong>
                <p>{currentDay.culturalNote}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Deusi-Bhailo Musical Traditions Highlight */}
      <div className="deusi-bhailo-banner-card">
        <div className="deusi-content">
          <div className="deusi-title-row">
            <span className="madal-emoji">🪘</span>
            <div>
              <h3>Deusi & Bhailo: The Songs of Tihar</h3>
              <span className="deusi-nepali">"भैलेनी आयो आँगन, बरी लै!" • "ए है... भन भन भाइ हो... देउसीरे!"</span>
            </div>
          </div>
          <p>
            During Laxmi Puja night and Govardhan Puja, vibrant troupes of youth travel from house to house singing melodic folk verses, dancing to the beats of the Madal drum, and showering good wishes of wealth and long life upon each household. In return, homeowners offer traditional Sel Roti, fruits, and money on brass trays illuminated with diyos.
          </p>
        </div>
      </div>

      {/* Cultural Symbols Grid */}
      <div className="cultural-symbols-section">
        <h3 className="subheading-symbols">Auspicious Symbols of Tihar</h3>
        <div className="symbols-cards-grid">
          {TIHAR_SYMBOLS.map((sym) => (
            <div key={sym.name} className="symbol-item-card">
              <div className="symbol-header">
                <span className="symbol-dot">🏵️</span>
                <h4>{sym.name}</h4>
              </div>
              <span className="symbol-title-en">{sym.title}</span>
              <p className="symbol-desc">{sym.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
