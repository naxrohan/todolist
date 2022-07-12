const Note = require("../models/Note");
const { VerifyyTokenAndAuth, VerifyyTokenAndAdmin } = require("./verify");

const router = require("express").Router();

// Create
router.post("/:id", VerifyyTokenAndAuth, async (req, res) => {
    try {
        const newNote = new Note(req.body);
        await newNote.save();
        res.status(200).json("Note is created..");
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update.
router.put("/:id",VerifyyTokenAndAuth, async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id,{
                $set: req.body
            },
            {new: true}
        );

        res.status(200).json(updatedNote);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Delete.
router.delete("/:id", VerifyyTokenAndAuth, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);

        res.status(200).json("Note was deleted...");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get note.
router.get("/find/:id", VerifyyTokenAndAuth, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// // Get All notes.
router.get("/", VerifyyTokenAndAuth, async (req, res) => {
    const query = req.query.new;
    try {
        const note = query 
        ? await Note.find().sort({_id: -1}).limit(5)
        : await Note.find();

        res.status(200).json(note);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});


module.exports = router