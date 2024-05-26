const mongoose = require("mongoose");
const Product = require("./productModel");

//TODO: Implement custom validators
const paymentSchema = new mongoose.Schema({
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
    time: {
        type: Date,
        default: Date.now()
    },


    //Price of the order
    price: {
        currency: String,
        type: Float32Array,
        default: 0
    },

    //Status of the order
    status: {
        type: String,
        default: "Pending"
    },

    //Items that are in the order
    items: [Product],

    //Destination address
    address: {
        type: String,
        required: true
    },

    //Origin address
    origin: {
        type: String,
        required: true
    },

    //Carrier firm
    carrier: String,

    //Tracking number issued by the carrier
    trackingNumber: Number
}, { collection: "payments" });


module.exports = mongoose.model("Payment", paymentSchema);