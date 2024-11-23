const ServiceOption = require("../models/serviceOption.model");
const Service = require("../models/service.model");

/**
 * Lấy danh sách các tùy chọn của một dịch vụ theo `serviceId`
 */
const getServiceOptionsByServiceId = async (req, res) => {
  const { id } = req.params; // Lấy `id` của service từ URL

  try {
    // Kiểm tra xem service có tồn tại không
    const service = await Service.findByPk(id);

    if (!service) {
      return res.status(404).json({ message: "Service not found" });
    }

    // Lấy danh sách các ServiceOption thuộc service
    const options = await ServiceOption.findAll({
      where: { serviceId: id },
    });

    return res.status(200).json({
      service: {
        id: service.id,
        name: service.name,
        description: service.description,
      },
      options: options.map((option) => ({
        id: option.id,
        optionName: option.optionName,
        price: option.price,
        isMultiple: option.isMultiple,
        optionGroup: option.optionGroup,
      })),
    });
  } catch (error) {
    console.error("Error fetching service options:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { getServiceOptionsByServiceId };
