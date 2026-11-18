import React from 'react';

export default function Footer({ onOpenLightModal }) {
  return (
    <footer className="site-footer">
      {/* Decorative Top Garland */}
      <div className="footer-top-garland" aria-hidden="true">
        <div className="wood-carving-strip" />
      </div>

      <div className="footer-container balanced-footer">
        {/* Brand & Mission */}
        <div className="footer-brand-column">
          <div className="footer-brand-header">
            <span className="footer-flame">🪔</span>
            <div>
              <h3 className="footer-title">JHILIMILI</h3>
              <span className="footer-subtitle">झिलिमिली • तिहार र छठ महापर्व</span>
            </div>
          </div>
          <p className="footer-mission-text">
            A digital sanctuary where Nepali hearts from across the Himalayas and around the globe unite to share light, celebrate enduring traditions, play beloved card games, and pray for peace.
          </p>
          <div className="footer-nepali-blessing">
            <span>“अन्धकारबाट उज्यालोतर्फ — तमसो मा ज्योतिर्गमय”</span>
          </div>
        </div>

        {/* Community & Action */}
        <div className="footer-action-column">
          <h4 className="footer-col-heading">Celebrate With Us</h4>
          <p className="footer-light-prompt">
            Haven't lit a diya yet? Add your prayer to our constellation of community lights and connect with celebrants worldwide.
          </p>
          <button
            type="button"
            className="btn-footer-light"
            onClick={onOpenLightModal}
          >
            <span>🪔 Light Your Virtual Diya Now</span>
          </button>

          <div className="footer-social-links">
            <span className="social-pill" title="KUCC 2026">KUCC Web UI 2026</span>
            <span className="social-pill" title="Nepali Heritage">🇳🇵 Nepal & Diaspora</span>
            <span className="social-pill" title="Festival of Lights">✨ Deepawali 2083</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-credit">
            Made with ❤️ for the spirit of Tihar & Chhath • KUCC Advanced Track.
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} JHILIMILI Platform. All blessings, stories, and cultural traditions warmly celebrated.
          </p>
        </div>
      </div>
    </footer>
  );
}
