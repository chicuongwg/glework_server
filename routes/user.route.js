const express = require("express");
const { updateUser } = require("../controllers/user.controller.js");
const authenticate = require("../middlewares/auth.middelwares.js");

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - User
*     security:
 *       - bearerAuth: []  # Yêu cầu xác thực bằng Bearer Token
 *     summary: Update user information
 *     description: Updates the details of a user by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *                 description: First name of the user
 *               lastName:
 *                 type: string
 *                 description: Last name of the user
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number of the user
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Date of birth of the user in YYYY-MM-DD format
 *               address:
 *                 type: string
 *                 description: Address of the user
 *               city:
 *                 type: string
 *                 description: City of the user
 *           example:
 *             firstName: Nam
 *             lastName: Le
 *             phoneNumber: "+84985796985"
 *             dateOfBirth: "2004-09-09"
 *             address: UIT
 *             city: HCM
 *     responses:
 *       200:
 *         description: User updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *       400:
 *         description: Bad request, invalid data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid input data"
 *       404:
 *         description: User not found with the given ID
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User not found"
 */

router.put("/:id", authenticate, updateUser);

module.exports = router;
