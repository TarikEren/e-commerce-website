const Product = require("../models/productModel");

const getProduct = async (req, res, next) => {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product === null)
            return res.status(404).send({ message: "Product Not Found" });
    } catch (err) {
        return res.status(500).send({ message: err });
    }
    res.product = product;
    next();
}

module.exports = getProduct;