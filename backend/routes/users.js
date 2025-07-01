const express = require("express");
const router = express.Router();

const {
  createUser,
  getAllUsers,
  getUser,
  addInvestment,
  addDebts,
  getDebts,
  updateInvestment,
  updateDebt,
  addSavings,
  getSavings,
  setTransaction,
  editTransactionAmount,
} = require("../controllers/userController");

// GET all user
router.get("/users", getAllUsers);
// Create User
router.post("/user", createUser);
// GET user by id
router.get("/user/:id", getUser);

// INVESTMENTS
// Add Investment
router.put("/user/investments/:id", addInvestment);
// Update Investment
router.put("/user/:id/investments/:investmentId", updateInvestment);

// DEBTS
// Add Debts
router.put("/user/:id/debts", addDebts);
// Update Debt
router.put("/user/:id/debts/:debtId", updateDebt);
// GET Debts
router.get("/user/:id/debts", getDebts);

// SAVINGS
router.post("/user/:id/savings", addSavings);
router.get("/user/:id/savings", getSavings);

// Transactions
router.post("/user/:id/transactions", setTransaction);
router.put("/user/:id/transactions/:transactionId", editTransactionAmount);

module.exports = router;
