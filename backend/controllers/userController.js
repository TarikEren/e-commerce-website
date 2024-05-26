const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2h" });
}

router.route("/login")
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.login(email, password);
            const token = createToken(user._id);
            res.status(200).json({ email, token });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

router.post("/register")
    .post(async (req, res) => {
        const { email, password } = req.body;
        try {
            const user = await User.signup(email, password);
            const token = createToken(user._id);
            res.status(200).json({ email, token });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

router.route("/:id/cart")
    .get(async (req, res) => {
        //Show all products
        try {

        }
        catch (err) {

        }
    })
    .post(async (req, res) => {
        //Add new products
        let product;
        try {

        }
        catch (err) {

        }
    })
    .delete(async (req, res) => {
        //Remove products
        try {
    
        }
        catch (err) {
    
        }
    })


router.get("/:id/logout", () => {

});

module.exports = router;