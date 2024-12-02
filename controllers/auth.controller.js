const bcrypt = require("bcrypt");
const { sendConfirmationEmail, sendResetPasswordEmail } = require("../mailer");
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const config = require('../config/general.config');

module.exports = {
  async register(req, res) {
    const { firstName, lastName, dateOfBirth, phoneNumber, email, password } = req.body;

    if (!firstName || !lastName || !dateOfBirth || !phoneNumber || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ message: "Email must be a valid email address" });
    }

    const formattedDateOfBirth = dateOfBirth;

    if (!/^\+84\d{9,10}$/.test(phoneNumber)) {
      return res.status(400).json({ message: "Phone number must be a valid Vietnamese number" });
    }

    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser && existingUser.isConfirmed) {
        return res.status(409).json({ message: "User with this email already exists and is confirmed." });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = existingUser
        ? await existingUser.update({
            firstName,
            lastName,
            dateOfBirth: formattedDateOfBirth,
            phoneNumber,
            password: hashedPassword,
            role: existingUser.role || 'user',
          })
        : await User.create({
            firstName,
            lastName,
            dateOfBirth: formattedDateOfBirth,
            phoneNumber,
            email,
            password: hashedPassword,
            role: 'user',
          });

      const confirmationLink = `http://${config.DBConnectors.host}:${config.server.port}/auth/confirm/${newUser.id}`;

      await sendConfirmationEmail(firstName, lastName, email, confirmationLink);

      res.status(201).json({
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        dateOfBirth: newUser.dateOfBirth,
        phoneNumber: newUser.phoneNumber,
        email: newUser.email,
        message: "Confirmation email sent.",
      });
    } catch (error) {
      console.error("Error creating user:", error);

      if (error.name === "SequelizeValidationError") {
        return res.status(400).json({ message: error.errors.map(e => e.message) });
      } else if (error.name === "SequelizeUniqueConstraintError") {
        return res.status(409).json({ message: "Email already exists." });
      } else {
        return res.status(500).json({ message: "Internal server error", error: error.message });
      }
    }
  },

  async confirmEmail(req, res) {
    const { userId } = req.params;

    try {
      const user = await User.findByPk(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      user.isConfirmed = true;
      await user.save();

      res.redirect(`${process.env.FRONTEND_URL}/login`);
    } catch (error) {
      console.error("Error confirming user:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  async login(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required." });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password." });
        }

        if (!user.isConfirmed) {
            return res.status(403).json({ message: "Please confirm your email before logging in." });
        }

        // Generate JWT
        const token = jwt.sign({ id: user.id, email: user.email }, config.jwt.secret, {
            expiresIn: config.jwt.tokenLoginExpiredDays,
        });

        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            dateOfBirth: user.dateOfBirth,
            phoneNumber: user.phoneNumber,
            email: user.email,
            role: user.role,
            token,
            message: "Login successful.",
        });
    } catch (error) {
        console.error("Error logging in:", error);
        return res.status(500).json({ message: "Internal server error." });
    }
  },

  async forgotPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required." });
    }

    try {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const resetLink = `http://${process.env.DB_HOST}:${process.env.NODE_PORT}/users/reset-password/${user.id}`;

      await sendResetPasswordEmail(email, resetLink);

      res.status(200).json({ message: "Reset password email sent." });
    } catch (error) {
      console.error("Error sending reset password email:", error);
      return res.status(500).json({ message: "Internal server error." });
    }
  },

  async resetPassword(req, res) {
    const { userId } = req.params;
    const { newPassword } = req.body;

    if (!newPassword) {
      return res.status(400).json({ message: "New password is required." });
    }

    try {
      const user = await User.findByPk(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found." });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword;
      await user.save();

      res.status(200).json({ message: "Password reset successfully." });
    } catch (error) {
      console.error("Error resetting password:", error);
      res.status(500).json({ message: "Internal server error." });
    }
  },

  async logout(req, res) {
    // Logic for logging out the user (e.g., invalidate the token)
    res.status(200).json({ message: "User logged out successfully." });
  },

  async authCheck(req, res) {
    // Logic to check if the user is authenticated
    res.status(200).json({ message: "User is authenticated.", user: req.user });
  },

  async refreshToken(req, res) {
    const { token } = req.body; // Assuming the token is sent in the body

    if (!token) {
        return res.status(401).json({ message: "No token provided." });
    }

    try {
        const decoded = jwt.verify(token, config.jwt.secret);
        const newToken = jwt.sign({ id: decoded.id, email: decoded.email }, config.jwt.secret, {
            expiresIn: config.jwt.tokenLoginExpiredDays,
        });

        res.status(200).json({ token: newToken });
    } catch (error) {
        return res.status(400).json({ message: "Invalid token." });
    }
  },

};
