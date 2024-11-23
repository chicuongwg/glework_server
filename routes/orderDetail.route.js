const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers/orderDetail.controller");

// Lấy danh sách chi tiết đơn hàng theo orderId
router.get("/:orderId", orderDetailController.getOrderDetailsByOrderId);

// Tạo chi tiết đơn hàng mới
router.post("/", orderDetailController.createOrderDetail);

// Cập nhật chi tiết đơn hàng
router.put("/:id", orderDetailController.updateOrderDetail);

// Xóa chi tiết đơn hàng
router.delete("/:id", orderDetailController.deleteOrderDetail);

module.exports = router;
