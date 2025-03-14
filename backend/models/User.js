const mongoose = require('mongoose');
const Driver = require('./Driver');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['user', 'admin', 'moderator'], 
    default: 'user' 
  }
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
module.exports = User;


