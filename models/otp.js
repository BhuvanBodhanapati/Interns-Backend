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
  createdAt: {
    type: Date,
    require: true,
    default:Date.now(),
    expires:'180s'
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
