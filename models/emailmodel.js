const mongoose = require("mongoose");

const emailTemplate = new mongoose.Schema({

    emailId: { type: String, required: true },
    date: { type: Date, default: Date.now }

})

module.exports = mongoose.model("emaildata", emailTemplate);