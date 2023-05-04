import Joi from "joi";
import express from "express";
import User from "../../models/user.js";
import _ from "lodash";
import Certification from "../../models/certification.js";
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validateCertificationDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    _id: req.body.studentId,
  });
  if (!user) return res.status(400).send("invalid Id");
  const studentDetails = _.pick(user, [
    "_id",
    "mailId",
    "rollno",
    "studentName",
    "year",
    "branch",
    "phoneNumber",
    "profile",
  ]);

  const count = await Certification.count({ studentId: req.body.studentId})

  const certification = new Certification({
    studentDetails: studentDetails,
    studentId: req.body.studentId,
    SNo:count+1,
    organizationName: req.body.organizationName,
    certificationName: req.body.certificationName,
    status: req.body.status,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    completionCertificatepath: req.body.completionCertificatepath || "",
    addWorkAt: new Date(),
  });

  await certification.save();
  // console.log("herlfkwme")

  res.send(certification);
});

function validateCertificationDetails(req) {
  const schema = Joi.object().keys({
    studentId: Joi.string().required().label("Student ID"),
    organizationName: Joi.string()
      .min(2)
      .max(255)
      .required()
      .label("Company Name"),
    certificationName: Joi.string()
      .min(2)
      .max(255)
      .required()
      .label("Certification Name"),
    status: Joi.string().min(2).max(255).required().label("Status"),
    start_date: Joi.string().min(2).max(255).required().label("Start Date"),
    end_date: Joi.string().min(2).max(255).required().label("End Date"),
    completionCertificatepath: Joi.optional(),
  });

  return schema.validate(req);
}

export default router;
