import { useEffect, useState } from "react";
import NavDemo from "../../components/Demo/Nav";

import { User } from "../../pages/Demo/User";
import "../../styles/demo/debts.scss";

import { toast, ToastContainer } from "react-toastify";

function DemoDebts() {
  const [debts, setDebts] = useState(
    User.debts.sort((a, b) => a.balance - b.balance)
  );

  const [snowball, setSnowball] = useState(User.snowball);
  const [account, setAccount] = useState("");
  const [newDebt, setNewDebt] = useState("");
  const [amount, setAmount] = useState(0);
  const [interest, setInterst] = useState("");
  const [weeklyPayment, setWeeklyPayment] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [transactionType, setTransactionType] = useState(false);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function handleSubmit(e) {
    e.preventDefault();

    const accName = account === "other" ? newDebt : account;

    const newDebtBalance = debts.map((debt) => {
      const weekly = recurring ? parseInt(weeklyPayment) : 0;
      if (debt.account_name == account) {
        if (amount > 0) toast.success(`${account} Balance Updated`);
        if (amount < 0)
          toast.success(`${account} Debt Payment Succesfully Recorded`);
        if (debt.balance - amount < 0)
          setSnowball(snowball + debt.weekly_payment);

        console.log(transactionType === "payment");
        console.log(parseInt(-amount));
        transactionType === "payment"
          ? setAmount(parseInt(-amount))
          : setAmount(amount);

        console.log(amount);
        console.log(transactionType);
        if (transactionType === "payment") {
          return {
            ...debt,
            balance: debt.balance - parseInt(amount),
            weekly_payment: debt.weekly_payment + weekly,
          };
        }
        return {
          ...debt,
          balance: debt.balance + parseInt(amount),
          weekly_payment: debt.weekly_payment + weekly,
        };
      } else return debt;
    });

    setDebts(
      newDebtBalance
        .filter((debt) => debt.balance > 0)
        .sort((a, b) => a.balance - b.balance)
    );
    e.target.reset();
    setAccount("");
    setRecurring(false);
    setNewDebt("");

    if (account == "other") {
      const debt = {
        account_name: accName,
        amount_paid: 0,
        balance: amount,
        interest,
        weekly_payment: weeklyPayment,
      };
      newDebtAccount(debt);
    }

    function newDebtAccount(debt) {
      setDebts([...debts, debt]);
      toast.success("Debt Added");
    }
  }
  return (
    <>
      <NavDemo />
      <div className="debts-container">
        <div className="form-container">
          <div className="form">
            <h3>Add Debt</h3>
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
              {debts.map((debt) => {
                if (debt.account_name === account) {
                  return (
                    <span>
                      <label htmlFor="transactionType">Transaction Type</label>
                      <select
                        name="transactionType"
                        id="transactionType"
                        onChange={(e) => setTransactionType(e.target.value)}
                      >
                        <option disabled selected></option>
                        <option value="payment">Payment</option>
                        <option value="expense">Expense</option>
                      </select>
                    </span>
                  );
                }
              })}

              {account === "other" && (
                <span>
                  <label htmlFor="newDebt">New Debt Name</label>
                  <input
                    type="text"
                    name="newDebt"
                    id="newDebt"
                    required
                    onChange={(e) => setNewDebt(e.target.value)}
                    value={newDebt}
                  />
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
              {account === "other" && (
                <span>
                  <label htmlFor="recurring" style={{ textAlign: "center" }}>
                    Recurring Debt?
                  </label>
                  <input
                    type="checkbox"
                    name="recurring"
                    id="recurring"
                    onChange={() => setRecurring(!recurring)}
                  />
                </span>
              )}

              {recurring && (
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
              )}
              {}

              <button>Submit</button>
              <ToastContainer autoClose={2300} />
            </form>
          </div>
        </div>

        <div className="results-container">
          <div className="results-headers">
            <h4>Account Name</h4>
            <h4>Balance</h4>
            <h4>Interest Rate</h4>
            <h4>Weekly Payment</h4>
            <h4>Time Until Payoff</h4>
          </div>
          {debts.map((debt, i) => {
            const timeUntil = debt.balance / debt.weekly_payment;
            const withSnowball =
              debt.balance / (debt.weekly_payment + snowball).toFixed(2);
            const years = timeUntil / 52;
            return (
              <div className="results">
                <h4>{debt.account_name}</h4>
                <h4>{formatter.format(debt.balance)}</h4>
                <h4>{debt.interest}%</h4>
                {i === 0 ? (
                  <h4>
                    {`${formatter.format(debt.weekly_payment)}`}{" "}
                    <span className="snowball">{`(${formatter.format(
                      snowball
                    )})`}</span>
                  </h4>
                ) : (
                  <h4>{formatter.format(debt.weekly_payment)}</h4>
                )}
                {i === 0 ? (
                  <h4>
                    {withSnowball < 4
                      ? `${withSnowball.toFixed(2)} weeks`
                      : withSnowball < 52
                      ? `${(withSnowball / 12).toFixed(2)} months`
                      : `${withSnowball.toFixed(2)}`}
                  </h4>
                ) : (
                  <h4>
                    {timeUntil < 4
                      ? `${timeUntil} weeks`
                      : timeUntil < 52
                      ? `${timeUntil / 4} months`
                      : `${years.toFixed(2)} years`}
                  </h4>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default DemoDebts;
