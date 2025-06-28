import { useState } from "react";
import Nav from "../../components/Demo/Nav";

import "../../styles/demo/investments.scss";
import { User } from "./User";
import DemoInvestmentResults from "../../components/Demo/DemoInvestmentResults";
import { toast, ToastContainer } from "react-toastify";

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
        if (check) {
          toast.success(`${type} Recurring Investment Added`);
          return {
            ...investment,
            current_balance: investment.current_balance + parseInt(amount),
            weekly_investment: investment.weekly_investment + parseInt(amount),
          };
        } else if (!check) {
          toast.success(`${type} One Time Investment Added`);
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

  return (
    <>
      <Nav />
      <div className="debts-container">
        <div className="form-container">
          <div className="form">
            <h3>Add Investment</h3>
            <form onSubmit={handleSubmit}>
              <span className="input-container">
                <label htmlFor="type">Type</label>
                <select
                  name="type"
                  id="type"
                  onChange={(e) => setType(e.target.value)}
                  value={type}
                  required={true}
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
              </span>
              {type === "other" ? (
                <span className="input-container">
                  <label htmlFor="new-account">New Account</label>
                  <input
                    type="text"
                    name="new-account"
                    id="new-account"
                    onChange={(e) => setNewAccount(e.target.value)}
                    // value={() => e.target.value}
                    required={true}
                  />
                </span>
              ) : null}
              <span className="input-container">
                <label htmlFor="debtAmount"> Amount</label>
                <input
                  type="number"
                  name="debtAmount"
                  id="debtAmount"
                  onChange={(e) => setAmount(e.target.value)}
                  required={true}
                />
              </span>
              <span className="input-container checkbox">
                <label htmlFor="recurring">Recurring Contribution?</label>
                <input
                  type="checkbox"
                  name="recurring"
                  id="recurring"
                  checked={check}
                  onChange={(e) => isChecked(e.target.checked)}
                  required={true}
                />
              </span>
              <button>Submit</button>
              <ToastContainer autoClose={1700} />
            </form>
          </div>
        </div>
        <div className="results-container">
          <DemoInvestmentResults type="Investments" investments={investments} />
        </div>
      </div>
    </>
  );
}

export default DemoInvestments;
