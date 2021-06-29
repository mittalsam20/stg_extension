const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const note = require("../models/notemodels")

router.use(bodyParser.urlencoded({ extended: true }));

router.get("/notes/:id", (req, res) => {
    try {
        note.findById(req.params.id)
            .then(foundnote => res.json(foundnote))
            .catch(res.json({ message: "No Notes Yet..!!" }))
    } catch (err) {
        res.status(500).json(err);
    }
})

router.delete("/notes/:id", async(req, res) => {
    try {
        const temp = await note.findById(req.params.id);
        if (temp) {
            await note.remove();
            res.json({ message: "Note Removed" });
        } else {
            res.status(404);
            throw new Error("Note not Found");
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


// ---------------------------------------------BELOW IS FOR ALL NOTES--------------------------------//

router.route("/notes")
    .get((req, res) => {
        try {
            note.find().then(foundnote => res.json(foundnote))
        } catch (err) {
            res.status(500).json(err);
        }
    })
    .post(async(req, res) => {
        try {
            if (!req.body.title || !req.body.content) {
                return res.status(400).json({ error: "Title/Content Missing..!!" })
            }
            const newNote = new note({
                title: req.body.title,
                content: req.body.content
            })
            console.log(req.body.content)
            newNote.save().then(data => {
                res.status(200).json({
                    message: "Note saved successfully",
                    data
                });
                console.log(json(data));
            }).catch(error => { res.status(500).json(error) })
        } catch (err) {
            res.status(500).json(err);
        }
    })



module.exports = router;