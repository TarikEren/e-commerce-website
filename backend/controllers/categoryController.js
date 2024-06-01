const Category = require("../models/categoryModel");

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    if (!categories) return res.status(204).send({ "message": "No categories found" });
    res.send(categories);
}

const createNewCategory = async (req, res) => {
    if (!req?.body?.name) return res.status(400).send({ "message": "Category name required" });
    try {
        const category = await Category.create({
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
        })
        await category.save();
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
}

const updateCategory = async (req, res) => {
    if (!req?.body?.id) {
        return res.status(400).send({ "message": "Category ID required" });
    }
    const category = await Category.findById(req.body.id);
    if (!category) {
        return res.status(204).send({ "message": `No category found that matches ID ${req.body.id}` });
    }
    if (req.body?.icon) category.icon = req.body.icon;
    if (req.body?.color) category.color = req.body.color;
    const result = await category.save();
    res.send(result);
}

const deleteCategory = async (req, res) => {
    if (!req?.body?.id) return res.status(400).send({ "message": "Category ID required" });
    const category = await Category.findById(req.body.id);
    if (!category) {
        return res.status(204).send({"message": `No category found that matches ID ${req.body.id}`});
    }
    const result = await Category.findByIdAndDelete(req.body.id);
    res.send(result);
}

const getCategory = async (req, res) => {
    if (!req?.body?.id) return res.status(400).send({ "message": "Category ID required" });
    const category = await Category.findById(req.body.id);
    if (!category) {
        return res.status(204).send({"message": `No category found that matches ID ${req.body.id}`});
    }
    res.send(category);
}

module.exports = {
    getAllCategories,
    getCategory,
    createNewCategory,
    updateCategory,
    deleteCategory
}