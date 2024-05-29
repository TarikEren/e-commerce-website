const router = require("express").Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");
const { authToken } = require("../util/auth");

router.get("/", async (req, res) => {
    try {
        const users = await User.find();
        if (!users) return res.status(404).send({ message: "No users found" });
        else return res.status(200).send(users);
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
});

//USER SECTION
router.route("/:id")
    .get(authToken, async (req, res) => {
        //Get all user info
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send({ message: "User not found" });
            else return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    })
    //TODO: Implement
    .put(authToken, async (req, res) => {
        //Edit user info 
    })

    //TODO: Add admin auth
    .delete(authToken, async (req, res) => {
        //Delete user
        try {
            await User.findByIdAndDelete(req.params.id).then((user) => {
                if (user) {
                    return res.status(200).send({ message: `Deleted user with ID ${user._id}` });
                }
                else return res.status(404).send({ message: "User not found" });
            });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })


//CART SECTION
router.route("/:id/cart")
    //For viewing the cart of a user
    .get(authToken, async (req, res) => {
        //Show all products
        try {

        }
        catch (err) {

        }
    })
    //For adding a product to the cart of a user
    .post(authToken, async (req, res) => {
        //Add new products
        try {
            const product = Product.findById()
        }
        catch (err) {

        }
    })
    //For deleting the entire cart's contents (May be removed later on)
    .delete(authToken, async (req, res) => {
        //Remove products (Can be used for ending a payment)
        try {

        }
        catch (err) {

        }
    });

router.route("/:id/cart/:productID")
    //For getting a certain product from the cart
    .get(authToken, async () => {
        //Get one product from cart
    })
    //For deleting a certain product from the cart
    .delete(authToken, async () => {
        //Remove a product from the cart
    });


//HISTORY SECTION (For past payments)
router.route("/:id/history")
    //For viewing every order of a user
    .get(authToken, async () => {

    })
    //For pushing a successful payment to the past payments
    .post(authToken, async () => {

    })

//For removing all orders of a user (May be removed later on)
router.delete("/:id/order", authToken, async () => {
    //Delete all past orders of the user
});

router.route("/:id/order/:orderID")
    //For viewing a certain past payment
    .get(authToken, async () => {

    })
    //For deleting a past payment
    .delete(authToken, async () => {

    })



module.exports = router;