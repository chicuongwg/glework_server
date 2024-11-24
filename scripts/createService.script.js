const Service = require('../models/service.model'); // Đảm bảo đường dẫn đúng

async function createService() {
  try {
    const services = [
      {
        name: 'Switch Modding',
        description: 'Customize your keyboard switches for a better feel.',
      },
      {
        name: 'Keyboard Building',
        description: 'Assemble and personalize your custom keyboard.',
      },
    ];

    // Lặp qua các dịch vụ và kiểm tra xem dịch vụ đã tồn tại chưa
    for (const service of services) {
      console.log(`Checking if service exists: ${service.name}`); // Log tên dịch vụ đang kiểm tra

      // Kiểm tra dịch vụ đã tồn tại chưa
      const existingService = await Service.findOne({
        where: { name: service.name }, // Tìm kiếm dịch vụ theo tên
      });

      if (existingService) {
        console.log(`Service already exists: ${service.name}`);
      } else {
        console.log(`Creating service: ${service.name}`); // Log trước khi tạo dịch vụ
        // Tạo dịch vụ mới nếu chưa tồn tại
        const newService = await Service.create({
          name: service.name,
          description: service.description,
        });
        console.log(`Service created: ${newService.name}`);
      }
    }
  } catch (err) {
    console.error('Error creating service:', err); // Log lỗi chi tiết
  }
}

module.exports = createService;
