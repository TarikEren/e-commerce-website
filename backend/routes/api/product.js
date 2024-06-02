const router = require("express").Router();
const getProduct = require("../../middleware/getProduct");
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
    .post(addProduct)
    .put(getProduct, editProduct)
    .delete(deleteProduct);

router.route("/:id")
    .get(sendProduct)

router.route("/count")
    .get(getProductCount)

router.route("/featured")
    //TODO: Add get featured
    .get()

router.route("/count/featured")
    .get(getFeaturedCount)


module.exports = router;