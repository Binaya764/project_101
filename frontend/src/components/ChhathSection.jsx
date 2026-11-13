import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

export const CHHATH_DAYS = [
  {
    day: 1,
    name: "Nahay-Khay (नहाय-खाय)",
    date: "Day 1",
    tagline: "Sacred Holy Dip & Pure Sattvic Meal",
    description: "Devotees (Vratis) take a purifying bath in holy rivers or ponds, cleanse their homes thoroughly, and prepare a single sattvic meal of bottle gourd (kaddu-bhat) cooked in pure ghee with rock salt. It signifies physical and spiritual purification before commencing the intense fast.",
    rituals: ["Purifying river dip at dawn", "Preparation of Kaddu-Bhat (pumpkin & rice)", "Pledge of pure speech and clean mind"]
  },
  {
    day: 2,
    name: "Kharna (खरना)",
    date: "Day 2",
    tagline: "Nirjala Fast & Jaggery Kheer Offering",
    description: "The day-long waterless fast commences. In the evening, after sunset, devotees offer sacred Rasiyao-Kheer (rice pudding sweetened with sugarcane jaggery) and hot Rotis to Goddess Chhathi and the Sun God. Family and neighbors gather to receive this holy prasad before the 36-hour unbroken fast begins.",
    rituals: ["Day-long nirjala (waterless) fasting", "Cooking Kheer with cow milk & new jaggery", "Distribution of auspicious Kharna prasad"]
  },
  {
    day: 3,
    name: "Sandhya Arghya (सन्ध्या अर्घ्य)",
    date: "Day 3 - Dusk",
    tagline: "Evening Arghya to the Setting Sun God",
    description: "The entire city flocks to beautifully decorated riverbanks and ponds (Ghats). Wading into waist-deep water with bamboo trays (Soop and Daura) overflowing with Thekua, fruits, sugarcane, and lit diyos, devotees offer Arghya to the setting sun (Pratyaksha Surya) in gratitude for life and vitality.",
    rituals: ["Carrying bamboo Daura on heads to the Ghat", "Standing waist-deep in water at dusk", "Offering Arghya with milk, holy water, and hymns"]
  },
  {
    day: 4,
    name: "Usha Arghya / Paran (उषा अर्घ्य)",
    date: "Day 4 - Dawn",
    tagline: "Morning Arghya to the Rising Sun & Paran",
    description: "Before dawn breaks, devotees return to the Ghats waiting for the first golden rays of Lord Surya. As the sun rises over the water, the final Arghya is offered, prayers for the longevity of family and children are answered, and the 36-hour fast is joyously broken (Paran) with fresh ginger and Thekua prasad.",
    rituals: ["Welcoming the first ray of the rising Sun", "Final Arghya offering with conch shells", "Breaking the 36-hour fast with ginger and Thekua"]
  }
];

export const CHHATH_GHATS = [
  {
    id: "janakpur",
    name: "Ganga Sagar & Dhanush Sagar",
    nepali: "गङ्गा सागर र धनुष सागर",
    location: "Janakpur Dham, Madhesh Province",
    timing: "Sunset: 5:12 PM | Sunrise: 6:14 AM",
    capacity: "150,000+ Devotees",
    vibe: "The historic spiritual heartland of Mithila Chhath",
    highlight: "Illuminated with thousands of floating diyos across the sacred ancient lake."
  },
  {
    id: "ranipokhari",
    name: "Ranipokhari & Kamalpokhari",
    nepali: "रानीपोखरी र कमलपोखरी",
    location: "Kathmandu Valley",
    timing: "Sunset: 5:14 PM | Sunrise: 6:18 AM",
    capacity: "50,000+ Devotees",
    vibe: "Iconic historic capital gathering under the city lights",
    highlight: "Meticulously decorated with bamboo torans, marigold garlands, and reflection arches."
  },
  {
    id: "bagmati",
    name: "Bagmati Ghat (Guhyeshwari)",
    nepali: "बागमती गुह्येश्वरी घाट",
    location: "Pashupatinath Area, Kathmandu",
    timing: "Sunset: 5:14 PM | Sunrise: 6:18 AM",
    capacity: "40,000+ Devotees",
    vibe: "Sacred temple riverbanks honoring cosmic energy",
    highlight: "Devotees line the stone steps all the way towards Pashupatinath temple."
  },
  {
    id: "birgunj",
    name: "Ghariarwa Pokhari",
    nepali: "घडिअर्वा पोखरी",
    location: "Birgunj, Parsa",
    timing: "Sunset: 5:16 PM | Sunrise: 6:15 AM",
    capacity: "80,000+ Devotees",
    vibe: "Renowned across the border for architectural illumination",
    highlight: "Famous for grand musical processions and laser-lit water fountains."
  },
  {
    id: "narayani",
    name: "Narayani Riverbank",
    nepali: "नारायणी नदी किनारा",
    location: "Narayangarh, Chitwan",
    timing: "Sunset: 5:18 PM | Sunrise: 6:20 AM",
    capacity: "60,000+ Devotees",
    vibe: "Sprawling white sands by the sacred Gandaki tributary",
    highlight: "Sunrise reflecting directly over the broad Himalayan snow river currents."
  },
  {
    id: "diaspora",
    name: "Global Diaspora Sacred Waters",
    nepali: "विश्वभरका नेपाली छठ संगम",
    location: "Sydney, Dallas, London, Toronto, Dubai",
    timing: "Local Twilight Timings",
    capacity: "Infinite Virtual Devotees",
    vibe: "Connecting Nepalis around the world with home",
    highlight: "Virtual Arghya prayers offered in unison with motherland ghats."
  }
];

