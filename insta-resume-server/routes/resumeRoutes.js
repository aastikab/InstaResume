const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { 
  createResume, 
  getResumes, 
  getResumeById, 
  updateResume, 
  deleteResume 
} = require('../controllers/resumeController');

// Create resume route
router.post('/api/resumes', protect, createResume);
router.get('/api/resumes', protect, getResumes);
router.get('/api/resumes/:id', protect, getResumeById);
router.put('/api/resumes/:id', protect, updateResume);
router.delete('/api/resumes/:id', protect, deleteResume);

module.exports = router;