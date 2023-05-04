import express from "express";
import { s3, upload } from "../../controllers/uploadToS3.js";
import formidable from 'formidable'

const router = express.Router()


router.post('/', async (req, res)=>{
  console.log('upload pic')
    const uploadSingle =  upload('interns-profile-picture').single("profilePic")
    uploadSingle(req, res, (err) => {
      if(err){
        console.log(err.message)
        return res.status(400).json({success:false, message:err.message})
      }
      const location = req.file.location;
      console.log(">>>>>>>>>>>>>>>>>>>req.file>>>>>>>>>>",location);
      res.send(location)
    })
    
  // console.log("filename ==========", name )
})

// router.post('/delete/:key', async (req, res)=>{
//   console.log(`key==========${req.params.key}`)
//   await s3.deleteObject({Bucket:'interns-profile-picture', Key:req.params.key}).promise();
//   console.log('deleted file====', req.params.key);
// })


export default router;