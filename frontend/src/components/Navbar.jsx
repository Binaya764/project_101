import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../router/Router';
import { soundManager } from '../utils/audio';

export default function Navbar({ onOpenLightModal, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { currentPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/', nepali: 'गृह' },
    { name: 'Diyo Wall', path: '/wall', nepali: 'दियो भित्तो' },
    { name: 'Card Games', path: '/games', nepali: 'तास खेल' },
    { name: 'Rangoli Studio', path: '/rangoli', nepali: 'रङ्गोली' },
    { name: 'Chhath Parva', path: '/chhath', nepali: 'छठ महापर्व' },
    { name: 'Deusi Jam', path: '/deusi-jam', nepali: 'देउसी-भैलो' },
    { name: 'Kukur Tribute', path: '/kukur-tribute', nepali: 'कुकुर पूजा' },
    { name: 'About Tihar', path: '/about-tihar', nepali: 'यमपञ्चक' }
  ];

  return (
    <header className={`site-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <Link to="/" className="navbar-brand">
          <div className="brand-logo-icon">
            <span className="logo-flame">🪔</span>
            <div className="logo-sparkle" />
          </div>
          <div className="brand-text">
            <div className="brand-main-row">
              <span className="brand-english">JHILIMILI</span>
              <span className="competition-track-tag" title="KUCC Tihar-Chhath Web UI Design Competition 2026">
                KUCC Advanced Track
              </span>
            </div>
            <span className="brand-nepali">झिलिमिली • तिहार र छठ महापर्व</span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-item-link"
              onClick={() => soundManager.playCardPlay()}
            >
              <span className="link-title">{link.name}</span>
              <span className="link-sub-nepali">{link.nepali}</span>
            </Link>
          ))}
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">
          {/* Sound Toggle Button */}
          <button
            type="button"
            className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Festival Sounds' : 'Enable Festival Sounds'}
            aria-label={soundEnabled ? 'Mute Festival Sounds' : 'Enable Festival Sounds'}
          >
            <span className="sound-icon">{soundEnabled ? '🔔' : '🔕'}</span>
            <span className="sound-label">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          {/* Primary CTA */}
          <button
            type="button"
            className="btn-light-diya-nav"
            onClick={onOpenLightModal}
          >
            <span className="btn-flame">🪔</span>
            <span>Light a Diya</span>
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            className={`mobile-hamburger-btn ${mobileMenuOpen ? 'is-active' : ''}`}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileMenuOpen}
          >
            <span className="hamburger-line" />
            <span className="hamburger-line" />
            <span className="hamburger-line" />
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-drawer-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-drawer-pane" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <div className="brand-text">
                <span className="brand-english">JHILIMILI</span>
                <span className="brand-nepali">झिलिमिली • तिहार र छठ</span>
              </div>
              <button
                type="button"
                className="btn-drawer-close"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="mobile-nav-list">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="link-title">{link.name}</span>
                  <span className="link-sub-nepali">{link.nepali}</span>
                </Link>
              ))}
            </nav>

            <div className="mobile-drawer-cta">
              <button
                type="button"
                className="btn-light-diya-mobile"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenLightModal();
                }}
              >
                🪔 Light a Virtual Diya
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
