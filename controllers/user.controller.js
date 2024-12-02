const User = require('../models/user.model');

// Controller to update user information
const updateUser = async (req, res) => {
  const userId = req.params.id; // Get user ID from URL parameters
  const { firstName, lastName, phoneNumber, dateOfBirth, address, city } = req.body;

  // Log the incoming request body
  console.log("Incoming request body:", req.body);

  // Validate required fields (address and city are optional)
  if (!firstName || !lastName || !phoneNumber || !dateOfBirth) {
    console.log("Validation failed: Missing required fields.");
    return res.status(400).json({ message: "First name, last name, phone number, and date of birth are required." });
  }

  try {
    // Update user in the database
    const updatedUser = await User.update(
      { firstName, lastName, phoneNumber, dateOfBirth, address, city },
      { where: { id: userId } }
    );

    console.log("Update result:", updatedUser);

    if (updatedUser[0] === 0) {
      console.log("User not found for ID:", userId);
      return res.status(404).json({ message: "User not found." });
    }

    console.log("User updated successfully for ID:", userId);
    res.status(200).json({ message: "User updated successfully." });
  } catch (error) {
    console.error("Error updating user:", error);
    if (error.name === "SequelizeValidationError") {
      return res.status(400).json({ message: error.errors.map(e => e.message) });
    } else {
      return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
  }
};

// New controller to get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll(); // Fetch all users from the database
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Return user information (excluding sensitive data like password)
        res.status(200).json({
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            email: user.email,
            dateOfBirth: user.dateOfBirth,
            address: user.address,
            city: user.city,
        });
    } catch (error) {
        console.error("Error fetching user:", error);
        res.status(500).json({ message: "Internal server error." });
    }
}

module.exports = {
  updateUser,
  getAllUsers, // Export the new function
  getUserById,
};