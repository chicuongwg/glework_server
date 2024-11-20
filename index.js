require("dotenv").config(); // Load biến môi trường từ .env
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger"); // Nhập cấu hình Swagger
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối với models trong db
const db = require("./models");

// Routers
const authRouter = require("./routes/auth"); // Cấu hình các routes của auth
app.use("/auth", authRouter); 

// Cung cấp tài liệu API
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sử dụng biến môi trường từ .env để lấy host và port
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 2001;

// Kết nối database và khởi chạy server
db.sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
