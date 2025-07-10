const User = require("../models/userModel");

const mongoose = require("mongoose");

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
// get investments
const getInvestments = async (req, res) => {
  const { id } = req.params;

  try {
    const investments = await User.findOne({ _id: id }).select("investments");
    const sort = investments.investments.sort(
      (a, b) => b.amount_invested - a.amount_invested
    );
    res.status(200).json(sort);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// update investment
const updateInvestment = async (req, res) => {
  const { id, investmentId } = req.params;
  const { amount_invested, account_name, monthly_investment } = req.body;
  console.log(id, investmentId);

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  if (!mongoose.Types.ObjectId.isValid(investmentId)) {
    return res.status(400).json({ error: "Invalid Investment Id" });
  }

  try {
    if (
      await User.findOne({
        _id: id,
        "investments._id": investmentId,
      })
    ) {
    }
    const investment = await User.findOneAndUpdate(
      { _id: id, "investments._id": investmentId },
      {
        $inc: {
          "investments.$.amount_invested": amount_invested,
          "investments.$.monthly_investment": monthly_investment,
        },
        $set: {
          "investments.$.account_name": account_name,
        },
      },
      { new: true }
    );

    const sort = investment.investments.sort(
      (a, b) => b.amount_invested - a.amount_invested
    );

    res.status(200).json(sort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const changeInvestment = async (req, res) => {
  const { id, investmentId } = req.params;
  const { amount_invested, monthly_investment } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Invalid User Id" });
  }
  if (!mongoose.Types.ObjectId.isValid(investmentId)) {
    return res.status(400).json({ error: "Invalid Investment Id" });
  }

  try {
    if (
      await User.findOne({
        _id: id,
        "investments._id": investmentId,
      })
    ) {
    }
    const investment = await User.findOneAndUpdate(
      { _id: id, "investments._id": investmentId },
      {
        $set: {
          "investments.$.amount_invested": amount_invested,
          "investments.$.monthly_investment": monthly_investment,
        },
      },
      { new: true }
    );

    const sort = investment.investments.sort(
      (a, b) => b.amount_invested - a.amount_invested
    );

    res.status(200).json(sort);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// delete investement

const deleteInvestment = async (req, res) => {
  const { id, investmentId } = req.params;

  try {
    const investment = await User.findOneAndUpdate(
      {
        _id: id,
      },
      {
        $pull: {
          investments: { _id: investmentId },
        },
      },
      { new: true }
    );
    res.status(200).json(investment);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addInvestment,
  getInvestments,
  updateInvestment,
  changeInvestment,
  deleteInvestment,
};
