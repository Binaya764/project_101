const {Router} = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/message",);

messageRouter.post("/newMessage",messageController.getMessage);

module.exports = messageRouter;