const router = require("express").Router();
const multer = require("multer");
const Category = require("../models/categoryModel.js");
const mongoose = require("mongoose");
const Product = require("../models/productModel.js");

const FILE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg"
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const isValid = FILE_TYPE_MAP[file.mimetype];
        let uploadError = new Error('invalid image type');

        if (isValid) {
            uploadError = null
        }
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
});

const uploadOptions = multer({ storage: storage });

const sendProduct = async (req, res) => {
    //Find product
    const product = await Product.findById(req.params.id);
    try {
        //If not found send 400
        if (!product) return res.status(400).send({ "message": "No such user exists" });

        //If found send product
        return res.status(200).send(product);
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const addProduct = async (req, res) => {
    if (
        !req?.body?.name ||
        !req?.body?.category ||
        !req?.body?.price ||
        !req?.body?.size ||
        !req?.body?.color) {
        return res.status(400).send({ "message": "Missing fields" });
    }
    try {
        const newProduct = await Product.create({
            name: req.body.name,
            category: req.body.category, //Add category checking
            description: req.body.description,
            price: req.body.price,
            material: req.body.material,
            size: req.body.size,
            color: req.body.color,
            quantity: req.body.quantity || 0,
            rating: req.body.rating || 0,
            isFeatured: req.body.isFeatured || false
        });
        await newProduct.save();
        return res.status(201).send({ "message": `Product with ID ${newProduct._id} has been created` });
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const getAllProducts = async (req, res) => {
    try {
        //Find all products
        const products = await Product.find();

        //If couldn't find any products, send 204
        if (!products) return res.status(204).send({ "message": "No products found" });

        //If products found, send them
        res.send(products);
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
}

const editProduct = async (req, res) => {
    //Product retrieval is performed by the helper getProduct function
    try {
        if (!req?.body?.id) return res.status(400).send({ "message": "Missing ID" });
        const editedProduct = await Product.findById(req.body.id);
        //Check if the body and certain fields exist, edit them
        editedProduct.name = req.body.name || editedProduct.name;
        editedProduct.description = req.body.description || editedProduct.description;
        editedProduct.category = req.body.category || editedProduct.category;
        editedProduct.price = req.body.price || editedProduct.price;
        editedProduct.material = req.body.material || editedProduct.material;
        editedProduct.size = req.body.size || editedProduct.size;
        editedProduct.color = req.body.color || editedProduct.color;
        editedProduct.quantity = req.body.quantity || editedProduct.quantity;
        const result = await editedProduct.save();
        res.send(result);
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
}

const deleteProduct = async (req, res) => {
    const product = await Product.findById(req.body.id);
    if (!product) return res.status(404).send({ "message": "Cannot find product" });
    try {
        const result = await Product.findByIdAndDelete(req.body.id);
        if (result) res.status(200).send({ "message": `Deleted product with ID ${req.body.id}` });
    } catch (error) {
        return res.status(500).send({ "message": error.message });
    }
}

const getProductCount = async (req, res) => {
    try {
        const productCount = await Product.countDocuments((count) => count);
        if (!productCount) res.status(204).send({ message: "No products found" });
        else res.status(200).send(productCount);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

//TODO: Test these
const getFeaturedCount = async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0;
        const products = await Product.find({ isFeatured: true }).limit(+count);
        if (!products) res.status(204).send({ message: "No featured products found" });
        else res.status(200).send(products);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
}

const editProductImage = async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
        return res.status(400).send('Invalid Product Id')
    }
    try {
        const files = req.files
        let imagesPaths = [];
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

        if (files) {
            files.map(file => {
                imagesPaths.push(`${basePath}${file.filename}`);
            })
        }

        const product = await Product.findByIdAndUpdate(
            req.params.id,
            {
                images: imagesPaths
            },
            { new: true }
        )

        if (!product)
            return res.status(404).send({ message: "Product not found" })

        res.send(product);
    }
    catch (error) {
        return res.status(500).send({ message: error.message });
    }
}

module.exports = {
    sendProduct,
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct,
    getProductCount,
    getFeaturedCount
};