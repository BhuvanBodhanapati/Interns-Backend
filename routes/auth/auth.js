import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import  User  from "../../models/user.js";
import _ from 'lodash'


const router = express.Router();

router.post("/user" , async (req,res)=>{
    const user = await User.findOne({
      _id: req.body.id,
    });
    if (!user) return res.status(400).send("invalid Id");
    res.send(
      _.pick(user, [
        "_id",
        "mailId",
        "rollno",
        "studentName",
        "year",
        "branch",
        "phoneNumber",
        "profile",
        "section",
      ])
    );
})

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const user = await User.findOne({
    mailId: req.body.mailId.toLowerCase(),
  });
  if (!user) return res.status(400).send("Email not found");

  let validpassword = await bcrypt.compare(
    req.body.password,user.password
  );

  //  bcrypt.hash(req.body.password, 10, function(err, hash) {
  //   if (err) { throw (err); }

  //   bcrypt.compare(req.body.password, user.password, function(err, result) {
  //       if (err) { throw (err); }
  //       console.log(result);
  //   });
  // });



  if(!validpassword) return res.status(400).send("Invalid password");

    res.send(
      _.pick(user, [
        "_id",
        "mailId",
        "rollno",
        "studentName",
        "year",
        "branch",
        "phoneNumber",
        "profile",
        "section",
      ])
    );
  });



function validateUser(req) {
  const schema = Joi.object().keys({
    mailId: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(255).required(),
  });

  return schema.validate(req);
}

export default router;
