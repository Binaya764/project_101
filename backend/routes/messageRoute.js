const {Router} = require("express");
const messageController = require("../controllers/messageController");
const messageRouter = Router();

messageRouter.get("/message",messageController.getMessage);

messageRouter.post("/message",messageController.getMessage);

module.exports = messageRouter;