const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userId: String,
    nickname: String,
    board: Array,
    score: Number,
  },
  { timestamps: true },
);

const User = mongoose.model("User", userSchema);

module.exports = User;
