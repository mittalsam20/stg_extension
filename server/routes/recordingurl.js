const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const recordings = require("../models/recordingmodels")

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/getrecurl', (req, res) => {
    try {
        recordings.find().then(foundrec => res.json(foundrec))
    } catch (err) {
        res.status(500).json(err)
    }
})

// router.post("/login", async(req, res) => {
//     // try {
//     const user = await user.findOne({ emailId: req.body.emailId });
//     if (!user) { res.status(400).json('Invalid username or password!!'); } else { res.status(200).json("user founded") }

//     const validated = await bcrypt.compare(req.body.password, user.password);
//     !validated && res.status(400).json("Invalid username or password")

//     const { password, ...others } = user._doc;
//     res.status(200).json(others)
//         // } catch (err) {
//         // res.status(500).json(err)
//         // }
// })


module.exports = router;