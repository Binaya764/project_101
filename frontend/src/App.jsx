import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import FairyLights from './components/FairyLights';
import FloatingParticles from './components/FloatingParticles';
import Hero from './components/Hero';
import DiyaWall from './components/DiyaWall';
import Statistics from './components/Statistics';
import GamesSection from './components/GamesSection';
import RangoliStudio from './components/RangoliStudio';
import ChhathSection from './components/ChhathSection';
import DeusiBhailoStudio from './components/DeusiBhailoStudio';
import KukurTiharTribute from './components/KukurTiharTribute';
import AboutTihar from './components/AboutTihar';
import Footer from './components/Footer';
import DiyaModal from './components/DiyaModal';
import DiyaDetailModal from './components/DiyaDetailModal';

import {
  getStoredDiyas,
  saveUserDiya,
  getLikedDiyaIds,
  toggleLikeDiya,
  getSoundPreference,
  saveSoundPreference
} from './utils/storage';
import { soundManager } from './utils/audio';

export default function App() {
  const [diyos, setDiyos] = useState([]);
  const [totalCount, setTotalCount] = useState(12480);
  const [isLightModalOpen, setIsLightModalOpen] = useState(false);
  const [selectedDiya, setSelectedDiya] = useState(null);
  const [likedDiyaIds, setLikedDiyaIds] = useState(new Set());
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [newlyAddedId, setNewlyAddedId] = useState(null);

  // Initialize data on mount
  useEffect(() => {
    const loadedDiyas = getStoredDiyas();
    setDiyos(loadedDiyas);

    const userCount = loadedDiyas.filter(d => d.isUserSubmission).length;
    setTotalCount(12480 + userCount);

    setLikedDiyaIds(getLikedDiyaIds());

    const soundPref = getSoundPreference();
    setSoundEnabled(soundPref);
    soundManager.setMuted(!soundPref);
  }, []);

  // Toggle Sound
  const handleToggleSound = () => {
    const nextVal = !soundEnabled;
    setSoundEnabled(nextVal);
    soundManager.setMuted(!nextVal);
    saveSoundPreference(nextVal);
    if (nextVal) {
      soundManager.playDiyaChime();
    }
  };

  // Submit New Diya
  const handleSubmitNewDiya = (newDiya) => {
    saveUserDiya(newDiya);
    setDiyos(prev => [newDiya, ...prev]);
    setTotalCount(prev => prev + 1);
    setNewlyAddedId(newDiya.id);
    setIsLightModalOpen(false);

    // Smoothly scroll to wall
    setTimeout(() => {
      const wallEl = document.querySelector('#diyo-wall');
      if (wallEl) {
        wallEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);

    // Clear newly added highlight after 6 seconds
    setTimeout(() => {
      setNewlyAddedId(null);
    }, 6000);
  };

  // Like a Diya
  const handleLikeDiya = (diyaId) => {
    toggleLikeDiya(diyaId);
    setLikedDiyaIds(prev => {
      const next = new Set(prev);
      if (next.has(diyaId)) {
        next.delete(diyaId);
      } else {
        next.add(diyaId);
      }
      return next;
    });
  };

  const handleExploreWall = () => {
    const wallEl = document.querySelector('#diyo-wall');
    if (wallEl) {
      wallEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="jhilimili-app-root">
      {/* Background Animated Floating Golden Dust Particles */}
      <FloatingParticles />

      {/* Hanging Golden Fairy Lights across page top */}
      <FairyLights />

      {/* Elegant Glassmorphism Navigation Bar */}
      <Navbar
        onOpenLightModal={() => setIsLightModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      <main className="main-content-flow">
        {/* Hero Section */}
        <Hero
          totalDiyosCount={totalCount}
          onOpenLightModal={() => setIsLightModalOpen(true)}
          onExploreWall={handleExploreWall}
        />

        {/* The Virtual Diyo Wall */}
        <DiyaWall
          diyos={diyos}
          onOpenLightModal={() => setIsLightModalOpen(true)}
          onSelectDiya={(diya) => setSelectedDiya(diya)}
          onLikeDiya={handleLikeDiya}
          likedDiyaIds={likedDiyaIds}
          newlyAddedId={newlyAddedId}
        />

        {/* Traditional Nepali Card Games: Call Break, Dhumbal, Marriage */}
        <GamesSection />

        {/* Interactive Rangoli & Mandala Studio */}
        <RangoliStudio />

        {/* Chhath Puja Mahaparva: 4 Days, Ghat Locator & Virtual Arghya */}
        <ChhathSection />

        {/* Deusi-Bhailo Rhythm Pad Jam & Rhyme Generator */}
        <DeusiBhailoStudio />

        {/* Kukur Tihar Loyal Companion Tribute & Pet Hall of Fame */}
        <KukurTiharTribute />

        {/* Celebration Statistics Section */}
        <Statistics totalDiyosCount={totalCount} />

        {/* About Tihar & The Five Days of Yamapanchak */}
        <AboutTihar />
      </main>

      {/* Cultural Footer */}
      <Footer onOpenLightModal={() => setIsLightModalOpen(true)} />

      {/* "Light a Diya" Modal Dialog */}
      {isLightModalOpen && (
        <DiyaModal
          onClose={() => setIsLightModalOpen(false)}
          onSubmit={handleSubmitNewDiya}
        />
      )}

      {/* Diya Detail / Wish Card Modal */}
      {selectedDiya && (
        <DiyaDetailModal
          diya={selectedDiya}
          onClose={() => setSelectedDiya(null)}
          onLike={handleLikeDiya}
          isLiked={likedDiyaIds.has(selectedDiya.id)}
        />
      )}
    </div>
  );
}
