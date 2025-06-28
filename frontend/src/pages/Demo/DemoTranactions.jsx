import { useState, useEffect } from "react";
import NavDemo from "../../components/Demo/Nav";
import "../../styles/demo/transactions.scss";
import "../../styles/demo.scss";
import DemoAddTransaction from "../../components/DemoAddTransaction";
import { User } from "./User";
import DemoTransactionResults from "../../components/DemoTransactionResults";

function DemoTransaction() {
  //   Add all the debts
  const debts = User.debts.reduce((a, v) => (a += v.weekly_payment), 0);

  //   user transactions
  const transactions = [...User.transactions];

  //   divide the monthly income by 4
  const monthly_income = User.monthly_income;
  const weekly_income = monthly_income / 4;

  //   filters for the category then adds to the total amount
  const totWant = transactions
    .filter((t) => t.transaction_type === "Wants")
    .reduce((a, v) => (a += v.transaction_amount), 0);
  //   filters for the category then adds to the total amount
  const totNeeds = transactions
    .filter((n) => n.transaction_type === "Needs")
    .reduce((a, v) => (a += v.transaction_amount), 0);
  const totDebt = transactions
    .filter((d) => d.transaction_type === "Debt")
    .reduce((a, v) => (a += v.transaction_amount), 0);

  //
  const wants =
    User.goal === "Debt" ? weekly_income * 0.2 : weekly_income * 0.3;
  const needs =
    User.goal === "Debt" ? weekly_income * 0.2 : weekly_income * 0.3;
  const debt = User.goal === "Debt" ? debts : 0;

  const [transaction, setTransaction] = useState(transactions);
  const [budgetNeeds] = useState((User.monthly_income / 4) * 0.3);
  const [totalWant, setTotalWant] = useState(totWant);
  const [totalNeed, setTotalNeed] = useState(totNeeds);
  const [totalDebt, setTotalDebt] = useState(totDebt);

  useEffect(() => {
    const totalWant = transaction
      .filter((t) => t.transaction_type === "Wants")
      .reduce((a, v) => (a += v.transaction_amount), 0);
    setTotalWant(totalWant);
    const totNeeds = transaction
      .filter((n) => n.transaction_type === "Needs")
      .reduce((a, v) => (a += v.transaction_amount), 0);
    setTotalNeed(totNeeds);
    const totDebt = transaction
      .filter((d) => d.transaction_type === "Debt")
      .reduce((a, v) => (a += v.transaction_amount), 0);
    setTotalDebt(totDebt);
  }, [transaction]);

  function newTransactions(ar) {
    setTransaction([...transaction, ar]);
  }

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
          <div className="container">
            <DemoTransactionResults
              type="Wants"
              transaction={transaction}
              totalAmount={totalWant}
              total={wants}
            />
            <DemoTransactionResults
              type="Needs"
              transaction={transaction}
              totalAmount={totalNeed}
              total={needs}
            />
            <DemoTransactionResults
              type="Debt"
              transaction={transaction}
              totalAmount={totDebt}
              total={debt}
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default DemoTransaction;
