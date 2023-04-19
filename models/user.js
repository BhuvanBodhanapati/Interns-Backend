import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  rollno: {
    type: String,
  },
  studentName: {
    type: String,
    minlenght: 3,
    maxlenght: 50,
  },
  year: {
    type: String,
    minlenght: 1,
    maxlenght: 10,
  },
  branch: {
    type: String,
    minlenght: 3,
    maxlenght: 50,
  },
  phoneNumber: {
    type: String,
    maxlenght: 10,
    minlenght: 10,
  },
  mailId: {
    type: String,
    require: true,
    minlength: 5,
    maxlenght: 255,
  },
  profile: {
    type: String,
  },
  section: {
    type: String,
  },
  altmail: {
    type: String,
  },
  password: {
    type: String,
    require: true,
    minlength: 5,
    maxlenght: 1024,
  },
});


const User = new mongoose.model("User", userSchema);

export default User;
