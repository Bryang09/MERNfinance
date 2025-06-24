import { useState } from "react";
import NavDemo from "../../components/Demo/Nav";

import { User } from "../../pages/Demo/User";
import "../../styles/demo/debts.scss";

function DemoDebts() {
  const [debts, setDebts] = useState(
    User.debts.sort((a, b) => a.balance - b.balance)
  );
  const [account, setAccount] = useState("");
  const [newDebt, setNewDebt] = useState("");
  const [amount, setAmount] = useState("");
  const [interest, setInterst] = useState("");
  const [weeklyPayment, setWeeklyPayment] = useState("");

  console.log(debts);
  console.log(account);

  function handleSubmit(e) {
    e.preventDefault();
    // e.target.reset();

    const accName = account === "other" ? newDebt : account;

    const newDebtBalance = debts.map((debt) => {
      if (debt.account_name == account) {
        return {
          ...debt,
          balance: debt.balance + parseInt(amount),
        };
      } else return debt;
    });
    setDebts(newDebtBalance);

    if (account == "other") {
      const debt = {
        accName: accName,
        amount_paid: 0,
        balance: amount,
        interest,
        weekly_payment: weeklyPayment,
      };
      newDebtAccount(debt);
    }

    function newDebtAccount(debt) {
      setDebts([...debts, debt]);
    }
  }

  return (
    <>
      <NavDemo />
      <div className="debts-container">
        <form onSubmit={handleSubmit}>
          <span>
            <label htmlFor="account">Account Name</label>
            <select
              name="account"
              id="account"
              onChange={(e) => setAccount(e.target.value)}
              value={account}
              required
            >
              <option disabled></option>
              {debts.map((d) => {
                return (
                  <option value={d.account_name} key={d._id}>
                    {d.account_name}
                  </option>
                );
              })}
              <option value="other">Other</option>
            </select>
          </span>

          {account === "other" && (
            <span>
              <label htmlFor="newDebt">New Debt Name</label>
              <input type="text" name="newDebt" id="newDebt" required />
            </span>
          )}
          <span>
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </span>
          {account === "other" && (
            <span>
              <label htmlFor="interest">Interest Rate</label>
              <input
                type="text"
                name="interest"
                id="interest"
                placeholder="Enter Interest Rate"
                onChange={(e) => setInterst(e.target.value)}
                required
              />
            </span>
          )}

          <span>
            <label htmlFor="payment">Weekly Payment</label>
            <input
              type="text"
              name="payment"
              id="payment"
              placeholder="Enter Weekly Payment"
              onChange={(e) => setWeeklyPayment(e.target.value)}
              required
            />
          </span>
          <button>Submit</button>
        </form>
        <h1>debts</h1>
        <div className="results-container">
          <div className="restults-headers">
            <h4>Account Name</h4>
            <h4>Balance</h4>
            <h4>Interest Rate</h4>
            <h4>Weekly Payment</h4>
          </div>
          {debts.map((debt) => {
            return (
              <div>
                <h3>{debt.account_name}</h3>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DemoDebts;
