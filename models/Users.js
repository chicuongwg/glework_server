module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
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
            validate: {
            isEmail: true, // Validate email format
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        isConfirmed: {
            type: DataTypes.BOOLEAN,
            defaultValue: false, // Mặc định là chưa xác nhận
        },
        address: {
            type: DataTypes.STRING,
            allowNull: true, // Not required
        },
        city: {
            type: DataTypes.STRING,
            allowNull: true, // Not required
        },
    });

    return User;
};
