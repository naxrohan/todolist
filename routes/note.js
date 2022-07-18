const Note = require("../models/Note");
const { VerifyyTokenAndAuth, VerifyyTokenAndAdmin, VerifyyTokenOnly } = require("./verify");

const router = require("express").Router();

// Create
router.post("/:id", VerifyyTokenOnly, async (req, res) => {
    try {
        const newNote = new Note(req.body);
        const createdNote = await newNote.save();
        res.status(200).json(createdNote);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Update.
router.post("/update/:id",VerifyyTokenOnly, async (req, res) => {
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
router.delete("/:id", VerifyyTokenOnly, async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);

        res.status(200).json("Note was deleted...");
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get note.
router.get("/find/:id", VerifyyTokenOnly, async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        res.status(200).json(note);
    } catch (error) {
        if(error) res.status(500).json(error);
    }
});

// Get All notes.
router.get("/",VerifyyTokenOnly, async (req, res) => {
    const query = req.query.new;
    try {
        const note = query 
        ? await Note.find({userId: req.user.id}).sort({_id: -1}).limit(5)
        : await Note.find({userId: req.user.id})

        res.status(200).json(note);

    } catch (error) {
        if(error) res.status(500).json(error);
    }
});


module.exports = router