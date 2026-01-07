const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
  jobId: String,
  title: String,
  company: String,
  location: {
    type: String,
    index : true
  },
  employment_type: String,
  experience: String,
  source: String,
  job_link: String,
  postedDateTime: Date,
  min_exp: Number,
  max_exp: Number,
  country: String,
  companytype: String,
  companyImageUrl: String
}, { strict: false }); 

module.exports = mongoose.model("Job", jobSchema);
