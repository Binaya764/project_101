const mongoose = require("mongoose");
require("dotenv").config();

const url = process.env.MONGO_URI;
const connectDB = async()=>{
    try{
        await mongoose.connect(url,{});
        console.log("Database connected");
    }catch(err){
        console.error("Error connecting to the DB",err);
        process.exit(1);
    }
}
module.exports= connectDB;