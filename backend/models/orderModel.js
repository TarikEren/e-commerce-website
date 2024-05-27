const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    //ID of customer who ordered
    customerId: {
        type: String,
        required: true
    },

    //Payment gateway (i.e. Stripe)
    gateway: String,

    //Type of payment (Credit, EFT etc.)
    type: String,

    //Credit card info if the user opts to pay using a credit card
    card: {
        brand: String,
        lastFour: Number,
        exprMonth: Number,
        exprYear: Number,
        cvvVerified: Boolean
    },

    //When the order was issued.
    dateOrdered: {
        type: Date,
        default: Date.now()
    },

    //Price of the order
    totalPrice: {
        currency: String,
        type: mongoose.Schema.Types.Decimal128,
        default: 0
    },

    //Status of the order
    status: {
        type: String,
        default: "Pending"
    },

    //Items that are in the order
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "OrderItem",
        required: true
    }],

    //Destination address
    shippingAddress1: {
        type: String,
        required: true
    },
    shippingAddress2: {
        type: String,
        default: ""
    },

    city: {
        type: String,
        required: true
    },

    zip: {
        type: Number,
        required: true
    },

    phone: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "Pending"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    //Origin address
    origin: {
        type: String,
        default: "Add origin address to the orderModel.js",
    },

    //Carrier firm
    carrier: {
        type: String,
        default: ""
    },

    //Tracking number issued by the carrier
    trackingNumber: Number
}, { collection: "orders" });

module.exports = mongoose.model("Order", orderSchema);