const router = require("express").Router();
const User = require("../models/userModel");
const Product = require("../models/productModel");
const jwt = require("jsonwebtoken");

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2h" });
}

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
    .get(async (req, res) => {
        //Get all user info
        try {
            const user = await User.findById(req.params.id);
            if (!user) return res.status(404).send({ message: "User not found" });
            else return res.status(200).send(user);
        } catch (error) {
            return res.status(500).send({ message: error.message });
        }
    })
    .put(() => {
        //Edit user info 
    })
    .delete(async (req, res) => {
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

router.post("/login", async (req, res) => {
    const user = await User.findOne({ email: req.body.email })
    const secret = process.env.secret;
    if (!user) {
        return res.status(400).send({message: `Cannot find user with email ${req.body.email}`});
    }

    if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
                isAdmin: user.isAdmin
            },
            secret,
            { expiresIn: '1d' }
        )

        res.status(200).send({ user: user.email, token: token })
    } else {
        res.status(400).send({message: "Wrong password"});
    }

});

//Redirect after register
router.post("/register", async (req, res) => {
    const { email, password, address } = req.body;
    try {
        const user = await User.signup(email, password, address);
        const token = createToken(user._id);
        res.status(200).json({ email, token });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});



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