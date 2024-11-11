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

router.use(protect); // Protect all resume routes

router.route('/')
  .get(getResumes)
  .post(createResume);

router.route('/:id')
  .get(getResumeById)
  .put(updateResume)
  .delete(deleteResume);

module.exports = router;