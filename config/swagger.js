const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "User Management API",
      version: "1.0.0",
      description: "API for managing users in the application",
    },
    servers: [
      {
        url: `http://${process.env.HOST}:${process.env.PORT}`,
      },
    ],
  },
  apis: ["./controllers/*.js", "./routes/*.js"], // Đọc tài liệu swagger từ các file controllers và routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

module.exports = swaggerDocs;
