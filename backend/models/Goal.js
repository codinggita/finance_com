const mongoose = require('mongoose');

const goalSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    targetAmount: {
      type: Number,
      required: [true, 'Target amount is required'],
      min: 0,
    },
    year: {
      type: Number,
      default: () => new Date().getFullYear(),
    },
    description: {
      type: String,
      default: 'Yearly Savings Goal',
    }, 
  },
  { timestamps: true }
);

module.exports = mongoose.model('Goal', goalSchema);