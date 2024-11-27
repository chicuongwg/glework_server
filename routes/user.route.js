const express = require("express");
const { updateUser } = require("../controllers/user.controller.js");
const authenticate = require("../middlewares/auth.middelwares.js");

const router = express.Router();

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - Users
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
 *                 description: Date of birth of the user
 *               address:
 *                 type: string
 *                 description: Address of the user
 *               city:
 *                 type: string
 *                 description: City of the user
 *           example:
 *             firstName: John
 *             lastName: Doe
 *             phoneNumber: 1234567890
 *             dateOfBirth: 1990-01-01
 *             address: 123 Main St
 *             city: Anytown
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: User not found
 */

router.put("/update/:id", authenticate, updateUser);

module.exports = router;
