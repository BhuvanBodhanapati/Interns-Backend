import express from "express";
import { upload } from "../../controllers/uploadToS3.js";
import formidable from 'formidable'

const router = express.Router()


router.post('/', async (req, res)=>{
  console.log("In uplaod pic to s3")
  // console.log('req==============',req.body)
  // const form = formidable({ multiples: true });
  // const fields=form.parse(req);
    // console.log("filename ===", fields)
    const uploadSingle =  upload('internship-completioncertificate').single("completionCertificatepath")
    uploadSingle(req, res, (err) => {
      if(err){
        console.log(err.message)
        return res.status(400).json({success:false, message:err.message})
      }
      const location = req.file.location;
      console.log(">>>>>>>>>>>>>>>>>>>...location>>>>>>>>>>",location)
      res.send(location)
    })
    
  // console.log("filename ==========", name )
})


export default router;