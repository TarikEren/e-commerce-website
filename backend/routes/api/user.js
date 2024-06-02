const router = require("express").Router();
const getUser = require("../../middleware/getUser");
const {
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
} = require("../../controllers/userController");

router.route("/")
    .get(getAllUsers)

router.route("/:id")
    .get(getUser, sendUser)
    .put(getUser, updateUser)
    .delete(getUser, deleteUser);

router.route("/:id/cart")
    .get(getUser, getCart)
    .post(getUser, addToCart)
    .delete(getUser, removeFromCart);

router.route("/:id/checkout")
    .get(getUser, payment);

router.route("/:id/payment-history")
    .get(getUser, getOldPayments)
    .post(getUser, addOldPayment)
    .delete(getUser, removeOldPayment)

module.exports = router;