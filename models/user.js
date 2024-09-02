import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    fullname: {
      type: String,
      required: [true, "fullname is a required field"],
    },
    username: {
      type: String,
      required: [true, "username is a required field"],
      unique: [true, "username already exists, enter a new username"],
    },
    password: {
      type: String,
      required: [true, "password is a required field"],
      minlength: [6, "password must be of at least 6 characters"],
    },
    gender: {
      type: String,
      required: [true, "gender is a required field"],
      enum: ["male", "female"],
    },
    profilePic: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
