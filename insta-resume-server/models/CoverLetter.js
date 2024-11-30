const mongoose = require('mongoose');

const coverLetterSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  templateId: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true,
    maxLength: [200, 'Company name cannot exceed 200 characters']
  },
  position: {
    type: String,
    required: true,
    trim: true,
    maxLength: [200, 'Position name cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: true,
    trim: true,
    maxLength: [5000, 'Cover letter content cannot exceed 5000 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now,
    immutable: true
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

coverLetterSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('CoverLetter', coverLetterSchema);
