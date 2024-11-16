const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  templateId: {
    type: String,
    required: true
  },
  fileName: String,
  filePath: String,
  personalInfo: {
    name: String,
    email: String,
    phone: String,
    address: String,
    summary: String
  },
  experience: [String],
  education: [String],
  skills: [String],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', ResumeSchema);