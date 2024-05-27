const router = require("express").Router();
const Order = require("../models/orderModel");
const OrderItem = require("../models/orderItemModel");

router.route("/")
    .get(async (req, res) => {
        try {
            const orders = await Order.find().populate("user", "name").sort({ "dateOrdered": -1 });
            if (!orders)
                res.status(404).send({ message: "No orders found" });
            else res.status(200).send(orders);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    .post(async (req, res) => {
        try {
            const orderItemsIds = Promise.all(req.body.order.map(async (orderItem) => {
                let newOrderItem = new OrderItem({
                    quantity: orderItem.quantity,
                    product: orderItem.product
                });
                newOrderItem = await newOrderItem.save();
                return newOrderItem._id;
            }));
            const orderItemsIdsResolved = await orderItemsIds;
            const totalPrices = await Promise.all(orderItemsIdsResolved.map(async (orderItemId) => {
                const orderItem = await OrderItem.findbyId(orderItemId).populate("product", "price");
                const totalPrice = orderItem.product.price * orderItem.quantity;
                return totalPrice;
            }))
            const totalPrice = totalPrices.reduce((a, b) => a + b, 0);

            let order = newOrder({
                orderItems: orderItemsIdsResolved,
                shippingAddress1: req.body.shippingAddress1,
                shippingAddress2: req.body.shippingAddress2,
                city: req.body.city,
                zip: req.body.zip,
                country: req.body.country, //Set to Turkey if order has been issued at Turkey
                phone: req.body.phone,
                status: req.body.status,
                totalPrice: totalPrice,
                user: req.body.user,
                card: req.body.card,
                gateway: req.body.gateway || "Stripe", //Change later
                type: req.body.type
            });
            order = await order.save();
            res.status(200).send({ message: `Order with ID ${order._id} has gone through successfully.` });
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })

router.route("/:id")
    .get(async (req, res) => {
        try {
            const order = await Order.findById(req.params.id)
                .populate("user", "name")
                .populate({
                    path: "orderItems", populate: {
                        path: "product", populate: "category"
                    }
                });
            if (!order) res.status(404).send({ message: "No such order found" });
            else res.status(200).send(order);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    .put(async (req, res) => {
        try {
            const order = await Order.findByIdAndUpdate(
                req.params.id, {
                status: req.body.status
            },
                { new: true }
            )
            if (!order) res.status(404).send({ message: "No such order found" });
            else res.status(200).send(order);
        }
        catch (error) {
            res.status(500).send({ message: error.message });
        }
    })
    .delete(async (req, res) => {
        Order.findByIdAndRemove(req.params.id)
            .then(async (order) => {
                if (order) {
                    await order.orderItems.map(async orderItem => {
                        await OrderItem.findByIdAndRemove(orderItem)
                    })
                    return res.status(200).send({ message: `Order with ID ${OrderItem._id} has been deleted` });
                }
                else {
                    return res.status(404).send({ message: "No such order found" });
                }
            })
            .catch((error) => {
                return res.status(500).send({ message: error.message });
            })
    })

router.get("/get/totalsales", async (req, res) => {
    try {
        const totalSales = await Order.aggregate([
            { $group: { _id: null, totalsales: { $sum: "$totalPrice" } } }
        ]);
        if (!totalSales) res.status(404).send({message: "No sales found"});
        else res.status(200).send(totalSales);
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.get("/get/count", async (req, res) => {
    try {
        const orderCount = await Order.countDocuments((count) => count);
        if (!orderCount) res.status(404).send({message: "No orders found"});
        else res.status(200).send(orderCount);
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }
});

router.get("/get/userorders/:userid", async (req, res) => {
    try {
        const userOrderList = await Order.find({user: req.params.find}).populate({
            path: "orderItems", populate: {
                path: "product", populate: "category"
            }
        }).sort({"dateOrdered": -1});
        if (!userOrderList) res.status(404).send({message: "No orders found"});
        else res.status(200).send(userOrderList);
    }
    catch (error) {
        res.status(500).send({message: error.message});
    }
});