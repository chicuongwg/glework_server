const config = require("./config/general.config"); // Import cấu hình chung
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger"); // Import Swagger configuration
const switchModdingRouter = require("./routes/switchModding.route");
const order = require("./routes/order.route");
const serviceRouter = require("./routes/service.route"); // Import service routes
const db = require("./utils/sequelize.util"); // Import kết nối Sequelize
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routers
const authRouter = require("./routes/auth.route"); // Configure auth routes
const userRouter = require("./routes/user.route"); // Import user routes
app.use("/auth", authRouter);
app.use("/users", userRouter); // Add user routes
app.use("/services/switch-modding", switchModdingRouter);
app.use("/orders", order);
app.use("/services", serviceRouter); // Add service routes under /api

// Serve API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Get environment variables from config
const HOST = process.env.HOST || "localhost"; // Default to localhost
const PORT = process.env.PORT || 3000; // Default to 3000

console.log("Bắt đầu đồng bộ hóa cơ sở dữ liệu...");

// Connect to the database and start the server
db
  .sync({ alter: process.env.NODE_ENV === 'development' }) // Chỉ thay đổi cấu trúc bảng trong môi trường development
  .then(() => {
    console.log("Cơ sở dữ liệu đã được đồng bộ hóa thành công.");
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi khi đồng bộ hóa cơ sở dữ liệu:", error);
  });
