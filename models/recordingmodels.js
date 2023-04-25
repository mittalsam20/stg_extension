const mongoose = require("mongoose");

const date = new Date(Date.now());
const disp_date = date.toLocaleString().slice(0, 17);

const recordingSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  recordingFileName: {
    type: String,
    required: true,
    unique: true,
  },
  recordingPath: {
    type: String,
    required: true,
    unique: true,
  },
  recordingUrl: {
    type: String,
    required: true,
    unique: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  date: { type: String, default: disp_date },
});

module.exports = mongoose.model("recordingData", recordingSchema);
