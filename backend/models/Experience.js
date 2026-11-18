const mongoose = require('mongoose');

const ExperienceSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String, default: 'Remote / India' },
  period: { type: String, required: true },
  description: [{ type: String }],
  type: { type: String, enum: ['Work', 'Education'], default: 'Work' }
}, { timestamps: true });

module.exports = mongoose.model('Experience', ExperienceSchema);
