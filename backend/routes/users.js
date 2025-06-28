const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUser,
  addInvestment,
  addDebts,
  getDebts,
} = require("../controllers/userController");
// GET all user
router.get("/users", getAllUsers);
// Create User
router.post("/user", createUser);
// GET user by id
router.get("/user/:id", getUser);
// Add Investment
router.put("/user/:id/investments", addInvestment);
// Add Debts
router.put("/user/:id/debts", addDebts);
router.get("/user/:id/debts", getDebts);

module.exports = router;
