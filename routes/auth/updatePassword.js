import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import User from "../../models/user.js";
import _ from "lodash";
import Otp from "../../models/otp.js";

const router = express.Router();

router.post("/", async (req, res) => {
    const { error } = validatePasswordparams(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.resetPassword, salt);

    const update = await User.updateOne(
      { mailId: req.body.mailId },
      { $set: { password: hashPassword } }
    );
    console.log(update);

    res.send("Password updates successfully....");
});

function validatePasswordparams(req) {
  const schema = Joi.object().keys({
    resetPassword: Joi.string().min(5).max(255).required(),
    confirmResetPassword: Joi.any().equal(Joi.ref("resetPassword")).required(),
    mailId: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(req);
}

export default router;
