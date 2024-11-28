const swaggerJsdoc = require("swagger-jsdoc");
const config = require('../config/general.config');

// Cập nhật cấu hình Swagger để sử dụng OpenAPI 3.0
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0", // Chỉ định sử dụng OpenAPI 3.0
    info: {
      title: "API Documentation",
      version: "1.0.0",
      description: "API for managing users and other application entities",
    },
    servers: [
      {
        url: `http://${config.DBConnectors.host}:${config.server.port}`, // Cấu hình URL của server
      },
    ],
    tags: [
      {
        name: 'Auth',
        description: 'Authentication routes for user registration, login, and password management.',
      },
      {
        name: 'Users',
        description: 'Managing users in the application',
      },
      {
        name: 'Order',
        description: 'Managing orders',
      },
      {
        name: 'ServiceOption',
        description: 'Managing service options related to services.',
      },
      {
        name: 'Service',
        description: 'Managing services in the application',
      },
      {
        name: 'OrderDetail',
        description: 'Managing order details',
      },
    ],
  },
  apis: ["./controllers/*.js", "./routes/*.js"], // Đọc tài liệu Swagger từ các file controllers và routes
};

// Khởi tạo SwaggerDocs
const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
