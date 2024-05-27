const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const validator = require("validator");

const Order = require("./orderModel");
const Product = require("./productModel");

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
    }
}, { collection: "users" });

userSchema.statics.signup = async function (email, password, address) {
    //Validate email and password.
    if (!email || !password) {
        throw Error("All fields must be filled");
    }
    if (!validator.isEmail(email)) {
        throw Error("Please provide a valid email");
    }

    //Check if email is already in use.
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use");
    }

    //Salt and hash the password.
    const salt = await bcryptjs.genSalt(10);
    const hash = await bcryptjs.hash(password, salt);

    //Create a user and return it.
    const user = await this.create(
        {
            email,
            password: hash,
            address,    
        });
    return user;
}

userSchema.statics.login = async function (email, password) {
    if (!email || !password) {
        throw Error("All fields must be filled");
    }

    const user = await this.findOne({ email });
    if (!user) {
        throw Error("Incorrect email");
    }

    const match = await bcryptjs.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }
    return user;
}

module.exports = mongoose.model("User", userSchema);