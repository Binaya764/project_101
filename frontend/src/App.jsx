import React, { useState, useEffect } from 'react';
import { RouterProvider, Routes, Route } from './router/Router';
import Navbar from './components/Navbar';
import FairyLights from './components/FairyLights';
import FloatingParticles from './components/FloatingParticles';
import Footer from './components/Footer';
import DiyaModal from './components/DiyaModal';
import DiyaDetailModal from './components/DiyaDetailModal';

// Multi-Page Route Components
import HomePage from './pages/HomePage';
import WallPage from './pages/WallPage';
import GamesPage from './pages/GamesPage';
import CallBreakPage from './pages/CallBreakPage';
import DhumbalPage from './pages/DhumbalPage';
import MarriagePage from './pages/MarriagePage';
import RangoliPage from './pages/RangoliPage';
import ChhathPage from './pages/ChhathPage';
import DeusiPage from './pages/DeusiPage';
import KukurTributePage from './pages/KukurTributePage';
import AboutTiharPage from './pages/AboutTiharPage';
import StatsPage from './pages/StatsPage';
import NotFoundPage from './pages/NotFoundPage';

import {
  getStoredDiyas,
  saveUserDiya,
  getLikedDiyaIds,
  toggleLikeDiya,
  getSoundPreference,
  saveSoundPreference
} from './utils/storage';
import { soundManager } from './utils/audio';

function AppContent() {
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

    // Scroll to wall if on /wall
    setTimeout(() => {
      const wallEl = document.querySelector('#diyo-wall');
      if (wallEl) {
        wallEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 200);

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

  return (
    <div className="jhilimili-app-root">
      {/* Background Animated Floating Golden Dust Particles */}
      <FloatingParticles />

      {/* Hanging Golden Fairy Lights across page top */}
      <FairyLights />

      {/* Glassmorphism Navigation Bar with Distinct Page Links */}
      <Navbar
        onOpenLightModal={() => setIsLightModalOpen(true)}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
      />

      {/* Multi-Page Route Viewports */}
      <main className="main-content-flow">
        <Routes>
          {/* Home Page (Overview & Gateway) */}
          <Route
            path="/"
            element={
              <HomePage
                totalCount={totalCount}
                onOpenLightModal={() => setIsLightModalOpen(true)}
                diyos={diyos}
                onSelectDiya={(diya) => setSelectedDiya(diya)}
              />
            }
          />

          {/* Virtual Diyo Wall Page */}
          <Route
            path="/wall"
            element={
              <WallPage
                diyos={diyos}
                onOpenLightModal={() => setIsLightModalOpen(true)}
                onSelectDiya={(diya) => setSelectedDiya(diya)}
                onLikeDiya={handleLikeDiya}
                likedDiyaIds={likedDiyaIds}
                newlyAddedId={newlyAddedId}
              />
            }
          />

          {/* Games Lounge Page */}
          <Route path="/games" element={<GamesPage />} />

          {/* Dedicated Individual Game Pages */}
          <Route path="/games/callbreak" element={<CallBreakPage />} />
          <Route path="/games/dhumbal" element={<DhumbalPage />} />
          <Route path="/games/marriage" element={<MarriagePage />} />

          {/* Interactive Rangoli Studio Page */}
          <Route path="/rangoli" element={<RangoliPage />} />

          {/* Chhath Puja Mahaparva & Ghats Page */}
          <Route path="/chhath" element={<ChhathPage />} />

          {/* Deusi-Bhailo Rhythm Jam Page */}
          <Route path="/deusi-jam" element={<DeusiPage />} />

          {/* Kukur Tihar Loyal Companion Tribute Page */}
          <Route path="/kukur-tribute" element={<KukurTributePage />} />

          {/* About Yamapanchak Editorial Page */}
          <Route path="/about-tihar" element={<AboutTiharPage />} />

          {/* Celebration Statistics Page */}
          <Route path="/stats" element={<StatsPage totalCount={totalCount} />} />

          {/* 404 Fallback Route */}
          <Route element={<NotFoundPage />} />
        </Routes>
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

export default function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}
