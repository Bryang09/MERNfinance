function AddDebtForm(props) {
  const {
    setDebtName,
    addDebt,
    setDebtAmount,
    setInterestRate,
    setMonthly,
    setAddDebtForm,
  } = props;
  return (
    <div className="forms-container">
      <div className="form">
        <h3>Add Debts</h3>
        <form onSubmit={addDebt}>
          <span className="inputs-container">
            <label htmlFor="debtName">Debt Name</label>
            <input
              type="text"
              required={true}
              id="debtName"
              onChange={(e) => setDebtName(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="debtAmount">Debt Amount</label>
            <input
              type="number"
              required={true}
              id="debtAmount"
              onChange={(e) => setDebtAmount(e.target.value)}
            />
          </span>

          <span>
            <label htmlFor="interest">Interest Rate</label>
            <input
              type="number"
              name="interest"
              id="interest"
              required={true}
              onChange={(e) => setInterestRate(e.target.value)}
              step="0.01"
            />
          </span>
          <span>
            <label htmlFor="monthly">Monthly Payment</label>
            <input
              type="number"
              name="monthly"
              id="monthly"
              required={true}
              onChange={(e) => setMonthly(e.target.value)}
            />
          </span>
          <span>
            <button>Add Debt</button>
            <button onClick={() => setAddDebtForm(false)}>Cancel</button>
          </span>
        </form>
      </div>
    </div>
  );
}

export default AddDebtForm;
