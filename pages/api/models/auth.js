import mongoose from "mongoose";
import bcrypt from "bcrypt";
import crypto from "crypto";
const userSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    min: 5,
    max: 20,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  userImage: {
    type: String,
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.getResetPasswordToken = async function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  //Hasing and Adding resetPasswordToken to userSchema

  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpires = Date.now() + 15 * 60 * 1000;

  return resetToken;
};
export default mongoose.models.User || mongoose.model("User", userSchema);
