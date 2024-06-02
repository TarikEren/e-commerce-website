const User = require("../models/userModel");
const Product = require("../models/productModel");

const getAllUsers = async (req, res) => {
    //Find all users
    try {
        const users = await User.find();
        //If couldn't find any users, send 204
        if (!users) return res.status(204).send({ "message": "No users found" });
        //Send users
        res.send(users);
    }
    catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const sendUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        if (!user) return res.status(400).send({ "message": "No such user exists" });
        //Send user
        return res.status(200).send(user);
    }
    catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const updateUser = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user
    //Check if email exists in case the user tries to change their email to another user's email
    try {
        let userExists = await User.exists({ email: req.body.email });
        if (userExists === null) {
            //Check the body and certain fields exist, edit them
            if (req?.body?.email) {
                // if (emailExists) return res.status(409).send({"message": "Email already exists"});
                user.email = req.body.email;
            }
            //If password is provided change the user's password
            if (req?.body?.password) user.password = req.body.password;

            //If address is provided change the user's address
            if (req?.body?.address) user.address = req.body.address;
            if (req?.body?.phoneNumber) user.phoneNumber = req.body.phoneNumber;
            //Save the user and send the result
            const result = await user.save();
            res.send(result);
        }
        else {
            return res.sendStatus(409);
        }
    }
    catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const deleteUser = async (req, res) => {
    //User retrieval is performed by the helper getUser function   
    //Delete the user and send the result
    try {
        const result = await User.findByIdAndDelete(req.body.id);
        if (result) res.status(200).send({ "message": `Deleted user with ID ${req.user.id}` });
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const getCart = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;
    try {
        const cart = user.cart;
        //Get the cart of the user and send it
        if (cart === null) return res.status(500).send({ "message": "User doesn't have the property 'Cart'" });
        res.send(cart);
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const addToCart = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;
    try {
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
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }

}

const removeFromCart = async (req, res) => {
    //User retrieval is performed by the helper getUser function
    const user = req.user;
    try {
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
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }
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