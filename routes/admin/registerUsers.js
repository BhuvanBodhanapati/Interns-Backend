import multer from 'multer';
import fs from 'fs';
import csv from 'csv-parser';
import express from "express";
import bcrypt from "bcrypt";
import User from '../../models/user.js'

const router = express.Router();

const fileStorageEngine = multer.diskStorage({
  destination : (req, file, cb)=>{
      cb(null, "./studentListFiles");
  },
  filename : (req, file, cb)=>{
      cb(null, 'newStudentsList.csv');
  },
});

const uploadToServer = multer({ storage : fileStorageEngine});

const addUserToDB = async (user) => {
  const mailId = Object.values(user)[0];
  const password = Object.values(user)[1];

  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  const newUser = new User({
    mailId : mailId,
    password : hashPassword
  })
  await newUser.save();
  
}

router.post("/registerUsers19942002", uploadToServer.single('newStudentList'), function(req,res){
  var students = 0;
  console.log("File uploaded succesfully...");
  fs.createReadStream('./studentListFiles/newStudentsList.csv')
      .pipe(csv())
      .on('data', (data) => { addUserToDB(data); students=students+1; })
      .on('end', ()=>{res.send("Added "+students+" students successfully..");})
});

export default router;  