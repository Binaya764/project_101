import React, { useState } from 'react';
import { DIYA_TYPES } from '../data/sampleDiyas';
import { soundManager } from '../utils/audio';

export default function DiyaDetailModal({ diya, onClose, onLike, isLiked }) {
  const [copied, setCopied] = useState(false);
  const diyaTypeObj = DIYA_TYPES.find(t => t.id === diya.diyaType) || DIYA_TYPES[0];

  const handleCopy = () => {
    soundManager.playCardPlay();
    const textToCopy = `"${diya.wish}" — Lit by ${diya.isAnonymous ? 'Anonymous' : diya.name} on JHILIMILI Virtual Tihar Celebration 🪔`;
    navigator.clipboard?.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLikeClick = () => {
    soundManager.playDiyaChime();
    onLike(diya.id);
  };

  const formattedDate = new Date(diya.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="modal-card-dialog diya-detail-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
      >
        {/* Top Garland */}
        <div className="modal-top-garland">
          <span>🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼</span>
          <button type="button" className="btn-modal-close" onClick={onClose}>
            ✕
          </button>
        </div>

        {/* Header with Diya Graphic */}
        <div className="detail-modal-header">
          <div className="detail-diya-halo">
            <span className="detail-diya-flame">🪔</span>
          </div>

          <div className="detail-author-info">
            <h3>{diya.isAnonymous ? 'Anonymous (शुभचिन्तक)' : diya.name}</h3>
            <div className="detail-location-pill">
              <span>{diya.flag}</span>
              <span>{diya.city ? `${diya.city}, ` : ''}{diya.country}</span>
              <span className="dot-sep">•</span>
              <span>{formattedDate}</span>
            </div>
          </div>
        </div>

        {/* Dedication Banner if present */}
        {diya.dedication && (
          <div className="detail-dedication-banner">
            <span className="heart-icon">❤️</span>
            <span className="dedication-label">Dedicated to:</span>
            <strong className="dedication-target">{diya.dedication}</strong>
          </div>
        )}

        {/* Full Wish Quote */}
        <div className="detail-wish-quote-box">
          <span className="quote-mark left">“</span>
          <p className="detail-wish-text">{diya.wish}</p>
          <span className="quote-mark right">”</span>
        </div>

        {/* Diya Cultural Type */}
        <div className="detail-diya-type-card">
          <div className="type-indicator" style={{ backgroundColor: diyaTypeObj.iconColor }}>
            🪔
          </div>
          <div className="type-meta">
            <strong>{diyaTypeObj.name} ({diyaTypeObj.nepaliName})</strong>
            <p>{diyaTypeObj.description}</p>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="detail-modal-footer">
          <button
            type="button"
            className={`btn-like-diya ${isLiked ? 'liked' : ''}`}
            onClick={handleLikeClick}
          >
            <span>{isLiked ? '❤️' : '🤍'}</span>
            <span>{isLiked ? 'Blessed' : 'Send Love'} ({(diya.likes || 0) + (isLiked ? 1 : 0)})</span>
          </button>

          <button
            type="button"
            className="btn-copy-wish"
            onClick={handleCopy}
          >
            <span>{copied ? '✓ Copied!' : '📋 Copy Blessing'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
