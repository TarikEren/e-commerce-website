const mongoose = require("mongoose");

//TODO: Add required
const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    desc: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    depth: {
        type: Number,
        required: true
    },
    color: {
        type: String,
    }
}, { collection: "products" });

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;