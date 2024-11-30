const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { createResume } = require('../controllers/resumeController');

// Create resume route
router.post('/api/resumes', protect, createResume);

module.exports = router;