const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      // required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      //
    },
    password: {
      type: String,
      required: true,
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

// static signup method

userSchema.statics.signup = async function (
  email,
  password,
  name,
  monthly_income,
  goal
) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email Already In Use");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    name,
    monthly_income,
    goal,
  });

  return user;
};

// static login method
userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("All fields must be filled");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("Invalid Credentials");
  }
  return user;
};

module.exports = mongoose.model("User", userSchema);
