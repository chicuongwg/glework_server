const { DataTypes } = require("sequelize"); // Import DataTypes từ Sequelize
const sequelize = require("../utils/sequelize.util"); // Import kết nối Sequelize
const bcrypt = require('bcrypt');
const User = sequelize.define(
    "User", // Tên mô hình
    {
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        dateOfBirth: {
            type: DataTypes.DATEONLY,
            allowNull: false,
        },
        phoneNumber: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true, 
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true, 
        },
        token: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        role: {
            type: DataTypes.STRING,
            defaultValue: 'user',
        },
    },
    {
        freezeTableName: true, 
    }
);
User.beforeCreate(async (user) => {
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 10); // Mã hóa mật khẩu
    }
});
module.exports = User;
