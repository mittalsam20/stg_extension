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
        const userExist = await user.findOne({ emailId: req.body.emailId })

        if (userExist) {
            res.status().json({ message: "Email-Id Already Registered..!!" })
        }

        const newUser = new user({
            emailId: req.body.emailId,
            password: hashedPass
        })
        console.log(req.body.emailId)

        newUser.save().then(data => {
            res.status(200).json({
                message: "User Registered Successfully",
                data
            });
            console.log(json(data));
        }).catch(error => { res.status(500).json(error) })

    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async(req, res) => {

    try {
        if (!req.body.logEmail || !req.body.logPass) {
            return res.status(400).json({ error: "Please Fill All The Details" });
        }
        const userlogin = await user.findOne({ emailId: req.body.logEmail });
        console.log(userlogin);
        if (!userlogin) {
            res.status(400).json({ error: "Id Not Registered" })
        } else {
            res.json({ message: "Login SuccessFull..!!" })
        }
    } catch (err) {
        console.log(err);
    }


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