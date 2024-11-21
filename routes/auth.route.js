const express = require("express");
const authController = require("../controllers/auth.controller");
const router = express.Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and send a confirmation email.
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User registration details
 *         schema:
 *           type: object
 *           required:
 *             - firstName
 *             - lastName
 *             - dateOfBirth
 *             - phoneNumber
 *             - email
 *             - password
 *           properties:
 *             firstName:
 *               type: string
 *             lastName:
 *               type: string
 *             dateOfBirth:
 *               type: string
 *               description: Date of birth in format dd-mm-yyyy
 *             phoneNumber:
 *               type: string
 *               description: Phone number in Vietnamese format
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad Request, validation error
 *       409:
 *         description: User already exists
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
 *     responses:
 *       200:
 *         description: User email confirmed successfully
 *       404:
 *         description: User not found
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
 *     parameters:
 *       - in: body
 *         name: user
 *         description: User login details
 *         schema:
 *           type: object
 *           required:
 *             - email
 *             - password
 *           properties:
 *             email:
 *               type: string
 *               format: email
 *             password:
 *               type: string
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
 *     parameters:
 *       - in: body
 *         name: email
 *         description: User email for password reset
 *         schema:
 *           type: object
 *           required:
 *             - email
 *           properties:
 *             email:
 *               type: string
 *               format: email
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
 *       - in: body
 *         name: newPassword
 *         description: New password to reset
 *         schema:
 *           type: object
 *           required:
 *             - newPassword
 *           properties:
 *             newPassword:
 *               type: string
 *               description: The new password for the user
 *     responses:
 *       200:
 *         description: Password reset successfully
 *       400:
 *         description: Missing new password
 *       404:
 *         description: User not found
 */
router.post("/reset-password/:userId", authController.resetPassword);

module.exports = router;
