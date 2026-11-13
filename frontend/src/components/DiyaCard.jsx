import React, { useState } from 'react';
import { DIYA_TYPES } from '../data/sampleDiyas';

export default function DiyaCard({ diya, onClick, onLike, isLiked, isNewlyAdded }) {
  const [hovered, setHovered] = useState(false);

  const diyaTypeObj = DIYA_TYPES.find(t => t.id === diya.diyaType) || DIYA_TYPES[0];

  return (
    <div
      className={`diya-node-wrapper ${diya.diyaType} ${isNewlyAdded ? 'just-lit-animation' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(diya)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick(diya);
        }
      }}
      aria-label={`Diya lit by ${diya.isAnonymous ? 'Anonymous' : diya.name}`}
    >
      {/* Individual Glowing Light Halo */}
      <div
        className="diya-glow-halo"
        style={{
          '--diya-hue': diya.flameHue || 38
        }}
      />

      {/* Lamp Body & Flickering Flame */}
      <div className="diya-lamp-figure">
        {/* Flame */}
        <div className="lamp-flame-container">
          <div className="flame-flicker-core" />
          <div className="flame-flicker-outer" />
        </div>

        {/* Earthen/Gold Lamp SVG */}
        <svg
          className="mini-diya-svg"
          viewBox="0 0 64 36"
          xmlns="http://www.w3.org/2000/svg"
        >
          <ellipse cx="32" cy="22" rx="28" ry="11" fill={diyaTypeObj.color} />
          <ellipse cx="32" cy="19" rx="24" ry="7" fill={diyaTypeObj.accent} />
          <ellipse cx="32" cy="19" rx="19" ry="5" fill="#FFE082" opacity="0.85" />
          {/* Spout Lip */}
          <path d="M29,15 C31,11 33,11 35,15 Z" fill="#92400E" />
          {/* Wick */}
          <line x1="32" y1="18" x2="32" y2="12" stroke="#3D1D09" strokeWidth="2" strokeLinecap="round" />
        </svg>

        {/* Diya Type Badge Icon */}
        <div className="diya-type-micro-dot" style={{ backgroundColor: diyaTypeObj.iconColor }} />
      </div>

      {/* Floating Hover Tooltip */}
      {hovered && (
        <div className="diya-hover-tooltip" role="tooltip">
          <div className="tooltip-header">
            <span className="tooltip-author">
              {diya.isAnonymous ? 'Anonymous (शुभचिन्तक)' : diya.name}
            </span>
            <span className="tooltip-country">{diya.flag} {diya.city || diya.country}</span>
          </div>

          {diya.dedication && (
            <div className="tooltip-dedication">
              <span>❤️ {diya.dedication}</span>
            </div>
          )}

          <p className="tooltip-wish-snippet">
            "{diya.wish.length > 90 ? `${diya.wish.slice(0, 90)}...` : diya.wish}"
          </p>

          <div className="tooltip-footer">
            <span className="tooltip-type">{diyaTypeObj.name}</span>
            <span className="tooltip-hint">Click for full blessing 🪔</span>
          </div>
        </div>
      )}
    </div>
  );
}
