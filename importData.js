const mongoose = require("mongoose");
const Job = require("./models/Job");
const rawData = require("./data/jobs.json");
require("dotenv").config();


const getValue = (val) => {
  if (!val) return null;

  if (typeof val === "object") {
    if (val.$numberLong) return val.$numberLong.toString();
    if (val.$numberDouble) {
      return isNaN(Number(val.$numberDouble)) ? null : val.$numberDouble;
    }
    if (val.$date) return new Date(val.$date);
    return null;
  }

  return val;
};

const cleanData = rawData.map(job => ({
  jobId: getValue(job["Job ID (Numeric)"]),
  title: job.title || null,
  company: job.company || null,
  location: job.location || null,
  employment_type: job.employment_type || null,
  experience: job.experience || null,
  source: job.source || null,
  job_link: job.job_link || null,
  postedDateTime: getValue(job.postedDateTime),
  min_exp: job.min_exp ?? null,
  max_exp: job.max_exp ?? null,
  country: job.country || null,
  companytype: job.companytype || null,
  companyImageUrl:
    typeof job.companyImageUrl === "string" ? job.companyImageUrl : null
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    await Job.deleteMany();
    await Job.insertMany(cleanData);
    console.log(`Total jobs to import: ${cleanData.length}`);
    console.log("Job data imported successfully");
    process.exit();
  })
  .catch(err => {
    console.error("❌ Import failed");
    console.error(err);
    process.exit(1);
  });
