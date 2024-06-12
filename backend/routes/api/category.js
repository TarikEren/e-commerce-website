const {
    getAllCategories,
    createNewCategory,
    getCategory,
    updateCategory,
    deleteCategory
} = require("../../controllers/categoryController");
const verifyAdmin = require("../../middleware/verifyAdmin");

const router = require("express").Router();

router.route("/")
    .get(getAllCategories)
    .post(verifyAdmin, createNewCategory)
    .put(verifyAdmin, updateCategory)
    .delete(verifyAdmin, deleteCategory);
    
    router.route("/:id")
    .get(getCategory);

module.exports = router;