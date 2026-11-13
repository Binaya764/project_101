import React, { useState } from 'react';
import { DIYA_TYPES } from '../data/sampleDiyas';
import { soundManager } from '../utils/audio';

export default function DiyaModal({ onClose, onSubmit }) {
  const [name, setName] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [wish, setWish] = useState('');
  const [dedication, setDedication] = useState('');
  const [country, setCountry] = useState('Nepal');
  const [city, setCity] = useState('Kathmandu');
  const [diyaType, setDiyaType] = useState('gold');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const samplePrompts = [
    'यस पालिको तिहारले सबैको घरमा सुख, शान्ति र समृद्धि छाओस्! 🪔',
    'May the divine lights of Tihar illuminate your path with joy and good health! ✨',
    'भैलेनी आयो आँगन, बरी लै! Wishing warmth and blessings to every household. 🌼',
    'Sending heartfelt Bhai Tika blessings to my brothers across the miles! 🏵️'
  ];

  const countries = [
    { name: 'Nepal', flag: '🇳🇵', defaultCity: 'Kathmandu' },
    { name: 'Australia', flag: '🇦🇺', defaultCity: 'Sydney' },
    { name: 'United States', flag: '🇺🇸', defaultCity: 'Dallas' },
    { name: 'United Kingdom', flag: '🇬🇧', defaultCity: 'London' },
    { name: 'Canada', flag: '🇨🇦', defaultCity: 'Toronto' },
    { name: 'Japan', flag: '🇯🇵', defaultCity: 'Tokyo' },
    { name: 'United Arab Emirates', flag: '🇦🇪', defaultCity: 'Dubai' },
    { name: 'India', flag: '🇮🇳', defaultCity: 'New Delhi' },
    { name: 'Other Worldwide', flag: '🌐', defaultCity: 'Everywhere' }
  ];

  const handleCountryChange = (cName) => {
    setCountry(cName);
    const found = countries.find(c => c.name === cName);
    if (found) {
      setCity(found.defaultCity);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!wish.trim()) {
      setError('Please write a short Tihar wish or greeting.');
      return;
    }

    if (!isAnonymous && !name.trim()) {
      setError('Please enter your name or check "Remain Anonymous".');
      return;
    }

    setError('');
    setIsSubmitting(true);
    soundManager.playDiyaChime();

    const selectedCountryObj = countries.find(c => c.name === country) || { flag: '🇳🇵' };

    const newDiya = {
      id: `user-diyo-${Date.now()}`,
      name: isAnonymous ? 'Anonymous' : name.trim(),
      isAnonymous,
      wish: wish.trim(),
      dedication: dedication.trim(),
      country,
      city: city.trim() || 'Global',
      flag: selectedCountryObj.flag,
      diyaType,
      flameHue: diyaType === 'gold' ? 42 : diyaType === 'rangoli' ? 36 : diyaType === 'brass' ? 45 : 30,
      likes: 1,
      createdAt: new Date().toISOString(),
      isUserSubmission: true
    };

    setTimeout(() => {
      onSubmit(newDiya);
      setIsSubmitting(false);
    }, 600);
  };

  return (
    <div className="modal-backdrop-overlay" onClick={onClose}>
      <div
        className="modal-card-dialog diya-creation-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-labelledby="modal-title"
      >
        {/* Decorative Top Garland */}
        <div className="modal-top-garland">
          <span>🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼🏵️🌼</span>
          <button
            type="button"
            className="btn-modal-close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        <div className="modal-header">
          <div className="header-icon-flame">🪔</div>
          <h2 id="modal-title">Light Your Virtual Diya</h2>
          <p className="modal-subtitle">
            दियो बालौं, शुभकामना बाँचौं — Share warmth and festive joy with the world.
          </p>
        </div>

        {error && <div className="modal-form-alert error">{error}</div>}

        <form onSubmit={handleFormSubmit} className="diya-form">
          {/* Author Name & Anonymous Checkbox */}
          <div className="form-group">
            <div className="label-row">
              <label htmlFor="diya-author-name">Your Name (नाम)</label>
              <label className="checkbox-anonymous-label">
                <input
                  type="checkbox"
                  checked={isAnonymous}
                  onChange={(e) => setIsAnonymous(e.target.checked)}
                />
                <span>Remain Anonymous (नाम नखुलाउने)</span>
              </label>
            </div>
            {!isAnonymous ? (
              <input
                id="diya-author-name"
                type="text"
                placeholder="e.g. Suman Karki / Priya Sharma"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={40}
                required={!isAnonymous}
                className="input-text"
              />
            ) : (
              <div className="anonymous-pill-notice">
                <span>🔒 Your diya will appear as "Anonymous (शुभचिन्तक)"</span>
              </div>
            )}
          </div>

          {/* Diya Type Selection */}
          <div className="form-group">
            <label>Select Diya Design (दियोको प्रकार)</label>
            <div className="diya-type-picker-grid">
              {DIYA_TYPES.map((type) => (
                <button
                  key={type.id}
                  type="button"
                  className={`diya-type-option-card ${diyaType === type.id ? 'is-selected' : ''}`}
                  onClick={() => setDiyaType(type.id)}
                >
                  <div className="option-preview">
                    <span className="option-flame">🪔</span>
                    <div
                      className="option-color-swatch"
                      style={{ backgroundColor: type.color }}
                    />
                  </div>
                  <span className="option-name">{type.name}</span>
                  <span className="option-nepali">{type.nepaliName}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Tihar Wish Message */}
          <div className="form-group">
            <label htmlFor="diya-wish-text">Your Tihar Wish or Blessing (शुभकामना)</label>
            <textarea
              id="diya-wish-text"
              rows={3}
              placeholder="Write your heartfelt Tihar wish for peace, prosperity, and joy..."
              value={wish}
              onChange={(e) => setWish(e.target.value)}
              maxLength={280}
              required
              className="input-textarea"
            />
            {/* Quick Inspiration Pills */}
            <div className="inspiration-pills-row">
              <span className="prompts-title">Inspiration:</span>
              {samplePrompts.slice(0, 2).map((prompt, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="prompt-pill"
                  onClick={() => setWish(prompt)}
                >
                  "{prompt.slice(0, 36)}..."
                </button>
              ))}
            </div>
          </div>

          {/* Optional Dedication */}
          <div className="form-group">
            <label htmlFor="diya-dedication">Dedication (Optional - कसलाई समर्पित?)</label>
            <input
              id="diya-dedication"
              type="text"
              placeholder="e.g. Dedicated to my Aama & Buwa, to my sister in Melbourne..."
              value={dedication}
              onChange={(e) => setDedication(e.target.value)}
              maxLength={60}
              className="input-text"
            />
          </div>

          {/* Location / Country */}
          <div className="form-row-dual">
            <div className="form-group half">
              <label htmlFor="diya-country">Country (देश)</label>
              <select
                id="diya-country"
                value={country}
                onChange={(e) => handleCountryChange(e.target.value)}
                className="input-select"
              >
                {countries.map((c) => (
                  <option key={c.name} value={c.name}>
                    {c.flag} {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group half">
              <label htmlFor="diya-city">City / Region (शहर)</label>
              <input
                id="diya-city"
                type="text"
                placeholder="e.g. Kathmandu / Pokhara"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                maxLength={30}
                className="input-text"
              />
            </div>
          </div>

          {/* Submit CTA */}
          <div className="modal-actions-footer">
            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-submit-light-diya"
            >
              <span className="btn-flame-icon">🪔</span>
              <span>{isSubmitting ? 'Lighting Your Diya...' : 'Light My Diya (दियो बालौं)'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
