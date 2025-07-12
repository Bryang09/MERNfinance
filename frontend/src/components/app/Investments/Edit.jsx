function Edit(props) {
  const {
    editAccount,
    handleEdit,
    setEditAmount,
    setEditMonthly,
    setEditAccount,
  } = props;
  return (
    <div className="edit">
      <h1>Edit Investment</h1>
      <div className="edit-form">
        <form onSubmit={handleEdit}>
          <span>
            <label htmlFor="name">Name</label>
            <input
              id="name"
              type="text"
              name="name"
              placeholder={editAccount.account_name}
              defaultValue={editAccount.account_name}
              disabled={true}
              className="disabled_input"
            />
          </span>
          <span>
            <label htmlFor="amount">Account Balance</label>
            <input
              id="amount"
              type="number"
              name="amount"
              defaultValue={editAccount.amount_invested}
              onChange={(e) => setEditAmount(e.target.value)}
            />
          </span>
          <span>
            <label htmlFor="monthly">Monthly Investment</label>
            <input
              id="monthly"
              type="number"
              name="monthly"
              defaultValue={editAccount.monthly_investment}
              onChange={(e) => setEditMonthly(e.target.value)}
            />
          </span>

          <button>Submit</button>
          <button onClick={() => setEditAccount(null)}>Cancel</button>
        </form>
      </div>
    </div>
  );
}

export default Edit;
