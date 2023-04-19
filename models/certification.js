import mongoose from "mongoose";

const certificationSchema = new mongoose.Schema({
  studentDetails: {
    type: Object,
  },
  studentId: {
    type: String,
  },
  organizationName: {
    type: String,
    minlenght: 3,
    maxlenght: 100,
    require: true,
  },
  certificationName: {
    type: String,
    minlenght: 3,
    maxlenght: 60,
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
  completionCertificatepath: {
    type: String,
  },
  addWorkAt: {
    type: String,
  },
  updatedWorkAt: {
    type: String,
  },
});

const Certification = new mongoose.model("Certifications", certificationSchema);

export default Certification;
