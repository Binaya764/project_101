import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../router/Router';
import { soundManager } from '../utils/audio';

export default function Navbar({ onOpenLightModal, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const { currentPath } = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Primary streamlined navigation links
  const primaryNavLinks = [
    { name: 'Home', path: '/', icon: '🏮', nepali: 'गृह' },
    { name: 'Diyo Wall', path: '/wall', icon: '🪔', nepali: 'दियो भित्तो' },
    { name: 'Card Games', path: '/games', icon: '🎴', nepali: 'तास खेल' },
    { name: 'Rangoli Studio', path: '/rangoli', icon: '🎨', nepali: 'रङ्गोली' },
    { name: 'Chhath Parva', path: '/chhath', icon: '☀️', nepali: 'छठ महापर्व' },
    { name: 'About Tihar', path: '/about-tihar', icon: '🏵️', nepali: 'यमपञ्चक' }
  ];

  const secondaryNavLinks = [
    { name: 'Kukur Tribute', path: '/kukur-tribute', icon: '🐕', nepali: 'कुकुर पूजा' },
    { name: 'Celebration Stats', path: '/stats', icon: '📊', nepali: 'तथ्यांक' }
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
                KUCC Advanced
              </span>
            </div>
            <span className="brand-nepali">झिलिमिली • तिहार र छठ महापर्व</span>
          </div>
        </Link>

        {/* Clean, Easy Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {primaryNavLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="nav-item-link"
              onClick={() => {
                soundManager.playCardPlay();
                setMoreDropdownOpen(false);
              }}
            >
              <span className="link-title">{link.name}</span>
              <span className="link-sub-nepali">{link.nepali}</span>
            </Link>
          ))}

          {/* More Dropdown for secondary features */}
          <div
            className="nav-more-dropdown-wrapper"
            onMouseEnter={() => setMoreDropdownOpen(true)}
            onMouseLeave={() => setMoreDropdownOpen(false)}
          >
            <button
              type="button"
              className={`nav-item-link nav-more-trigger ${secondaryNavLinks.some(l => l.path === currentPath) ? 'is-active' : ''}`}
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              aria-expanded={moreDropdownOpen}
            >
              <span className="link-title">More ▾</span>
              <span className="link-sub-nepali">थप सुविधाहरू</span>
            </button>

            {moreDropdownOpen && (
              <div className="nav-dropdown-menu">
                {secondaryNavLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="dropdown-item-link"
                    onClick={() => {
                      soundManager.playCardPlay();
                      setMoreDropdownOpen(false);
                    }}
                  >
                    <span className="drop-icon">{link.icon}</span>
                    <div className="drop-texts">
                      <span className="drop-title">{link.name}</span>
                      <span className="drop-sub">{link.nepali}</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        {/* Navbar Actions */}
        <div className="navbar-actions">
          {/* Sound Toggle */}
          <button
            type="button"
            className={`sound-toggle-btn ${soundEnabled ? 'sound-on' : 'sound-off'}`}
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute Festival Audio' : 'Unmute Festival Audio'}
            aria-label={soundEnabled ? 'Mute Festival Audio' : 'Unmute Festival Audio'}
          >
            <span className="sound-icon">{soundEnabled ? '🔔' : '🔕'}</span>
            <span className="sound-label">{soundEnabled ? 'Sound ON' : 'Muted'}</span>
          </button>

          {/* Primary Action Button */}
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
              {[...primaryNavLinks, ...secondaryNavLinks].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="mobile-nav-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span className="mobile-nav-left">
                    <span className="mobile-link-icon">{link.icon}</span>
                    <span className="link-title">{link.name}</span>
                  </span>
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
