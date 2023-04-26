import express from 'express';
import cors from "cors";
import 'dotenv/config'
import mongoose from 'mongoose'
import fileUpload from 'express-fileupload';
import rootRoutes from './routes/auth/auth.js';
import sendOtp from './routes/auth/sendOtp.js';
import verifyOtp from './routes/auth/verifyOtp.js';
import updatePassword from './routes/auth/updatePassword.js';
import updateUser from './routes/updateUser.js';
import addNewWork from './routes/work/addNewWork.js';
import getWorkDetails from "./routes/work/getWorkDeatils.js";
import updateWorkDetails from "./routes/work/updateWorkDetails.js";
import updateWorkCertificateDetails from "./routes/work/updateWorkcertificate.js";
import addNewCertification from './routes/certification/addNewCertification.js'
import getCertificationDetails from './routes/certification/getCertificationDetails.js'
import updateCertificationDetails from './routes/certification/updateCertificationDetails.js'
import updateCertificationCertificate from './routes/certification/updateCerticationcerticate.js'
import profilePicToS3 from './routes/uploadToS3/profilePicToS3.js'
import certificationToS3 from './routes/uploadToS3/certificationToS3.js'
import offerLetterToS3 from './routes/uploadToS3/offerLetterToS3.js'
import completionCertificateToS3 from './routes/uploadToS3/completionCertificateToS3.js'

var mongoDB = process.env.DB_URL;
const port = process.env.PORT || 8000;

mongoose
  .connect(mongoDB, { useNewUrlParser: true })
  .then(() => app.listen(port, () => console.log(`Listening on port ${port}...`))  )
  .catch((err) => console.log("erroe", err));


const app = express();


app.use(express.json());
// app.use(express.urlencoded({ extended : false}))
app.use(cors())
// app.use(fileUpload())



app.use("/api/auth", rootRoutes);
app.use("/api/send-otp", sendOtp);
app.use("/api/verify-otp", verifyOtp);
app.use("/api/update-password", updatePassword);
app.use("/api/update-user", updateUser);
app.use("/api/addNewWork", addNewWork);
app.use("/api/getWorkDeatils", getWorkDetails);
app.use("/api/update-workDetails", updateWorkDetails);
app.use("/api/update-work-certificate", updateWorkCertificateDetails);
app.use("/api/addNewCertification", addNewCertification);
app.use("/api/getCertificationDeatils", getCertificationDetails);
app.use("/api/update-CertificationDetails", updateCertificationDetails);
app.use(
  "/api/update-Certification-certificate",
  updateCertificationCertificate
);
app.use('/api/profilePicToS3', profilePicToS3);
app.use('/api/certificationToS3', certificationToS3);
app.use('/api/offerLetterToS3', offerLetterToS3);
app.use('/api/completionCertificateToS3', completionCertificateToS3);


