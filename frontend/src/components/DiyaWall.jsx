import React, { useState, useMemo } from 'react';
import DiyaCard from './DiyaCard';
import { soundManager } from '../utils/audio';

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
          Hover over any glowing lamp to reveal the heartfelt wish inside, or tap to send love and blessings. Join thousands illuminating the dark.
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
      <div className="diyo-wall-canvas-container">
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

            <div className="diyos-scattered-layout">
              {filteredDiyos.map((diya, index) => {
                // Subtle organic staggered offsets for natural rooftop lantern look
                const staggerY = (index % 5) * 6 - 12;
                const staggerX = (index % 4) * 4 - 8;
                return (
                  <div
                    key={diya.id}
                    className="scattered-diya-slot"
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

                <p className="card-wish-quote">"{diya.wish}"</p>

                <div className="card-bottom-actions">
                  <span className="card-diya-badge">{diya.diyaType}</span>
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
              </div>
            ))}
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
