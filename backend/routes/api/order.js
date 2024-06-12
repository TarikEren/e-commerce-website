const router = require("express").Router();
const verifyAdmin = require("../../middleware/verifyAdmin");


router.route("/")
    //Get all orders
    .get(verifyAdmin)
    //Make an order
    .post();

router.route("/:id")
    //Get an order
    .get()
    //Edit an order
    .put()
    //Remove an order
    .delete();

module.exports = router;