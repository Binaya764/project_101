import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';

export default function Navbar({ onOpenLightModal, soundEnabled, onToggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home', nepali: 'गृह' },
    { name: 'Diyo Wall', href: '#diyo-wall', nepali: 'दियो भित्तो' },
    { name: 'Games of Tihar', href: '#games', nepali: 'तिहारका तास' },
    { name: 'About Tihar', href: '#about-tihar', nepali: 'तिहारको महत्व' },
    { name: 'Celebration Stats', href: '#stats', nepali: 'तथ्यांक' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`site-navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Brand Logo */}
        <a href="#home" className="navbar-brand" onClick={(e) => handleNavClick(e, '#home')}>
          <div className="brand-logo-icon">
            <span className="logo-flame">🪔</span>
            <div className="logo-sparkle" />
          </div>
          <div className="brand-text">
            <span className="brand-english">JHILIMILI</span>
            <span className="brand-nepali">झिलिमिली</span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="nav-item-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="link-title">{link.name}</span>
              <span className="link-sub-nepali">{link.nepali}</span>
            </a>
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
                <span className="brand-nepali">झिलिमिली</span>
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
                <a
                  key={link.name}
                  href={link.href}
                  className="mobile-nav-link"
                  onClick={(e) => handleNavClick(e, link.href)}
                >
                  <span className="link-title">{link.name}</span>
                  <span className="link-sub-nepali">{link.nepali}</span>
                </a>
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
