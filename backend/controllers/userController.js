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

// INVESTMENTS

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

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  if (!mongoose.Types.ObjectId.isValid(investmentId)) {
    return res.status(400).json({ error: "Invalid Investment Id" });
  }

  try {
    console.log(typeof investmentId);
    const updateFields = `investments.${investmentId}.amount_invested`;
    const investment = await User.findByIdAndUpdate(
      { id, "investments._id": investmentId },
      {
        $inc: {
          "investments.$.account_balance": new_amount_invested,
        },
      },
      { new: true }
    );

    const sort = investment.investments.sort(
      (a, b) => b.amount_invested - a.amount_invested
    );

    res.status(200).json(investment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//  DEBTS

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

const updateDebt = async (req, res) => {
  const { id, debtId } = req.params;
  const { amount_paid } = req.body;

  const r = `debts.${debtId}.amount_paid`;
  console.log(typeof amount_paid);
  try {
    const debt = await User.findOneAndUpdate(
      {
        _id: id,
        "debts._id": debtId,
      },
      {
        $inc: {
          "debts.$.amount_paid": amount_paid,
        },
      },
      { new: true }
    );
    res.status(200).json(debt);
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

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  addInvestment,
  addDebts,
  getDebts,
  updateInvestment,
  updateDebt,
  addSavings,
};
