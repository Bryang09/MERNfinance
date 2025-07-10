import { useEffect, useState } from "react";
import Form from "../../components/app/Investments/Form";
import Nav from "../../components/app/Nav";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

import "../../styles/app/investments.scss";

function Investments() {
  const id = localStorage.getItem("user");

  const [investments, setInvestments] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);
  const [amountInvested, setAmountInvested] = useState(0);
  const [monthly_investment, setMonthlyInvestment] = useState(0);
  const [newAccount, setNewAccount] = useState("");
  const [recurring, isRecurring] = useState(false);

  const [editAccount, setEditAccount] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editMonthly, setEditMonthly] = useState(0);

  const [editNewAccount, setEditNewAccount] = useState("");

  useEffect(() => {
    const getInvestments = async () => {
      const response = await fetch(`/api/user/${id}/investments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      try {
        const json = await response.json();
        setInvestments(json);
      } catch (error) {
        console.log(error);
      }
    };
    getInvestments();
  }, []);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    const check = investments.filter((investment) => {
      if (investment.account_name === accountName) {
        return investment;
      }
    });

    const investmentId = check[0]._id;

    console.log(monthly_investment);
    console.log(amountInvested);
    const response = await fetch(
      `/api/user/${id}/investments/${investmentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_name: accountName !== "other" ? accountName : newAccount,
          amount_invested: parseInt(amountInvested),
          monthly_investment: recurring ? amountInvested : 0,
        }),
      }
    );
    try {
      const json = await response.json();
      setInvestments(json);
      console.log(response);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewAccount = async (e) => {
    e.preventDefault();
    const response = await fetch(`/api/user/${id}/investments/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_name: newAccount,
        initial_amount: initialAmount,
        amount_invested: initialAmount,
        monthly_investment: recurring ? initialAmount : 0,
      }),
    });
    try {
      const json = await response.json();
      setInvestments(json);
      setAccountName("");
      console.log(json);
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  const editHandler = (transaction) => {
    setEditAccount(transaction);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch(
      `/api/user/${id}/investments/${editAccount._id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount_invested: editAmount,
          monthly_investment:
            editMonthly > 0 ? editMonthly : editAccount.monthly_investment,
        }),
      }
    );
    console.log(editAmount);
    try {
      const json = await response.json();
      setInvestments(json);
      setEditAccount(null);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (investment) => {
    const response = await fetch(
      `/api/user/${id}/investments/${investment._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    try {
      const json = await response.json();
      setInvestments(json.investments);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(investments);
  return (
    <>
      <Nav />
      <div className="debts-container">
        <Form
          setAccountName={setAccountName}
          setAmountInvested={setAmountInvested}
          setInitialAmount={setInitialAmount}
          setMonthlyInvestment={setMonthlyInvestment}
          setNewAccount={setNewAccount}
          investments={investments}
          accountName={accountName}
          recurring={recurring}
          isRecurring={isRecurring}
          handleNewAccount={handleNewAccount}
          handleUpdateAccount={handleUpdateAccount}
        />

        <div className="results-container">
          <h3>Investments</h3>
          <div className="show-investment">
            <div className="results-headers">
              <h4>Account Type</h4>
              <h4>Account Balance</h4>
              <h4>Monthly Contributions</h4>
              <h4>% Change</h4>
            </div>
          </div>
          {investments.map((investment) => {
            const percent =
              ((investment.amount_invested - investment.initial_amount) /
                investment.initial_amount) *
              100;
            return (
              <div className="results investments_results" key={investment._id}>
                <h4>{investment.account_name}</h4>
                <h4>{formatter.format(investment.amount_invested)}</h4>
                <h4>{formatter.format(investment.monthly_investment)}</h4>
                <h4
                  className={
                    percent > 0
                      ? "positive"
                      : percent < 0
                      ? "negative"
                      : "neutral"
                  }
                >
                  {percent.toFixed(2)}%
                  <span className="svg-container">
                    <CiEdit onClick={() => editHandler(investment)} />

                    <MdDelete onClick={() => handleDelete(investment)} />
                  </span>
                </h4>
              </div>
            );
          })}
        </div>
        {editAccount && (
          <div className="edit">
            <h1>Edit Investment</h1>
            <div className="edit-form">
              <form onSubmit={handleEdit}>
                <span>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder={editAccount.account_name}
                    defaultValue={editAccount.account_name}
                    disabled={true}
                    className="disabled_input"
                  />
                </span>
                <span>
                  <label htmlFor="amount">Account Balance</label>
                  <input
                    type="number"
                    name="amount"
                    defaultValue={editAccount.amount_invested}
                    onChange={(e) => setEditAmount(e.target.value)}
                  />
                </span>
                <span>
                  <label htmlFor="monthly">Monthly Investment</label>
                  <input
                    type="number"
                    name="monthly"
                    defaultValue={editAccount.monthly_investment}
                    onChange={(e) => setEditMonthly(e.target.value)}
                  />
                </span>

                <button>Submit</button>
                <button onClick={() => setEditAccount(null)}>Cancel</button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Investments;
