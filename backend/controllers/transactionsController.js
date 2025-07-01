const User = require("../models/userModel");
const mongoose = require("mongoose");

// Transactions

// Add Transaction
const setTransaction = async (req, res) => {
  const { id } = req.params;
  const { name, amount, category, account } = req.body;

  try {
    const transaction = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          transactions: {
            name,
            amount,
            category,
            account,
          },
        },
      },
      { new: true }
    );
    res.status(200).json(transaction);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get transactions

const getTransactions = async (req, res) => {
  const { id } = req.params;

  try {
    const transactions = await User.find({ _id: id }).select("transactions");

    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit Transaction Amount

const editTransaction = async (req, res) => {
  const { id, transactionId } = req.params;
  const { amount, name, category, account } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  if (!mongoose.Types.ObjectId.isValid(transactionId)) {
    return res.status(400).json({ error: "Invalid Transaction Id" });
  }
  try {
    const transaction = await User.findOneAndUpdate(
      { _id: id, "transactions._id": transactionId },
      {
        $set: {
          "transactions.$.amount": amount,
          "transactions.$.name": name,
          "transactions.$.category": category,
          "transactions.$.account": account,
        },
      },
      { new: true }
    );
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getTransactions,
  setTransaction,
  editTransaction,
};
