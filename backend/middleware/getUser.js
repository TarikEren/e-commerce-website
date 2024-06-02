const User = require("../models/userModel");

const getOneUser = async (req, res, next) => {
    //If request body or ID section doesn't exist send 400
    if (!req?.params?.id) return res.status(400).send({ "message": "User ID required" });

    //Find user by ID
    const user = await User.findById(req.params.id);

    //If user is not found send 204
    if (!user) return res.status(204).send({ "message": "No user found" });

    req.user = user;
    next();
}

module.exports = getOneUser;

