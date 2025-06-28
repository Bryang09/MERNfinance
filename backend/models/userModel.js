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
      // unique: true,
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
          // required: true,
        },
        balance: {
          type: Number,
          // required: true,
        },
        interest_rate: {
          type: Number,
          // required: true,
        },
        amount_paid: {
          type: Number,
          default: 0,
        },
        monthly_payment: {
          type: Number,
          // required: true,
        },
      },
    ],
    investments: [
      {
        account_name: {
          type: String,
          unique: true,
          // required: true,
        },
        initial_amount: {
          type: Number,
          // required: true,
        },
        amount_invested: {
          type: Number,
        },
        account_nickname: {
          type: String,
        },
        monthly_investment: {
          type: Number,
          // required: true,
        },
      },
    ],
    savings: [
      {
        account_name: {
          type: String,
          // required: true,
        },
        initial_balance: {
          type: Number,
          // required: true,
        },
        current_balance: {
          type: Number,
          default: 0,
        },
        monthly_saving: {
          type: Number,
          // required: true,
        },
        account_nickname: {
          type: String,
        },
        interest: {
          type: Number,
          // required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
