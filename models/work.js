import mongoose from "mongoose";

const workSchema = new mongoose.Schema({
  studentDetails: {
    type: Object,
  },
  studentId: {
    type: String,
  },
  companyName: {
    type: String,
    minlenght: 3,
    maxlenght: 50,
    require: true,
  },
  domain: {
    type: String,
    minlenght: 3,
    maxlenght: 60,
    require: true,
  },
  projectName: {
    type: String,
    minlenght: 3,
    maxlenght: 60,
    require: true,
  },
  role: {
    type: String,
    minlenght: 3,
    maxlenght: 50,
  },
  type: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    require: true,
  },
  start_date: {
    type: String,
    require: true,
  },
  end_date: {
    type: String,
    require: true,
  },
  offerLetterpath: {
    type: String,
  },
  completionCertificatepath: {
    type: String,
  },
  stipend: {
    type: String,
    require: true,
  },
  addWorkAt: {
    type: String,
  },
  updatedWorkAt: {
    type: String,
  },
});

const Work = new mongoose.model("Internship", workSchema);

export default Work;
