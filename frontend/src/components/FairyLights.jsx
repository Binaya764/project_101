import React from 'react';

// Hanging fairy lights (Jhilimili) string with animated glowing bulbs
export default function FairyLights() {
  // Array of 24 bulbs with alternating festival colors: warm gold, amber, deep red, emerald, soft violet
  const colors = [
    '#FFD36A', '#FF9F43', '#F59E0B', '#EF4444', '#10B981', '#A855F7',
    '#FFD36A', '#FF9F43', '#F59E0B', '#EF4444', '#38BDF8', '#FFD36A'
  ];

  return (
    <div className="fairy-lights-banner" aria-hidden="true">
      <svg className="fairy-wire-svg" viewBox="0 0 1440 60" preserveAspectRatio="none">
        <path
          d="M0,15 Q60,35 120,15 Q180,35 240,15 Q300,35 360,15 Q420,35 480,15 Q540,35 600,15 Q660,35 720,15 Q780,35 840,15 Q900,35 960,15 Q1020,35 1080,15 Q1140,35 1200,15 Q1260,35 1320,15 Q1380,35 1440,15"
          fill="none"
          stroke="#473520"
          strokeWidth="1.8"
        />
      </svg>
      <div className="fairy-bulbs-container">
        {Array.from({ length: 24 }).map((_, idx) => {
          const color = colors[idx % colors.length];
          const delay = (idx * 0.18).toFixed(2);
          const duration = (1.8 + (idx % 3) * 0.4).toFixed(2);
          return (
            <div
              key={idx}
              className="fairy-bulb"
              style={{
                '--bulb-color': color,
                animationDelay: `${delay}s`,
                animationDuration: `${duration}s`
              }}
            >
              <div className="bulb-socket" />
              <div className="bulb-glass" />
              <div className="bulb-glow" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
