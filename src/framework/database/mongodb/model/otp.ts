import mongoose, { Schema, Model } from "mongoose";
import { Iotp } from "../../../../entities/otp";

const OtpSchema: Schema<Iotp> = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiresAt: {
    type: Date,
    default:  new Date(Date.now() + 2 * 60 * 1000), 
    index: { expires: 0 }, 
  },
  
});

const otpModel: Model<Iotp> = mongoose.model('otp', OtpSchema);
export default otpModel;
