const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    rec: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: { type: Date, default: Date.now }
})
module.exports = mongoose.model("noteData", noteSchema);