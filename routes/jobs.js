const express = require("express");
const Job = require("../models/Job");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { location, page = 1, limit = 5 } = req.query;

    const filter = {};
    if (location) {
      filter.location = { $regex: location, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const jobs = await Job.find(filter)
      .sort({ postedDateTime: -1 })
      .skip(Number(skip))
      .limit(Number(limit));

    const total = await Job.countDocuments(filter);

    res.json({
      totalJobs: total,
      currentPage: Number(page),
      totalPages: Math.ceil(total / limit),
      jobs
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});


module.exports = router;
