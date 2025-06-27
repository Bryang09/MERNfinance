import { ToastContainer } from "react-toastify";

function Form(props) {
  const {
    handleSubmit,
    account,
    setAccount,
    debts,
    recurring,
    setTransactionType,
    setAmount,
  } = props;
  console.log(props);
  return (
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
  );
}
export default Form;
