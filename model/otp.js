
import mongoose from "mongoose";
const OTPschema = new mongoose.Schema(
  {
    otp: {
      type: Number,
    },
    email: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      expires: 600000, // Set the expiration time to 10 minutes (600,000 milliseconds)
    },
  },
  { timestamps: true }
);

const OTP = mongoose.model("otp", OTPschema);
export default OTP;