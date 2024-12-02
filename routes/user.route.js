const express = require("express");
const { updateUser, getAllUsers, getUserById } = require("../controllers/user.controller.js");
const authenticate = require("../middlewares/auth.middelwares.js");

const router = express.Router();

/**
 * @swagger
 * /users:
 *   get:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token authentication
 *     summary: Retrieve all users
 *     description: Returns a list of all users in the system.
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   email:
 *                     type: string
 *                   address:
 *                     type: string
 *                   joined:
 *                     type: string
 *                     format: date-time
 *                   permission:
 *                     type: string
 *       500:
 *         description: Internal server error.
 */
router.get("/", authenticate, getAllUsers); // Route to get all users

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []  # Requires Bearer Token authentication
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
router.put("/:id", authenticate, updateUser); // Route to update user by ID


/**
 * @swagger
 * /auth/user/{userId}:
 *   get:
 *     summary: Get user information by ID
 *     description: Retrieve user details using the user ID.
 *     tags:
 *       - Auth
 *     security:
 *       - bearerAuth: []  # Yêu cầu xác thực bằng Bearer Token
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user to retrieve
 *         schema:
 *           type: integer
 *           example: 1  # Example user ID to retrieve
 *     responses:
 *       200:
 *         description: User information retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 email:
 *                   type: string
 *                   format: email
 *                 phoneNumber:
 *                   type: string
 *                 dateOfBirth:
 *                   type: string
 *                   description: Date of birth in format dd-mm-yyyy
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT  # Định dạng token JWT
 */
router.get("/:id", authenticate, getUserById);
module.exports = router;
