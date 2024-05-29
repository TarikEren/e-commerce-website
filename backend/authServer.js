require("dotenv").config()
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");
const User = require("./models/userModel");
const Token = require("./models/tokenModel");
const { generateAccessToken } = require("./util/auth");


const app = express();
app.use(express.json());

async function getToken(req, res, next) {
    let token;
    try {
        token = await Token.findById(req.params.id);
        if (token === null)
            return res.status(404).send({ message: "Token not found" });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    res.token = token;
    next();
}


app.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
        return res.status(400).send({ message: `Cannot find user with email ${req.body.email}` });
    }
    if (user && bcryptjs.compareSync(req.body.password, user.password)) {
        const accessToken = generateAccessToken(user);
        const refreshToken = new Token({ token: jwt.sign({ userId: user.id, isAdmin: user.isAdmin }, process.env.REFRESH_SECRET) });
        await refreshToken.save();
        res.status(200).send({
            user: user.email,
            accessToken: accessToken,
            refreshToken: refreshToken.token,
            generatedWith: "login"
        });
    } else {
        res.status(400).send({ message: "Wrong password" });
    }
});

//TODO: Redirect to login page after register
app.post("/register", async (req, res) => {
    const { email, password, address } = req.body;
    try {
        const user = await User.signup(email, password, address);
        res.status(200).send({ message: "User has registered successfully" });
    } catch (err) {
        res.status(400).send({ error: err.message });
    }
});


app.delete("/logout", getToken, async (req, res) => {
    try {
        await res.token.deleteOne();
        res.status(200).send({ message: `Deleted token with ID: ${res.product.id}` });
    } catch (error) {
        res.status(500).send({ message: err });
    }
});

app.post("/token", (req, res) => {
    const refreshToken = req.body.token;
    if (!refreshToken) return res.status(401).send({ message: "User unauthorised" });
    if (!Token.findOne({ token: refreshToken })) return res.status(403).send({ message: "User forbidden" });
    jwt.verify(refreshToken, process.env.REFRESH_SECRET, (error, user) => {
        if (error) return res.status(403).send({ message: error.message });
        const accessToken = generateAccessToken({
            email: req.body.email
        })
        return res.status(200).send({
            message: "User logged in successfully",
            token: accessToken,
            generatedWith: "refreshToken"
        });
    });
});

async function startServer() {
    await mongoose.connect(process.env.DB_URL)
        .then(() => {
            console.log("Connected to the database");
            app.listen(process.env.AUTH_PORT, (req, res) => {
                console.log(`Auth Server listening on port ${process.env.AUTH_PORT}`);
            });
        })
        .catch((err) => {
            console.error(err);
        });

}

startServer();