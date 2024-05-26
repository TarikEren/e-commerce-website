const router = require("express").Router();
const Product = require("../models/productModel.js");
const multer = require("multer");
const Category = require("../models/categoryModel.js");

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

const uploadOptions = multer({ storage: storage })

router.route("/")
    .get(async (req, res) => {
        let filter = {};
        if (req.query.categories) filter = { category: req.query.categories.split(',') };
        try {
            const productList = await Product.find(filter).populate("category");
            if (!productList) res.status(404).send({ message: "No products found" });
            else res.status(200).send(productList);
        }
        catch (err) {
            res.status(500).send({ message: err });
        }

    })
    .post(async (req, res) => {
        const new_product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            material: req.body.material,
            category: req.body.category
        });
        try {
            await new_product.save();
            res.status(201).json({ message: `Created product with ID: ${new_product._id}` })
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    });


router.route("/:id")
    .get(getProduct, async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send({ message: "Invalid ID" });
        try {
            const product = await Product.findById(req.params.id);
            res.status(200).json(product);
        }
        catch (err) {
            res.status(500).json({ message: err.message });
        }
    })
    .put(getProduct, async (req, res) => {
        if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).send({ message: "Invalid ID" });
        try {
            const product = await Product.findByIdAndUpdate(
                req.params.id, {
                name: req.body.name,
                description: req.body.description,
                category: req.body.category,
                price: req.body.price,
                material: req.body.material,
                size: req.body.size,
                color: req.body.color,
                quantity: req.body.quantity,
            },
                { new: true })
            const productToSave = await res.product.save();
            res.status(200).send({ message: `Saved product with ID: ${productToSave.id}` });
        } catch (err) {
            res.status(500).send({ message: err });
        }

    })
    .delete(getProduct, async (req, res) => {
        try {
            await res.product.deleteOne();
            res.status(200).send({ message: `Deleted product with ID: ${res.product.id}` });
        } catch (error) {
            res.status(500).send({ message: err });
        }
    });

router.get("/count", async (req, res) => {
    try {
        const productCount = await Product.countDocuments((count) => count);
        if (!productCount) res.status(204).send({ message: "No products found" });
        else res.status(200).send(productCount);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.get("/featured/count", async (req, res) => {
    try {
        const count = req.params.count ? req.params.count : 0;
        const products = await Product.find({ isFeatured: true }).limit(+count);
        if (!products) res.status(204).send({ message: "No featured products found" });
        else res.status(200).send(products);
    }
    catch (error) {
        res.status(500).send({ message: error.message });
    }
});

router.put(
    '/gallery-images/:id',
    uploadOptions.array('images', 10),
    async (req, res) => {
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
                return res.status(404).send({message: "Product not found"})

            res.send(product);
        }
        catch (error) {
            return res.status(500).send({message: error.message});
        }
    }
)


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