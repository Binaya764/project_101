const express = require("express");
const messageRouter = require("./routes/messageRoute");
const app = express();
const PORT = 3000;
const path = require("node:path");


app.use(express.static(Path2D.join(__dirname,'public')));
app.use(express.urlencoded({extended: true}));

app.use(express.static('public'));
app.use(express.json());


app.use("/message",messageRouter);


app.get("/",(req,res)=>{
    res.send("server is running");
})
app.listen(3000,()=>{
    console.log("Server is running on 3000")
});
