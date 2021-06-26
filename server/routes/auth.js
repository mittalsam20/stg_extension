const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const user = require("../models/signupmodels")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");
router.use(bodyParser.urlencoded({ extended: true }));

router.post('/try', (req, res) => {
    res.json({
        success: true,
        meesage: "Register Route"
    })
})

router.post('/signup', async(req, res) => {
    try {
        if (!req.body.emailId || !req.body.password) {
            return res.status(400).json({ error: "Please Fill All The Details..!!" })
        }

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
        let token;
        if (!req.body.logEmail || !req.body.logPass) {
            return res.status(400).json({ error: "Please Fill All The Details..!!" });
        }

        const userLogin = await user.findOne({ emailId: req.body.logEmail });
        console.log(userLogin);
        const userLogPass = await bcrypt.compare(req.body.logPass, userLogin.password)
        token = await userLogin.generateAuthToken();
        console.log(token);
        res.cookie("stgUserToken", token, { expires: new Date(Date.now() + 25892000000), httpOnly: true });

        if (!userLogin) {
            res.status(400).json({ error: "Id Not Registered" })
        } else if (!userLogPass) {
            res.status(400).json({ error: "InCorrect Password" })
        } else if (userLogin || userLogPass) {
            res.json({ message: "Login SuccessFull..!!" })
        }
    } catch (err) {
        console.log(err);
    }
});


module.exports = router;