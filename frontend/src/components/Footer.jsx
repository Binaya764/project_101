import React from 'react';

export default function Footer({ onOpenLightModal }) {
  const scrollTo = (id) => {
    const el = document.querySelector(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="site-footer">
      {/* Decorative Border */}
      <div className="footer-top-garland" aria-hidden="true">
        <div className="wood-carving-strip" />
      </div>

      <div className="footer-container">
        {/* Brand & Mission */}
        <div className="footer-brand-column">
          <div className="footer-brand-header">
            <span className="footer-flame">🪔</span>
            <div>
              <h3 className="footer-title">JHILIMILI</h3>
              <span className="footer-subtitle">झिलिमिली • तिहार महोत्सव</span>
            </div>
          </div>
          <p className="footer-mission-text">
            A digital sanctuary where Nepali hearts from across the Himalayas and around the globe unite to share light, celebrate enduring traditions, play beloved card games, and pray for peace.
          </p>
          <div className="footer-nepali-blessing">
            <span>“अन्धकारबाट उज्यालोतर्फ — तमसो मा ज्योतिर्गमय”</span>
          </div>
        </div>

        {/* Quick Nav Links */}
        <div className="footer-nav-column">
          <h4 className="footer-col-heading">Navigation</h4>
          <ul className="footer-links-list">
            <li><button type="button" onClick={() => scrollTo('#home')}>Home (गृह)</button></li>
            <li><button type="button" onClick={() => scrollTo('#diyo-wall')}>Virtual Diyo Wall</button></li>
            <li><button type="button" onClick={() => scrollTo('#games')}>Games of Tihar</button></li>
            <li><button type="button" onClick={() => scrollTo('#about-tihar')}>About Yamapanchak</button></li>
            <li><button type="button" onClick={() => scrollTo('#stats')}>Celebration Pulse</button></li>
          </ul>
        </div>

        {/* Community & Action */}
        <div className="footer-action-column">
          <h4 className="footer-col-heading">Share the Joy</h4>
          <p className="footer-light-prompt">
            Haven't lit a diya yet? Add your prayer to our constellation of community lights.
          </p>
          <button
            type="button"
            className="btn-footer-light"
            onClick={onOpenLightModal}
          >
            <span>🪔 Light Your Diya Now</span>
          </button>

          <div className="footer-social-links">
            <span className="social-pill" title="Community Share">🌐 Global Diaspora</span>
            <span className="social-pill" title="Nepali Heritage">🇳🇵 Nepal</span>
            <span className="social-pill" title="Festival of Lights">✨ Deepawali 2083</span>
          </div>
        </div>
      </div>

      {/* Copyright Bar */}
      <div className="footer-bottom-bar">
        <div className="footer-bottom-container">
          <p className="footer-credit">
            Made with ❤️ for the spirit of Tihar.
          </p>
          <p className="footer-copyright">
            © {new Date().getFullYear()} JHILIMILI Platform. All blessings, stories, and cultural traditions warmly celebrated.
          </p>
        </div>
      </div>
    </footer>
  );
}
