import React from 'react';
import Hero from '../components/Hero';
import { Link, useRouter } from '../router/Router';
import { soundManager } from '../utils/audio';

export default function HomePage({ totalCount, onOpenLightModal, diyos, onSelectDiya }) {
  const { navigate } = useRouter();

  const portalCards = [
    {
      title: "Virtual Diyo Wall",
      nepali: "दियो भित्तो",
      url: "/wall",
      image: "/images/diya.png",
      badge: "Main Highlight",
      desc: "Hundreds of glowing diyos carrying heartfelt prayers from Kathmandu to New York, Sydney, and London.",
      actionText: "Enter the Wall →"
    },
    {
      title: "Games of Tihar",
      nepali: "तिहारका तास",
      url: "/games",
      image: "/images/tihar.png",
      badge: "3 Playable Games",
      desc: "Play Call Break, Dhumbal (Jhyap), and 21-card Marriage against intelligent AI opponents at a traditional felt table.",
      actionText: "Play Games →"
    },

    {
      title: "Chhath Puja Mahaparva",
      nepali: "छठ महापर्व",
      url: "/chhath",
      image: "/images/chhath.png",
      badge: "Ghats & Arghya",
      desc: "Explore Nepal's sacred Chhath Ghats, learn the 4-day rituals, and offer virtual Arghya with holy prasad to Lord Surya.",
      actionText: "Explore Chhath →"
    },

    {
      title: "Yamapanchak Story",
      nepali: "५ दिनको महत्व",
      url: "/about-tihar",
      image: "/images/lamp.jpg",
      badge: "Editorial Guide",
      desc: "In-depth cultural narrative on the five auspicious days, sacred lunar tithis, and timeless Nepali customs.",
      actionText: "Read Story →"
    },
    {
      title: "Celebration Pulse",
      nepali: "महोत्सव तथ्यांक",
      url: "/stats",
      image: "/images/diya.png",
      badge: "Global Reach",
      desc: "Interactive global analytics showing participants across 64+ nations and regional diaspora distribution.",
      actionText: "View Analytics →"
    }
  ];

  const recentWishes = diyos.slice(0, 4);

  return (
    <div className="page-container home-page">
      {/* Hero Section */}
      <Hero
        totalDiyosCount={totalCount}
        onOpenLightModal={onOpenLightModal}
        onExploreWall={() => navigate('/wall')}
      />

      {/* Festival Portal Gateway Cards */}
      <section className="portal-gateway-section">
        <div className="section-header-centered">
          <div className="festive-pill-badge">
            <span></span>
            <span>महोत्सव अनुभव • Choose Your Festival Journey</span>
          </div>
          <h2 className="section-title">
            Explore the Wonders of <span className="gradient-gold-text">JHILIMILI</span>
          </h2>
          <p className="section-subtitle">
            Navigate through our immersive festival rooms—each with its own dedicated page, interactive tools, and cultural traditions.
          </p>
        </div>

        <div className="portal-cards-grid">
          {portalCards.map((portal) => (
            <Link
              key={portal.url}
              to={portal.url}
              className="portal-flip-card"
              onClick={() => soundManager.playCardPlay()}
            >
              <div className="portal-flip-content">

                {/* BACK — shown by default, flips away on hover */}
                <div className="portal-flip-back">
                  <div className="portal-flip-back-content">
                    {/* Floating ambient blobs */}
                    <div className="portal-blob" />
                    <div className="portal-blob portal-blob--mid" />
                    <div className="portal-blob portal-blob--small" />

                    {/* Festive back-side image from public folder */}
                    <img
                      src={portal.image}
                      alt={portal.title}
                      className="portal-flip-img"
                    />

                    {/* Back face title header & preview */}
                    <div className="portal-back-info">
                      <span className="portal-back-badge">{portal.badge}</span>
                      <h3 className="portal-back-title">{portal.title}</h3>
                      <span className="portal-back-nepali">{portal.nepali}</span>
                    </div>

                    <div className="portal-flip-hover-pill">
                      <span>✨ Hover to Explore</span>
                    </div>
                  </div>
                </div>

                {/* FRONT — revealed on hover */}
                <div className="portal-flip-front">
                  <div className="portal-flip-front-content">
                    <span className="portal-flip-badge">{portal.badge}</span>
                    <div className="portal-flip-description">
                      <div className="portal-flip-title-row">
                        <p className="portal-flip-title">{portal.title}</p>
                      </div>
                      <span className="portal-flip-nepali">{portal.nepali}</span>
                      <p className="portal-flip-desc">{portal.desc}</p>
                      <span className="portal-flip-action">{portal.actionText}</span>
                    </div>
                  </div>
                </div>

              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Community Wishes Carousel / Strip */}
      <section className="featured-wishes-strip">
        <div className="strip-container">
          <div className="strip-header">
            <span className="strip-icon">🪔</span>
            <div>
              <h3>Recent Lights on the Wall</h3>
              <p>Heartfelt prayers newly placed by celebrants across the globe.</p>
            </div>
            <Link to="/wall" className="btn-view-all-wall">
              View All {totalCount.toLocaleString()}+ Diyos →
            </Link>
          </div>

          <div className="wishes-mini-grid">
            {recentWishes.map((w) => (
              <div
                key={w.id}
                className="mini-wish-card"
                onClick={() => onSelectDiya(w)}
              >
                <div className="mini-wish-top">
                  <strong>{w.isAnonymous ? 'Anonymous' : w.name}</strong>
                  <span>{w.flag} {w.city || w.country}</span>
                </div>
                {w.dedication && (
                  <span className="mini-dedication">❤️ {w.dedication}</span>
                )}
                <p className="mini-text">"{w.wish.slice(0, 110)}..."</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
