const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const emailTemplateCopy = require("../models/emailmodel")

router.use(bodyParser.urlencoded({ extended: false }));

router.post('/email', (req, res) => {
    const newEmail = new emailTemplateCopy({
        emailId: req.body.emailId
    })
    console.log(req.body.emailId)
    newEmail.save().then(data => {
        res.json(data);
        console.log(res.json(data));
    }).catch(error => { res.json(error) })
})

module.exports = router;