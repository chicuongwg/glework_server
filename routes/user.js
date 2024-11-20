const express = require("express");
const { updateUser } = require("../controllers/UserCtrl.js");

const router = express.Router();

// Route to update user information with user ID in the URL
router.put("/update/:id", updateUser);

module.exports = router; 