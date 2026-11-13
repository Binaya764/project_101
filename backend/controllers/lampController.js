const Lamp = require("../models/lamp");
// const express = require("express");
// const rateLimit = require("express-rate-limit");

//const limiter = rateLimit({windowMs: 60 * 1000, max: 10})
async function getLamp(req,res,next){
    try {
    res.json(await Lamp.find().sort({ createdAt: -1 }).limit(60).select('name reflection createdAt'));
  } catch (e){next(e)}
};

async function postLamp(req,res,next){
    try{
        const name = String(req.body?.name||"").trim().slice(0, 30) || "A friend";
        const reflection = String(req.body?.reflection || "").trim().slice(0,40)|| "A good night of cards.";
        const lamp = await Lamp.create({name, reflection});
        res.status(201).json(lamp);
    }catch (e){next(e);
    }
}

module.exports ={ getLamp,postLamp};