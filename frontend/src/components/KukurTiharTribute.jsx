import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

export default function KukurTiharTribute() {
  const [dogs, setDogs] = useState([
    {
      id: 'kukur-1',
      name: 'Sheru (शेरु)',
      role: 'Guardian of Basantapur Durbar Square',
      story: 'Beloved by locals and shopkeepers, Sheru watches over the ancient palace courtyard and guides late-night commuters safely home.',
      avatar: '🐕',
      tikaApplied: true,
      garlanded: true,
      loves: 184
    },
    {
      id: 'kukur-2',
      name: 'Bruno (ब्रुनो)',
      role: 'Himalayan Avalanche & Search K9',
      story: 'Trained in Langtang and Annapurna, Bruno has assisted rescue missions in treacherous snow and high mountain trails.',
      avatar: '🦮',
      tikaApplied: true,
      garlanded: true,
      loves: 242
    },
    {
      id: 'kukur-3',
      name: 'Lucy (लुसी)',
      role: 'Family Comfort & Joy in Pokhara',
      story: 'Always the first to welcome kids from school and loves basking in the Phewa Lake morning sunshine.',
      avatar: '🐶',
      tikaApplied: false,
      garlanded: false,
      loves: 95
    }
  ]);

  const [petName, setPetName] = useState('');
  const [petStory, setPetStory] = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState('🐕');
  const [showAddForm, setShowAddForm] = useState(false);

  const handleGarlandDog = (dogId) => {
    soundManager.playDiyaChime();
    setDogs(prev => prev.map(d => {
      if (d.id === dogId) {
        return {
          ...d,
          tikaApplied: true,
          garlanded: true,
          loves: d.loves + 1
        };
      }
      return d;
    }));
  };

  const handleAddPet = (e) => {
    e.preventDefault();
    if (!petName.trim()) return;

    soundManager.playDiyaChime();
    const newPet = {
      id: `kukur-${Date.now()}`,
      name: petName.trim(),
      role: 'Beloved Companion',
      story: petStory.trim() || 'A devoted, loving friend who fills our home with unconditional warmth.',
      avatar: selectedAvatar,
      tikaApplied: true,
      garlanded: true,
      loves: 1
    };

    setDogs([newPet, ...dogs]);
    setPetName('');
    setPetStory('');
    setShowAddForm(false);
  };

  return (
    <section id="kukur-tribute" className="kukur-tribute-section">
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>🐕</span>
          <span>कुकुर तिहार श्रद्धाञ्जली • Loyal Companion Tribute</span>
        </div>

        <h2 className="section-title">
          Honoring Unconditional <span className="gradient-gold-text">Loyalty & Love</span>
        </h2>

        <p className="section-subtitle">
          On Kukur Tihar, we celebrate our most faithful companions. Drape a sacred marigold garland (*Sayapatri Mala*), apply a vermilion tika, or add your pet to the festival hall of fame!
        </p>
      </div>

      {/* Action button to add pet */}
      <div className="tribute-top-actions">
        <button
          type="button"
          className="btn-add-pet-tribute"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <span>{showAddForm ? '✕ Close Form' : '🐾 Dedicate a Garland to Your Dog'}</span>
        </button>
      </div>

      {/* Add Pet Form Modal / Dropdown */}
      {showAddForm && (
        <form onSubmit={handleAddPet} className="pet-tribute-form-card">
          <h4>Dedicate to Your Dog or Street Friend</h4>
          <div className="pet-form-grid">
            <div className="avatar-picker-row">
              <label>Select Avatar:</label>
              <div className="avatars-options">
                {['🐕', '🦮', '🐶', '🐩', '🐾'].map(av => (
                  <button
                    key={av}
                    type="button"
                    className={`av-btn ${selectedAvatar === av ? 'active' : ''}`}
                    onClick={() => setSelectedAvatar(av)}
                  >
                    {av}
                  </button>
                ))}
              </div>
            </div>

            <input
              type="text"
              placeholder="Dog's Name (e.g. Kaaley / Rocky / Bella)"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              required
              className="pet-input-text"
            />

            <input
              type="text"
              placeholder="Short tribute or loyalty story (e.g. Best guardian and cuddle buddy)"
              value={petStory}
              onChange={(e) => setPetStory(e.target.value)}
              className="pet-input-text"
            />

            <button type="submit" className="btn-save-tribute">
              🌺 Drape Garland & Add to Hall of Fame
            </button>
          </div>
        </form>
      )}

      {/* Dogs Showcase Cards Grid */}
      <div className="dogs-tribute-grid">
        {dogs.map(dog => (
          <div key={dog.id} className="dog-tribute-card">
            {/* Visual Portrait */}
            <div className="dog-portrait-zone">
              <div className="dog-avatar-emblem">
                <span className="dog-emoji">{dog.avatar}</span>
                {dog.tikaApplied && (
                  <div className="vermilion-tika-dot" title="Red Vermilion Tika Applied" />
                )}
                {dog.garlanded && (
                  <div className="sayapatri-garland-wrap" title="Adorned with Marigold Garland">
                    <span className="garland-flow">🌼🏵️🌼</span>
                  </div>
                )}
              </div>
            </div>

            {/* Dog Information */}
            <div className="dog-card-info">
              <h3 className="dog-name">{dog.name}</h3>
              <span className="dog-role-tag">{dog.role}</span>
              <p className="dog-story-quote">"{dog.story}"</p>

              <div className="dog-card-actions">
                <button
                  type="button"
                  className={`btn-garland-action ${dog.garlanded ? 'garlanded' : ''}`}
                  onClick={() => handleGarlandDog(dog.id)}
                >
                  <span>{dog.garlanded ? '🏵️ Blessed' : '🌼 Drape Garland & Tika'}</span>
                </button>
                <span className="loves-counter">❤️ {dog.loves} Blessings</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
