const mongoose = require('mongoose');

const AdminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, default: 'Prince Undaviya' },
  email: { type: String, default: 'prince@example.com' }
}, { timestamps: true });

module.exports = mongoose.model('Admin', AdminSchema);
