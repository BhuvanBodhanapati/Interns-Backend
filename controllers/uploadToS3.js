import multer from "multer";
import multerS3 from 'multer-s3'
import aws from 'aws-sdk'


const s3 = new aws.S3({
  accessKeyId : process.env.S3_ACCESS_KEY,
  secretAccessKey : process.env.S3_SECRET_ACCESS_KEY,
  region: process.env.S3_BUCKET_REGION,
})
// {params : {Bucket : 'mits-interns-profile-picture'}}
export const upload = (bucketName, fileName) => (
  multer({
    storage : multerS3({
      s3 : s3,
      bucket : bucketName,
      contentType: multerS3.AUTO_CONTENT_TYPE,
      metadata : function(req, file, cb){
        cb(null, {fieldName : file.fieldname})
      },
      key: function(req, file, cb){        
        cb (null, Date.now()+'.jpeg')
      }
    })
  })
)

//  uploadToS3 = async (req, res) => {
// console.log("+++++++++++++++++++++++++++++++++++++++++",req)
  // const uploadSingle =  upload('mits-interns-profile-picture').single("profilePic")
// console.log(uploadSingle)
  // uploadSingle(req, res, (err) => {
    // console.log("inside uplaodsingle")rs
    // if(err){
    //   console.log(err.message)
    //   return res.status(400).json({success:false, message:err.message})
    // }
    // console.log("!@#$%^&*()_!@#$%^&*()_+%$@#$%^&*()  below ereer block")
    // console.log("-------------------------------loca",req.file.location)
    // const location = req.file.location;
    // console.log(">>>>>>>>>>>>>>>>>>>...location>>>>>>>>>>",location)
    // return location;
    //  res.status(200).json({data : req.file})
    // return req.file.location;
  // })



  // var buf = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""),'base64')
  // const content = {
  //   Key : "bhuvan image 2",
  //   Body : buf,
  //   Bucket : 'mits-interns-profile-picture',
  //   ContentEncoding : 'base64',
  //   ContentType: 'image/jpeg'
  // }
  // s3.upload(content, (err, data)=>{})
  // s3.putObject(data, (err, data) =>{
  //   if(err){
  //     console.log(err);
  //     console.log("Error Uploading data : ", data);
  //   }else{
  //     console.log("successfully Uploaded image")
  //     console.log('Data-================================= ',data)
  //   }

  // }).promise()
// }