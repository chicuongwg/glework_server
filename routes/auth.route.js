const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();
const authenticate = require("../middlewares/auth.middelwares");

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and send a confirmation email.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - dateOfBirth
 *               - phoneNumber
 *               - email
 *               - password
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               dateOfBirth:
 *                 type: string
 *                 description: Date of birth in format dd-mm-yyyy
 *               phoneNumber:
 *                 type: string
 *                 description: Phone number in Vietnamese format
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               firstName: "Dac"
 *               lastName: "Le Ba"
 *               dateOfBirth: "10-10-2003"
 *               phoneNumber: "+84379211912"
 *               email: "lebadacluyenthivaolop10@gmail.com"
 *               password: "1234"
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request, validation error
 *       409:
 *         description: User already exists
 *       500:
 *         description: Internal server error
 */
router.post("/register", authController.register);


/**
 * @swagger
 * /auth/confirm/{userId}:
 *   get:
 *     summary: Confirm email for user
 *     description: Confirm a user's email by visiting this endpoint.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The user ID for email confirmation
 *         schema:
 *           type: integer
 *           example: 3 # Example value for the userId
 *     responses:
 *       200:
 *         description: User email confirmed successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
router.get("/confirm/:userId", authController.confirmEmail);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login a user
 *     description: Login a user with email and password.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "lebadacluyenthithpt@gmail.com"  # Example email
 *               password:
 *                 type: string
 *                 example: "1234"  # Example password
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       400:
 *         description: Bad Request, missing fields
 *       401:
 *         description: Invalid email or password
 *       403:
 *         description: Email not confirmed
 */
router.post("/login", authController.login);

/**
 * @swagger
 * /auth/forgot-password:
 *   post:
 *     summary: Request password reset
 *     description: Send an email with password reset instructions.
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "lebadacluyenthithpt@gmail.com"  # Example email
 *     responses:
 *       200:
 *         description: Password reset email sent successfully
 *       400:
 *         description: Missing email field
 *       404:
 *         description: User not found
 */
router.post("/forgot-password", authController.forgotPassword);

/**
 * @swagger
 * /auth/reset-password/{userId}:
 *   post:
 *     summary: Reset user password
 *     description: Reset the user's password with a new one.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The user ID for resetting password
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - newPassword
 *             properties:
 *               newPassword:
 *                 type: string
 *                 description: The new password for the user
 *                 example: "123456"  # Example new password
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Missing new password
 *       404:
 *         description: User not found
 */
router.post("/reset-password/:userId", authController.resetPassword);


// User logout
router.post("/logout", authController.logout);

// Check authentication status
router.get("/auth-check", authenticate, authController.authCheck);

// Refresh access token
router.post("/refresh-token", authController.refreshToken);





module.exports = router;
