import { useEffect, useState } from "react";
import Form from "../../components/app/Investments/Form";
import Nav from "../../components/app/Nav";

import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";

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
  const [editCategory, setEditCategory] = useState("");
  const [editAccountName, setEditAccountName] = useState("");
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
        // console.log(json);
      } catch (error) {
        console.log(error);
      }
    };
    getInvestments();
  }, []);

  const handleUpdateAccount = async (e) => {
    e.preventDefault();

    console.log(accountName);

    const check = investments.filter((investment) => {
      if (investment.account_name === accountName) {
        return investment;
      }
    });

    const investmentId = check[0]._id;
    console.log(check);

    console.log(amountInvested);

    const response = await fetch(
      `/api/user/${id}/investments/${investmentId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          account_name: accountName !== "other" ? accountName : newAccount,
          initial_amount: initialAmount,
          amount_invested: amountInvested,
          monthly_investment: recurring,
        }),
      }
    );
    try {
      const json = await response.json();
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
    const name = editName.length > 0 ? editName : editAccount.name;
    const amount = editAmount > 0 ? editAmount : editAccount.amount;
    const category =
      editCategory.length > 0 ? editCategory : editAccount.category;
    const account =
      editAccountName === "other"
        ? editNewAccount
        : editAccountName.length > 0
        ? editAccountName
        : editAccount.account;

    console.log(editAccountName);
    console.log(editNewAccount);
    console.log(editAccount.account);

    const response = await fetch(
      `/api/user/${id}/transactions/${editAccount._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name,
          amount: amount,
          category: category,
          account: account,
        }),
      }
    );
    try {
      console.log(response);
      const json = await response.json();
      setTransactions(json.transactions);
      setEditAccount(null);
      setEditName("");
      setEditAmount(0);
      setEditCategory("");
      setEditAccountName("");
      setEditNewAccount("");
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
              <div className="results" key={investment._id}>
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
                  {percent}%
                  <span className="svg-container">
                    <CiEdit onClick={() => editHandler(investment)} />

                    <MdDelete onClick={() => handleDelete(investment)} />
                  </span>
                </h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Investments;
