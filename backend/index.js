//Create a .env file at the project root.
//Add DB_URL and PORT variables into the .env file to use.
//Run "npm run dev" for running the server with nodemon
//Run "npm run start" for running the server with node
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

//HIGHLY IMPORTANT
//TODO: Add a firewall to the server after deployment.
//TODO: Research how to implement secure and reliable payments (PCI DSS)
//TODO: Check payment processors. https://www.tcmb.gov.tr/wps/wcm/connect/TR/TCMB+TR/Main+Menu/Temel+Faaliyetler/Odeme+Sistemleri/Turkiyedeki+Odeme+Sistemleri/


//TODO: Restructure the database using the schema in https://fabric.inc/blog/commerce/nosql-ecommerce-data-model
//TODO: Login-Register

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