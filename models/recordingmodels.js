const mongoose = require("mongoose");

const date = new Date(Date.now());
// console.log(date.toGMTString());
const recordingSchema = new mongoose.Schema({
    user: {
        type: String,
        required: true,
    },
    recordingFileName: {
        type: String,
        required: true,
        unique: true
    },
    recordingPath: {
        type: String,
        required: true,
        unique: true
    },
    recordingUrl: {
        type: String,
        required: true,
        unique: true
    },
    date: { type: Date, default: date.toGMTString() }
})

module.exports = mongoose.model("recordingData", recordingSchema);