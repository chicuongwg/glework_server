const Service = require('../models/service.model');  // Cập nhật đường dẫn đến mô-đun chính xác

// Lấy tất cả các dịch vụ
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();  // Lấy tất cả dịch vụ từ DB
    res.json(services);  // Gửi lại dữ liệu cho client
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ message: "An error occurred while fetching services." });
  }
};
