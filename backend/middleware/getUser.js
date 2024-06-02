const User = require("../models/userModel");

const getOneUser = async (req, res, next) => {
    if (!req?.body?.id) return res.status(400).send({"message": "ID required"})
    //Find user by ID
    const user = await User.findById(req.body.id);

    //If user is not found send 204
    if (!user) return res.sendStatus(404);

    req.user = user;
    next();
}

module.exports = getOneUser;

