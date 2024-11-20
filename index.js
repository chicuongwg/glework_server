require("dotenv").config(); // Load environment variables from .env
const express = require("express");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerDocs = require("./config/swagger"); // Import Swagger configuration
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to models in the database
const db = require("./models");

// Routers
const authRouter = require("./routes/auth"); // Configure auth routes
const userRouter = require("./routes/user"); // Import user routes
app.use("/auth", authRouter); 
app.use("/users", userRouter); // Add user routes

// Serve API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Use environment variables from .env to get host and port
const HOST = process.env.HOST || "localhost";
const PORT = process.env.PORT || 2001;

// Connect to the database and start the server
db.sequelize.sync().then(() => {
  app.listen(PORT, HOST, () => {
    console.log(`Server running on http://${HOST}:${PORT}`);
  });
});
