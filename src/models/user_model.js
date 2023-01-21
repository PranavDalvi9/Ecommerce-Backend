const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    uuid: { type: String, required: true },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    full_name: {
      type: String,
      required: true,
    },
    fcmToken: {
      type: String,
    },
    profile_pic: {
      type: String,
    },
    auth_type: {
      type: String,
      enum: ["GOOGLE", "FACEBOOK", "PORTAL"],
    },
  },
  { timestamps: true, versionKey: false }
);

module.exports = mongoose.model("user", userSchema);
