import React from 'react';

/**
 * GameCardArtwork
 * Renders high-end, artistic, vector-illustrated festive scene banners
 * for Call Break, Dhumbal (Jhyap), and 21-Card Marriage.
 * Handcrafted with Nepali festive motifs, glowing lamps, velvet textures,
 * intricate cards, and authentic cultural iconography.
 */
export default function GameCardArtwork({ gameId }) {
  if (gameId === 'callbreak') {
    return (
      <div className="artistic-game-canvas art-canvas-callbreak" aria-hidden="true">
        <svg
          viewBox="0 0 500 240"
          className="artistic-game-svg"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="cbTableGlow" cx="50%" cy="60%" r="65%">
              <stop offset="0%" stopColor="#1E6B47" />
              <stop offset="45%" stopColor="#0F422C" />
              <stop offset="85%" stopColor="#072418" />
              <stop offset="100%" stopColor="#03120C" />
            </radialGradient>
            <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFE082" />
              <stop offset="50%" stopColor="#FFB300" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <radialGradient id="spadeFlameGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFD54F" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#FF8F00" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FF6F00" stopOpacity="0" />
            </radialGradient>
            <filter id="cbDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="8" floodColor="#000" floodOpacity="0.65" />
            </filter>
            <filter id="glowGold" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Background Felt Texture with Vignette */}
          <rect width="500" height="240" fill="url(#cbTableGlow)" />

          {/* Decorative Toran & Marigold Garland Swag */}
          <path
            d="M-20,20 Q120,55 250,22 Q380,-10 520,25"
            fill="none"
            stroke="#D97706"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            opacity="0.4"
          />
          <path
            d="M-20,32 Q125,75 250,34 Q375,-2 520,38"
            fill="none"
            stroke="url(#goldFiligree)"
            strokeWidth="3"
            opacity="0.75"
          />

          {/* Hanging Marigold Garland Blossoms */}
          {[15, 80, 150, 220, 290, 360, 430, 485].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${i % 2 === 0 ? 34 : 42})`}>
              <circle cx="0" cy="0" r="8" fill="#F59E0B" opacity="0.9" />
              <circle cx="0" cy="0" r="5" fill="#FBBF24" />
              <circle cx="0" cy="0" r="2.5" fill="#EF4444" />
            </g>
          ))}

          {/* Center Table Sunburst Mandala */}
          <g transform="translate(250, 130)" opacity="0.22">
            <circle cx="0" cy="0" r="75" fill="none" stroke="url(#goldFiligree)" strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="0" cy="0" r="55" fill="none" stroke="#FFD54F" strokeWidth="1" />
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <line
                key={deg}
                x1="0"
                y1="0"
                x2={Math.cos((deg * Math.PI) / 180) * 72}
                y2={Math.sin((deg * Math.PI) / 180) * 72}
                stroke="#FFD54F"
                strokeWidth="1.2"
              />
            ))}
          </g>

          {/* Left Fanned Card: King of Spades (Hukum) */}
          <g transform="translate(170, 138) rotate(-18)" filter="url(#cbDropShadow)">
            <rect x="-38" y="-55" width="76" height="110" rx="8" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="2" />
            <rect x="-34" y="-51" width="72" height="102" rx="6" fill="none" stroke="#FFD54F" strokeWidth="0.8" opacity="0.6" />
            {/* Top-left Index */}
            <text x="-28" y="-32" fontSize="16" fontWeight="bold" fill="#0F172A" fontFamily="serif">K</text>
            <text x="-28" y="-18" fontSize="13" fill="#0F172A">♠</text>
            {/* Crown Motif */}
            <path d="M-12,-15 L-6, -5 L0,-18 L6,-5 L12,-15 L10,8 L-10,8 Z" fill="#D97706" />
            <circle cx="-12" cy="-17" r="2" fill="#FFD54F" />
            <circle cx="0" cy="-20" r="2.5" fill="#FFD54F" />
            <circle cx="12" cy="-17" r="2" fill="#FFD54F" />
            {/* Spade Center */}
            <path
              d="M0,-2 C-14,14 -4,26 0,22 C4,26 14,14 0,-2 Z M-2,20 L2,20 L3,27 L-3,27 Z"
              fill="#0F172A"
            />
          </g>

          {/* Right Fanned Card: Ace of Spades (Supreme Trump) */}
          <g transform="translate(330, 138) rotate(18)" filter="url(#cbDropShadow)">
            <rect x="-38" y="-55" width="76" height="110" rx="8" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="2" />
            <rect x="-34" y="-51" width="72" height="102" rx="6" fill="none" stroke="#FFD54F" strokeWidth="0.8" opacity="0.6" />
            <text x="-28" y="-32" fontSize="16" fontWeight="bold" fill="#0F172A" fontFamily="serif">A</text>
            <text x="-28" y="-18" fontSize="13" fill="#0F172A">♠</text>
            {/* Intricate Filigree Ace Spade */}
            <g transform="translate(0, 0)">
              <circle cx="0" cy="0" r="28" fill="url(#spadeFlameGlow)" opacity="0.4" />
              <path
                d="M0,-20 C-18,2 -5,17 0,11 C5,17 18,2 0,-20 Z M-3,10 L3,10 L4,20 L-4,20 Z"
                fill="#0F172A"
              />
              <path
                d="M0,-12 C-10,4 -3,12 0,8 C3,12 10,4 0,-12 Z"
                fill="none"
                stroke="url(#goldFiligree)"
                strokeWidth="1.2"
              />
            </g>
          </g>

          {/* Center Winning Card: Royal Hukum Ace of Spades Standing Tall */}
          <g transform="translate(250, 122)" filter="url(#cbDropShadow)">
            <rect x="-44" y="-64" width="88" height="128" rx="9" fill="#FFFDF8" stroke="#F59E0B" strokeWidth="2.5" />
            <rect x="-39" y="-59" width="78" height="118" rx="7" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="3 2" />
            <text x="-32" y="-38" fontSize="19" fontWeight="900" fill="#0F172A" fontFamily="serif">A</text>
            <text x="-32" y="-22" fontSize="15" fill="#0F172A">♠</text>
            <text x="32" y="44" fontSize="19" fontWeight="900" fill="#0F172A" fontFamily="serif" textAnchor="end">A</text>
            <text x="32" y="58" fontSize="15" fill="#0F172A" textAnchor="end">♠</text>

            {/* Radiant Master Spade Emblem */}
            <circle cx="0" cy="-2" r="26" fill="url(#spadeFlameGlow)" />
            <path
              d="M0,-24 C-22,0 -6,18 0,11 C6,18 22,0 0,-24 Z M-4,10 L4,10 L5,22 L-5,22 Z"
              fill="#0F172A"
            />
            {/* Gold engraved heart inside spade */}
            <path
              d="M0,-10 C-6,-2 -2,4 0,2 C2,4 6,-2 0,-10 Z"
              fill="url(#goldFiligree)"
            />
          </g>

          {/* Auspicious Brass Diya (Lamp of Laxmi) at base of table */}
          <g transform="translate(250, 204)" filter="url(#glowGold)">
            {/* Lamp base */}
            <ellipse cx="0" cy="14" rx="28" ry="8" fill="#78350F" />
            <ellipse cx="0" cy="11" rx="24" ry="6" fill="#B45309" />
            <ellipse cx="0" cy="9" rx="18" ry="4" fill="#FDE68A" opacity="0.9" />
            {/* Spout Lip */}
            <path d="M-6,7 Q0,0 6,7 Z" fill="#92400E" />
            {/* Wick */}
            <line x1="0" y1="8" x2="0" y2="1" stroke="#3D1D09" strokeWidth="2.5" strokeLinecap="round" />
            {/* Multi-layered flickering flame */}
            <circle cx="0" cy="-7" r="18" fill="url(#spadeFlameGlow)" />
            <path d="M-5,4 Q0,-18 0,-18 Q5,4 0,6 Z" fill="#F59E0B" />
            <path d="M-3,3 Q0,-14 0,-14 Q3,3 0,4 Z" fill="#FDE047" />
            <ellipse cx="0" cy="1" rx="2" ry="4" fill="#FFFFFF" />
          </g>

          {/* Sparkles / Starlight Accents */}
          {[
            { cx: 70, cy: 90, r: 2.5 },
            { cx: 120, cy: 190, r: 1.8 },
            { cx: 380, cy: 80, r: 2.2 },
            { cx: 430, cy: 175, r: 2.8 },
            { cx: 250, cy: 45, r: 2 }
          ].map((sp, idx) => (
            <g key={idx} transform={`translate(${sp.cx}, ${sp.cy})`}>
              <circle cx="0" cy="0" r={sp.r} fill="#FFD54F" filter="url(#glowGold)" />
              <line x1={-sp.r * 2.5} y1="0" x2={sp.r * 2.5} y2="0" stroke="#FFF" strokeWidth="0.8" />
              <line x1="0" y1={-sp.r * 2.5} x2="0" y2={sp.r * 2.5} stroke="#FFF" strokeWidth="0.8" />
            </g>
          ))}
        </svg>

        {/* Ambient overlay glow */}
        <div className="artistic-banner-glow glow-callbreak" />
      </div>
    );
  }

  if (gameId === 'dhumbal') {
    return (
      <div className="artistic-game-canvas art-canvas-dhumbal" aria-hidden="true">
        <svg
          viewBox="0 0 500 240"
          className="artistic-game-svg"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="dhTableGlow" cx="50%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#701A3A" />
              <stop offset="40%" stopColor="#4A0E24" />
              <stop offset="80%" stopColor="#2A0514" />
              <stop offset="100%" stopColor="#120108" />
            </radialGradient>
            <linearGradient id="goldCoins" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FDE047" />
              <stop offset="40%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <radialGradient id="electricBurst" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FFE082" stopOpacity="0.9" />
              <stop offset="35%" stopColor="#F59E0B" stopOpacity="0.5" />
              <stop offset="70%" stopColor="#EF4444" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#B91C1C" stopOpacity="0" />
            </radialGradient>
            <filter id="dhDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.7" />
            </filter>
            <filter id="diceGlow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Velvet Crimson Table Background */}
          <rect width="500" height="240" fill="url(#dhTableGlow)" />

          {/* Dynamic Festive Lightning Arc (The Shock of "Jhyap!") */}
          <path
            d="M50,30 L180,95 L140,110 L280,180"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="2"
            opacity="0.18"
          />
          <path
            d="M450,25 L330,85 L360,105 L220,185"
            fill="none"
            stroke="#FEF08A"
            strokeWidth="2"
            opacity="0.18"
          />

          {/* Decorative Toran Garlands */}
          <path
            d="M-20,15 Q125,60 250,20 Q375,-20 520,25"
            fill="none"
            stroke="url(#goldCoins)"
            strokeWidth="3"
            opacity="0.7"
          />
          {[20, 85, 150, 215, 285, 350, 415, 480].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${i % 2 === 0 ? 30 : 36})`}>
              <circle cx="0" cy="0" r="7" fill="#EF4444" />
              <circle cx="0" cy="0" r="4.5" fill="#FBBF24" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
            </g>
          ))}

          {/* Left Low-Point Winning Hand (Ace of Hearts, 2 of Clubs, 3 of Diamonds) */}
          <g transform="translate(145, 130) rotate(-22)" filter="url(#dhDropShadow)">
            <rect x="-32" y="-48" width="64" height="96" rx="7" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="1.5" />
            <text x="-24" y="-28" fontSize="14" fontWeight="bold" fill="#DC2626">A</text>
            <text x="-24" y="-16" fontSize="12" fill="#DC2626">♥</text>
            <text x="0" y="8" fontSize="22" fill="#DC2626" textAnchor="middle">♥</text>
          </g>

          <g transform="translate(200, 118) rotate(-8)" filter="url(#dhDropShadow)">
            <rect x="-32" y="-48" width="64" height="96" rx="7" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="1.5" />
            <text x="-24" y="-28" fontSize="14" fontWeight="bold" fill="#0F172A">2</text>
            <text x="-24" y="-16" fontSize="12" fill="#0F172A">♣</text>
            <text x="0" y="8" fontSize="22" fill="#0F172A" textAnchor="middle">♣</text>
          </g>

          <g transform="translate(255, 122) rotate(8)" filter="url(#dhDropShadow)">
            <rect x="-32" y="-48" width="64" height="96" rx="7" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="1.5" />
            <text x="-24" y="-28" fontSize="14" fontWeight="bold" fill="#DC2626">3</text>
            <text x="-24" y="-16" fontSize="12" fill="#DC2626">♦</text>
            <text x="0" y="8" fontSize="22" fill="#DC2626" textAnchor="middle">♦</text>
          </g>

          {/* Golden Badge Emblem: "≤ 10 POINTS / DHUMBAL CALL" */}
          <g transform="translate(350, 105)" filter="url(#dhDropShadow)">
            <circle cx="0" cy="0" r="42" fill="url(#electricBurst)" />
            {/* Spinning Golden Rim */}
            <circle cx="0" cy="0" r="36" fill="#1C0612" stroke="url(#goldCoins)" strokeWidth="3" />
            <circle cx="0" cy="0" r="30" fill="none" stroke="#F59E0B" strokeWidth="1" strokeDasharray="3 2" />
            {/* Lightning bolt / Thunderbolt */}
            <path
              d="M-4,-20 L8,-4 L0,-2 L6,18 L-8,2 L-1,0 Z"
              fill="url(#goldCoins)"
              filter="url(#diceGlow)"
            />
            {/* Micro text */}
            <text x="0" y="24" fontSize="8" fontWeight="bold" fill="#FDE047" textAnchor="middle" letterSpacing="0.8">
              JHYAP!
            </text>
          </g>

          {/* Authentic Nepali Brass Cowrie Shells / Dice Pile at Bottom Right */}
          <g transform="translate(385, 185)" filter="url(#dhDropShadow)">
            {/* Gold coins stack */}
            {[0, 4, 8, 12].map((yOffset, i) => (
              <g key={i} transform={`translate(${i * 3}, ${-yOffset})`}>
                <ellipse cx="0" cy="0" rx="14" ry="5.5" fill="url(#goldCoins)" stroke="#78350F" strokeWidth="1" />
                <ellipse cx="0" cy="-1" rx="10" ry="3.5" fill="#FEF08A" opacity="0.5" />
              </g>
            ))}
            {/* Golden 3D Die */}
            <g transform="translate(-32, -8) rotate(16)">
              <rect x="-11" y="-11" width="22" height="22" rx="4" fill="#FFFDF8" stroke="#D97706" strokeWidth="1.5" />
              <circle cx="-5" cy="-5" r="2" fill="#DC2626" />
              <circle cx="0" cy="0" r="2" fill="#DC2626" />
              <circle cx="5" cy="5" r="2" fill="#DC2626" />
            </g>
          </g>

          {/* Auspicious Diya on the left */}
          <g transform="translate(75, 175)" filter="url(#diceGlow)">
            <ellipse cx="0" cy="12" rx="22" ry="7" fill="#78350F" />
            <ellipse cx="0" cy="9" rx="18" ry="5" fill="#D97706" />
            <ellipse cx="0" cy="8" rx="13" ry="3" fill="#FFE082" opacity="0.9" />
            <circle cx="0" cy="-5" r="14" fill="url(#electricBurst)" />
            <path d="M-4,3 Q0,-14 0,-14 Q4,3 0,4 Z" fill="#F59E0B" />
            <path d="M-2,2 Q0,-10 0,-10 Q2,2 0,3 Z" fill="#FFFDE7" />
          </g>
        </svg>

        <div className="artistic-banner-glow glow-dhumbal" />
      </div>
    );
  }

  if (gameId === 'marriage') {
    return (
      <div className="artistic-game-canvas art-canvas-marriage" aria-hidden="true">
        <svg
          viewBox="0 0 500 240"
          className="artistic-game-svg"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="mrTableGlow" cx="50%" cy="55%" r="70%">
              <stop offset="0%" stopColor="#4A1E6D" />
              <stop offset="45%" stopColor="#2C0F43" />
              <stop offset="85%" stopColor="#170624" />
              <stop offset="100%" stopColor="#0A0210" />
            </radialGradient>
            <linearGradient id="diamondSheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="40%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
            <linearGradient id="tiaraGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>
            <radialGradient id="royalTiaraGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#FDE68A" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#C084FC" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#7E22CE" stopOpacity="0" />
            </radialGradient>
            <filter id="mrDropShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="6" stdDeviation="7" floodColor="#000" floodOpacity="0.7" />
            </filter>
            <filter id="tiaraSparkle" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Deep Royal Purple/Amethyst Background */}
          <rect width="500" height="240" fill="url(#mrTableGlow)" />

          {/* Paisley / Peacock Feather Decorative Flourishes in Background */}
          <g opacity="0.16" transform="translate(250, 110)">
            <circle cx="0" cy="0" r="85" fill="none" stroke="url(#tiaraGold)" strokeWidth="1.5" strokeDasharray="4 4" />
            <circle cx="0" cy="0" r="65" fill="none" stroke="#C084FC" strokeWidth="1" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
              <ellipse
                key={deg}
                cx={Math.cos((deg * Math.PI) / 180) * 50}
                cy={Math.sin((deg * Math.PI) / 180) * 50}
                rx="8"
                ry="18"
                fill="none"
                stroke="url(#tiaraGold)"
                strokeWidth="1.2"
                transform={`rotate(${deg}, ${Math.cos((deg * Math.PI) / 180) * 50}, ${Math.sin((deg * Math.PI) / 180) * 50})`}
              />
            ))}
          </g>

          {/* Hanging Festive Toran & Jasmine Garland */}
          <path
            d="M-20,18 Q125,65 250,25 Q375,-15 520,30"
            fill="none"
            stroke="url(#tiaraGold)"
            strokeWidth="3"
            opacity="0.8"
          />
          {[25, 90, 155, 220, 285, 350, 415, 480].map((x, i) => (
            <g key={i} transform={`translate(${x}, ${i % 2 === 0 ? 32 : 38})`}>
              {/* Pearl & Marigold drop */}
              <circle cx="0" cy="0" r="7" fill="#FBBF24" />
              <circle cx="0" cy="0" r="4.5" fill="#F43F5E" />
              <circle cx="0" cy="0" r="2" fill="#FFFFFF" />
              <circle cx="0" cy="9" r="2.5" fill="#E2E8F0" />
            </g>
          ))}

          {/* 3 Interlocking Pure Meld Cards (Pure Run 7♦ 8♦ 9♦ + Tunnella Q♠ Q♠ Q♠) */}
          {/* Card 1: 7 of Diamonds */}
          <g transform="translate(140, 142) rotate(-16)" filter="url(#mrDropShadow)">
            <rect x="-30" y="-45" width="60" height="90" rx="6" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="1.5" />
            <text x="-22" y="-26" fontSize="13" fontWeight="bold" fill="#DC2626">7</text>
            <text x="-22" y="-14" fontSize="11" fill="#DC2626">♦</text>
            <text x="0" y="8" fontSize="20" fill="#DC2626" textAnchor="middle">♦</text>
          </g>

          {/* Card 2: 8 of Diamonds */}
          <g transform="translate(190, 134) rotate(-5)" filter="url(#mrDropShadow)">
            <rect x="-30" y="-45" width="60" height="90" rx="6" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="1.5" />
            <text x="-22" y="-26" fontSize="13" fontWeight="bold" fill="#DC2626">8</text>
            <text x="-22" y="-14" fontSize="11" fill="#DC2626">♦</text>
            <text x="0" y="8" fontSize="20" fill="#DC2626" textAnchor="middle">♦</text>
          </g>

          {/* Card 3: 9 of Diamonds */}
          <g transform="translate(240, 138) rotate(7)" filter="url(#mrDropShadow)">
            <rect x="-30" y="-45" width="60" height="90" rx="6" fill="#FFFDF8" stroke="#D1C4B2" strokeWidth="1.5" />
            <text x="-22" y="-26" fontSize="13" fontWeight="bold" fill="#DC2626">9</text>
            <text x="-22" y="-14" fontSize="11" fill="#DC2626">♦</text>
            <text x="0" y="8" fontSize="20" fill="#DC2626" textAnchor="middle">♦</text>
          </g>

          {/* Central Marriage Crown / Tiara Emblem (Royal Wedding / Marriage Show) */}
          <g transform="translate(345, 115)" filter="url(#mrDropShadow)">
            <circle cx="0" cy="0" r="44" fill="url(#royalTiaraGlow)" />
            {/* Ornate Gold Ring */}
            <circle cx="0" cy="0" r="38" fill="#1C0A2C" stroke="url(#tiaraGold)" strokeWidth="3" />
            <circle cx="0" cy="0" r="32" fill="none" stroke="#C084FC" strokeWidth="1" strokeDasharray="3 2" />

            {/* Glowing Tiara / Crown of Marriage */}
            <g transform="translate(0, -6)" filter="url(#tiaraSparkle)">
              {/* Crown Base */}
              <path
                d="M-18,12 L-14,-6 L-6,4 L0,-14 L6,4 L14,-6 L18,12 Z"
                fill="url(#tiaraGold)"
                stroke="#78350F"
                strokeWidth="1"
              />
              {/* Jewels on Crown Peaks */}
              <circle cx="-14" cy="-8" r="2.5" fill="#38BDF8" />
              <circle cx="0" cy="-16" r="3.5" fill="#F43F5E" />
              <circle cx="14" cy="-8" r="2.5" fill="#38BDF8" />
              <circle cx="0" cy="2" r="2" fill="#FEF08A" />
            </g>

            {/* Sub-label */}
            <text x="0" y="24" fontSize="8" fontWeight="bold" fill="#FEF08A" textAnchor="middle" letterSpacing="0.8">
              २१ तास • SHOW
            </text>
          </g>

          {/* Auspicious Brass Diya on Left */}
          <g transform="translate(65, 178)" filter="url(#tiaraSparkle)">
            <ellipse cx="0" cy="12" rx="22" ry="7" fill="#581C87" />
            <ellipse cx="0" cy="9" rx="18" ry="5" fill="#D97706" />
            <ellipse cx="0" cy="8" rx="13" ry="3" fill="#FDE68A" opacity="0.9" />
            <circle cx="0" cy="-5" r="14" fill="url(#royalTiaraGlow)" />
            <path d="M-4,3 Q0,-14 0,-14 Q4,3 0,4 Z" fill="#F59E0B" />
            <path d="M-2,2 Q0,-10 0,-10 Q2,2 0,3 Z" fill="#FFFDE7" />
          </g>

          {/* 3 Red Fanned Decks at base to indicate 3 Decks (156 cards) */}
          <g transform="translate(435, 182)" filter="url(#mrDropShadow)">
            {[-18, 0, 18].map((angle, i) => (
              <g key={i} transform={`translate(${i * 6}, 0) rotate(${angle})`}>
                <rect x="-14" y="-22" width="28" height="44" rx="4" fill="#991B1B" stroke="#FDE68A" strokeWidth="1.2" />
                <rect x="-11" y="-19" width="22" height="38" rx="2" fill="none" stroke="rgba(254, 240, 138, 0.5)" strokeWidth="0.8" strokeDasharray="2 1" />
                <circle cx="0" cy="0" r="3" fill="#FEF08A" />
              </g>
            ))}
          </g>
        </svg>

        <div className="artistic-banner-glow glow-marriage" />
      </div>
    );
  }

  return null;
}
