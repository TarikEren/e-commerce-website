const mongoose = require("mongoose");

const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: true
    }
}, { collection: "refreshTokens" });

module.exports =  mongoose.model("Token", tokenSchema);
