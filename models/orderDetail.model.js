const { DataTypes } = require("sequelize");
const sequelize = require("../utils/sequelize.util");
const Orders = require("./order.model"); // Đảm bảo rằng bạn đã import mô hình Orders

const OrderDetail = sequelize.define(
  "OrderDetail",
  {
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Order", // Tên bảng trong cơ sở dữ liệu
        key: "orderId", // Khóa chính của bảng Orders
      },
      onDelete: "CASCADE",
    },
    fieldName: {
      type: DataTypes.STRING,
      allowNull: false, // Tên trường (ví dụ: 'Switch Name', 'Amount')
    },
    fieldValue: {
      type: DataTypes.TEXT,
      allowNull: true, // Giá trị mà khách hàng nhập (ví dụ: 'Cherry MX', '100')
    },
  },
  { 
    freezeTableName: true,
    timestamps: true,
  }
);

// Thiết lập mối quan hệ với Orders
OrderDetail.belongsTo(Orders, { foreignKey: "orderId" });

module.exports = OrderDetail;