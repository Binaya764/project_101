const express = require("express");
const lamp = require("../models/lamp")
const lampRouter = express.Router();
const lampController = require("../controllers/lampController");

lampRouter.get("/",lampController.getLamp);
lampRouter.post("/",lampController.postLamp);

module.exports = lampRouter;