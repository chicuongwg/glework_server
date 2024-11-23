const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize.util");
const User = require("./user.model");
const Service = require("./service.model");

const Order = sequelize.define(
  "Order",
  {
    orderId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Service",
        key: "id",
      },
    },
    totalCost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM("Pending", "Completed", "Canceled"),
      defaultValue: "Pending",
    },
    paymentStatus: {
      type: DataTypes.ENUM("Pending", "Completed", "Failed"),
      defaultValue: "Pending",
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false, // Địa chỉ là bắt buộc
    },
    telephone: {
      type: DataTypes.STRING,
      allowNull: false, // Số điện thoại là bắt buộc
      validate: {
        is: /^\+84[0-9]{9,12}$/, // Xác thực số điện thoại bắt đầu bằng +84 và theo sau là 9-12 chữ số
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

// Định nghĩa quan hệ
Order.belongsTo(User, { foreignKey: "userId" });
Order.belongsTo(Service, { foreignKey: "serviceId" });

module.exports = Order;
