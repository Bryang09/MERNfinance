import { useEffect, useState } from "react";

function DemoAddTransaction(user) {
  console.log(user);
  const transactions = user.transaction;
  var result = transactions.reduce((unique, o) => {
    if (
      !unique.some((obj) => obj.transaction_account === o.transaction_account)
    ) {
      unique.push(o);
    }
    return unique;
  }, []);

  const [name, setName] = useState(null);
  const [account, setAccount] = useState("");
  const [amount, setAmount] = useState(null);
  const [category, setCategory] = useState("");
  const [newAccount, setNewAccount] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const acc = account == "Other" ? newAccount : account;
    const tr = {
      transaction_account: acc,
      transaction_amount: parseInt(amount),
      transaction_name: name,
      transaction_type: category,
    };
    user.newTransactions(tr);
    e.target.reset();
    setAccount("");
    setCategory("");
    alert("Transaction Added Successfully");
  };
  return (
    <div className="form-container">
      <div className="form">
        <h3>Add Transaction</h3>
        <form onSubmit={handleSubmit}>
          <span>
            <label htmlFor="transaction-name">Transaction Name</label>
            <input
              type="text"
              name="transaction-name"
              id="transaction-name"
              placeholder="Name Of Transaction"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </span>
          <span>
            <label htmlFor="amount">Transaction Amount</label>
            <input
              type="number"
              name="amount"
              id="amount"
              placeholder="Transaction Amount"
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </span>
          <span>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              required
            >
              <option disabled selected></option>
              <option value="Wants">Wants</option>
              <option value="Needs">Needs</option>
              <option value="Investment">Investment</option>
              <option value="Debt">Debt Repayment</option>
            </select>
          </span>
          <span>
            <label htmlFor="account">Account Used</label>

            <select
              name="account"
              id="account"
              onChange={(e) => setAccount(e.target.value)}
              value={account}
              required
            >
              <option disabled selected defaultChecked></option>
              {result.map((t, i) => {
                return (
                  <option value={t.transaction_account} key={i}>
                    {t.transaction_account}
                  </option>
                );
              })}
              <option value="Other">Other</option>
            </select>
          </span>

          {account === "Other" && (
            <>
              <span>
                <label htmlFor="newAccount">Name Of New Account</label>
                <input
                  type="text"
                  name="newAccount"
                  onChange={(e) => setNewAccount(e.target.value)}
                  required
                />
              </span>
            </>
          )}
          <button>Add Transaction</button>
        </form>
      </div>
    </div>
  );
}
export default DemoAddTransaction;
