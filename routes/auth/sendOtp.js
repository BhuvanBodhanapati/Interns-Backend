import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import User from "../../models/user.js";
import _ from "lodash";
import Otp from "../../models/otp.js";
import nodemailer from 'nodemailer'
// import email from 'emailjs'
// import { SMTPClient, Message } from 'emailjs';
// import emailjs from '@emailjs/browser';
import "dotenv/config"

const router = express.Router();

router.post("/", async (req, res) => {
    const {error} = validateEmail(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        mailId:req.body.mailId,
    });
    if(!user) return res.status(400).send(`${req.body.mailId} is not exit in data base`);

    await Otp.deleteMany({email: req.body.mailId});


    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.PASSWORD,
      },
    });

    // const client = email.server.connect({
    //   user: process.env.EMAIL_USERNAME,
    //   password: process.env.PASSWORD,
    //   host: 'smtp-mail.outlook.com',
    //   tls : true,
    //   port : 587
    // });


    var otp = Math.floor(1000 + Math.random() * 15000);
    // console.log(otp)

    var mailOptions = {
      from: `"MITS Interns" ${process.env.EMAIL_USERNAME}`,
      to: req.body.mailId,
      subject: "Hello, Reset Password ", 
      text:``,
      html:`<html>
      <h3>Hello👋🏻</h3>
      <p>Do not share this OTP with anyone.<br/><strong>Your OTP is ${otp}.</strong><br/> This OTP is valid for only <strong>180 seconds.</strong> Please enter your OTP and Change your password.<br/><br/>⚠️ &nbsp; <strong>If you have not requested the OTP, please ignore this email.</strong>   <br/> <br/><strong>Thank you,<br/> MITS Interns.</strong> </p>
      </html>`
    };
      

    let otpText = otp.toString();

    const salt = await bcrypt.genSalt(10);
    const hashOTP = await bcrypt.hash(otpText, salt);

    const saveOtp = new Otp({
      email: req.body.mailId,
      otp: hashOTP,
      createAt: Date.now(),
      expriresAt: Date.now() + 180000,
    });

    try {
      transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
          await saveOtp.save();
          res.send({
            status: `Successfully Send OTP to ${req.body.mailId}`,
            data: _.pick(saveOtp, ["_id", "email"]),
          });
        }
      });
    } catch (error) {
      res.send({
        status: "Try Again....."
      })
    }
    
    // try {
    //   const message = await client.sendAsync(mailOptions);
    //   console.log('sent message successfully.....');
    // } catch (err) {
    //   console.error(err);
    // }
});

function validateEmail(req) {
  const schema = Joi.object().keys({
    mailId: Joi.string().min(5).max(255).required().email(),
  });

  return schema.validate(req);
}

export default router;
