import { useEffect, useState } from "react";
import Nav from "../../components/app/Nav";

import "../../styles/app/transactions.scss";
import AddTransaction from "../../components/app/Transactions/AddTransactions";
import ShowTransactions from "../../components/app/Transactions/ShowTransactions";

function Transactions() {
  const id = localStorage.getItem("user");

  const [transactions, setTransactions] = useState([]);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState(null);
  const [account, setAccount] = useState(null);
  const [newAccount, setNewAccount] = useState(null);
  const [edit, setEdit] = useState(false);

  const [editAccount, setEditAccount] = useState(null);
  const [editName, setEditName] = useState("");
  const [editAmount, setEditAmount] = useState(0);
  const [editCategory, setEditCategory] = useState("");
  const [editAccountName, setEditAccountName] = useState("");
  const [editNewAccount, setEditNewAccount] = useState("");

  useEffect(() => {
    const getTransactions = async () => {
      const response = await fetch(`/api/user/${id}/transactions`);

      try {
        const json = await response.json();
        console.log(json[0].transactions);
        setTransactions(json[0].transactions);
      } catch (error) {
        console.log(error);
      }
    };

    getTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const setTransaction = await fetch(`/api/user/${id}/transactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        amount: amount,
        category: category,
        account: account === "other" ? newAccount : account,
      }),
    });
    try {
      const json = await setTransaction.json();
      setTransactions(json.transactions);
      e.target.reset();
      setName("");
      setAmount(0);
      setCategory("");
      setAccount("");
      setNewAccount("");
    } catch (error) {
      console.log(error);
    }
  };

  const accounts = transactions &&
    transactions.length > 0 && [
      ...new Set(transactions.map((item) => item.account)),
    ];

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let wantsTotal = 0;
  let needsTotal = 0;

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

  const handleDelete = async (transaction) => {
    const response = await fetch(
      `/api/user/${id}/transactions/${transaction._id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    );

    try {
      const json = await response.json();
      setTransactions(json.transactions);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(editAccount);

  return (
    <>
      <Nav />
      <div className="transactions-home">
        <div className="transactions-container">
          <AddTransaction
            handleSubmit={handleSubmit}
            setName={setName}
            setAccount={setAccount}
            setAmount={setAmount}
            setCategory={setCategory}
            transactions={transactions}
            accounts={accounts}
            account={account}
            setNewAccount={setNewAccount}
          />
          <div className="container">
            <ShowTransactions
              transactions={transactions}
              total={wantsTotal}
              type="wants"
              editHandler={editHandler}
              handleDelete={handleDelete}
            />
            <ShowTransactions
              transactions={transactions}
              total={needsTotal}
              type="needs"
              editHandler={editHandler}
              handleDelete={handleDelete}
            />
          </div>
        </div>
      </div>
      {editAccount && (
        <div className="edit">
          <h1>Edit Transaction</h1>
          <div className="edit-form">
            <form onSubmit={handleEdit}>
              <span>
                <label htmlFor="name">Transaction Name</label>
                <input
                  type="text"
                  placeholder={editAccount.name}
                  defaultValue={editAccount.name}
                  onChange={(e) => setEditName(e.target.value)}
                />
              </span>
              <span>
                <label htmlFor="amount">Amount</label>
                <input
                  type="number"
                  name="amount"
                  id="amount"
                  defaultValue={editAccount.amount}
                  onChange={(e) => setEditAmount(e.target.value)}
                />
              </span>
              <span>
                <label htmlFor="category">Category</label>
                <select
                  name="category"
                  id="category"
                  defaultValue={editAccount.category}
                  required={true}
                  onChange={(e) => setEditCategory(e.target.value)}
                >
                  <option value="" disabled>
                    Select Category
                  </option>
                  <option value="needs">Needs</option>
                  <option value="wants">Wants</option>
                </select>
              </span>
              <span>
                <label htmlFor="account">Account</label>
                <select
                  name="account"
                  id="account"
                  defaultValue={editAccount.account}
                  onChange={(e) => setEditAccountName(e.target.value)}
                >
                  <option value="" disabled>
                    Select Account
                  </option>
                  {accounts.map((account) => {
                    console.log(account);
                    return (
                      <option value={account} key={account}>
                        {account}
                      </option>
                    );
                  })}
                  <option value="other">Other</option>
                </select>
                {editAccountName === "other" && (
                  <span>
                    <label htmlFor="editAccountName">New Account Name</label>
                    <input
                      type="text"
                      id="editAccountName"
                      name="editAccountName"
                      onChange={(e) => setEditNewAccount(e.target.value)}
                    />
                  </span>
                )}
              </span>

              <button>Edit Transaction</button>
              <button id="close" onClick={() => setEditAccount(null)}>
                Close
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Transactions;
