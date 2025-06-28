const User = require("../models/userModel");

const mongoose = require("mongoose");

// get all users

const getAllUsers = async (req, res) => {
  const users = await User.find().sort({ createdAt: -1 });
  res.status(200).json(users);
};
// get a single user
const getUser = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  const user = await User.findById(id);
  res.status(200).json(user);

  if (!user) {
    return res.status(404).json({ error: "User Does Not Exist" });
  }
};

// create a user
const createUser = async (req, res) => {
  const { name, monthly_income, goal } = req.body;

  try {
    const user = await User.create({ name, monthly_income, goal });

    res.status(200).json(user);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// Add Investment
const addInvestment = async (req, res) => {
  const { account_name, initial_amount, amount_invested, monthly_investment } =
    req.body;
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  try {
    const investment = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          investments: {
            account_name,
            initial_amount,
            amount_invested,
            monthly_investment,
          },
        },
      },
      { new: true }
    );

    const sort = investment.investments.sort(
      (a, b) => b.amount_invested - a.amount_invested
    );

    res.status(200).json(sort);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

// update investment
const updateInvestment = async (req, res) => {
  const { id, investmentId } = req.params;
  const { new_amount_invested } = req.body;
  console.log(id, investmentId);

  try {
    const investment = await User.findByIdAndUpdate(
      {
        _id: id,
        "investments._id": investmentId,
      },
      {
        $inc: {
          "investments.$[].amount_invested": new_amount_invested,
        },
      }
      //   { new: true }
    );

    res.status(200).json(investment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Add Debts
const addDebts = async (req, res) => {
  const { account_name, balance, interest_rate, amount_paid, monthly_payment } =
    req.body;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }

  try {
    const debt = await User.findByIdAndUpdate(
      id,
      {
        $push: {
          debts: {
            account_name,
            balance,
            interest_rate,
            amount_paid,
            monthly_payment,
          },
        },
      },
      { new: true }
    );
    const sort = debt.debts.sort((a, b) => a.balance - b.balance);
    console.log(sort);
    res.status(200).json(sort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// get debts
const getDebts = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  try {
    const debts = await User.findOne({ _id: id }).select("debts");
    const sort = debts.debts.sort((a, b) => a.balance - b.balance);

    res.status(200).json(sort);
  } catch (err) {
    res.status(400).json({
      error: err.message,
    });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  addInvestment,
  addDebts,
  getDebts,
  updateInvestment,
};
