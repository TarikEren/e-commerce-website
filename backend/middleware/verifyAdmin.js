const verifyAdmin = (req, res, next) => {
    if (req.isAdmin === false) return res.sendStatus(401); //Non-admin user
    next();
}

module.exports = verifyAdmin;