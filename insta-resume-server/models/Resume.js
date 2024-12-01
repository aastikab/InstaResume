const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  personalInfo: {
    name: String,
    title: String,
    email: String,
    phone: String,
    location: String,
    urls: [{
      type: String,
      url: String
    }]
  },
  experience: [{
    company: String,
    title: String,
    location: String,
    date: String,
    responsibilities: [String]
  }],
  education: {
    school: String,
    degree: String,
    date: String,
    gpa: String
  },
  skills: [String],
  achievements: [{
    title: String,
    description: String
  }],
  certifications: [{
    name: String,
    description: String
  }],
  languages: [{
    language: String,
    level: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resume', resumeSchema);