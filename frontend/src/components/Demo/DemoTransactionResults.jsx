function DemoTransactionResults(tr) {
  const transaction = tr.transaction;
  const { totalAmount, total, type } = tr;
  return (
    <div className="show-transactions-container">
      <h3>{type}</h3>
      <div className="show-transactions">
        <div className="headers">
          <h4>Transaction Name</h4>
          <h4>Transaction Amount</h4>
          <h4>Category</h4>
          <h4>Account</h4>
        </div>

        {transaction.map((t, i) => {
          console.log(t.transaction_type);
          if (t.transaction_type === type) {
            return (
              <div key={i} className="results">
                <h5>{t.transaction_name}</h5>
                <h5>$ {t.transaction_amount}</h5>
                <h5 className={t.transaction_type}>{t.transaction_type}</h5>
                <h5>{t.transaction_account}</h5>
              </div>
            );
          }
        })}

        <div className="total">
          <h5>Total</h5>
          <h5>
            <span className={totalAmount > total ? "over" : ""}>
              $ {totalAmount}{" "}
            </span>
            / $ {total}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default DemoTransactionResults;
