const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    //Payment or delivery address of the user
    address: [{
        street1: {
            type: String
        },
        street2: {
            type: String
        },
        city: {
            type: String
        },
        zip: {
            type: Number
        }
    }],
    cart: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        default: []
    },
    likedProducts: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Product",
        default: []
    },

    //Past payments so that the user can review them
    pastPayments: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: "Order",
        default: []
    },
    refreshToken: String
}, { collection: "users" });

module.exports = mongoose.model("User", userSchema);