const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize.util");

const Service = sequelize.define(
  "Service",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = Service;
