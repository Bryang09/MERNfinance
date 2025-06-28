import { act, useEffect, useState } from "react";
import NavDemo from "../../components/Demo/Nav";

import { User } from "../../pages/Demo/User";
import "../../styles/demo/debts.scss";

import { toast, ToastContainer } from "react-toastify";
import Form from "../../components/Demo/debts/Form";
import Results from "../../components/Demo/debts/Results";

function DemoDebts() {
  const [debts, setDebts] = useState(
    User.debts.sort((a, b) => a.balance - b.balance)
  );

  let [snowball, setSnowball] = useState(User.snowball);
  const [account, setAccount] = useState("");
  const [newDebt, setNewDebt] = useState("");
  const [amount, setAmount] = useState(0);
  const [interest, setInterst] = useState("");
  const [weeklyPayment, setWeeklyPayment] = useState("");
  const [recurring, setRecurring] = useState(false);
  const [transactionType, setTransactionType] = useState(false);
  const [activeDebt, setActiveDebt] = useState(null);

  function handleSubmit(e) {
    e.preventDefault();

    const accName = account === "other" ? newDebt : account;

    const newDebtBalance = debts.map((debt) => {
      const weekly = recurring ? parseInt(weeklyPayment) : 0;
      if (debt.account_name == account) {
        if (amount > 0) toast.success(`${account} Balance Updated`);
        if (debt.balance - amount <= 0) {
          setSnowball(snowball + debt.weekly_payment);
          console.log("success");
        }

        transactionType === "payment"
          ? setAmount(parseInt(-amount))
          : setAmount(amount);

        if (transactionType === "payment") {
          return {
            ...debt,
            balance: debt.balance - parseInt(amount),
            weekly_payment: debt.weekly_payment + weekly,
          };
        }
        return {
          ...debt,
          balance: debt.balance + parseInt(amount),
          weekly_payment: debt.weekly_payment + weekly,
        };
      } else return debt;
    });

    setDebts(
      newDebtBalance
        .filter((debt) => debt.balance > 0)
        .sort((a, b) => a.balance - b.balance)
    );
    e.target.reset();
    setAccount("");
    setRecurring(false);
    setNewDebt("");

    if (account == "other") {
      const debt = {
        account_name: accName,
        amount_paid: 0,
        balance: amount,
        interest,
        weekly_payment: weeklyPayment,
      };
      newDebtAccount(debt);
    }

    function newDebtAccount(debt) {
      setDebts([...debts, debt]);
      toast.success("Debt Added");
    }
  }

  return (
    <>
      <NavDemo />
      <div className="debts-container">
        <Form
          handleSubmit={handleSubmit}
          account={account}
          setAccount={setAccount}
          debts={debts}
          recurring={recurring}
          setTransactionType={setTransactionType}
          setAmount={setAmount}
        />
        <Results
          debts={debts}
          snowball={snowball}
          activeDebt={activeDebt}
          setActiveDebt={setActiveDebt}
        />
      </div>
    </>
  );
}

export default DemoDebts;
