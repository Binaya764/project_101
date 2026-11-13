require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");

const messageRouter = require("./routes/messageRoute");
const lampRouter = require("./routes/lampRoutes");
const tutorialRouter = require("./routes/tutorialRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB with automatic fallback
connectDB();

app.use(cors({ origin: process.env.CLIENT_ORIGIN || "*" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json({ limit: '10mb' }));

// In-memory data for Chhath Arghya & Rangolis
let chhathArghyaOfferings = [
  { id: 'arg-1', devoteeName: 'Suman & Family', ghat: 'Janakpur - Ganga Sagar', items: ['Thekua', 'Sugarcane', 'Coconut'], timestamp: new Date() },
  { id: 'arg-2', devoteeName: 'Priya Mishra', ghat: 'Kathmandu - Ranipokhari', items: ['Thekua', 'Banana', 'Diyo'], timestamp: new Date() }
];

let communityRangolis = [];

// Base routes
app.use("/message", messageRouter);
app.use("/api/lamps", lampRouter);
app.use("/api/tutorial", tutorialRouter);

// Chhath Arghya endpoints
app.get("/api/chhath/arghyas", (req, res) => {
  res.json({
    totalCount: 4280 + chhathArghyaOfferings.length,
    recent: chhathArghyaOfferings.slice(0, 20)
  });
});

app.post("/api/chhath/arghya", (req, res) => {
  const { devoteeName, ghat, items } = req.body;
  const newOffering = {
    id: `arg-${Date.now()}`,
    devoteeName: devoteeName?.trim() || 'Anonymous Devotee',
    ghat: ghat || 'Sacred Ghat',
    items: items || ['Thekua', 'Diyo'],
    timestamp: new Date()
  };
  chhathArghyaOfferings.unshift(newOffering);
  res.status(201).json(newOffering);
});

// Community Rangoli endpoints
app.get("/api/rangoli", (req, res) => {
  res.json(communityRangolis.slice(0, 30));
});

app.post("/api/rangoli", (req, res) => {
  const { title, author, previewUrl } = req.body;
  const newRangoli = {
    id: `rng-${Date.now()}`,
    title: title?.trim() || 'Festive Mandala',
    author: author?.trim() || 'Artist',
    previewUrl: previewUrl || '',
    likes: 1,
    createdAt: new Date()
  };
  communityRangolis.unshift(newRangoli);
  res.status(201).json(newRangoli);
});

// Celebration Stats endpoint
app.get("/api/stats", (req, res) => {
  res.json({
    diyosLit: 12480,
    arghyasOffered: 4280,
    wishesCount: 8920,
    countriesCount: 64,
    participants: 35240
  });
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", app: "JHILIMILI API", festival: "Tihar & Chhath 2083" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

app.listen(PORT, () => {
  console.log(`🪔 JHILIMILI Backend Server is running on port ${PORT}`);
});

module.exports = app;
