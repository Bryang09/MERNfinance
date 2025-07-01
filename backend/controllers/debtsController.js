const User = require("../models/userModel");

const mongoose = require("mongoose");

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
// Edit Debt
const updateDebt = async (req, res) => {
  const { id, debtId } = req.params;
  const { amount_paid, account_name, balance, interest_rate, monthly_payment } =
    req.body;

  try {
    const debt = await User.findOneAndUpdate(
      {
        _id: id,
        "debts._id": debtId,
      },
      {
        $inc: {
          "debts.$.amount_paid": amount_paid,
          "debts.$.account_name": account_name,
          "debts.$.balance": balance,
          "debts.$.interest_rate": interest_rate,
          "debts.$.monthly_payment": monthly_payment,
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

module.exports = {
  addDebts,
  getDebts,
  updateDebt,
};
