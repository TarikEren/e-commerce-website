const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
    authToken: function (req, res, next) {
        const authHeader = req.headers["authorization"];
        const token = authHeader && authHeader.split(" ")[1];

        if (token === null) return res.status(401).send({ message: "User not authenticated" });

        jwt.verify(token, process.env.SECRET, (error, user) => {
            if (error) return res.status(403).send({ message: "Token is not valid" });
            req.user = user;
            next();
        });

    },
    generateAccessToken: function (user) {
        return jwt.sign({user}, process.env.SECRET, {expiresIn: "1h"});
    },
    generateRefreshToken: function (user) {
        return jwt.sign({user}, process.env.REFRESH_SECRET);
    }
}