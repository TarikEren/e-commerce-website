const mongoose = require("mongoose");

const orderItemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
}, {collection: "orderItems"});

module.exports = mongoose.model("OrderItem", orderItemSchema);