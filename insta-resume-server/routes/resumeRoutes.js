const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
  createResume,
  getResumes,
  getResumeById,
  updateResume,
  deleteResume,
  downloadResume
} = require('../controllers/resumeController');

router.use(protect); // Protect all resume routes

router.post('/resumes', createResume);

router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

router.get('/:id/download', protect, downloadResume);

module.exports = router;