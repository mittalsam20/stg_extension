const express = require("express")
const router = express.Router();
const bodyParser = require("body-parser")
const note = require("../models/notemodels")

router.use(bodyParser.urlencoded({ extended: true }));

router.route("/notes/:id")
    .get((req, res) => {
        try {
            note.findById(req.params.id).then(foundnote => res.json(foundnote))
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
    // .put().delete()

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
    // .put().delete()


module.exports = router;