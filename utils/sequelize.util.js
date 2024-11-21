const { Sequelize } = require('sequelize');

// Lấy thông tin kết nối từ process.env (từ process.json đã cấu hình)
const dbConfig = require('../config/general.config');  // Đảm bảo bạn đã import đúng file config

const sequelize = new Sequelize(
    dbConfig.DBConnectors.database,  // Tên cơ sở dữ liệu
    dbConfig.DBConnectors.username,  // Tên người dùng
    dbConfig.DBConnectors.password,  // Mật khẩu
    {
        host: dbConfig.DBConnectors.host,  // Địa chỉ host
        port: dbConfig.DBConnectors.port,  // Cổng kết nối
        dialect: dbConfig.DBConnectors.dialect,  // Loại cơ sở dữ liệu (mysql, postgres, ...)
    }
);

// Kiểm tra kết nối
sequelize.authenticate()
    .then(() => {
        console.log("Kết nối đến cơ sở dữ liệu thành công!");
    })
    .catch((err) => {
        console.error("Không thể kết nối đến cơ sở dữ liệu:", err);
    });

// Xuất kết nối sequelize để sử dụng trong các mô hình khác
module.exports = sequelize;
