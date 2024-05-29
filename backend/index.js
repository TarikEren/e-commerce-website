//TODOS
//TODO: Change the orderModel so that it supports other payment methods
//TODO: Check userController.js
//TODO: Check productController.js
//TODO: Fix auth
//TODO: Figure out logging users out
//TODO: Implement password security check on the frontend
//TODO: Check if the user is admin for a bunch of controller operations

//HIGHLY IMPORTANT
//TODO: Add a firewall to the server after deployment. (General security)
//TODO: Research how to implement secure and reliable payments (PCI DSS)
//TODO: Check payment processors. https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Temel+Faaliyetler/Odeme+Sistemleri/Turkiyedeki+Odeme+Sistemleri/
//TODO: Check the "OPTIONS" method in jwt.js as it may cause security problems
//TODO: Follow these
// https://fabric.inc/blog/product/build-vs-buy-pim-product-variation
// https://fabric.inc/blog/product/build-vs-buy-pim-product-management
// https://fabric.inc/blog/product/build-vs-buy-pim-data-distribution

//Backend Related
//TODO: Restructure the database using the schema in https://fabric.inc/blog/commerce/nosql-ecommerce-data-model
//TODO: Login-Register

//Frontend Related
//TODO: Implement the entire frontend as it's currently non-existent


require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

const app = express();
app.use(bodyParser.json());
app.use(cors());

const categoryController = require("./controllers/categoryController");
const orderController = require("./controllers/orderController");
const productController = require("./controllers/productController");
const userController = require("./controllers/userController");

app.use("/api/category", categoryController);
app.use("/api/order", orderController);
app.use("/api/product", productController);
app.use("/api/user", userController);

async function startServer() {
    await mongoose.connect(DB_URL)
        .then(() => {
            console.log("Connected to the database");
            app.listen(PORT, (req, res) => {
                console.log(`Server listening on port ${PORT}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });

}

startServer();