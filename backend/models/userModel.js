const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Order = require("./orderModel");

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
    address: {
        street1: {
            type: String,
            default: ""
        },
        street2: {
            type: String,
            default: ""
        },
        city: {
            type: String,
            default: ""
        },
        zip: {
            type: Number,
            default: 0
        }
    },
    likedProducts: {
        type: [Order],
        default: []
    },

    //Past payments so that the user can review them
    pastPayments: {
        type: [Payment],
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

    //TODO: Remove and perform the check on the frontend
    if (!validator.isStrongPassword(password)) {
        throw Error("Password must include at least an uppercase character, a digit and a non-alphanumerical Character");
    }

    //Check if email is already in use.
    const exists = await this.findOne({ email });
    if (exists) {
        throw Error("Email already in use");
    }

    //Salt and hash the password.
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

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

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
        throw Error("Incorrect password");
    }
    return user;
}

module.exports = mongoose.model("User", userSchema);