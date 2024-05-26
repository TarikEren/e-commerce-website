const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2h" });
}

//Login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.login(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

//Register
router.post("/register", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.signup(email, password);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})

//Logout
router.get("/:id/logout", () => {
});

router.route("/:id/cart")
    //For viewing the cart of a user
    .get(async (req, res) => {
        //Show all products
        try {

        }
        catch (err) {

        }
    })
    //For adding a product to the cart of a user
    .post(async (req, res) => {
        //Add new products
        let product;
        try {

        }
        catch (err) {

        }
    })
    //For deleting the entire cart's contents (May be removed later on)
    .delete(async (req, res) => {
        //Remove products (Can be used for ending a payment)
        try {

        }
        catch (err) {

        }
    });

router.route("/:id/cart/:productID")
    //For getting a certain product from the cart
    .get(() => {
        //Get one product from cart
    })
    //For deleting a certain product from the cart
    .delete(() => {
        //Remove a product from the cart
    })

router.route("/:id/order")
    //For viewing every order of a user
    .get(() => {

    })
    //For creating an order for a user
    .post(() => {

    })

//For removing all orders of a user (May be removed later on)
router.delete("/:id/order", () => {
    //Delete all orders of the user
});

router.route("/:id/order/:orderID")
    //For viewing a certain order
    .get(() => {

    })
    //For editing an order
    .put(() => {

    })
    //For deleting an order
    .delete(() => {

    })



module.exports = router;