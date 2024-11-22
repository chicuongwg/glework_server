const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize.util");

const Orders = sequelize.define(
  "Orders",
  {
    order_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    service_type: {
      type: DataTypes.ENUM("Switch", "Build"),
      allowNull: false,
    },
    total_cost: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    order_status: {
      type: DataTypes.ENUM("Pending", "Completed", "Canceled"),
      defaultValue: "Pending",
    },
    payment_status: {
      type: DataTypes.ENUM("Pending", "Completed", "Failed"),
      defaultValue: "Pending",
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Orders;
