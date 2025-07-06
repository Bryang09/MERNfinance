const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUser,
  deleteUser,
  signupUser,
  loginUser,
} = require("../controllers/userController");

const {
  addInvestment,
  updateInvestment,
  getInvestments,
  deleteInvestment,
} = require("../controllers/investmentsController");

const {
  addDebts,
  getDebts,
  updateDebt,
} = require("../controllers/debtsController");

const {
  addSavings,
  getSavings,
  updateSaving,
  deleteSaving,
} = require("../controllers/savingsController");

const {
  setTransaction,
  getTransactions,
  editTransaction,
  deleteTransaction,
} = require("../controllers/transactionsController");

// signup user
router.post("/signup", signupUser);
// login user
router.post("/login", loginUser);
// GET all user
router.get("/users", getAllUsers);
// Create User
router.post("/user", createUser);
// GET user by id
router.get("/user/:id", getUser);
//  Delete User
router.delete("/user/:id", deleteUser);

// INVESTMENTS
// Add Investment
router.put("/user/:id/investments/", addInvestment);
// Update Investment
router.put("/user/:id/investments/:investmentId", updateInvestment);
// Get Investments
router.get("/user/:id/investments", getInvestments);
// Delete Investment
router.delete("/user/:id/investments/:investmentId", deleteInvestment);

// DEBTS
router.put("/user/:id/debts", addDebts);
router.put("/user/:id/debts/:debtId", updateDebt);
router.get("/user/:id/debts", getDebts);

// SAVINGS
router.post("/user/:id/savings", addSavings);
router.get("/user/:id/savings", getSavings);
router.put("/user/:id/savings/:savingId", updateSaving);
router.delete("/user/:id/savings/:savingId", deleteSaving);

// Transactions
router.post("/user/:id/transactions", setTransaction);
router.put("/user/:id/transactions/:transactionId", editTransaction);
router.get("/user/:id/transactions", getTransactions);
router.delete("/user/:id/transactions/:transactionId", deleteTransaction);

module.exports = router;
