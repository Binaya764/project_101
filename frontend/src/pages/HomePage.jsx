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
      icon: "🪔",
      badge: "Main Highlight",
      desc: "Hundreds of glowing diyos carrying heartfelt prayers from Kathmandu to New York, Sydney, and London.",
      actionText: "Enter the Wall →"
    },
    {
      title: "Games of Tihar",
      nepali: "तिहारका तास",
      url: "/games",
      icon: "🎴",
      badge: "3 Playable Games",
      desc: "Play Call Break, Dhumbal (Jhyap), and 21-card Marriage against intelligent AI opponents at a traditional felt table.",
      actionText: "Play Games →"
    },
    {
      title: "Rangoli & Mandala Studio",
      nepali: "रङ्गोली स्टुडियो",
      url: "/rangoli",
      icon: "🎨",
      badge: "Interactive Canvas",
      desc: "Draw sacred geometric floor art with real-time radial symmetry (4–12 fold), festival pigments, and PNG export.",
      actionText: "Open Studio →"
    },
    {
      title: "Chhath Puja Mahaparva",
      nepali: "छठ महापर्व",
      url: "/chhath",
      icon: "☀️",
      badge: "Ghats & Arghya",
      desc: "Explore Nepal's sacred Chhath Ghats, learn the 4-day rituals, and offer virtual Arghya with holy prasad to Lord Surya.",
      actionText: "Explore Chhath →"
    },
    {
      title: "Deusi-Bhailo Rhythm Jam",
      nepali: "देउसी-भैलो धुन",
      url: "/deusi-jam",
      icon: "🪘",
      badge: "Madal Drum Pad",
      desc: "Tap live Madal drum hits (Dhin, Tak, Khinta), groove to folk loops, and generate rhyming Deusi couplets.",
      actionText: "Start Jamming →"
    },
    {
      title: "Kukur Tihar Tribute",
      nepali: "कुकुर तिहार श्रद्धाञ्जली",
      url: "/kukur-tribute",
      icon: "🐕",
      badge: "Pet Hall of Fame",
      desc: "Drape virtual marigold garlands and vermilion tika on rescue dogs and cherished family pets.",
      actionText: "View Tributes →"
    },
    {
      title: "Yamapanchak Story",
      nepali: "५ दिनको महत्व",
      url: "/about-tihar",
      icon: "🏵️",
      badge: "Editorial Guide",
      desc: "In-depth cultural narrative on the five auspicious days, sacred lunar tithis, and timeless Nepali customs.",
      actionText: "Read Story →"
    },
    {
      title: "Celebration Pulse",
      nepali: "महोत्सव तथ्यांक",
      url: "/stats",
      icon: "📊",
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
            <span>🌟</span>
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
              className="portal-card-link"
              onClick={() => soundManager.playCardPlay()}
            >
              <div className="portal-card-header">
                <span className="portal-icon">{portal.icon}</span>
                <span className="portal-badge">{portal.badge}</span>
              </div>
              <div className="portal-card-titles">
                <h3 className="portal-title">{portal.title}</h3>
                <span className="portal-nepali">{portal.nepali}</span>
              </div>
              <p className="portal-desc">{portal.desc}</p>
              <div className="portal-action-row">
                <span className="action-text">{portal.actionText}</span>
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
