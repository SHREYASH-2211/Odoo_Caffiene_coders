// backend/models/User.js
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  // gender: { type: String, enum : ['Male','Female','Other'], required: true },
  skillsOffered: [String],
  skillsWanted: [String],
  availability: String,
  type: { type: String, enum: ['user', 'admin'], default: 'user' },
  isPublic: { type: Boolean, default: true },
  profileImage: { type: String, default: 'https://www.w3schools.com/w3images/avatar2.png' },
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);