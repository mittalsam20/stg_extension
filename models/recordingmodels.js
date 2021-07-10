const mongoose = require("mongoose");

const date = new Date(Date.now());
disp_date = date.toGMTString().slice(0, 22)
    // disp_time = date.toGMTString().slice(17, 22)
    // console.log(disp_date);
    // console.log(disp_time);
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
    duration: {
        type: Number,
        required: true,
    },
    // summary: {
    //     type: String,
    //     required: true,
    // },
    // transcription: {
    //     type: String,
    //     required: true,
    // },
    date: { type: String, default: disp_date }
})

module.exports = mongoose.model("recordingData", recordingSchema);