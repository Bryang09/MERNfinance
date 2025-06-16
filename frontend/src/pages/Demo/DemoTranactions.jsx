import { useState, useEffect } from "react";
import NavDemo from "../../components/Nav";
import "../../styles/demo/transactions.scss";
import "../../styles/demo.scss";
import DemoAddTransaction from "./DemoAddTransaction";
import { User } from "./User";

function DemoTransaction() {
  const transactions = User.transactions;

  const [transaction, setTransaction] = useState(transactions);
  useEffect(() => {
    console.log(transaction);
  }, [transaction]);

  function newTransactions(ar) {
    console.log(ar);
    setTransaction([...transaction, ar]);
    console.log(transaction);
  }

  console.log(transaction);

  return (
    <>
      <NavDemo />
      <div className="transactions-home">
        <div className="transactions-container">
          <DemoAddTransaction
            user={transaction}
            newTransactions={newTransactions}
            transaction={transaction}
          />
          <div className="show-transactions-container">
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
                    return (
                      <tr key={i}>
                        <td>{t.transaction_name}</td>
                        <td>$ {t.transaction_amount}</td>
                        <td className={t.transaction_type}>
                          {t.transaction_type}
                        </td>
                        <td>{t.transaction_account}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default DemoTransaction;
