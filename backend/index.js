//TODOS
//TODO: Change the orderModel so that it supports other payment methods
//TODO: Check userController.js
//TODO: Check productController.js
//TODO: Fix auth
//TODO: Figure out logging users out
//TODO: Implement password security check on the frontend
//TODO: Check if the user is admin for a bunch of controller operations
//TODO: Try storing the token in the localStorage

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


require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const errorHandler = require('./middleware/errorHandler');
const verifyJWT = require('./middleware/verifyJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
const mongoose = require('mongoose');
const bodyParser = require("body-parser");

const DB_URL = process.env.DB_URL;
const PORT = process.env.PORT;

const app = express();

app.use(credentials);

app.use(bodyParser.json());
app.use(cors(corsOptions));

app.use(cookieParser());
app.use("/", express.static(path.join(__dirname, "/public")));

app.use('/register', require('./routes/register'));
app.use('/auth', require('./routes/auth'));
app.use('/refresh', require('./routes/refresh'));
app.use('/logout', require('./routes/logout'));
app.use("/api/category", require("./routes/api/category"));

app.use(verifyJWT);
app.use("/api/order", require("./routes/api/order"));
app.use("/api/product", require("./routes/api/product"));
app.use("/api/user", require("./routes/api/user"));

app.use(errorHandler);

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