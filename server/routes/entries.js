const express = require('express');
const router = express.Router();
const {
  getEntries,
  addEntry,
  updateEntry,
  deleteEntry,
} = require('../controllers/entryController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getEntries).post(protect, addEntry);
router.route('/:id').put(protect, updateEntry).delete(protect, deleteEntry);

module.exports = router;