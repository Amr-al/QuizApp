import mongoose from "mongoose";

const userModel = new mongoose.Schema(
  {
    name: {
      type: String,
      maxLength: 50,
      minLength: 3,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      required: true
    },
    milNumber: {
      type: String,
      unique: true
    },
    rank: String,
    weapon: String,
    password: {
      type: String,
      maxLength: 200,
      select: false,
    },
    remainingQuestions: [Object]
  },
  {
    timestamps: true,
  }
);
const User = mongoose.model("User", userModel);
export default User;
