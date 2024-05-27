const router = require("express").Router();
const Category = require("../models/categoryModel");

router.route("/")
    //Get all categories
    .get(async (req, res) => {
        try {
            const categories = await Category.find();
            if (!categories) res.status(204).send({ message: "No categories found" });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    //Create a category
    .post(async (req, res) => {
        var category = new Category({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        })
        try {
            category = await Category.save();
            res.status(201).send({ message: `Category with ID ${category._id} created successfully` });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    });

router.route("/:id")
    //Get one category
    .get(async (req, res) => {
        try {
            const category = await Category.findById(req.params.id);
            if (!category) res.status(404).json({ message: "No such category found" });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const category = await Category.findByIdAndUpdate(
                req.params.id,
                {
                    name: req.body.name || category.name,
                    icon: req.body.icon || category.icon,
                    color: req.body.color || category.color
                },
                { new: true }
            )
            res.status(200).send({message: `Edited category with ID ${category._id}`});
        }
        catch (error) {
            res.status(500).send({message: error.message});
        }
    })
    .delete(async (req, res) => {
        try {
            Category.findByIdAndRemove(req.params.id).then(category => {
                if (category) {
                    return res.status(200).send({message: `Deleted category with ID ${category._id}`});
                }
                else {
                    return res.status(404).send({message: `Category not found`});
                }
            })
        }
        catch (error) {
            return res.status(500).send({message: error.message});
        }
    });

module.exports = router;