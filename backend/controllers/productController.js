const router = require("express").Router();
const Product = require("../models/productModel.js");

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

router.get("/:id", getProduct, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.json(product);
    }
    catch (err) {
        res.json(err);
    }
});

router.post("/admin", async (req, res) => {
    const new_product = new Product({
        name: req.body.name,
        desc: req.body.desc,
        price: req.body.price,
        material: req.body.material,
        category: req.body.category
    });
    try {
        await new_product.save();
        res.status(201).json({message: `Created product with ID: ${new_product._id}`})
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.patch("/admin/:id", getProduct, async (req, res) => {
    if (req.body.name != null) res.product.name = req.body.name;
    if (req.body.desc != null) res.product.desc = req.body.desc;
    if (req.body.price != null) res.product.price = req.body.price;
    if (req.body.material != null) res.product.material = req.body.material;
    if (req.body.category != null) res.product.category = req.body.category;
    try {
        const productToSave = await res.product.save();
        res.status(200).send({ message: `Saved product with ID: ${productToSave.id}` });
    } catch (err) {
        res.status(500).send({ message: err });
    }

});

router.delete("/admin/:id", getProduct, async (req, res) => {
    try {
        await res.product.deleteOne();
        res.status(200).send({ message: `Deleted product with ID: ${res.product.id}` });
    } catch (error) {
        res.status(500).send({ message: err });
    }
});

async function getProduct(req, res, next) {
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

module.exports = router;