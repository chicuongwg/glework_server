const express = require("express");
const router = express.Router();
const orderDetailController = require("../controllers/orderDetail.controller");

/**
 * @swagger
 * /order-details/{orderId}:
 *   get:
 *     tags:
 *       - OrderDetail
 *     summary: Retrieve order details by order ID
 *     description: Returns a list of order details for a specific order based on orderId.
 *     parameters:
 *       - name: orderId
 *         in: path
 *         required: true
 *         description: The ID of the order to retrieve details for.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: A list of order details for the specified order.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   orderId:
 *                     type: integer
 *                   fieldName:
 *                     type: string
 *                   fieldValue:
 *                     type: string
 *       404:
 *         description: Order detail not found.
 *       500:
 *         description: Internal server error.
 */
router.get("/:orderId", orderDetailController.getOrderDetailsByOrderId);

/**
 * @swagger
 * /order-details:
 *   post:
 *     tags:
 *       - OrderDetail
 *     summary: Create a new order detail
 *     description: Creates a new order detail in the system.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               orderId:
 *                 type: integer
 *               fieldName:
 *                 type: string
 *               fieldValue:
 *                 type: string
 *     responses:
 *       201:
 *         description: Order detail created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 orderId:
 *                   type: integer
 *                 fieldName:
 *                   type: string
 *                 fieldValue:
 *                   type: string
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Internal server error.
 */
router.post("/", orderDetailController.createOrderDetail);

/**
 * @swagger
 * /order-details/{id}:
 *   put:
 *     tags:
 *       - OrderDetail
 *     summary: Update an order detail
 *     description: Updates the details of a specific order detail based on ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the order detail to update.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fieldName:
 *                 type: string
 *               fieldValue:
 *                 type: string
 *     responses:
 *       200:
 *         description: Order detail updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 orderId:
 *                   type: integer
 *                 fieldName:
 *                   type: string
 *                 fieldValue:
 *                   type: string
 *       404:
 *         description: Order detail not found.
 *       500:
 *         description: Internal server error.
 */
router.put("/:id", orderDetailController.updateOrderDetail);

module.exports = router;
