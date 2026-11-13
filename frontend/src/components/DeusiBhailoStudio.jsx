import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/audio';

export default function DeusiBhailoStudio() {
  const [selectedTheme, setSelectedTheme] = useState('blessings');
  const [currentVerseIndex, setCurrentVerseIndex] = useState(0);
  const [copied, setCopied] = useState(false);
  const [activeLoop, setActiveLoop] = useState(null); // 'deusi' | 'bhailo' | 'jhyaure' | null
  const loopTimerRef = useRef(null);

  // Play synthetic Madal hits using Web Audio API
  const playMadalStroke = (type) => {
    soundManager.init();
    if (!soundManager.ctx || soundManager.muted) return;
    const ctx = soundManager.ctx;
    const t = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    if (type === 'dhin') {
      // Deep bass strike
      osc.type = 'sine';
      osc.frequency.setValueAtTime(110, t);
      osc.frequency.exponentialRampToValueAtTime(45, t + 0.25);

      gain.gain.setValueAtTime(0.4, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.3);
    } else if (type === 'tak') {
      // Sharp rim slap
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(480, t);
      osc.frequency.exponentialRampToValueAtTime(120, t + 0.08);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.09);
    } else {
      // Khinta open treble ring
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t);
      osc.frequency.exponentialRampToValueAtTime(220, t + 0.15);

      gain.gain.setValueAtTime(0.3, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.2);
    }

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.35);
  };

  // Toggle Rhythm Loops
  const toggleLoop = (loopType) => {
    if (activeLoop === loopType) {
      clearInterval(loopTimerRef.current);
      setActiveLoop(null);
      return;
    }

    clearInterval(loopTimerRef.current);
    setActiveLoop(loopType);

    let step = 0;
    const intervalTime = loopType === 'jhyaure' ? 180 : 220;

    loopTimerRef.current = setInterval(() => {
      if (loopType === 'deusi') {
        // Dhaan .. tak . dhin
        if (step % 4 === 0) playMadalStroke('dhin');
        else if (step % 4 === 2) playMadalStroke('tak');
      } else if (loopType === 'bhailo') {
        // Dhin . khin . tak
        if (step % 4 === 0) playMadalStroke('dhin');
        else if (step % 4 === 1) playMadalStroke('khin');
        else if (step % 4 === 3) playMadalStroke('tak');
      } else if (loopType === 'jhyaure') {
        // 6/8 swing
        if (step % 6 === 0) playMadalStroke('dhin');
        else if (step % 6 === 2) playMadalStroke('tak');
        else if (step % 6 === 4) playMadalStroke('khin');
      }
      step++;
    }, intervalTime);
  };

  useEffect(() => {
    return () => clearInterval(loopTimerRef.current);
  }, []);

  const deusiVerses = {
    blessings: [
      {
        lead: "ए है... भन भन भाइ हो...",
        response: "देउसीरे!",
        stanza: "यस घरका साहुजीको... देउसीरे!\nअन्नले भरियोस् भकारी... देउसीरे!\nसधैं रहोस् सुख र शान्ति... देउसीरे!\nलक्ष्मी माताको बास होस्... देउसीरे!"
      },
      {
        lead: "ए है... छाना माथि घिरौंला...",
        response: "देउसीरे!",
        stanza: "केराको थम्बा झैं मौलाउनु... देउसीरे!\nसयपत्री फूल झैं फुल्नु... देउसीरे!\nआयौं हामी बलेको बत्ती हेर्न... देउसीरे!\nआशिष दिन आयौं है... देउसीरे!"
      }
    ],
    fun: [
      {
        lead: "ए है... रातो माटो, चिप्लो बाटो...",
        response: "देउसीरे!",
        stanza: "लड्दै-पड्दै आयौं हामी... देउसीरे!\nहामी त्यसै आएका हैनौँ... देउसीरे!\nबलि राजाले पठाएका... देउसीरे!\nसेल रोटी र दक्षिणा पाउँ... देउसीरे!"
      },
      {
        lead: "ए है... कोठा भित्र कोदोको पिठो...",
        response: "देउसीरे!",
        stanza: "तातो तातो सेल रोटी साह्रै मिठो... देउसीरे!\nछिटो गरी दिनुहोस् आमा... देउसीरे!\nअर्को घरमा पुग्नु छ चाँडो... देउसीरे!"
      }
    ],
    bhailo: [
      {
        lead: "भैलेनी आयो आँगन...",
        response: "बरी लै!",
        stanza: "गुन्द्री नभए पिरा देऊ... बरी लै!\nपिरा नभए चकटी देऊ... बरी लै!\nयस घरकी लक्ष्मी दिदी... बरी लै!\nसधैं हाँसीखुशी रहून्... बरी लै!"
      }
    ]
  };

  const currentList = deusiVerses[selectedTheme] || deusiVerses.blessings;
  const currentVerse = currentList[currentVerseIndex % currentList.length];

  const handleNextVerse = () => {
    soundManager.playCardPlay();
    setCurrentVerseIndex(prev => prev + 1);
  };

  const handleCopy = () => {
    soundManager.playDiyaChime();
    const text = `${currentVerse.lead} (${currentVerse.response})\n${currentVerse.stanza}\n— JHILIMILI Deusi-Bhailo 🪘✨`;
    navigator.clipboard?.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="deusi-studio" className="deusi-studio-section">
      <div className="section-header-centered">
        <div className="festive-pill-badge">
          <span>🪘</span>
          <span>देउसी-भैलो धुन र भट्ट्याउने • Folk Music Jam</span>
        </div>

        <h2 className="section-title">
          Deusi-Bhailo <span className="gradient-gold-text">Rhythm & Verses</span>
        </h2>

        <p className="section-subtitle">
          Experience the musical heart of Tihar. Play live Madal drum strokes, toggle traditional folk grooves, and generate authentic rhyming couplets to sing along with family and friends!
        </p>
      </div>

      <div className="deusi-workspace-grid">
        {/* Left Column: Interactive Madal Drum Pad */}
        <div className="madal-pad-card">
          <div className="card-top-header">
            <h4>Interactive Madal Pad (मादल वादन)</h4>
            <span className="sub-instruction">Tap drum zones to trigger authentic percussion</span>
          </div>

          <div className="madal-visual-container">
            {/* Madal Visual Graphic with Hit Zones */}
            <div className="madal-cylinder-body">
              {/* Left Bass Head (Dhin) */}
              <button
                type="button"
                className="madal-drumhead left-bass"
                onClick={() => playMadalStroke('dhin')}
                title="Dhin (धिन) - Bass Stroke"
              >
                <span className="stroke-label">धिन</span>
                <span className="stroke-sub">Dhin (Bass)</span>
              </button>

              {/* Wooden Drum Center */}
              <div className="madal-wood-center">
                <div className="madal-laces" />
                <span className="madal-center-emblem">🪘</span>
              </div>

              {/* Right Sharp Rim (Tak) and Treble (Khinta) */}
              <div className="madal-drumhead right-treble">
                <button
                  type="button"
                  className="treble-half tak-zone"
                  onClick={() => playMadalStroke('tak')}
                  title="Tak (ताक) - Rim Slap"
                >
                  <span className="stroke-label">ताक</span>
                  <span className="stroke-sub">Tak</span>
                </button>
                <button
                  type="button"
                  className="treble-half khin-zone"
                  onClick={() => playMadalStroke('khin')}
                  title="Khinta (खिन्ता) - Open Ring"
                >
                  <span className="stroke-label">खिन्ता</span>
                  <span className="stroke-sub">Khinta</span>
                </button>
              </div>
            </div>
          </div>

          {/* Preset Folk Rhythm Loops */}
          <div className="loops-controller">
            <span className="loops-label">Auto-Loop Grooves:</span>
            <div className="loops-buttons">
              {[
                { id: 'deusi', label: 'Deusi Groove (देउसी)' },
                { id: 'bhailo', label: 'Bhailo Groove (भैलो)' },
                { id: 'jhyaure', label: 'Jhyaure Folk (झ्याउरे)' }
              ].map(loop => (
                <button
                  key={loop.id}
                  type="button"
                  className={`loop-toggle-btn ${activeLoop === loop.id ? 'active-playing' : ''}`}
                  onClick={() => toggleLoop(loop.id)}
                >
                  <span>{activeLoop === loop.id ? '⏸ Pause' : '▶ Play'} {loop.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deusi Couplets Generator */}
        <div className="verse-generator-card">
          <div className="verse-header">
            <h4>Deusi-Bhailo Rhyme Generator</h4>
            <div className="verse-theme-pills">
              {[
                { id: 'blessings', label: 'Blessings (आशिष)' },
                { id: 'fun', label: 'Humor & Sel Roti (हाँसो)' },
                { id: 'bhailo', label: 'Bhailo (भैलो)' }
              ].map(theme => (
                <button
                  key={theme.id}
                  type="button"
                  className={`theme-pill ${selectedTheme === theme.id ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTheme(theme.id);
                    setCurrentVerseIndex(0);
                  }}
                >
                  {theme.label}
                </button>
              ))}
            </div>
          </div>

          <div className="verse-display-box">
            <div className="lead-call-row">
              <span className="caller-tag">Lead Singer:</span>
              <strong className="lead-text">{currentVerse.lead}</strong>
            </div>

            <div className="chorus-response-row">
              <span className="chorus-tag">Chorus:</span>
              <strong className="response-text">{currentVerse.response}</strong>
            </div>

            <div className="stanza-lyrics-box">
              <pre className="stanza-lyrics">{currentVerse.stanza}</pre>
            </div>
          </div>

          <div className="verse-actions-footer">
            <button
              type="button"
              className="btn-next-verse"
              onClick={handleNextVerse}
            >
              🔄 Next Couplet (अर्को भट्ट्याउने)
            </button>

            <button
              type="button"
              className="btn-copy-verse"
              onClick={handleCopy}
            >
              {copied ? '✓ Copied!' : '📋 Copy for Singing'}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
