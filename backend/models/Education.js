const mongoose = require('mongoose');

const EducationSchema = new mongoose.Schema({
  institutionName: { type: String, required: true },
  degree: { type: String, required: true },
  fieldOfStudy: { type: String, required: true },
  location: { type: String, default: 'Remote / India' },
  startDate: { type: String, required: true },
  endDate: { type: String },
  currentlyStudying: { type: Boolean, default: false },
  gradeType: { type: String, enum: ['CGPA', 'Percentage', 'Grade', 'Other'], default: 'CGPA' },
  gradeValue: { type: String },
  description: { type: String },
  achievements: [{ type: String }],
  institutionLogo: { type: String },
  institutionWebsite: { type: String },
  displayOrder: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: true }
}, { timestamps: true });

EducationSchema.pre('save', function(next) {
  if (this.currentlyStudying) {
    this.endDate = null;
  }
  next();
});

module.exports = mongoose.model('Education', EducationSchema);
