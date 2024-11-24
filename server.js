const config = require("./config/general.config"); // Import cấu hình chung
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger"); // Import Swagger configuration
const orderRouter = require("./routes/order.route");
const serviceRouter = require("./routes/service.route"); // Import service routes
const orderDetailRouter = require("./routes/orderDetail.route"); // Import order detail routes
const db = require("./utils/sequelize.util"); // Import kết nối Sequelize
const serviceOptionRoutes = require("./routes/serviceOption.route");
const app = express();
const createAdminUser = require('./scripts/createUser.script'); // Import the createAdminUser function
const createService = require('./scripts/createService.script'); // Import the createService function
const createServiceOption = require('./scripts/createServiceOption.script'); // Import the createServiceOption function

// Middleware
app.use(cors());
app.use(express.json());

// Routers
const authRouter = require("./routes/auth.route"); // Configure auth routes
const userRouter = require("./routes/user.route"); // Import user routes
app.use("/auth", authRouter);
app.use("/users", userRouter); // Add user routes
app.use("/orders", orderRouter); // Add order routes
app.use("/services", serviceRouter); // Add service routes under /api
app.use("/service-options", serviceOptionRoutes);
app.use("/order-details", orderDetailRouter); // Add order detail routes

// Serve API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Get environment variables from config
const HOST = process.env.HOST || "localhost"; // Default to localhost
const PORT = process.env.PORT || 3000; // Default to 3000

console.log("Bắt đầu đồng bộ hóa cơ sở dữ liệu...");

// Connect to the database and start the server
db
  .sync({ alter: process.env.NODE_ENV === 'development' }) // Chỉ thay đổi cấu trúc bảng trong môi trường development
  .then(async () => {
    console.log("Cơ sở dữ liệu đã được đồng bộ hóa thành công.");

    // Run the createUser script
    try {
      await createAdminUser(); // Gọi hàm tạo người dùng admin
      console.log("Admin user creation script executed successfully.");
    } catch (err) {
      console.error("Error executing user creation script:", err);
    }

    // Run the createService script
    try {
      await createService(); // Gọi hàm tạo dịch vụ
      console.log("Service creation script executed successfully.");
    } catch (err) {
      console.error("Error executing service creation script:", err);
    }
    try {
      await createServiceOption(); // Gọi hàm tạo dịch vụ
      console.log("Service creation script executed successfully.");
    } catch (err) {
      console.error("Error executing service creation script:", err);
    }
    // Kết nối đến cơ sở dữ liệu
    app.listen(PORT, HOST, () => {
      console.log(`Server is running on http://${HOST}:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Lỗi khi đồng bộ hóa cơ sở dữ liệu:", error);
  });
