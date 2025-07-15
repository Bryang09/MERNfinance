import { useEffect, useState } from "react";
import Nav from "../../../components/app/Nav";

import "../../../styles/app/debts.scss";
import AddDebtForm from "../../../components/app/Debts/AddDebtForm";
import DebtsResults from "../../../components/app/Debts/DebtsResults";

function Debts() {
  const [debts, setDebts] = useState([]);
  const [snowball, setSnowball] = useState(0);
  const [addDebtForm, setAddDebtForm] = useState(false);
  const [debtName, setDebtName] = useState("");
  const [debtAmount, setDebtAmount] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [monthly, setMonthly] = useState(0);

  const id = localStorage.getItem("user");

  useEffect(() => {
    const getDebts = async () => {
      const response = await fetch(`/api/user/${id}/debts`);

      try {
        const json = await response.json();
        console.log(response);
        console.log(json);
        setSnowball(json.snowball);
        setDebts(json.debt);
      } catch (error) {
        console.log(error);
      }
    };
    getDebts();
  }, []);

  const addDebt = async (e) => {
    e.preventDefault();

    const response = await fetch(`/api/user/${id}/debts`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_name: debtName,
        balance: debtAmount,
        interest_rate: interestRate,
        monthly_payment: monthly,
      }),
    });

    try {
      const json = await response.json();
      setDebts(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(debts);
  console.log(debts.length > 0);
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <Nav />
      <div>
        <div className="buttons-container">
          <h4
            onClick={() => setAddDebtForm(!addDebtForm)}
            className={addDebtForm ? "active" : ""}
          >
            Add Debt
          </h4>
          <h4>Add Debt Payment</h4>
        </div>
        {addDebtForm && (
          <AddDebtForm
            setDebtName={setDebtName}
            addDebt={addDebt}
            setDebtAmount={setDebtAmount}
            setInterestRate={setInterestRate}
            setMonthly={setMonthly}
            setAddDebtForm={setAddDebtForm}
          />
        )}
        {debts.length > 0 ? (
          <div className="debts-container results-container">
            {debts.length > 0 && (
              <div className="results-headers">
                <h4>Debt Name</h4>
                <h4>Balance</h4>
                <h4>Interest Rate</h4>
                <h4>Monthly Payment</h4>
                <h4>Time Until Payoff</h4>
              </div>
            )}
            {debts.length > 0 &&
              debts.map((d, i) => {
                const time = d.balance / d.monthly_payment;
                return (
                  <DebtsResults
                    d={d}
                    i={i}
                    formatter={formatter}
                    snowball={snowball}
                  />
                );
              })}
          </div>
        ) : (
          <div className="no-debts">
            <h1>Debts Will Appear Here</h1>
          </div>
        )}
      </div>
    </>
  );
}

export default Debts;
