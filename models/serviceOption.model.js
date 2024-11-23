const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize.util");

const ServiceOption = sequelize.define(
  "ServiceOption",
  {
    serviceId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Service",
        key: "id",
      },
      onDelete: "CASCADE",
    },
    optionName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: true, // Một số tùy chọn không có giá
    },
    isMultiple: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false, // False: chọn 1, True: chọn nhiều
    },
    optionGroup: {
      type: DataTypes.STRING, // Nhóm của tùy chọn
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: true,
  }
);

module.exports = ServiceOption;
