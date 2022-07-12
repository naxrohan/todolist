const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema(
    {
        tokenValue: {type: String, require: true, unique: true },
        userId: {type: String, require: true, unique: true },
    },
    {timestamps: true}
);

module.exports = mongoose.model("Token", tokenSchema);