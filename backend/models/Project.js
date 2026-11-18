const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  longDescription: { type: String },
  category: { type: String, enum: ['Full Stack', 'Frontend', 'Backend', 'Mobile', 'AI / ML'], default: 'Full Stack' },
  technologies: [{ type: String }],
  imageUrl: { type: String, default: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80' },
  githubUrl: { type: String, default: '#' },
  liveUrl: { type: String, default: '#' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
