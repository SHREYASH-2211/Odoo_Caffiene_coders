const mongoose = require('mongoose');

const swapRequestSchema = new mongoose.Schema({
  fromUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  toUser: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  message: { type: String },
  status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  feedback: { type: String },
  rating: { type: Number, min: 1, max: 5 }
},{ timestamps: true });

module.exports = mongoose.model('SwapRequest', swapRequestSchema);
