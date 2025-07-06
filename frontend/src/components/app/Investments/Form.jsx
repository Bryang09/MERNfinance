function Form(props) {
  console.log(props);

  const {
    setAccountName,
    setAmountInvested,
    setInitialAmount,
    setMonthlyInvestment,
    setNewAccount,
    investments,
    accountName,
    recurring,
    isRecurring,
    handleNewAccount,
    setInvestmentId,
  } = props;

  const accounts = investments &&
    investments.length > 0 && [
      ...new Set(investments.map((item) => item.account_name)),
    ];

  return (
    <div className="form-container">
      <div className="form">
        <h3>Add Investment</h3>
        {/* <form onSubmit={ accountName == 'other' ? handleNewAccount : handleSubmit }> */}
        <form onSubmit={handleNewAccount}>
          <span className="input-container">
            <label htmlFor="type">Type</label>
            <select
              name="type"
              id="type"
              value={""}
              onChange={(e) => setAccountName(e.target.value)}
            >
              <option value="" disabled>
                Select Type
              </option>
              {investments.length > 0 ? (
                <>
                  {investments.map((investment) => {
                    return (
                      <option
                        value={investment._id}
                        key={investment._id}
                        onChange={() => setInvestmentId(investment._id)}
                      >
                        {investment.account_name}
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
          {accountName == "other" && (
            <span className="input-container">
              <label htmlFor="new-account">New Account</label>
              <input
                type="text"
                name="new-account"
                id="new-account"
                required
                placeholder="Name of New Account"
                onChange={(e) => setNewAccount(e.target.value)}
              />
            </span>
          )}
          <span className="input-container"></span>
          <span className="input-container">
            <label htmlFor="debtAmount">Amount</label>
            <input
              type="number"
              id="debtAmount"
              required
              name="debtAmount"
              onChange={(e) => {
                setMonthlyInvestment(e.target.value),
                  setInitialAmount(e.target.value);
              }}
            />
          </span>
          <span className="input-container checkbox">
            <label htmlFor="recurring">Recurring Contribution?</label>
            <input
              type="checkbox"
              id="recurring"
              name="recurring"
              required
              onChange={() => isRecurring(!recurring)}
            />
          </span>
          <button>Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Form;
