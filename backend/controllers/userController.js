const User = require("../models/userModel");
const Product = require("../models/productModel");

const getAllUsers = async (req, res) => {
    //Find all users
    const users = await User.find();

    //If couldn't find any users, send 204
    if (!users) return res.status(204).send({ "message": "No users found" });

    //Send users
    res.send(users);
}

const sendUser = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;
    //Send user
    res.send(user);
}

const updateUser = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user
    //Check the body and if certain fields exist, edit them
    //This part may cause problems if it causes a double sendStatus issue
    if (req?.body?.email) {
        //Check if another user already has the new email.
        const emailExists = User.findOne({ email: req.body.email });

        //If the new email exists send 409 (Conflict)
        if (emailExists) return res.sendStatus(409);

        //Change the current user's email
        user.email = req.body.email;
    }
    //If password is provided change the user's password
    if (req?.body?.password) user.password = req.body.password;

    //If address is provided change the user's address
    if (req?.body?.address) user.address = req.body.address;

    //Save the user and send the result
    const result = await user.save();
    res.send(result);
}

const deleteUser = async (req, res) => {
    //User retrieval is performed by the helper getUser function   
    //Delete the user and send the result
    const result = await User.findByIdAndDelete(req.params.id);
    res.send(result);
}

const getCart = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;

    //Get the cart of the user and send it
    const cart = user.cart;
    if (cart === null) return res.status(500).send({ "message": "User doesn't have the property 'Cart'" });
    res.send(cart);
}

const addToCart = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;

    //If product ID doesn't exist send 400
    if (!req?.body?.product) return res.status(400).send({ "message": "Product ID required" });

    //Find product by ID
    const product = await Product.findById(req.body.product);

    //If product is not found send 204
    if (!product) return res.status(204).send({ "Message": "Product not found" });

    //If product is found, push the product ID to the user cart
    user.cart.push(product._id);

    //Save the user and send the result
    const result = await user.save();
    res.send(result);

}

const removeFromCart = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;

    //If product ID doesn't exist send 400
    if (!req?.body?.product) return res.status(400).send({ "message": "Product ID required" });

    //Check if the product is in the cart
    const product = user.cart.findIndex((pID) => pID === req.body.product);

    //If the product isn't in the cart send 204
    if (!product) return res.status(204).send({ "message": "Product is not in the cart" });

    //Filter the cart so that the array does not contain the to be deleted product
    const otherProducts = user.cart.filter((ID) => product !== ID);
    user.cart = otherProducts;

    //Save the user and send the result
    const result = await user.save();
    res.send(result);
}

//IMPLEMENT
const payment = async (req, res) => {

}

const getOldPayments = async (req, res) => {

}

const addOldPayment = async (req, res) => {

}

const removeOldPayment = async (req, res) => {

}


module.exports = {
    getAllUsers,
    sendUser,
    updateUser,
    deleteUser,
    getCart,
    addToCart,
    removeFromCart,
    payment,
    getOldPayments,
    addOldPayment,
    removeOldPayment
};