const router = require("express").Router();
const getProduct = require("../../middleware/getProduct");
const {
    sendProduct,
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct
} = require("../../controllers/productController");

router.route("/")
    .get(getAllProducts)
    .post(addProduct)
    .put(getProduct, editProduct)
    .delete(getProduct, deleteProduct);

router.route("/:id")
    .get(sendProduct)

module.exports = router;