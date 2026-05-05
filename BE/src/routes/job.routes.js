const express = require("express");
const router = express.Router();

const {
  createJob,
  assignTechnician,
  updateJobStatus,
  getAllJobs,
  getJobById,
} = require("../controllers/job.controller");

// 🔹 Create Job
router.post("/", createJob);

// 🔹 Assign Technician
router.patch("/:id/assign", assignTechnician);

// 🔹 Update Status
router.patch("/:id/status", updateJobStatus);

// 🔹 Get All Jobs
router.get("/", getAllJobs);

// 🔹 Get Job Details
router.get("/:id", getJobById);

module.exports = router;