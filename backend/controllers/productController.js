const router = require("express").Router();
const mongoose = require("mongoose");
const multer = require("multer");
const Category = require("../models/categoryModel.js");
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

    //If not found send 400
    if (!product) return res.status(400).send({ "message": "No such user exists" });

    //If found send product
    return res.status(200).send(product);
}

const addProduct = async (req, res) => {

}

const getAllProducts = async (req, res) => {
    //Find all products
    const products = await Product.find();

    //If couldn't find any products, send 204
    if (!products) return res.status(204).send({"message": "No products found"});

    //If products found, send them
    res.send(products);
}

const editProduct = async (req, res) => {
    //Product retrieval is performed by the helper getProduct function
    const product = req.product
    //Check if the body and certain fields exist, edit them
}

const deleteProduct = async (req, res) => {

}

// router.route("/")
//     .get(async (req, res) => {
//         let filter = {};
//         if (req.query.categories) filter = { category: req.query.categories.split(',') };
//         try {
//             const productList = await Product.find(filter).populate("category");
//             if (!productList) res.status(404).send({ message: "No products found" });
//             else res.status(200).send(productList);
//         }
//         catch (err) {
//             res.status(500).send({ message: err });
//         }
//     })
//     .post(async (req, res) => {
//         try {
//             const category = await Category.findById(req.body.category);

//             const fileName = req.fileName; //TODO: Prompt the user to provide a file
//             if (!category) return res.status(404).send({ message: "No such category found" });

//             const new_product = new Product({
//                 name: req.body.name,
//                 description: req.body.description,
//                 price: req.body.price,
//                 color: req.body.color,
//                 material: req.body.material,
//                 category: req.body.category,
//                 size: req.body.size,
//                 image: fileName ? `../public/${fileName}` : ""
//             });
//             await new_product.save();
//             return res.status(201).json({ message: `Created product with ID: ${new_product._id}` })
//         } catch (error) {
//             return res.status(500).send({ message: error.message });
//         }
//     });


// router.route("/:id")
//     .get(getProduct, async (req, res) => {
//         if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send({ message: "Invalid ID" });
//         try {
//             const product = await Product.findById(req.params.id);
//             res.status(200).json(product);
//         }
//         catch (err) {
//             res.status(500).json({ message: err.message });
//         }
//     })
//     .put(getProduct, async (req, res) => {
//         const productToSave = {

//         }
//         try {
//             if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send({ message: "Invalid ID" });
//             const product = await Product.findByIdAndUpdate(
//                 req.params.id, {
//                 name: req.body.name ? req.body.name : product.name,
//                 description: req.body.description ? req.body.description : product.category,
//                 category: req.body.category ? req.body.category : product.category,
//                 price: req.body.price ? req.body.price : product.price,
//                 material: req.body.material ? req.body.material : product.material,
//                 size: req.body.size ? req.body.size : product.size,
//                 color: req.body.color ? req.body.color : product.color,
//                 quantity: req.body.quantity ? req.body.quantity : product.quantity,
//                 image: req.body.image ? req.body.image : product.image,
//                 countInStock: req.body.countInStock ? req.body.countInStock : product.countInStock,
//                 rating: req.body.rating ? req.body.rating : product.rating,
//                 numReviews: req.body.numReviews ? req.body.numReviews : product.numReviews,
//                 isFeatured: req.body.isFeatured ? req.body.isFeatured : product.isFeatured,
//             },
//                 { new: true })
//             const productToSave = await res.product.save();
//             res.status(200).send({ message: `Saved product with ID: ${productToSave.id}` });
//         } catch (err) {
//             res.status(500).send({ message: err });
//         }

//     })
//     .delete(getProduct, async (req, res) => {
//         try {
//             await res.product.deleteOne();
//             res.status(200).send({ message: `Deleted product with ID: ${res.product.id}` });
//         } catch (error) {
//             res.status(500).send({ message: err });
//         }
//     });

// router.get("/count", async (req, res) => {
//     try {
//         const productCount = await Product.countDocuments((count) => count);
//         if (!productCount) res.status(204).send({ message: "No products found" });
//         else res.status(200).send(productCount);
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.get("/featured/count", async (req, res) => {
//     try {
//         const count = req.params.count ? req.params.count : 0;
//         const products = await Product.find({ isFeatured: true }).limit(+count);
//         if (!products) res.status(204).send({ message: "No featured products found" });
//         else res.status(200).send(products);
//     }
//     catch (error) {
//         res.status(500).send({ message: error.message });
//     }
// });

// router.put('/gallery-images/:id', uploadOptions.array('images', 10), async (req, res) => {
//     if (!mongoose.isValidObjectId(req.params.id)) {
//         return res.status(400).send('Invalid Product Id')
//     }
//     try {
//         const files = req.files
//         let imagesPaths = [];
//         const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

//         if (files) {
//             files.map(file => {
//                 imagesPaths.push(`${basePath}${file.filename}`);
//             })
//         }

//         const product = await Product.findByIdAndUpdate(
//             req.params.id,
//             {
//                 images: imagesPaths
//             },
//             { new: true }
//         )

//         if (!product)
//             return res.status(404).send({ message: "Product not found" })

//         res.send(product);
//     }
//     catch (error) {
//         return res.status(500).send({ message: error.message });
//     }
// }
// )

module.exports = {
    sendProduct,
    getAllProducts,
    addProduct,
    editProduct,
    deleteProduct
};