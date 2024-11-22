const express = require("express");
const router = express.Router();
const switchModdingController = require("../controllers/switchModding.controller");

// Routes
router.post("/", switchModdingController.createOrder); // Create a new order
router.get("/", switchModdingController.getAllOrders); // Get all orders
router.get("/:id", switchModdingController.getOrderById); // Get a specific order
router.put("/:id", switchModdingController.updateOrder); // Update a specific order
router.delete("/:id", switchModdingController.deleteOrder); // Delete a specific order

module.exports = router;
