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
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailId: req.body.emailId,
                userName: req.body.userName,
                password: hashedPass
            })
            // console.log(req.body.firstName)
        newUser.save().then(data => {
            res.status(200).json(data);
            // console.log(json(data));
        }).catch(error => { res.status(500).json(error) })
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async(req, res) => {
    try {
        const user = await user.findOne({ emailId: req.body.emailId });
        !user && res.status(400).json('Invalid username or password!!')

        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("Invalid username or password")

        const { password, ...others } = user._doc;
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json(err)
    }
})


module.exports = router;