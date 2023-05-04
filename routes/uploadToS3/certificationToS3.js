import express from "express";
import { upload } from "../../controllers/uploadToS3.js";
import formidable from "formidable";
import Certification from "../../models/certification.js";

const router = express.Router();

router.post("/", async (req, res) => {
  // const count = await Certification.count({ studentId : req.params.userId })+1;
  // const certificateName = `${req.params.userId}_certification_${count} `;
  const uploadSingle = upload("interns-certification").single(
    "certificationPic"
  );
  uploadSingle(req, res, (err) => {
    if (err) {
      console.log(err.message);
      return res.status(400).json({ success: false, message: err.message });
    }
    const location = req.file.location;
    console.log(">>>>>>>>>>>>>>>>>>>...location>>>>>>>>>>", location);
    res.send(location);
  });

  // console.log("filename ==========", name )
});

export default router;
