import Joi from "joi";
import express from "express";
import _ from "lodash";
import Certification from "../../models/certification.js";
const router = express.Router();

router.put("/", async (req, res) => {
  const { error } = validateWorkDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = await Certification.updateOne(
    { _id: req.body.certificationId },
    {
      $set: {
        completionCertificatepath: req.body.completionCertificatepath || "",
        updatedWorkAt: new Date(),
      },
    }
  );

  const certification = await Certification.find({
    studentId: req.body.studentId,
  });
  if (!certification) return res.status(400).send("error  !!");
  res.status(200).send(certification);
});

function validateWorkDetails(req) {
  const schema = Joi.object().keys({
    certificationId: Joi.string().required().label("Certification ID"),
    studentId: Joi.string().required().label("Student ID"),
    completionCertificatepath: Joi.required(),
  });

  return schema.validate(req);
}

export default router;