export default function ChhathSection() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(2);
  const [selectedGhat, setSelectedGhat] = useState(CHHATH_GHATS[0]);
  const [arghyaItems, setArghyaItems] = useState(['thekua', 'diyo', 'banana']);
  const [devoteeName, setDevoteeName] = useState('');
  const [arghyaCount, setArghyaCount] = useState(4280);
  const [isOffering, setIsOffering] = useState(false);
  const [offeringComplete, setOfferingComplete] = useState(false);

  const availableItems = [
    { id: 'thekua', label: 'Thekua (ठेकुवा)', icon: '🍪', note: 'Holy wheat & jaggery prasad' },
    { id: 'diyo', label: 'Diyo (दियो)', icon: '🪔', note: 'Lighting sacred flame' },
    { id: 'banana', label: 'Kera Ghaur (केरा)', icon: '🍌', note: 'Fresh whole bunch of bananas' },
    { id: 'coconut', label: 'Nariwal (नरिवल)', icon: '🥥', note: 'Auspicious unbroken coconut' },
    { id: 'sugarcane', label: 'Aakh (उखु)', icon: '🎋', note: 'Fresh red sugarcane stalks' },
    { id: 'radish', label: 'Mooli & Ginger (अदुवा)', icon: '🌱', note: 'Winter root blessings' }
  ];

  const toggleItem = (itemId) => {
    soundManager.playCardPlay();
    if (arghyaItems.includes(itemId)) {
      if (arghyaItems.length > 1) {
        setArghyaItems(arghyaItems.filter(i => i !== itemId));
      }
    } else {
      setArghyaItems([...arghyaItems, itemId]);
    }
  };

  const handleOfferArghya = (e) => {
    e.preventDefault();
    setIsOffering(true);
    soundManager.playDiyaChime();

    setTimeout(() => {
      soundManager.playTrickWon();
      setArghyaCount(prev => prev + 1);
      setIsOffering(false);
      setOfferingComplete(true);
    }, 1200);
  };

  const currentDay = CHHATH_DAYS[selectedDayIndex];

  return (
    <section id="chhath-section" className="chhath-section">
      {/* Section Header */}
      <div className="section-header-centered">
        <div className="festive-pill-badge chhath-badge">
          <span>☀️</span>
          <span>छठ महापर्व • Sun Worship & Ghat Locator</span>
        </div>

        <h2 className="section-title">
          The Splendor of <span className="gradient-gold-text">Chhath Parva</span>
        </h2>

        <p className="section-subtitle">
          Following Tihar, Nepal celebrates Chhath—the ancient Vedic festival honoring Lord Surya (the Sun God) and Chhathi Maiya for sustaining all cosmic life, purity, and universal health.
        </p>
      </div>

      {/* 4 Days Tabs */}
      <div className="chhath-days-grid" role="tablist">
        {CHHATH_DAYS.map((d, idx) => (
          <button
            key={d.day}
            type="button"
            role="tab"
            aria-selected={selectedDayIndex === idx}
            className={`chhath-day-tab ${selectedDayIndex === idx ? 'active' : ''}`}
            onClick={() => {
              soundManager.playCardPlay();
              setSelectedDayIndex(idx);
            }}
          >
            <span className="chhath-day-badge">{d.date}</span>
            <span className="chhath-day-name">{d.name}</span>
            <span className="chhath-day-tag">{d.tagline}</span>
          </button>
        ))}
      </div>

      {/* Day Editorial Spotlight */}
      <div className="chhath-editorial-card">
        <div className="editorial-content">
          <div className="chhath-editorial-header">
            <div>
              <h3>{currentDay.name}</h3>
              <span className="editorial-subtitle">{currentDay.tagline}</span>
            </div>
            <span className="sun-emblem">☀️</span>
          </div>

          <p className="editorial-desc">{currentDay.description}</p>

          <div className="chhath-rituals-list">
            <h4>✨ Sacred Highlights of {currentDay.name}:</h4>
            <ul>
              {currentDay.rituals.map((r, i) => (
                <li key={i}>{r}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Interactive Ghat Locator Section */}
      <div className="ghat-locator-container">
        <div className="locator-header">
          <div className="locator-title-row">
            <span className="pin-icon">📍</span>
            <div>
              <h3>Sacred Chhath Ghat Locator</h3>
              <p>Explore major ghats across Nepal & diaspora with live prayer timings and river coordinates.</p>
            </div>
          </div>
        </div>

        <div className="ghats-grid-layout">
          {/* Ghats List */}
          <div className="ghats-selection-list">
            {CHHATH_GHATS.map(g => (
              <div
                key={g.id}
                className={`ghat-list-item ${selectedGhat.id === g.id ? 'active-ghat' : ''}`}
                onClick={() => {
                  soundManager.playCardPlay();
                  setSelectedGhat(g);
                }}
              >
                <div className="ghat-item-top">
                  <strong>{g.name}</strong>
                  <span className="ghat-loc-pill">{g.location.split(',')[0]}</span>
                </div>
                <span className="ghat-nepali-text">{g.nepali}</span>
                <span className="ghat-timing-snippet">🕒 {g.timing}</span>
              </div>
            ))}
          </div>

          {/* Selected Ghat Showcase Card */}
          <div className="ghat-showcase-panel">
            <div className="ghat-banner-graphic">
              <div className="ghat-water-reflection" />
              <div className="ghat-sun-orb" />
              <div className="ghat-banner-info">
                <span className="banner-badge">Featured Sacred Ghat</span>
                <h4>{selectedGhat.name}</h4>
                <span className="banner-nepali">{selectedGhat.nepali}</span>
                <span className="banner-loc">📍 {selectedGhat.location}</span>
              </div>
            </div>

            <div className="ghat-details-body">
              <div className="ghat-meta-grid">
                <div className="meta-box">
                  <span className="meta-label">Arghya Timings</span>
                  <strong className="meta-val">{selectedGhat.timing}</strong>
                </div>
                <div className="meta-box">
                  <span className="meta-label">Crowd Capacity</span>
                  <strong className="meta-val">{selectedGhat.capacity}</strong>
                </div>
              </div>

              <p className="ghat-vibe-quote">"{selectedGhat.vibe}"</p>
              <div className="ghat-highlight-box">
                <span>🪷 <strong>Atmosphere:</strong> {selectedGhat.highlight}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Virtual Arghya Offering Feature */}
      <div className="virtual-arghya-card">
        <div className="arghya-header">
          <div className="header-text">
            <span className="basket-icon">🧺</span>
            <div>
              <h3>Virtual Arghya Offering (अर्घ्य अर्पण)</h3>
              <p>Prepare your sacred bamboo Soop with holy prasad and offer Arghya to Lord Surya and Chhathi Maiya.</p>
            </div>
          </div>
          <div className="arghya-counter-badge">
            <span className="count-num">{arghyaCount.toLocaleString()}+</span>
            <span className="count-lbl">Arghyas Offered</span>
          </div>
        </div>

        <form onSubmit={handleOfferArghya} className="arghya-builder-form">
          <label className="picker-title">Select Holy Offerings for your Soop (सूपका प्रसादहरू):</label>
          <div className="arghya-items-grid">
            {availableItems.map(item => {
              const isSelected = arghyaItems.includes(item.id);
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`arghya-item-pill ${isSelected ? 'selected' : ''}`}
                  onClick={() => toggleItem(item.id)}
                >
                  <span className="item-icon">{item.icon}</span>
                  <div className="item-texts">
                    <span className="item-name">{item.label}</span>
                    <span className="item-note">{item.note}</span>
                  </div>
                  <span className="check-box">{isSelected ? '✓' : '+'}</span>
                </button>
              );
            })}
          </div>

          <div className="devotee-input-row">
            <input
              type="text"
              placeholder="Your name or family name (e.g. Suman & Family)"
              value={devoteeName}
              onChange={(e) => setDevoteeName(e.target.value)}
              className="devotee-input"
            />
            <button
              type="submit"
              disabled={isOffering}
              className="btn-submit-arghya"
            >
              <span>{isOffering ? '☀️ Offering Arghya...' : '☀️ Offer Arghya (अर्घ्य दिनुहोस्)'}</span>
            </button>
          </div>
        </form>

        {offeringComplete && (
          <div className="arghya-success-banner">
            <div className="success-sun">☀️</div>
            <div>
              <h4>अर्घ्य स्वीकृत भयो! (Arghya Blessed)</h4>
              <p className="chhath-hymn-verse">
                “काँचहि बाँस के बहंगिया, बहँगी लचकत जाय... जय छठी मैया!”
              </p>
              <span className="devotee-blessing-note">
                May Lord Surya grant health, radiant energy, and prosperity to {devoteeName || 'you and your family'}!
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
