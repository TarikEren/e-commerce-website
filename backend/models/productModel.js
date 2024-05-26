const mongoose = require("mongoose");
const Category = require("./categoryModel");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    categories: {
        type: [Category],
        default: []
    },
    description: {
        type: String,
        default: ""
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
    },
    Image: {
        type: String,
        default: ""
    },
    Images: {
        type: [Image],
        default: []
    }
}, { collection: "products" });

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;