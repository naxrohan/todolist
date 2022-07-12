const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema(
    {
        title: {type: String, require: true, unique: true },
        color: {type: String },
        userId: {type: String, require: true },
        list: {type: Array}
    },
    {timestamps: true}
);

module.exports = mongoose.model("Note", noteSchema);