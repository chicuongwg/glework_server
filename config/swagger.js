const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "API Document",
      version: "1.0.0",
      description: "API for managing users in the application",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
     tags: [
      {
        name: 'Auth',
        description: 'Authentication routes for user registration, login, and password management.',  // Mô tả nhóm "Authentication"
      },
    ],
  },
  apis: ["./controllers/*.js", "./routes/*.js"], // Đọc tài liệu swagger từ các file controllers và routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
