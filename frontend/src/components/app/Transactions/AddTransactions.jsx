function AddTransaction(props) {
  const {
    handleSubmit,
    setName,
    setAccount,
    setAmount,
    setCategory,
    transactions,
    accounts,
    account,
    setInvestmentId,
    setNewAccount,
  } = props;
  console.log(props);
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
              required={true}
            />
          </span>
          <span>
            <label htmlFor="amount">Amount</label>
            <input
              id="amount"
              placeholder="Transaction Amount"
              required={true}
              type="number"
              name="amount"
              onChange={(e) => setAmount(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="category">Category</label>
            <select
              name="category"
              id="category"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={""}
              required={true}
            >
              <option value="" disabled></option>
              <option value="needs">Needs</option>
              <option value="wants">Wants</option>
              <option value="savings">Savings</option>
            </select>
          </span>
          <span>
            <label htmlFor="account">Account</label>
            <select
              name="account"
              id="account"
              onChange={(e) => setAccount(e.target.value)}
              defaultValue={""}
              required={true}
            >
              <option value="" disabled>
                Select An Option
              </option>
              {transactions && transactions.length > 0 ? (
                <>
                  {accounts.map((transaction) => {
                    return (
                      <option value={transaction} key={transaction}>
                        {transaction}
                      </option>
                    );
                  })}
                  <option value="other">Other</option>
                </>
              ) : (
                <option value="other">Other</option>
              )}
            </select>
          </span>
          {account === "other" && (
            <span>
              <label htmlFor="new-account">New Account</label>
              <input
                type="text"
                name="new-account"
                id="new-account"
                placeholder="Name Of New Account"
                onChange={(e) => setNewAccount(e.target.value)}
              />
            </span>
          )}
          <button>Add Transaction</button>
        </form>
      </div>
    </div>
  );
}
export default AddTransaction;
