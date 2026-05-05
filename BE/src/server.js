const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// 🔹 Load environment variables FIRST
dotenv.config();

// 🔹 Connect Database
connectDB();

// 🔹 Initialize app
const app = express();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Health Check Route
app.get("/", (req, res) => {
  res.send("🚀 AutoSphere ERP Backend Running");
});

// 🔹 Import Routes
const customerRoutes = require("./routes/customer.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const jobRoutes = require("./routes/job.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const billingRoutes = require("./routes/billing.routes");

// 🔹 API Routes (NO conditions needed)
app.use("/api/customers", customerRoutes);
app.use("/api/vehicles", vehicleRoutes);
app.use("/api/jobs", jobRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/billing", billingRoutes);

// 🔹 404 Handler (VERY IMPORTANT)
app.use((req, res) => {
  res.status(404).json({
    message: "Route not found",
  });
});

// 🔹 Global Error Handler
const errorHandler = require("./middlewares/error.middleware");
app.use(errorHandler);

// 🔹 Port
const PORT = process.env.PORT || 5000;

// 🔹 Start Server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});