const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        default: 0
    },
    material: {
        type: String,
        required: true
    },
    size: {
        height: {
            type: Number,
            default: 0
        },
        width: {
            type: Number,
            default: 0
        },
        depth: {
            type: Number,
            default: 0
        },
    },
    color: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        default: 0
    },
    image: {
        type: String,
        default: ""
    },
    images: [{
        type: String
    }],
    rating: {
        type: Number,
        default: 0
    },
    numReviews: {
        type: Number,
        default: 0
    },
    isFeatured: {
        type: Boolean,
        default: false,
    },
    dateCreated: {
        type: Date,
        default: Date.now(),
    }
}, { collection: "products" });

const productModel = mongoose.model("Product", productSchema);
module.exports = productModel;