const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

// Basic routes (we'll implement controllers later)
router.get('/', protect, (req, res) => {
  res.json({ message: 'Get all cover letters' });
});

router.post('/', protect, (req, res) => {
  res.json({ message: 'Create cover letter' });
});

router.get('/:id', protect, (req, res) => {
  res.json({ message: 'Get single cover letter' });
});

router.put('/:id', protect, (req, res) => {
  res.json({ message: 'Update cover letter' });
});

router.delete('/:id', protect, (req, res) => {
  res.json({ message: 'Delete cover letter' });
});

module.exports = router;