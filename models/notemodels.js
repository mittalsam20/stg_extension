const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    recId: {
        type: String,
        required: true,
        unique: true
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