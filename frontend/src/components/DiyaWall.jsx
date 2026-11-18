import React, { useState, useMemo, useRef } from 'react';
import DiyaCard from './DiyaCard';
import { soundManager } from '../utils/audio';
import { DIYA_TYPES } from '../data/sampleDiyas';

export default function DiyaWall({
  diyos,
  onOpenLightModal,
  onSelectDiya,
  onLikeDiya,
  likedDiyaIds,
  newlyAddedId
}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all'); // 'all' | 'public' | 'anonymous' | 'dedications'
  const [viewMode, setViewMode] = useState('courtyard'); // 'courtyard' | 'cards'
  const [hoveredDiya, setHoveredDiya] = useState(null);
  const leaveTimerRef = useRef(null);

  // Filter & Search Logic
  const filteredDiyos = useMemo(() => {
    return diyos.filter((d) => {
      // Filter tab
      if (activeFilter === 'public' && d.isAnonymous) return false;
      if (activeFilter === 'anonymous' && !d.isAnonymous) return false;
      if (activeFilter === 'dedications' && !d.dedication) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = d.name.toLowerCase().includes(q);
        const matchWish = d.wish.toLowerCase().includes(q);
        const matchDedication = d.dedication?.toLowerCase().includes(q);
        const matchCity = d.city?.toLowerCase().includes(q);
        const matchCountry = d.country?.toLowerCase().includes(q);
        return matchName || matchWish || matchDedication || matchCity || matchCountry;
      }

      return true;
    });
  }, [diyos, activeFilter, searchQuery]);

  const handleDiyaHover = (diya) => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
    setHoveredDiya(diya);
  };

  const handleDiyaLeave = () => {
    leaveTimerRef.current = setTimeout(() => {
      setHoveredDiya(null);
    }, 180);
  };

  const hoveredTypeObj = hoveredDiya
    ? DIYA_TYPES.find(t => t.id === hoveredDiya.diyaType) || DIYA_TYPES[0]
    : null;

  return (
    <section id="diyo-wall" className="diyo-wall-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>✨</span>
          <span>दियो भित्तो • The Virtual Diyo Wall</span>
        </div>

        <h2 className="section-title">
          A Constellation of <span className="gradient-gold-text">Warmth & Prayers</span>
        </h2>

        <p className="section-subtitle">
          Hover over any glowing lamp to reveal the heartfelt wish inside at the base of the courtyard, or tap to send love and blessings.
        </p>
      </div>

      {/* Wall Controls Toolbar */}
      <div className="wall-toolbar">
        {/* Search Bar */}
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search wishes by name, city, dedication, or blessing..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="wall-search-input"
            aria-label="Search wishes"
          />
          {searchQuery && (
            <button
              type="button"
              className="btn-clear-search"
              onClick={() => setSearchQuery('')}
            >
              ✕
            </button>
          )}
        </div>

        {/* Filter Pills */}
        <div className="filter-pills-row" role="tablist">
          {[
            { id: 'all', label: 'All Diyos (सबै)', count: diyos.length },
            { id: 'public', label: 'Public Wishes', count: diyos.filter(d => !d.isAnonymous).length },
            { id: 'anonymous', label: 'Anonymous', count: diyos.filter(d => d.isAnonymous).length },
            { id: 'dedications', label: 'With Dedications', count: diyos.filter(d => !!d.dedication).length }
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeFilter === tab.id}
              className={`filter-pill-btn ${activeFilter === tab.id ? 'is-active' : ''}`}
              onClick={() => {
                soundManager.playCardPlay();
                setActiveFilter(tab.id);
              }}
            >
              <span>{tab.label}</span>
              <span className="pill-count">({tab.count})</span>
            </button>
          ))}
        </div>

        {/* View Mode Toggle & Light Diya CTA */}
        <div className="wall-right-actions">
          <div className="view-mode-toggle" role="group" aria-label="Wall View Modes">
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'courtyard' ? 'active' : ''}`}
              onClick={() => setViewMode('courtyard')}
              title="Starlit Courtyard View"
            >
              <span>✨ Courtyard</span>
            </button>
            <button
              type="button"
              className={`view-toggle-btn ${viewMode === 'cards' ? 'active' : ''}`}
              onClick={() => setViewMode('cards')}
              title="Cards Grid View"
            >
              <span>🗂️ Cards</span>
            </button>
          </div>

          <button
            type="button"
            className="btn-quick-light-diya"
            onClick={onOpenLightModal}
          >
            <span>🪔 Add Your Diya</span>
          </button>
        </div>
      </div>

      {/* Main Diyo Wall Canvas Area */}
      <div className={`diyo-wall-canvas-container ${hoveredDiya ? 'has-active-diya-hover' : ''}`}>
        {/* Soft background backdrop blur on hover */}
        <div className={`canvas-ambient-backdrop-blur ${hoveredDiya ? 'is-blurred' : ''}`} aria-hidden="true" />

        {/* Rich Tihar Folk Artwork Header */}
        <div className="wall-art-banner" aria-hidden="true">
          <svg viewBox="0 0 1200 130" preserveAspectRatio="xMidYMid meet" className="wall-art-svg">
            <defs>
              <linearGradient id="marigoldRope" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#F59E0B" />
                <stop offset="50%" stopColor="#FFD36A" />
                <stop offset="100%" stopColor="#F59E0B" />
              </linearGradient>
              <radialGradient id="sunburstGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFD36A" stopOpacity="0.8" />
                <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
              </radialGradient>
              <linearGradient id="peacockTeal" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="50%" stopColor="#0D9488" />
                <stop offset="100%" stopColor="#0284C7" />
              </linearGradient>
            </defs>

            {/* Upper Toran Hanging Flags */}
            {[...Array(24)].map((_, i) => {
              const x = 25 + i * 50;
              const flagColors = ['#D97706', '#DC2626', '#F59E0B', '#10B981', '#E11D48'];
              const color = flagColors[i % flagColors.length];
              return (
                <polygon
                  key={`flag-${i}`}
                  points={`${x - 14},0 ${x + 14},0 ${x},22`}
                  fill={color}
                  opacity="0.75"
                />
              );
            })}

            {/* Hanging Marigold Garlands (Dual layered drape) */}
            <path
              d="M0,28 Q150,68 300,32 Q450,-2 600,38 Q750,72 900,32 Q1050,-2 1200,28"
              stroke="url(#marigoldRope)"
              strokeWidth="3.5"
              fill="none"
              opacity="0.85"
            />
            <path
              d="M0,45 Q150,88 300,50 Q450,18 600,55 Q750,92 900,50 Q1050,18 1200,45"
              stroke="#D97706"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
              strokeDasharray="4 4"
            />

            {/* Marigold flowers along the garland */}
            {[0, 150, 300, 450, 600, 750, 900, 1050, 1200].map((x, i) => (
              <g key={`flower-${x}`} transform={`translate(${x}, ${i % 2 === 0 ? 32 : 38})`}>
                {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, j) => (
                  <ellipse
                    key={j}
                    cx={Math.cos((angle * Math.PI) / 180) * 9}
                    cy={Math.sin((angle * Math.PI) / 180) * 9}
                    rx="6"
                    ry="3.8"
                    fill={j % 2 === 0 ? '#F59E0B' : '#FF9F43'}
                    opacity="0.9"
                    transform={`rotate(${angle})`}
                  />
                ))}
                <circle cx="0" cy="0" r="5" fill="#FFD36A" />
                <circle cx="0" cy="0" r="2.5" fill="#DC2626" />
              </g>
            ))}

            {/* Ornate Hanging Clay Lanterns at Garland Dips */}
            {[75, 225, 375, 525, 675, 825, 975, 1125].map((x, i) => (
              <g key={`lantern-${x}`} transform={`translate(${x}, ${i % 2 === 0 ? 64 : 52})`}>
                <line x1="0" y1="-28" x2="0" y2="4" stroke="#D97706" strokeWidth="1.2" opacity="0.7" />
                <ellipse cx="0" cy="11" rx="13" ry="6" fill="#78350F" opacity="0.95" />
                <ellipse cx="0" cy="8" rx="11" ry="4" fill="#D97706" />
                <ellipse cx="0" cy="8" rx="7.5" ry="2.5" fill="#FFE082" opacity="0.9" />
                <circle cx="0" cy="-2" r="12" fill="url(#sunburstGlow)" />
                <path d="M-3,5 Q0,-8 0,-8 Q3,5 0,6 Z" fill="#F59E0B" opacity="0.95" />
                <path d="M-1.8,4 Q0,-5 0,-5 Q1.8,4 0,5 Z" fill="#FFFDE7" />
              </g>
            ))}

            {/* Center Sacred Mandala / Rangoli Artwork */}
            <g transform="translate(600, 78)">
              <circle cx="0" cy="0" r="38" fill="url(#sunburstGlow)" />
              <circle cx="0" cy="0" r="24" fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="3 3" />
              {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((a, i) => (
                <g key={`spoke-${i}`} transform={`rotate(${a})`}>
                  <line x1="0" y1="0" x2="22" y2="0" stroke={i % 2 === 0 ? '#FFD36A' : '#EF4444'} strokeWidth="1.8" />
                  <circle cx="22" cy="0" r="2" fill="#FFD36A" />
                </g>
              ))}
              <circle cx="0" cy="0" r="7" fill="#F59E0B" />
              <circle cx="0" cy="0" r="3.5" fill="#FFFDE7" />
            </g>

            {/* Left Auspicious Peacock Motif */}
            <g transform="translate(85, 78)">
              <ellipse cx="0" cy="0" rx="36" ry="18" fill="url(#sunburstGlow)" opacity="0.4" />
              {[-30, -15, 0, 15, 30, 45].map((deg, k) => (
                <g key={`l-feather-${k}`} transform={`rotate(${deg})`}>
                  <path d="M0,0 Q18,-8 32,0 Q18,8 0,0" fill="url(#peacockTeal)" opacity="0.7" />
                  <circle cx="26" cy="0" r="3" fill="#FFD36A" />
                  <circle cx="26" cy="0" r="1.5" fill="#0284C7" />
                </g>
              ))}
              <circle cx="0" cy="0" r="6" fill="#F59E0B" />
              <circle cx="0" cy="0" r="3" fill="#FFF9C4" />
            </g>

            {/* Right Auspicious Peacock Motif (Mirror) */}
            <g transform="translate(1115, 78) scale(-1, 1)">
              <ellipse cx="0" cy="0" rx="36" ry="18" fill="url(#sunburstGlow)" opacity="0.4" />
              {[-30, -15, 0, 15, 30, 45].map((deg, k) => (
                <g key={`r-feather-${k}`} transform={`rotate(${deg})`}>
                  <path d="M0,0 Q18,-8 32,0 Q18,8 0,0" fill="url(#peacockTeal)" opacity="0.7" />
                  <circle cx="26" cy="0" r="3" fill="#FFD36A" />
                  <circle cx="26" cy="0" r="1.5" fill="#0284C7" />
                </g>
              ))}
              <circle cx="0" cy="0" r="6" fill="#F59E0B" />
              <circle cx="0" cy="0" r="3" fill="#FFF9C4" />
            </g>
          </svg>
        </div>

        {/* Subtle Decorative Rooftop / Terrace Rails */}
        <div className="terrace-rail-top" aria-hidden="true">
          <div className="wood-lattice-pattern" />
        </div>

        {filteredDiyos.length === 0 ? (
          <div className="empty-wall-state">
            <div className="empty-icon">🪔</div>
            <h3>No diyos found matching "{searchQuery}"</h3>
            <p>Try clearing your search or be the first to light a diya in this category!</p>
            <button
              type="button"
              className="btn-primary"
              onClick={() => {
                setSearchQuery('');
                setActiveFilter('all');
              }}
            >
              Reset Filters
            </button>
          </div>
        ) : viewMode === 'courtyard' ? (
          /* Starlit Courtyard / Scattered Night Sky Canvas */
          <div className="starlit-courtyard-canvas">
            {/* Ambient night glow background */}
            <div className="night-valley-overlay" aria-hidden="true" />

            <div className={`diyos-scattered-layout ${hoveredDiya ? 'has-active-focus' : ''}`}>
              {filteredDiyos.map((diya, index) => {
                // Subtle organic staggered offsets for natural rooftop lantern look
                const staggerY = (index % 5) * 6 - 12;
                const staggerX = (index % 4) * 4 - 8;
                const isItemHovered = hoveredDiya?.id === diya.id;
                return (
                  <div
                    key={diya.id}
                    className={`scattered-diya-slot ${isItemHovered ? 'slot-focused' : ''}`}
                    style={{
                      transform: `translate(${staggerX}px, ${staggerY}px)`
                    }}
                  >
                    <DiyaCard
                      diya={diya}
                      onClick={onSelectDiya}
                      onLike={onLikeDiya}
                      isLiked={likedDiyaIds.has(diya.id)}
                      isNewlyAdded={newlyAddedId === diya.id}
                      onHover={handleDiyaHover}
                      onLeave={handleDiyaLeave}
                      isHovered={isItemHovered}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          /* Ornate Cards Grid View */
          <div className="mosaic-cards-grid">
            {filteredDiyos.map((diya) => (
              <div
                key={diya.id}
                className="mosaic-card-item"
                onClick={() => onSelectDiya(diya)}
              >
                {/* Uiverse animated border */}
                <div className="mosaic-card-border" />

                {/* Top: author + location */}
                <div className="card-top-meta">
                  <div className="meta-left">
                    <span className="mini-flame">🪔</span>
                    <strong className="card-author">
                      {diya.isAnonymous ? 'Anonymous' : diya.name}
                    </strong>
                  </div>
                  <span className="card-location">
                    {diya.flag} {diya.city || diya.country}
                  </span>
                </div>

                {diya.dedication && (
                  <div className="card-dedication-tag">
                    <span>❤️ {diya.dedication}</span>
                  </div>
                )}

                {/* Main wish message */}
                <p className="card-wish-quote">"{diya.wish}"</p>

                {/* Bottom: type + like (reveals on hover) */}
                <div className="card-bottom-actions">
                  <span className="card-diya-badge">🪔 {diya.diyaType}</span>
                  <button
                    type="button"
                    className="card-heart-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      onLikeDiya(diya.id);
                    }}
                  >
                    {likedDiyaIds.has(diya.id) ? '❤️' : '🤍'} {(diya.likes || 0) + (likedDiyaIds.has(diya.id) ? 1 : 0)}
                  </button>
                </div>

                {/* Click hint — fades in on hover */}
                <span className="mosaic-card-hint">Click for full blessing ✨</span>
              </div>
            ))}
          </div>
        )}

        {/* Dedicated Bottom Courtyard Stage for Full Message Display */}
        {viewMode === 'courtyard' && (
          <div className={`courtyard-bottom-blessing-stage ${hoveredDiya ? 'is-active' : ''}`}>
            {hoveredDiya ? (
              <div
                className="bottom-blessing-card"
                onClick={() => onSelectDiya(hoveredDiya)}
                onMouseEnter={() => {
                  if (leaveTimerRef.current) clearTimeout(leaveTimerRef.current);
                }}
                onMouseLeave={handleDiyaLeave}
              >
                <div className="blessing-card-header">
                  <div className="blessing-author-group">
                    <span className="blessing-lamp-icon">🪔</span>
                    <strong className="blessing-author-name">
                      {hoveredDiya.isAnonymous ? 'Anonymous (शुभचिन्तक)' : hoveredDiya.name}
                    </strong>
                    <span className="blessing-location-pill">
                      {hoveredDiya.flag} {hoveredDiya.city || hoveredDiya.country}
                    </span>
                  </div>

                  <div className="blessing-type-actions">
                    {hoveredTypeObj && (
                      <span className="blessing-type-badge">
                        ✨ {hoveredTypeObj.name}
                      </span>
                    )}
                    <button
                      type="button"
                      className="blessing-like-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLikeDiya(hoveredDiya.id);
                      }}
                      title="Send love to this diya"
                    >
                      {likedDiyaIds.has(hoveredDiya.id) ? '❤️' : '🤍'}{' '}
                      {(hoveredDiya.likes || 0) + (likedDiyaIds.has(hoveredDiya.id) ? 1 : 0)}
                    </button>
                  </div>
                </div>

                {hoveredDiya.dedication && (
                  <div className="blessing-dedication-banner">
                    <span>❤️ Dedicated with love to: <strong>{hoveredDiya.dedication}</strong></span>
                  </div>
                )}

                <div className="blessing-full-message">
                  “{hoveredDiya.wish}”
                </div>

                <div className="blessing-card-footer">
                  <span className="blessing-tap-hint">Tap anywhere on this card to open full blessing modal & details ✨</span>
                </div>
              </div>
            ) : (
              <div className="bottom-blessing-empty-hint">
                <span className="hint-flame">🪔</span>
                <span>Hover over any glowing diya above to read the heartfelt prayer in full detail</span>
              </div>
            )}
          </div>
        )}

        {/* Footer info in Wall */}
        <div className="wall-canvas-footer">
          <span>✨ Showing {filteredDiyos.length} glowing diyos on the wall</span>
        </div>
      </div>
    </section>
  );
}
