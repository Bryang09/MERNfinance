const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

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

// delete user
const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const user = User.findByIdAndDelete(id).then(() => {
      res.status(200).json({ message: "User Deleted" });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// signup user
const signupUser = async (req, res) => {
  const { email, password, name, monthly_income, goal } = req.body;

  try {
    const user = await User.signup(email, password, name, monthly_income, goal);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  signupUser,
  loginUser,
};
