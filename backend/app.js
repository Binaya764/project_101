require('dotenv').config();
const express = require("express");
const cors = require('cors');
const connectDB = require("./config/db");

const messageRouter = require("./routes/messageRoute");
const lampRouter = require("./routes/lampRoutes");
const tutorialRouter = require("./routes/tutorialRoutes");

const app = express();
connectDB();

app.use(cors({origin: process.env.CLIENT_ORIGIN || "*"}));
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.json());


app.use("/message",messageRouter);
app.use("/api/lamps",lampRouter);
app.use("/api/tutorial", tutorialRouter);
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: 'Something went wrong on the server.' });
});

app.listen(3000,()=>{
    console.log("Server is running on 3000")
});
