const mongoose = require("mongoose");

const recordingSchema = new mongoose.Schema({
    userId: {
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
    date: { type: Date, default: Date.now }
})

module.exports = mongoose.model("recordingData", recordingSchema);