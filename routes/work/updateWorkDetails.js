import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import User from "../../models/user.js";
import _ from "lodash";
import fs from "fs";
import Work from "../../models/work.js";
const router = express.Router();

router.put("/", async (req, res) => {
  const { error } = validateWorkDetails(req.body);
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

  const update = await Work.updateOne(
    { _id: req.body.workId },
    {
      $set: {
        studentDetails: studentDetails,
        studentId: req.body.studentId,
        updatedWorkAt: new Date(),
        companyName: req.body.companyName,
        projectName: req.body.projectName,
        domain: req.body.domain,
        role: req.body.role,
        type: req.body.type,
        status: req.body.status,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        offerLetterpath: req.body.offerLetterpath || "",
        completionCertificatepath: req.body.completionCertificatepath || "",
        stipend: req.body.stipend,
      },
    }
  );

  const work = await Work.find({
    studentId: req.body.studentId,
  });
  if (!work) return res.status(400).send("error  !!");
  res.status(200).send(work);
});

function validateWorkDetails(req) {
  const schema = Joi.object().keys({
    studentId: Joi.string().required().label("Student ID"),
    workId: Joi.string().required().label("work ID"),
    companyName: Joi.string().min(2).max(255).required().label("Company Name"),
    projectName: Joi.string().min(2).max(255).required().label("Project Name"),
    type: Joi.string().min(2).max(255).required().label("Type"),
    domain: Joi.string().min(2).max(255).required().label("Domain"),
    role: Joi.string().min(2).max(255).label("Role"),
    status: Joi.string().min(2).max(255).required().label("Status"),
    stipend: Joi.string().min(2).max(255).required().label("Stipend"),
    start_date: Joi.string().min(2).max(255).required().label("Start Date"),
    end_date: Joi.string().min(2).max(255).required().label("End Date"),
    offerLetterpath: Joi.optional(),
    completionCertificatepath: Joi.optional(),
  });

  return schema.validate(req);
}

export default router;
