import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import User from "../../models/user.js";
import _ from "lodash";
import Otp from "../../models/otp.js";
import nodemailer from 'nodemailer'
import "dotenv/config"

const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = validateEmail(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        mailId:req.body.mailId,
    });
    if(!user) return res.status(400).send(`${req.body.mailId} is not exit in data base`);


    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD,
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        exprires: 8200000000000000
      },
    });


    var otp = Math.floor(1000 + Math.random() * 15000);
    console.log(otp)
    var mailOptions = {
      from: `"MITS Interns" ${process.env.EMAIL_USERNAME}`,
      to: req.body.mailId,
      subject: "Hello ✔ Reset your password ", 
      html: `
              <p>Do not share this OTP with anyone. Your OTP is: ${otp} 
              Please enter your OTP and Change your password....
           </p>`,
    };


    let otpText = otp.toString();

    const salt = await bcrypt.genSalt(10);
    const hashOTP = await bcrypt.hash(otpText, salt);

    const saveOtp = new Otp({
      email: req.body.mailId,
      otp: hashOTP,
      createAt: Date.now(),
      expriresAt: Date.now() + 120000,
    });

    try {
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    } catch (error) {
      console.log("Try Again.....")
    }
    


    await saveOtp.save();

    res.send({
      status: `Successfully Send OTP to ${req.body.email}`,
      data: _.pick(saveOtp, ["_id", "email"]),
    });

});

function validateEmail(req) {
  const schema = Joi.object().keys({
    mailId: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(req);
}

export default router;
