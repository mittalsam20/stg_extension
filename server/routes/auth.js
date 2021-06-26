const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const user = require("../models/signupmodels")
const bcrypt = require('bcrypt')

router.use(bodyParser.urlencoded({ extended: true }));

router.post('/try', (req, res) => {
    res.json({
        success: true,
        meesage: "Register Route"
    })
})

router.post('/signup', async(req, res) => {
    try {
        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(req.body.password, salt)
        const newUser = new user({
            emailId: req.body.emailId,
            password: hashedPass
        })
        console.log(req.body.emailId)
        newUser.save().then(data => {
            res.status(200).json(data);
            console.log(json(data));
        }).catch(error => { res.status(500).json(error) })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", (req, res) => {
    user.findOne({ emailId: req.body.logEmail }).then(founduser => {
        if (founduser) {
            console.log("mil gata")
            bcrypt.compare(req.body.logPass, founduser.password).then(result => {
                if (result) {
                    console.log("right pass");
                    console.log(founduser.emailId);
                } else {
                    console.log("wrong pass");
                }
            })
        } else {
            console.log("user not found");
        }
    });
});


module.exports = router;