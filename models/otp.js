import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    minlength: 5,
    maxlenght: 255,
  },
  otp: {
    type: String,
    require: true,
    minlength: 5,
    maxlenght: 1024,
  },
  createAt: {
    type: Date,
    require: true,
  },
  expriresAt: {
    type: Date,
    require: true,
  },
  otpVerifyed: {
    type: Boolean,
    require: false,
    minlength: 5,
    maxlenght: 5,
    default: false,
  },
});

const Otp = mongoose.model("otps", otpSchema);

export default Otp;
