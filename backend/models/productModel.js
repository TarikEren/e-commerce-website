const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: [Category],
    description: {
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
    size: {
        height: Number,
        weight: Number,
        depth: Number,
        required: true
    },
    color: {
        type: String,
    },
    quantity: {
        type: Number,
        default: 1
    }
}, { collection: "products" });

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;