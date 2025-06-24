import { useState } from "react";
import Nav from "../../components/Demo/Nav";

import "../../styles/demo/investments.scss";
import { User } from "./User";
import DemoInvestmentResults from "../../components/Demo/DemoInvestmentResults";

function DemoInvestments() {
  const [investments, setInvestments] = useState(User.investments);
  const [savings, setSavings] = useState(User.savings);
  const [type, setType] = useState("");
  const [name, setName] = useState(null);
  const [amount, setAmount] = useState(null);
  const [newAccount, setNewAccount] = useState(null);
  const [check, isChecked] = useState(false);

  console.log(type);

  function handleSubmit(e) {
    e.preventDefault();
    console.log(type);
    const acc = type == "other" ? newAccount : name;
    e.target.reset();
    setType("");

    const newCurrentBalance = investments.map((investment) => {
      if (investment.account_name === type) {
        console.log(investment.weekly_investment + parseInt(amount));
        if (check) {
          return {
            ...investment,
            current_balance: investment.current_balance + parseInt(amount),
            weekly_investment: investment.weekly_investment + parseInt(amount),
          };
        } else if (!check) {
          return {
            ...investment,
            current_balance: investment.current_balance + parseInt(amount),
          };
        }
      } else {
        return investment;
      }
    });
    setInvestments(newCurrentBalance);

    const newWeeklyInvestment = investments.map((investment) => {
      if (investment.account_name === type) {
        if (check) {
          return {
            ...investments,
            weekly_investment: investment.weekly_investment + amount,
          };
        }
      } else {
        return investment;
      }
    });

    if (type === "other") {
      const invest = {
        account_name: acc,
        initial_balance: parseInt(amount),
        current_balance: parseInt(amount),
        weekly_investment: check ? parseInt(amount) : null,
      };
      newInvestment(invest);
    }
  }

  function newInvestment(investment) {
    console.log(investment);
    setInvestments([...investments, investment]);
    console.log(investments);
  }
  function newSavings(saving) {
    console.log(saving);
    setSavings([...savings, saving]);
  }

  return (
    <>
      <Nav />
      <div className="investment-page-container">
        <div className="investment-container">
          <div className="form-container">
            <form onSubmit={handleSubmit}>
              <div className="input-container">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                >
                  <option disabled></option>
                  {investments.map((t) => {
                    return (
                      <option value={t.account_name} key={t._id}>
                        {t.account_name}
                      </option>
                    );
                  })}
                  <option value="other">Other</option>
                </select>
              </div>
              {type === "other" ? (
                <div className="input-container">
                  <label htmlFor="new-account">New Account</label>
                  <input
                    type="text"
                    name="new-account"
                    id="new-account"
                    onChange={(e) => setNewAccount(e.target.value)}
                    // value={() => e.target.value}
                  />
                </div>
              ) : null}
              <div className="input-container">
                <label htmlFor="debtAmount"> Amount</label>
                <input
                  type="number"
                  name="debtAmount"
                  id="debtAmount"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <div className="input-container checkbox">
                <label htmlFor="recurring">Recurring Contribution?</label>
                <input
                  type="checkbox"
                  name="recurring"
                  id="recurring"
                  checked={check}
                  onChange={(e) => isChecked(e.target.checked)}
                />
              </div>
              <button>Submit</button>
            </form>
          </div>
          <div className="investment-section">
            <DemoInvestmentResults
              type="Investments"
              investments={investments}
            />
            {/* <DemoInvestmentResults type="Savings" investments={savings} /> */}
          </div>
        </div>
      </div>
    </>
  );
}

export default DemoInvestments;
