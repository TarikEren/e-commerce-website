const {
    getAllCategories,
    createNewCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../../controllers/categoryController");

const router = require("express").Router();

router.route("/")
    .get(getAllCategories)
    .post(createNewCategory)
    .put(updateCategory)
    .delete(deleteCategory);

router.route("/:id")
    .get(getCategory);

module.exports = router;