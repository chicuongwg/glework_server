const express = require("express");
const { createOrder, getOrders, getOrderById } = require("../controllers/order.controller");

const router = express.Router();

// Create a new order
router.post("/", createOrder);

// Get all orders or orders by user_id
router.get("/", getOrders);

// Get a single order by ID
router.get("/:id", getOrderById);

module.exports = router;
