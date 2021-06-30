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
        if (req.params.id) {
            const result = await findByIdAndDelete(req.params.id);
            console.log(result);
            res.status(200).json({ message: "Recording Deleted..!!" });
        } else if (result === null) {
            res.status(404).json({ message: "No Such Recording Exist..!!" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
})




module.exports = router;