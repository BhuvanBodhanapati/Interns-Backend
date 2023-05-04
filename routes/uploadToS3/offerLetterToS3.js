import express from "express";
import { upload } from "../../controllers/uploadToS3.js";
import formidable from 'formidable'
import Work from "../../models/work.js";
const router = express.Router()


router.post('/', async (req, res)=>{
    const count = await Work.count({ studentId : req.params.userId })+1;
    const offerLetterName = `${req.params.userId}_offerLetter_${count} `;
    const uploadSingle =  upload('internship-offerletter', offerLetterName).single("offerLetterpath")
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

// router.post('/:userId/:workSNo', async (req, res)=>{
//   // const offerLetterName = `${req.params.userId}_offerLetter_${req.params.workSNo} `;
//   const uploadSingle =  upload('internship-offerletter').single("offerLetterpath")
//   uploadSingle(req, res, (err) => {
//     if(err){
//       console.log(err.message)
//       return res.status(400).json({success:false, message:err.message})
//     }
//     const location = req.file.location;
//     console.log(">>>>>>>>>>>>>>>>>>>...location>>>>>>>>>>",location)
//     res.send(location)
//   })
  
// // console.log("filename ==========", name )
// })


export default router;