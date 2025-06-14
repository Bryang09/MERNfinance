const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchame = new Schame({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
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
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
      interest_rate: {
        type: Number,
        required: true,
      },
    },
  ],
  investments: [
    {
      account_name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      account_nickname: {
        type: String,
      },
    },
  ],
  savings: [
    {
      account_name: {
        type: String,
        required: true,
      },
      amount: {
        type: String,
        required: true,
      },
      account_nickname: {
        type: String,
      },
      interest: {
        type: Number,
        required: true,
      },
    },
  ],
});

mongoose.exports = mongoose.model("User", userSchema);
