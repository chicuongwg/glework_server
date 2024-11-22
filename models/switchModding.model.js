const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize.util");

const SwitchModding = sequelize.define(
  "SwitchModding",
  {
    switchName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lube: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    films: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    springs: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    clean: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    springPreference: {
      type: DataTypes.ENUM("Payson", "Geon", "TX", "Chewy", "SPRiT", ""),
      allowNull: false,
      defaultValue: "",
    },
    additionalNotes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    termsAccepted: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    total: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = SwitchModding;
