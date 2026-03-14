const Goal = require('../models/Goal');

// @desc    Get goal for current year
// @route   GET /api/goals
const getGoal = async (req, res) => {
  try {
    const year = new Date().getFullYear();
    const goal = await Goal.findOne({ user: req.user._id, year });
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Set or update goal
// @route   POST /api/goals
const setGoal = async (req, res) => {
  const { targetAmount, description } = req.body;
  const year = new Date().getFullYear();

  try {
    let goal = await Goal.findOne({ user: req.user._id, year });

    if (goal) {
      goal.targetAmount = targetAmount;
      goal.description = description || goal.description;
      await goal.save();
    } else {
      goal = await Goal.create({
        user: req.user._id,
        targetAmount,
        description,
        year,
      });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getGoal, setGoal };