const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/service.controller');

/**
 * @swagger
 * /services:
 *   get:
 *     tags:
 *       - Service
 *     summary: Retrieve all services
 *     description: Returns a list of all services available in the system.
 *     responses:
 *       200:
 *         description: A list of services.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   name:
 *                     type: string
 *                   description:
 *                     type: string
 *                   price:
 *                     type: number
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *       500:
 *         description: Internal server error.
 */
router.get('/', serviceController.getAllServices);

module.exports = router;
