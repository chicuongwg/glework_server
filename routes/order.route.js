const express = require("express");
const router = express.Router();
const orderController = require("../controllers/order.controller");

/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve all orders 
 *     description: Returns a list of all orders in the system without filtering by user.
 *     responses:
 *       200:
 *         description: A list of all orders.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   serviceId:
 *                     type: integer
 *                   totalCost:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   paymentStatus:
 *                     type: string
 *                   address:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error.
 */

router.get("/", orderController.getAllOrders);

// Lấy danh sách đơn hàng theo userId
/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve orders by user ID
 *     description: Returns a list of orders for a specific user based on userId.
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: The ID of the user to retrieve orders for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of orders for the specified user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   orderId:
 *                     type: integer
 *                   userId:
 *                     type: integer
 *                   serviceId:
 *                     type: integer
 *                   totalCost:
 *                     type: integer
 *                   status:
 *                     type: string
 *                   paymentStatus:
 *                     type: string
 *                   address:
 *                     type: string
 *                   telephone:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       404:
 *         description: No orders found for this user.
 *       500:
 *         description: Internal server error.
 */
router.get("/user/:userId", orderController.getAllOrdersWithUserId);

// Lấy chi tiết đơn hàng theo ID
/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     tags:
 *       - Order
 *     summary: Retrieve order details by order ID
 *     description: Returns the details of a specific order based on order ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to retrieve.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: The details of the specified order.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 serviceId:
 *                   type: integer
 *                 totalCost:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 paymentStatus:
 *                   type: string
 *                 address:
 *                   type: string
 *                 telephone:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:id", orderController.getOrderById);

// Tạo đơn hàng mới

/**
 * @swagger
 * /orders:
 *   post:
 *     summary: Create a new order
 *     description: Creates a new order in the system.
 *     tags:
 *       - Order
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - serviceId
 *               - totalCost
 *               - status
 *               - paymentStatus
 *               - address
 *               - telephone
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 2
 *               serviceId:
 *                 type: integer
 *                 example: 1
 *               totalCost:
 *                 type: integer
 *                 example: 1000
 *               address:
 *                 type: string
 *                 example: "UIT, HCM"
 *               telephone:
 *                 type: string
 *                 example: "+84379211913"
 *     responses:
 *       201:
 *         description: Order created successfully
 *       400:
 *         description: Missing required fields or invalid data
 *       500:
 *         description: Internal server error
 */
router.post("/", orderController.createOrder);




// Cập nhật trạng thái đơn hàng theo ID
/**
 * @swagger
 * /orders/{id}/status:
 *   put:
 *     tags:
 *       - Order
 *     summary: Update order status by order ID
 *     description: Updates the status of a specific order based on order ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *             example:
 *               status: "Finished"
 *               paymentStatus: "Paid"
 *     responses:
 *       200:
 *         description: Order status updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderId:
 *                   type: integer
 *                 userId:
 *                   type: integer
 *                 serviceId:
 *                   type: integer
 *                 totalCost:
 *                   type: integer
 *                 status:
 *                   type: string
 *                 paymentStatus:
 *                   type: string
 *                 address:
 *                   type: string
 *                 telephone:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *       404:
 *         description: Order not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id/status", orderController.updateOrderStatus);

module.exports = router;
