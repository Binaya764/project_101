# 🪔 JHILIMILI (झिलिमिली) — Virtual Tihar & Chhath Celebration Platform
### Submission for the KUCC Tihar-Chhath Web UI Design Competition 2026
**Track**: Advanced Track: Web Application  
**Organizer**: Kathmandu University Computer Club (KUCC) Web Dev Community  

---

## 📌 Project Abstract (For Competition Google Form Submission)

> **JHILIMILI (झिलिमिली)** is an immersive, interactive Web Application celebrating Nepal’s twin festival seasons of **Tihar (Deepawali/Yamapanchak)** and **Chhath Puja (छठ महापर्व)**. The platform features an interactive **Virtual Diyo Wall** with global diaspora wishes, three fully playable **Traditional Nepali Card Games** (Call Break, Dhumbal/Jhyap, and 21-card Marriage) with AI opponents, a real-time radial symmetry **Rangoli & Mandala Studio**, a sacred **Chhath Ghat Locator with Virtual Arghya Offering**, an interactive **Madal Drum & Deusi-Bhailo Jam Corner**, and a **Kukur Tihar Tribute Gallery**—all backed by a custom Web Audio synthesizer and resilient Node/Express API.

---

## 🌟 Key Application Features

### 1. 🪔 The Virtual Diyo Wall
- **Dual View Modes**:
  - *Starlit Courtyard View*: Organic terrace canvas with glowing halos, realistic flame flickers, and natural rooftop spacing.
  - *Mosaic Cards View*: Rich search and filter cards for community wishes.
- **Diya Crafting Varieties**: *Matiko Diyo* (Terracotta clay), *Sunko Diyo* (Royal gold), *Panchamukhi* (Brass), and *Rangoli Diyo* (Painted).
- **Interactive Light a Diya Modal**: Write blessings, add dedications, select country/city, choose diya designs, or remain anonymous.
- **Heart & Blessing Counter**: Send love and blessings (+1) with audio chime feedback.
- Real-time search by author, city, dedication, or keyword with filter tabs.

### 2. 🎴 Traditional Nepali Card Games ("Games of Tihar")
- **Call Break (कल ब्रेक)**:
  - 4-player trick-taking game against 3 AI opponents (Ramesh Dai, Pooja Didi, Kiran Kaji).
  - Bidding system (1–8 tricks), follow-suit logic, Spade trumping (*Hukum*), and standard round scoring.
- **Dhumbal / Jhyap (धुम्बाल / झ्याप)**:
  - Fast-paced point-minimizing game for 4 players.
  - Discard single cards, pairs/triplets of same rank, or 3+ same-suit sequences.
  - Live hand point calculator with active **"DHUMBAL!"** action (when points ≤ 10) and full Showdown with catching (*फाउल*) penalties.
- **Marriage / 21-Card Game (म्यरिज)**:
  - 3 players with triple deck (156 cards) and 21 cards per player.
  - Live detection of **Pure Runs** and **Tunnellas** with **Sort by Suit** and **Sort by Rank** tools.

### 3. 🎨 Interactive Rangoli & Mandala Studio
- Real-time radial symmetry drawing canvas with **4-fold, 6-fold, 8-fold, 12-fold, and Freehand** modes.
- Traditional festival pigments (Abir vermilion, turmeric, marigold orange, rice white, peacock turquoise, pipal emerald).
- Sacred festival stamps: *Diyo*, *Sayapatri*, *Makhamali*, *Lotus*, and *Auspicious Footprints*.
- Undo, canvas clearing, and **Save as PNG** image export.

### 4. ☀️ Chhath Puja Mahaparva & Sacred Ghat Locator
- Editorial and ritual guide for the **4 Sacred Days**: *Nahay-Khay*, *Kharna*, *Sandhya Arghya*, and *Usha Arghya*.
- **Sacred Ghat Locator**: Interactive guide to famous ghats including Janakpur Dham (Ganga Sagar), Ranipokhari, Bagmati (Guhyeshwari), Ghariarwa Pokhari (Birgunj), Narayani Riverbank, and Diaspora Waters with prayer timings.
- **Virtual Arghya Offering (अर्घ्य अर्पण)**: Build a traditional bamboo *Soop* with Thekua, Sugarcane, Coconut, and Bananas to offer Arghya to Lord Surya and Chhathi Maiya.

### 5. 🪘 Deusi-Bhailo Rhythm Jam & Couplet Generator
- **Interactive Madal Pad**: Tap to play authentic Madal drum hits (*Dhin*, *Tak*, *Khinta*) synthesized in real-time via the Web Audio API.
- **Preset Folk Grooves**: Auto-looping Deusi, Bhailo, and Jhyaure rhythms.
- **Deusi Couplet Generator**: Generate rhyming verses for blessings, humor, and Bhailo singing.

### 6. 🐕 Kukur Tihar Loyal Companion Tribute
- Pet Hall of Fame celebrating heroic rescue dogs and family companions.
- Interactive garland draping (*Sayapatri Mala*) and vermilion tika application.
- Form to dedicate a card to your own pet or community street dog.

### 7. 🔔 Festive Web Audio Synthesizer
- Zero external audio network dependencies.
- Generates pentatonic temple chimes, card slides, drum beats, and win fanfares using the browser's native Web Audio API.
- Global mute/unmute toggle in the navbar.

---

## 💻 Tech Stack

- **Frontend**: React 19, Vite 8, Modern CSS3 with Custom Design System, HTML5 Canvas API, Web Audio API
- **Backend**: Node.js, Express 5, CORS, MongoDB (with resilient in-memory fallback)
- **Persistence**: LocalStorage with full backend synchronization compatibility
- **Typography**: Yatra One, Rozha One, Cinzel, Mukta (Google Fonts)

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
Open [http://localhost:5173](http://localhost:5173) in your browser.

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

### Deploying Frontend to Vercel:
1. Connect your GitHub repository to Vercel.
2. Set Root Directory to `frontend`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build`.
5. Output Directory: `dist`.
6. Click **Deploy**.

---

## 🏆 Project Information
- **Project**: JHILIMILI (झिलिमिली)
- **Competition**: KUCC Tihar-Chhath Web UI Design Competition 2026
- **Track**: Advanced Track (Web Application)
- **Organizer**: Kathmandu University Computer Club (KUCC)
- **License**: MIT
