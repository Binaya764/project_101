const Lamp = require("../models/lamp");
const mongoose = require("mongoose");

// Resilient in-memory storage fallback
let memoryLamps = [
  {
    _id: "mem-1",
    name: "Aayush Shrestha",
    reflection: "यस पालिको तिहारले सबैको घरमा सुख, शान्ति र समृद्धि छाओस्!",
    wish: "यस पालिको तिहारले सबैको घरमा सुख, शान्ति र समृद्धि छाओस्!",
    dedication: "For my loving family in Dharan",
    country: "Nepal",
    city: "Kathmandu",
    diyaType: "gold",
    likes: 42,
    createdAt: new Date().toISOString()
  },
  {
    _id: "mem-2",
    name: "Pranisha Gurung",
    reflection: "Lighting this diya from across the ocean. Happy Tihar!",
    wish: "Lighting this diya from across the ocean. Happy Tihar!",
    dedication: "Dedicated to Aama and Buwa",
    country: "Australia",
    city: "Sydney",
    diyaType: "clay",
    likes: 38,
    createdAt: new Date().toISOString()
  }
];

async function getLamp(req, res, next) {
  try {
    if (mongoose.connection.readyState === 1) {
      const lamps = await Lamp.find().sort({ createdAt: -1 }).limit(100);
      return res.json(lamps);
    }
    // Return memory lamps
    return res.json(memoryLamps);
  } catch (e) {
    return res.json(memoryLamps);
  }
}

async function postLamp(req, res, next) {
  try {
    const name = String(req.body?.name || "").trim().slice(0, 50) || "Anonymous";
    const reflection = String(req.body?.reflection || req.body?.wish || "").trim().slice(0, 300) || "Happy Tihar & Chhath!";
    const wish = reflection;
    const dedication = String(req.body?.dedication || "").trim().slice(0, 100);
    const country = String(req.body?.country || "Nepal").trim().slice(0, 40);
    const city = String(req.body?.city || "Kathmandu").trim().slice(0, 40);
    const diyaType = String(req.body?.diyaType || "gold").trim().slice(0, 20);

    const newLampData = {
      name,
      reflection,
      wish,
      dedication,
      country,
      city,
      diyaType,
      likes: 1,
      createdAt: new Date()
    };

    if (mongoose.connection.readyState === 1) {
      const lamp = await Lamp.create(newLampData);
      return res.status(201).json(lamp);
    }

    const createdMemory = {
      _id: `mem-${Date.now()}`,
      ...newLampData
    };
    memoryLamps.unshift(createdMemory);
    return res.status(201).json(createdMemory);
  } catch (e) {
    next(e);
  }
}

module.exports = { getLamp, postLamp };
