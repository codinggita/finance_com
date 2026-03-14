const Entry = require('../models/Entry');

// @desc    Get all entries for logged in user
// @route   GET /api/entries
const getEntries = async (req, res) => {
  try {
    const entries = await Entry.find({ user: req.user._id }).sort({ date: -1 });
    res.json(entries);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add new entry
// @route   POST /api/entries
const addEntry = async (req, res) => {
  const { amount, description, category, date, note } = req.body;

  try {
    const entry = await Entry.create({
      user: req.user._id,
      amount,
      description,
      category,
      date,
      note,
    });
    res.status(201).json(entry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Update entry
// @route   PUT /api/entries/:id
const updateEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const updated = await Entry.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete entry
// @route   DELETE /api/entries/:id
const deleteEntry = async (req, res) => {
  try {
    const entry = await Entry.findById(req.params.id);

    if (!entry) return res.status(404).json({ message: 'Entry not found' });

    if (entry.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await entry.deleteOne();
    res.json({ message: 'Entry deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getEntries, addEntry, updateEntry, deleteEntry };