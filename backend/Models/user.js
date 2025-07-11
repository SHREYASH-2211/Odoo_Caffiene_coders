const mongoose = require('mongoose')

const userSchema =mongoose.Schema({
    name: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    trim: true,
  },
  username: {
    type:String,
    required:true,
    unique:true,
  }, 
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: String,
  type: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  profilePicture: {
    type: String,
    default: "https://www.w3schools.com/w3images/avatar2.png",
  },
  createdDateAt: {
    type: Date,
    default: Date.now,
  },
},
    {timeStamp: true}
)

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;