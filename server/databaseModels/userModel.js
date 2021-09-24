const mongoose = require("mongoose");

//user Schema creation

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    lower: true,
  },
  email: {
    type: String,
    required: true,
    lower: true,
  },
  mobile: {
    type: Number,
  },
  passwordHashed: {
    type: String,
    required: true,
  },
});
//user model

const User = new mongoose.model("User", userSchema);
module.exports = User;