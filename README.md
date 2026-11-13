# 🪔 JHILIMILI (झिलिमिली) — Virtual Tihar & Chhath Celebration Platform
### Submission for the KUCC Tihar-Chhath Web UI Design Competition 2026
**Track**: Advanced Track: Web Application  
**Organizer**: Kathmandu University Computer Club (KUCC) Web Dev Community  

---

## 📌 Project Abstract (For Competition Google Form Submission)

> **JHILIMILI (झिलिमिली)** is an immersive, multi-page interactive Web Application celebrating Nepal’s twin festivals of **Tihar (Deepawali/Yamapanchak)** and **Chhath Puja (छठ महापर्व)**. Featuring dedicated URL routes, it includes an interactive **Virtual Diyo Wall** with global diaspora wishes, three fully playable **Traditional Nepali Card Games** (Call Break, Dhumbal/Jhyap, and Marriage) on dedicated table routes, a real-time radial symmetry **Rangoli & Mandala Studio**, a sacred **Chhath Ghat Locator with Virtual Arghya Offerings**, an interactive **Madal Drum & Deusi-Bhailo Jam Corner**, and a **Kukur Tihar Tribute Gallery**—all backed by a custom Web Audio synthesizer and resilient Node/Express API.

---

## 🌐 Multi-Page URL Architecture & Routes

The application features full multi-page client-side routing with distinct URLs, browser back/forward navigation support, deep-linking, and breadcrumb navigation:

| Page Route | Page Title & Description | Features |
|---|---|---|
| **`/`** | **Home / Gateway** | Grand Hero Section, 3D Diya, Live Counter, Gateway Cards to all festival rooms, and recent wishes strip |
| **`/wall`** | **Virtual Diyo Wall** | Full-page Diyo Wall with Starlit Courtyard & Mosaic Cards views, search, filters, and "Light a Diya" modal |
| **`/games`** | **Games of Tihar Lounge** | Traditional card games arcade hub with cultural history and direct launch buttons |
| **`/games/callbreak`** | **Call Break Arena** | Dedicated full-table Call Break game with bidding, trick arena, AI opponents, and scoring |
| **`/games/dhumbal`** | **Dhumbal / Jhyap Arena** | Dedicated table for 4 players with draw/discard piles, live hand point calculation, and DHUMBAL call |
| **`/games/marriage`** | **21-Card Marriage Arena** | Dedicated 3-player 21-card tray with Sort by Suit/Rank and live Pure Run & Tunnella detection |
| **`/rangoli`** | **Rangoli & Mandala Studio** | Interactive canvas with 4–12 fold radial symmetry, festival pigments, stamps, and PNG download |
| **`/chhath`** | **Chhath Puja Mahaparva** | The 4 Sacred Days, Sacred Ghat Locator for 6 major ghats, and Virtual Arghya Offering |
| **`/deusi-jam`** | **Deusi-Bhailo Rhythm Jam** | Interactive Madal drum pads (Dhin, Tak, Khinta), folk rhythm loops, and rhyming Deusi couplets |
| **`/kukur-tribute`** | **Kukur Tihar Tribute** | Pet Hall of Fame with interactive marigold garland draping, vermilion tika, and pet submission form |
| **`/about-tihar`** | **About Yamapanchak** | Editorial guide to the 5 Days of Tihar, lunar tithis, sacred rituals, and cultural symbols |
| **`/stats`** | **Celebration Pulse** | Live community metrics, global diaspora reach across 64+ nations, and regional distribution |
| **`*`** | **404 Festive Fallback** | "बाटो बिर्सनुभयो? — Lost in the Lights?" page with home navigation |

---

## 💻 Tech Stack

- **Frontend**: React 19, Vite 8, Multi-Page Router (HTML5 History API with SPA fallback), Custom CSS Design System, Canvas API, Web Audio API
- **Backend**: Node.js, Express 5, CORS, MongoDB (with resilient in-memory fallback)
- **Deployment**: Vercel & Netlify ready with SPA URL rewrites (`vercel.json` & `public/_redirects`)

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm or pnpm

### Running the Frontend
```bash
cd frontend
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser. All routes like `http://localhost:5173/wall`, `http://localhost:5173/games`, `http://localhost:5173/chhath`, `http://localhost:5173/rangoli`, etc. can be accessed directly.

### Building for Production
```bash
cd frontend
npm run build
```

### Running the Backend (Optional)
```bash
cd backend
npm install
node app.js
```
The server runs on port `3000` (or the configured `PORT`).

---

## 🌐 Live Deployment Guide (Vercel / Netlify)

1. Connect your GitHub repository to Vercel or Netlify.
2. Set **Root Directory** to `frontend`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**. Both `vercel.json` and `public/_redirects` are already included so all multi-page routes work immediately with zero 404s!
