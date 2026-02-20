const express = require("express");
const router = express.Router();

const auth = require ("../middleware/auth");

const {
    getOrders,
    getOrderById,
    createOrder,
     updateOrder,
     deleteOrder,

} = require("../controllers/orderController");


router.get("/" , auth, getOrders);
router.get("/:id", auth, getOrderById);
router.post("/", auth, createOrder);
router.put("/:id",auth, updateOrder);

router.delete("/:id", auth, deleteOrder);

module.exports = router;