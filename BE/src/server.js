const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

// 🔹 Load env FIRST
dotenv.config();

// 🔹 Init app
const app = express();

// 🔹 Connect DB
connectDB();

// 🔹 Middlewares
app.use(cors());
app.use(express.json());

// 🔹 Test route
app.get("/", (req, res) => {
  res.send("🚀 AutoSphere ERP Backend Running");
});

// 🔹 Import routes
const customerRoutes = require("./routes/customer.routes");
const vehicleRoutes = require("./routes/vehicle.routes");
const jobRoutes = require("./routes/job.routes");
const inventoryRoutes = require("./routes/inventory.routes");
const billingRoutes = require("./routes/billing.routes");

// 🔹 Debug (REMOVE later if you want)
console.log("Routes check:");
console.log({
  customerRoutes,
  vehicleRoutes,
  jobRoutes,
  inventoryRoutes,
  billingRoutes,
});

// 🔹 Use routes (ONLY if defined)
if (customerRoutes) app.use("/api/customers", customerRoutes);
if (vehicleRoutes) app.use("/api/vehicles", vehicleRoutes);
if (jobRoutes) app.use("/api/jobs", jobRoutes);
if (inventoryRoutes) app.use("/api/inventory", inventoryRoutes);
if (billingRoutes) app.use("/api/billing", billingRoutes);

// 🔹 Error middleware (optional)
const errorHandler = require("./middlewares/error.middleware");
if (errorHandler) app.use(errorHandler);

// 🔹 Port
const PORT = process.env.PORT || 5000;

// 🔹 Start server
app.listen(PORT, () => {
  console.log(`🔥 Server running on port ${PORT}`);
});