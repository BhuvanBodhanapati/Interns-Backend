import bcrypt from "bcrypt";
import Joi from "joi";
import express from "express";
import User from "../../models/user.js";
import _ from "lodash";
import Otp from "../../models/otp.js";


const router = express.Router();

router.post('/',async (req,res)=>{
    const {error} = validateOtpparams(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const otpDetails = await Otp.findOne({mailId:req.body.mailId.toLowerCase(),});
    // if(!otpDetails) res.send(400).send(`there is no Otp send to This ${req.body.mailId.toLowerCase()}`);

    // if (otpDetails.expiresAt < Date.now()){
    //     return res.status(401).send("Otp has expired request again");
    // }
      
    const validotp = await bcrypt.compare(req.body.otp, otpDetails.otp);
    if (!validotp) return res.status(400).send("Invalid OTP");

    await Otp.updateOne(
       {
         mailId: req.body.mailId.toLowerCase(),
       },
       {
         $set: {
           otpVerifyed: true,
         },
       }
     );

      let updatesDetails = await Otp.findOne({
        mailId: req.body.mailId.toLowerCase(),
      });

    res.send(_.pick(updatesDetails, ["email", "otpVerifyed"]));

})

function validateOtpparams(req){

    const schema = Joi.object().keys({
        mailId:Joi.string().min(5).max(25).email().required(),
        otp:Joi.string().min(4).max(5).required()
    });

    return schema.validate(req)
}

export default router;