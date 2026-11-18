const mongoose = require('mongoose');

const SkillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  category: {
    type: String,
    enum: [
      'Frontend Development',
      'Backend Development',
      'Database',
      'Development Tools & Platforms',
      'Languages',
      'Frontend',
      'Backend',
      'DevOps & Tools'
    ],
    required: true
  },
  proficiency: { type: Number, min: 0, max: 100, default: 85 },
  icon: { type: String, default: 'Code' },
  featured: { type: Boolean, default: true }
}, { timestamps: true });

module.exports = mongoose.model('Skill', SkillSchema);
