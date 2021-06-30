const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const recordings = require("../models/recordingmodels")

router.use(bodyParser.urlencoded({ extended: true }));

router.get('/getrecurl', (req, res) => {
    try {
        recordings.find().then(foundrec => res.json(foundrec))
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/delrecurl/:id", async(req, res) => {
    try {
        const temp = req.params.id;
        if (temp) {
            console.log("atleaast inside")
            console.log(temp)
            const result = await findByIdAndDelete(temp);
            console.log(result);
            res.status(200).json({ message: "Recording Deleted..!!" });
        } else {
            res.status(404).json({ message: "No Such Recording Exist..!!" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;