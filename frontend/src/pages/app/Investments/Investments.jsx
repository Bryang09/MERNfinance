import { useEffect, useState } from "react";
import Form from "../../../components/app/Investments/Form";
import Nav from "../../../components/app/Nav";

import "../../../styles/app/investments.scss";
import Results from "../../../components/app/Investments/Results";
import Edit from "../../../components/app/Investments/Edit";

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
  const [editAmount, setEditAmount] = useState(0);
  const [editMonthly, setEditMonthly] = useState(0);

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
      e.target.reset();
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
      e.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

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
        <Results
          investments={investments}
          editHandler={editHandler}
          handleDelete={handleDelete}
        />

        {editAccount && (
          <Edit
            editAccount={editAccount}
            handleEdit={handleEdit}
            setEditAmount={setEditAmount}
            setEditMonthly={setEditMonthly}
            setEditAccount={setEditAccount}
          />
        )}
      </div>
    </>
  );
}

export default Investments;
