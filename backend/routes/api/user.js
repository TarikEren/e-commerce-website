const router = require("express").Router();
const {
    getAllUsers,
    getUser,
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
    .put(updateUser)
    .delete(deleteUser);

router.route("/:id")
    .get(getUser);

router.route("/:id/cart")
    .get(getCart)
    .post(addToCart)
    .delete(removeFromCart);

router.route("/:id/checkout")
    .get(payment);

router.route("/:id/payment-history")
    .get(getOldPayments)
    .post(addOldPayment)
    .delete(removeOldPayment)

module.exports = router;