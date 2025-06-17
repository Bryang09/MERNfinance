function DemoTransactionResults(tr) {
  const transaction = tr.transaction;
  const { totalAmount, total, type } = tr;
  console.log(type);
  console.log(tr);
  return (
    <div className="show-transactions-container">
      <h4>{type}</h4>
      <div className="show-transactions">
        <table>
          <tbody>
            <tr>
              <th>Transaction Name</th>
              <th>Transaction Amount</th>
              <th>Category</th>
              <th>Account</th>
            </tr>
            {transaction.map((t, i) => {
              console.log(t.transaction_type);
              if (t.transaction_type === type) {
                return (
                  <tr key={i}>
                    <td>{t.transaction_name}</td>
                    <td>$ {t.transaction_amount}</td>
                    <td className={t.transaction_type}>{t.transaction_type}</td>
                    <td>{t.transaction_account}</td>
                  </tr>
                );
              }
            })}
          </tbody>
          <tfoot>
            <tr>
              <th>Total</th>
              <td>
                <span className={totalAmount > total ? "over" : ""}>
                  $ {totalAmount}{" "}
                </span>
                /
                <br />$ {total}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
}

export default DemoTransactionResults;
