# 🪔 JHILIMILI (झिलिमिली) — Virtual Tihar & Chhath Celebration Platform

> **"Bringing the Radiance of Yamapanchak & the Devotion of Chhath Puja to Every Screen Worldwide."**  
> *A premier cultural web platform designed for the KUCC Tihar-Chhath Web UI Design Competition 2026.*

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3.8-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Express](https://img.shields.io/badge/Express-5.0.0-000000?logo=express&logoColor=white)](https://expressjs.com)
[![Web Audio API](https://img.shields.io/badge/Web%20Audio-Synthesizer-FF9800)](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API)

---

## 🌟 Concept & Vision

In Nepali culture, the late autumn period brings an unmatched atmosphere of joy, devotion, and homecoming through the twin festivals:
- **Tihar (Yamapanchak / Deepawali)**: A five-day celebration revering animals, welcoming Goddess Laxmi with rows of earthen lamps (*diyos*), and honoring the sacred bond between brothers and sisters (*Bhai Tika*).
- **Chhath Puja (छठ महापर्व)**: A rigorous four-day Vedic festival of purity and gratitude offered to Lord Surya (the Sun God) and Chhathi Maiya across sacred riverbanks (*ghats*).

For millions of Nepalis—especially students, diaspora communities, and those far away from home—celebrating these festivals in person is not always possible. **JHILIMILI** was envisioned as a **digital temple and festive courtyard** that bridges geographical distances. Whether it's lighting a virtual earthen lamp carrying a heartfelt blessing, playing traditional late-night card games against intelligent AI opponents, or learning the sacred lore of Chhath Ghats, JHILIMILI captures the **soul, sights, warmth, and soundscapes of Nepal's festive season**.

---

## 🎨 Cultural Design System & Theme Integration

The design is not just a digital interface; it is an organic reflection of Nepali heritage and festive nightscapes:

### 1. Festive Color Palette
- **Diya Gold (`#FFD36A`, `#F59E0B`)**: Evoking the radiant flame of handmade clay lamps and sacred brass lanterns.
- **Marigold Orange (`#FF9F43`, `#D97706`)**: Echoing fresh *Sayapatri* (marigold) and *Makhamali* garlands draped over doors and courtyards.
- **Midnight Plum & Starry Violet (`#120A1C`, `#1E1228`, `#2A123D`)**: Capturing the crisp Himalayan autumn night sky illuminated by fireworks and oil lamps.
- **Casino Felt & Sacred River Emerald (`#0F422C`, `#1E6B47`, `#042F2C`)**: Mirroring traditional velvet card playing surfaces and holy riverbanks during Chhath dawn.
- **Auspicious Vermilion & Crimson (`#DC2626`, `#991B1B`)**: Representing ceremonial *Rato Tika* and celebratory blessings.

### 2. Handcrafted Cultural Artwork
- **Intricate Toran & Sayapatri Garlands**: SVG-rendered double-layered marigold ropes with realistically folded petals and hanging brass lanterns decorating the Diyo Wall.
- **Auspicious Peacock & Sunburst Mandalas**: Dynamic decorative motifs inspired by Mithila art, Newari wood carvings, and Tibetan thangka geometry.
- **Authentic Card Game Banners**: Custom vector illustrations capturing royal Hukum spades, gold cowrie dice, traditional brass *panas*, and marriage crown tiaras.

### 3. Dedicated Page Atmospheres
Every section has an individual, carefully tuned ambient palette:
- **Virtual Diyo Wall**: Starlit Violet & Midnight Amber with interactive background blur.
- **Games Parlor**: Casino Emerald Felt with polished mahogany wood rims and golden card accents.
- **Chhath Puja Mahaparva**: Sacred River Teal & Sunburst Dawn radiance.
- **About Yamapanchak**: Temple Crimson & Vedic Saffron.
- **Celebration Analytics**: Royal Cosmic Indigo with live community telemetry.

---

## ✨ Key Features & Highlights

### 🪔 1. The Virtual Diyo Wall (`/wall`)
- **Starlit Courtyard & Mosaic Cards Views**: Switch seamlessly between a scattered open-sky lantern courtyard and an ornate card grid.
- **Interactive Lamp Lighting**: Choose from 4 lamp types (*Mato ko Diyo, Sukunda, Pituwa Brass Lamp, Akhanda Jyoti*), specify custom flame hues, dedicate wishes to loved ones, and tag cities/countries.
- **Focused Diya Hover Experience**: Hovering over any lamp activates a soft background blur (`backdrop-filter: blur(6px)`) across the courtyard, dimming other lamps to bring full visual focus to the chosen prayer.
- **Dedicated Bottom Blessing Showcase**: Displays the full, untruncated prayer at the base of the courtyard with author details, location tags, dedication banners, and like counters—eliminating small cut-off floating bubbles.
- **Real-Time Search & Filtering**: Instant keyword search by blessing, city, or author, along with tabs for Public, Anonymous, and Dedicated wishes.

---

### 🎴 2. Games of Tihar — Nepali Card Arcade (`/games`)
No Tihar night is complete without family card sessions after Laxmi Puja. JHILIMILI features **three fully playable, authentic card games** powered by smart AI engines:

#### ♠ Call Break (कल ब्रेक) — `/games/callbreak`
- **Authentic Rules**: 4 players, 13 cards each, permanent Spades (*Hukum*) trump, mandatory suit-following and trump-cutting logic.
- **Clean Bidding (Call) Phase**: During bidding, the player's 13 cards are **clearly displayed on the table** so decisions can be made strategically. All unsolicited AI recommendations have been removed, giving players full freedom over their bid (1–8 tricks).
- **Realistic Card Table Layout**: Opponents' cards are displayed in compact, angled fanned stacks (inspired by top mobile card game interfaces), eliminating the need for inner scrollbars and keeping the felt table clean and spacious.
- **Smart Trick Evaluation & Scoring**: Real-time trick tracking, turn banners, card play animations, and round score calculations (with over-trick bonuses and failing penalties).

#### ⚡ Dhumbal / Jhyap (धुम्बाल) — `/games/dhumbal`
- **Objective**: Shed high cards and minimize total hand point value (A=1, 2–10 face value, J=11, Q=12, K=13).
- **Tactical Discards**: Supports single card discards, matching pairs/triplets, and same-suit consecutive runs (3+ cards).
- **Draw Pile & Discard Pile Mechanics**: Draw from the closed deck or pick up the top discarded card.
- **"DHUMBAL!" Call & Showdown**: Call Jhyap when total points are ≤ 10. If an opponent has equal or fewer points, you get caught (*Cheating / फाउल*) with 20 penalty points!

#### 💎 21-Card Marriage (म्यरिज) — `/games/marriage`
- **3-Deck Rummy Experience**: 3 players dealt 21 cards each from a 156-card deck.
- **Live Meld Detection**: Real-time algorithmic recognition of **Pure Runs** (3+ same-suit sequences) and **Tunnellas** (3 identical cards of the same rank and suit).
- **Hand Sorting Controls**: Instant toggles to sort hands by **Suit** or by **Rank**.
- **Compact Horizontal Hand Fan**: Cards neatly fan across the bottom tray without awkward page stretching or scroll requirements.

---

### ☀️ 3. Chhath Puja Mahaparva & Sacred Ghats (`/chhath`)
- **Sacred 4-Day Journey**: Comprehensive spiritual breakdown of *Nahay Khay, Kharna, Sandhya Arghya,* and *Usha Arghya*.
- **Sacred Ghat Locator**: Interactive guide to iconic Chhath ghats across Nepal (Kamal Pokhari, Janakpur Ganga Sagar, Rani Pokhari, Bagmati Ghat, Birgunj Ghadiarwa, and Koshi River).
- **Virtual Arghya Offering**: Interactive offering experience with *Thekua*, coconuts, sugarcane, sacred holy water, and lit *soop* prayers offered to Lord Surya.

---

### 📖 4. Yamapanchak Editorial Guide (`/about-tihar`)
- Educational breakdown of the 5 Days of Tihar:
  1. **Kaag Tihar** (Worship of Crows — messengers of Yama)
  2. **Kukur Tihar** (Honoring the Loyalty & Protection of Dogs)
  3. **Gai Tihar & Laxmi Puja** (Veneration of the Holy Cow & Goddess of Wealth)
  4. **Govardhan Puja & Mha Puja** (Oxen reverence, nature worship, and Newari purification of the self)
  5. **Bhai Tika** (Sacred brother-sister bond, *Saptarangi Tika*, and *Makhamali* garlands)
- Detailed exploration of cultural symbols: *Sel Roti, Marigolds, Mandala Rangoli, and oil lamps*.

---

### 📊 5. Celebration Pulse (`/stats`)
- Live community telemetry: total lit diyos, global diaspora reach across 64+ countries, most popular lamp varieties, and top regional contributions.

---

### 🎵 6. Custom Web Audio Synthesizer
- Built using native browser **Web Audio API** (zero heavy external audio asset downloads).
- Procedurally synthesizes smooth card flip/slide sounds, delicate bell chimes, and festive interactions with a global mute toggle.

---

## 🗺️ Multi-Page Routing Architecture

JHILIMILI uses a custom client-side router leveraging the modern **HTML5 History API (`pushState` / `popstate`)** with seamless SPA deep-linking and browser navigation:

| Route | Page Component | Focus & Experience |
|---|---|---|
| `/` | `HomePage.jsx` | Hero section, animated portal flip cards, recent wishes reel |
| `/wall` | `WallPage.jsx` | Full Virtual Diyo Wall, filters, courtyard view, bottom blessing stage |
| `/games` | `GamesPage.jsx` | Arcade lounge featuring vector card artwork and lore |
| `/games/callbreak` | `CallBreakPage.jsx` | Dedicated Call Break match table with smart AI bots |
| `/games/dhumbal` | `DhumbalPage.jsx` | Dedicated Dhumbal match table with draw/discard flow |
| `/games/marriage` | `MarriagePage.jsx` | Dedicated 21-card Marriage table with meld analyzers |
| `/chhath` | `ChhathPage.jsx` | Chhath rituals, sacred ghat exploration, and Arghya rituals |
| `/about-tihar` | `AboutTiharPage.jsx` | Cultural narrative, lunar tithis, and symbolic lore |
| `/stats` | `StatsPage.jsx` | Celebration analytics and diaspora distribution |
| `*` | `NotFoundPage.jsx` | 404 *"बाटो बिर्सनुभयो?"* festive fallback |

---

## 🛠️ Technology Stack

| Layer | Technologies Used | Purpose |
|---|---|---|
| **Frontend Framework** | React 19, JavaScript (ES Modules) | Reactive UI components & state management |
| **Bundler & Build Tool** | Vite 8 | Fast HMR and lightweight bundle optimization |
| **Styling & Effects** | Custom Vanilla CSS (Design Tokens) | Fluid typography, backdrop filters, glassmorphism, responsive grids |
| **Audio Engine** | Web Audio API | Zero-latency procedural sound effects |
| **Backend API** | Node.js, Express 5 | REST API endpoints for lamps & messages |
| **Persistence** | MongoDB / Mongoose + LocalStorage Fallback | Resilient dual-layer storage guaranteeing 100% offline & demo reliability |
| **Hosting & CI/CD** | Vercel / Netlify | Auto SPA rewrites (`vercel.json`, `_redirects`) |

---

## 📂 Project Structure

```text
project_101/
├── backend/                  # Express REST API
│   ├── config/               # Database connection
│   ├── controllers/          # Lamp & message controllers
│   ├── models/               # MongoDB Mongoose schemas
│   ├── routes/               # API route definitions
│   └── app.js                # Express app entry point
│
├── frontend/                 # React 19 + Vite Frontend Application
│   ├── public/               # Static assets & SPA redirect configs
│   │   ├── images/           # Authentic festival photography & textures
│   │   ├── _redirects        # Netlify SPA rewrite configuration
│   │   └── favicon.svg       # Glowing Diya favicon
│   ├── src/
│   │   ├── components/       # Reusable UI & festival widgets
│   │   │   ├── DiyaCard.jsx          # Individual glowing lamp node
│   │   │   ├── DiyaWall.jsx          # Virtual Wall & bottom blessing stage
│   │   │   ├── DiyaModal.jsx         # "Light a Diya" creation dialog
│   │   │   ├── DiyaDetailModal.jsx   # Expanded blessing card modal
│   │   │   ├── GameCardArtwork.jsx   # Vector artwork banners for card games
│   │   │   ├── GamesSection.jsx      # Arcade showcase cards
│   │   │   ├── Hero.jsx              # Festive hero banner with interactive diya
│   │   │   ├── Navbar.jsx            # Floating glassmorphic navigation bar
│   │   │   ├── FairyLights.jsx       # Animated rooftop festival lights
│   │   │   └── Footer.jsx            # Cultural sign-off & quick links
│   │   ├── games/            # Traditional Card Games Engine
│   │   │   ├── callbreak/            # Call Break logic, bidding, trick evaluation
│   │   │   ├── dhumbal/              # Dhumbal point scoring, discard sets, AI logic
│   │   │   ├── marriage/             # 21-card marriage melds & tunnellas
│   │   │   └── shared/               # PlayingCard & OpponentFanHand components
│   │   ├── pages/            # Multi-Page Route Views
│   │   │   ├── HomePage.jsx          # Portal Gateway
│   │   │   ├── WallPage.jsx          # Dedicated Diyo Wall
│   │   │   ├── GamesPage.jsx         # Card Parlor Hub
│   │   │   ├── CallBreakPage.jsx     # Dedicated Call Break Table
│   │   │   ├── DhumbalPage.jsx       # Dedicated Dhumbal Table
│   │   │   ├── MarriagePage.jsx      # Dedicated Marriage Table
│   │   │   ├── ChhathPage.jsx        # Chhath Mahaparva
│   │   │   ├── AboutTiharPage.jsx    # Editorial Yamapanchak Lore
│   │   │   ├── StatsPage.jsx         # Community Pulse
│   │   │   └── NotFoundPage.jsx      # 404 Fallback
│   │   ├── router/           # HTML5 History API Client Router
│   │   ├── utils/            # Web Audio synthesizer & local persistence
│   │   ├── App.jsx           # Application wrapper & route registry
│   │   └── index.css         # Complete theme design system
│   ├── vercel.json           # Vercel deployment SPA rewrite rules
│   └── vite.config.js        # Vite build configuration
│
└── README.md                 # Complete Project Documentation
```

---

## 🚀 Local Installation & Setup

### Prerequisites
- **Node.js** (v18.0.0 or higher)
- **npm** or **pnpm**

### 1. Clone the Repository
```bash
git clone https://github.com/Binaya764/project_101.git
cd project_101
```

### 2. Launch Frontend (Client)
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. All routes (`/wall`, `/games`, `/games/callbreak`, `/chhath`, etc.) are immediately accessible.

### 3. Build for Production
```bash
cd frontend
npm run build
```
The optimized bundle will be compiled into `frontend/dist/`.

### 4. Launch Backend API (Optional)
```bash
cd backend
npm install
node app.js
```
The server will initialize on port `3000` (or the configured `PORT` in `.env`). If MongoDB is not running locally, the system automatically switches to its in-memory fallback.

---

## 🚢 Production Deployment

The project is pre-configured for instant zero-configuration deployment on **Vercel** or **Netlify**:

### Vercel Deployment
1. Import the repository into your Vercel Dashboard.
2. Set the **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. The included `frontend/vercel.json` ensures all client-side routes rewrite to `/index.html` with zero 404 errors.

### Netlify Deployment
1. Import the repository into Netlify.
2. Base directory: `frontend`.
3. Build command: `npm run build`.
4. Publish directory: `dist`.
5. The included `frontend/public/_redirects` handles SPA routing automatically.

---

## 👥 Contributors & Acknowledgements

- **Binay Bista** ([@Binay764](https://github.com/Binaya764)) — Full Stack Architecture, UI/UX Design, Festive Theming, and Card Game Logic.
- Created for the **Kathmandu University Computer Club (KUCC) Tihar-Chhath Web UI Design Competition 2026**.
- Heartfelt gratitude to the vibrant Nepali web development community for keeping our festivals and cultural spirit alive in technology.

---

<div align="center">

**तिहार तथा छठ पर्वको हार्दिक मङ्गलमय शुभकामना!**  
*Wishing everyone a joyful, prosperous, and illuminated Tihar and Chhath Puja!*

🪔 ✨ 🌾 ☀️ 🎴

</div>
