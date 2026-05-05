const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    vehicleId: {
      type: String,
      required: true,
    },
    complaints: {
      type: String,
      required: true,
      trim: true,
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
      default: "PENDING",
    },
    technician: {
      type: String,
      default: null, // assigned later
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Job", jobSchema);