const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const HomeSchema = new Schema({
    name: String,
    passcode: String
}, { timestamps: true });

module.exports = mongoose.model("Home", HomeSchema);
