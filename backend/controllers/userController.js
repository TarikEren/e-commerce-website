const User = require("../models/userModel");

const getAllUsers = async (req, res) => {
    //Find all users
    const users = await User.find();

    //If couldn't find any users, send 204
    if (!users) return res.status(204).send({ "message": "No users found" });

    //Send users
    res.send(users);
}

const getUser = async (req, res) => {
    if (!req?.params?.id) return res.status(400).send({ "message": "User ID required" });

    //Find user by ID
    const user = await User.findById(req.params.id);

    //If user is not found send 204
    if (!user) return res.status(204).send({ "message": "No user found" });

    //Send user
    res.send(user);
}

const updateUser = async (req, res) => {
    //If request body or ID section doesn't exist send 400
    if (!req?.body?.id) return res.status(400).send({ "message": "User ID required" });

    //Find user by ID
    const user = await User.findById(req.body.id);

    //If user is not found send 204
    if (!user) return res.status(204).send({ "message": "No user found" });

    //Check the body and if certain fields exist, edit them
    //This part may cause problems if it causes a double sendStatus issue
    if (!req?.body?.email) {
        //Check if another user already has the new email.
        const emailExists = User.findOne({ email: req.body.email });

        //If the new email exists send 409 (Conflict)
        if (userExists) return res.sendStatus(409);

        //Change the current user's email
        user.email = req.body.email;
    }
    //If password is provided change the user's password
    if (!req?.body?.password) user.password = req.body.password;

    //If address is provided change the user's address
    if (!req?.body?.address) user.address = req.body.address;

    //Save the user and send the result
    const result = await user.save();
    res.send(result);
}

const deleteUser = async (req, res) => {
    //If request body or ID section doesn't exist send 400
    if (!req?.body?.id) return res.status(400).send({ "message": "User ID required" });

    //Find user by ID
    const user = await User.findById(req.body.id);

    //If user is not found send 204
    if (!user) return res.status(204).send({ "message": "No user found" });

    //Delete the user and send the result
    const result = await User.findByIdAndDelete(req.body.id);
    res.send(result);
}

const getCart = async (req, res) => {

}

const addToCart = async (req, res) => {

}

const removeFromCart = async (req, res) => {

}

const clearCart = async (req, res) => {

}

const getOldPayments = async (req, res) => {

}

const addOldPayment = async (req, res) => {

}

const removeOldPayment = async (req, res) => {

}


module.exports = {
    getAllUsers,
    getUser,
    updateUser,
    deleteUser,
    getCart,
    addToCart,
    removeFromCart,
    clearCart,
    getOldPayments,
    addOldPayment,
    removeOldPayment
};