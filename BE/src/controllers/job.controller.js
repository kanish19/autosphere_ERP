const Job = require("../models/job.model");


// 🔹 CREATE JOB CARD
exports.createJob = async (req, res) => {
  try {
    const { vehicleId, complaints, technician } = req.body;

    if (!vehicleId || !complaints) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const job = await Job.create({
      vehicleId,
      complaints,
      technician: technician || null,
    });

    res.status(201).json({
      message: "Job created successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 ASSIGN TECHNICIAN
exports.assignTechnician = async (req, res) => {
  try {
    const { technician } = req.body;

    if (!technician) {
      return res.status(400).json({ message: "Technician is required" });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { technician },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      message: "Technician assigned successfully",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 UPDATE JOB STATUS
exports.updateJobStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const validStatus = ["PENDING", "IN_PROGRESS", "COMPLETED"];

    if (!validStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      message: "Status updated",
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET ALL JOBS
exports.getAllJobs = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ createdAt: -1 });

    res.json({
      count: jobs.length,
      data: jobs,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// 🔹 GET JOB DETAILS (VERY IMPORTANT)
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.json({
      data: job,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};