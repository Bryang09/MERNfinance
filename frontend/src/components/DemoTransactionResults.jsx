function DemoTransactionResults(tr) {
  const transaction = tr.transaction;
  const { totalAmount, total, type } = tr;
  console.log(type);
  console.log(tr);
  return (
    <div className="show-transactions-container">
      <h4>{type}</h4>
      <div className="show-transactions">
        {/* <table>
          <tbody> */}
        <ul className="headers">
          <li>Transaction Name</li>
          <li>Transaction Amount</li>
          <li>Category</li>
          <li>Account</li>
        </ul>

        {transaction.map((t, i) => {
          console.log(t.transaction_type);
          if (t.transaction_type === type) {
            return (
              <ul key={i}>
                <li>{t.transaction_name}</li>
                <li>$ {t.transaction_amount}</li>
                <li className={t.transaction_type}>{t.transaction_type}</li>
                <li>{t.transaction_account}</li>
              </ul>
            );
          }
        })}
        {/* </tbody>
          <tfoot> */}
        <ul>
          <li>Total</li>
          <li>
            <span className={totalAmount > total ? "over" : ""}>
              $ {totalAmount}{" "}
            </span>
            /
            <br />$ {total}
          </li>
        </ul>
        {/* </tfoot>
        </table> */}
      </div>
    </div>
  );
}

export default DemoTransactionResults;
