const User = require("../models/userModel");

const mongoose = require("mongoose");

// SAVINGS

// Add Savings
const addSavings = async (req, res) => {
  const { id } = req.params;
  const { account_name, initial_balance, monthly_saving, interest } = req.body;

  try {
    const savings = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          savings: {
            account_name,
            initial_balance,
            current_balance: initial_balance,
            monthly_saving,
            interest,
          },
        },
      },
      { new: true }
    );

    res.status(200).json(savings);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get Saving

const getSavings = async (req, res) => {
  const { id } = req.params;
  try {
    const savings = await User.findOne({ _id: id }).select("savings");
    const sort = savings.savings.sort((a, b) => a.balance - b.balance);

    res.status(200).json(sort);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Update Saving

const updateSaving = async (req, res) => {
  const { id, savingId } = req.params;
  const {
    account_name,
    monthly_saving,
    interest,
    current_balance,
    account_nickname,
  } = req.body;

  try {
    const saving = await User.findOneAndUpdate(
      {
        _id: id,
        "savings._id": savingId,
      },
      {
        $set: {
          "savings.$.account_name": account_name,
          "savings.$.interest": interest,
          "savings.$.account_nickname": account_nickname,
          "savings.$.monthly_saving": monthly_saving,
        },
        $inc: {
          "savings.$.current_balance": current_balance,
        },
      },
      { new: true }
    );
    res.status(200).json(saving);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addSavings,
  getSavings,
  updateSaving,
};
