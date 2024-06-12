const router = require("express").Router();
const getProduct = require("../../middleware/getProduct");
const verifyAdmin = require("../../middleware/verifyAdmin");
const {
    sendProduct,
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getProductCount,
    getFeaturedCount
} = require("../../controllers/productController");

router.route("/")
    .get(getAllProducts)
    .post(verifyAdmin, addProduct)
    .put(verifyAdmin, getProduct, editProduct)
    .delete(verifyAdmin, deleteProduct);

router.route("/:id")
    .get(sendProduct)

router.route("/count")
    .get(getProductCount)

router.route("/featured")
    //TODO: Add featured functions
    .get()
    .post(verifyAdmin)
    .delete(verifyAdmin)

router.route("/count/featured")
    .get(getFeaturedCount)


module.exports = router;