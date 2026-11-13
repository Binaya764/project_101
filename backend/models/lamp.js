const mongoose = require("mongoose");
const lampSchema = new mongoose.Schema(
{
    name: {type: String, required: true, trim: true, maxlength: 30},
    reflection: {type: String, required: true, trim: true, maxlength: 140}
},{timestamp: true}
);

module.exports = mongoose.model("Lamp", lampSchema);