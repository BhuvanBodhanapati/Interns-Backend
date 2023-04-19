import express from "express";
import User from "./../models/user.js";
import Work from "./../models/work.js";
import Certification from "./../models/certification.js";
import _ from "lodash";
// import { uploadToS3 } from "../controllers/uploadToS3.js";

const router = express.Router();

router.put('/', async (req,res)=>{
    
    const update = await User.updateOne(
        { mailId: req.body.mailId },
        {
        $set: {
            profile: req.body.profile,
            phoneNumber: req.body.phoneNumber,
            branch: req.body.branch,
            studentName: req.body.studentName,
            year: req.body.year,
            rollno: req.body.rollno,
            section: req.body.section,
            altmail: req.body.altmail,
        },
    }
    );

    const updateWork = await Work.update(
      { "studentDetails.mailId": req.body.mailId },
      {
        $set: {
          "studentDetails.profile": req.body.profile,
          "studentDetails.phoneNumber": req.body.phoneNumber,
          "studentDetails.branch": req.body.branch,
          "studentDetails.studentName": req.body.studentName,
          "studentDetails.year": req.body.year,
          "studentDetails.rollno": req.body.rollno,
          "studentDetails.section": req.body.section,
         " studentDetails.altmail": req.body.altmail,
        },
      }
    );

    const updateCertification = await Certification.update(
      { "studentDetails.mailId": req.body.mailId },
      {
        $set: {
          "studentDetails.profile": req.body.profile,
          "studentDetails.phoneNumber": req.body.phoneNumber,
          "studentDetails.branch": req.body.branch,
          "studentDetails.studentName": req.body.studentName,
          "studentDetails.year": req.body.year,
          "studentDetails.rollno": req.body.rollno,
          "studentDetails.section": req.body.section,
          " studentDetails.altmail": req.body.altmail,
        },
      }
    );


    
    const user = await User.findOne({
        mailId:req.body.mailId
    });

    console.log("user==============",user)

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
         "altmail"
       ])
     );
    
})


export default router;