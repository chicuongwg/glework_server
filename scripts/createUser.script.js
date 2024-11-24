const User = require('../models/user.model');
const bcrypt = require('bcrypt');

async function createAdminUser() {
  try {
    const adminEmail = 'admin@gmail.com';
    const existingAdmin = await User.findOne({ where: { email: adminEmail } });

    if (!existingAdmin) {
      const hashedPassword = await bcrypt.hash('1234', 10); // Hash the password
      const newAdmin = await User.create({
        firstName: 'Glework',
        lastName: 'Admin',
        dateOfBirth: '1990-01-01',
        phoneNumber: '+84379211912',
        email: adminEmail,
        password: hashedPassword,
        isConfirmed: true,
        address: 'UIT',
        city: 'HCM',
        role: 'admin',
      });
      console.log("Admin user created:", newAdmin);
    } else {
      console.log("Admin user already exists.");
    }
  } catch (err) {
    console.error("Error creating admin user:", err);
  }
}

module.exports = createAdminUser;
