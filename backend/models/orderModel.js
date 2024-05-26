const mongoose = require("mongoose");
const Product = require("./productModel");

const orderSchema = new mongoose.Schema({
    time: {
        type: Date,
        default: Date.now()
    },
    price: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        default: "Pending"
    }
}, { collection: "orders" });

module.exports = mongoose.model("Payment", orderSchema);