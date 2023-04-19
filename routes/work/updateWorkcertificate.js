import Joi from "joi";
import express from "express";
import _ from "lodash";
import Work from "../../models/work.js";
const router = express.Router();

router.put("/", async (req, res) => {
  const { error } = validateWorkDetails(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const update = await Work.updateOne(
    { _id: req.body.workId },
    {
      $set: {
        completionCertificatepath: req.body.completionCertificatepath || "",
        updatedWorkAt: new Date(),
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
    workId: Joi.string().required().label("work ID"),
    studentId: Joi.string().required().label("Student ID"),
    completionCertificatepath: Joi.required(),
  });

  return schema.validate(req);
}

export default router;
