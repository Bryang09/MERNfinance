import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

function ShowTransactions(props) {
  let { transactions, total, type, editHandler, handleDelete } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
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
        {transactions.length > 0 &&
          transactions
            .filter((a) => a.category === type)
            .map((transaction) => {
              total += transaction.amount;
              return (
                <div className="results" key={transaction._id}>
                  <h5>{transaction.name}</h5>
                  <h5>{formatter.format(transaction.amount)}</h5>
                  <h5>{transaction.category}</h5>
                  <h5>
                    {transaction.account}
                    <span className="svg-container">
                      <CiEdit onClick={() => editHandler(transaction)} />

                      <MdDelete onClick={() => handleDelete(transaction)} />
                    </span>
                  </h5>
                </div>
              );
            })}
      </div>
      {total > 0 && (
        <div className="results">
          <h5>Total</h5>
          <h5>{formatter.format(total)}</h5>
        </div>
      )}
    </div>
  );
}

export default ShowTransactions;
