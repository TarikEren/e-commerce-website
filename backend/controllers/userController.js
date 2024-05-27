const router = require("express").Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2h" });
}


//USER SECTION
router.route("/:id")
    .get(() => {
        //Get all user info
    })
    .put(() => {
        //Edit user info 
    })

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

router.post("/register", async (req, res) => {
    const { email, password, address } = req.body;
    try {
        const user = await User.signup(email, password, address);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
})


//CART SECTION
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
        try {
            const product = Product.findById()
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
    });


//HISTORY SECTION (For past payments)
router.route("/:id/history")
    //For viewing every order of a user
    .get(() => {

    })
    //For pushing a successful payment to the past payments
    .post(() => {

    })

//For removing all orders of a user (May be removed later on)
router.delete("/:id/order", () => {
    //Delete all past orders of the user
});

router.route("/:id/order/:orderID")
    //For viewing a certain past payment
    .get(() => {

    })
    //For deleting a past payment
    .delete(() => {

    })



module.exports = router;