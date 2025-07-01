const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      // required: true,
      //
    },
    password: {
      type: String,
      // required: true,
    },
    snowball: {
      type: Number,
      default: 0,
    },
    monthly_income: {
      type: Number,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    debts: [
      {
        account_name: {
          type: String,
        },
        balance: {
          type: Number,
        },
        interest_rate: {
          type: Number,
        },
        amount_paid: {
          type: Number,
          default: 0,
        },
        monthly_payment: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true },
    ],
    investments: [
      {
        account_name: {
          type: String,
        },
        initial_amount: {
          type: Number,
        },
        amount_invested: {
          type: Number,
        },
        account_nickname: {
          type: String,
        },
        monthly_investment: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true },
    ],
    savings: [
      {
        account_name: {
          type: String,
        },
        initial_balance: {
          type: Number,
        },
        current_balance: {
          type: Number,
        },
        monthly_saving: {
          type: Number,
        },
        account_nickname: {
          type: String,
        },
        interest: {
          type: Number,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
      { timestamps: true },
    ],
    transactions: [
      {
        name: {
          type: String,
        },
        amount: {
          type: Number,
        },
        category: {
          type: String,
        },
        account: {
          type: String,
        },
        date: {
          type: Date,
          default: Date.now,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
