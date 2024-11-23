const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

// Lấy danh sách đơn hàng
router.get("/", orderController.getAllOrders);

// Lấy chi tiết đơn hàng theo ID
router.get("/:id", orderController.getOrderById);

// Tạo đơn hàng mới
router.post("/", orderController.createOrder);

// Xóa đơn hàng
router.delete("/:id", orderController.deleteOrder);

module.exports = router;
