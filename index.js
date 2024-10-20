require("dotenv").config(); // Load biến môi trường từ .env
const express = require("express");
const cors = require("cors"); 
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Kết nối với models trong db
const db = require("./models");

// Routers
const usersRouter = require("./routes/Users");
app.use("/users", usersRouter); 

// Sử dụng biến môi trường từ .env để lấy host port
const HOST = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 2001;

// Kết nối database và khởi chạy server
db.sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
