import { useEffect, useState } from "react";
import Form from "../../components/app/Investments/Form";
import Nav from "../../components/app/Nav";

function Investments() {
  const id = localStorage.getItem("user");

  const [investments, setInvestments] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [initialAmount, setInitialAmount] = useState(0);
  const [amountInvested, setAmountInvested] = useState(0);
  const [monthly_investment, setMonthlyInvestment] = useState(0);
  const [newAccount, setNewAccount] = useState("");
  const [recurring, isRecurring] = useState(false);
  const [investmentId, setInvestmentId] = useState(0);

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
    const response = await fetch(`/api/user/${id}/investments/`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        account_name: accountName !== "other" ? accountName : newAccount,
        initial_amount: initialAmount,
        amount_invested: amountInvested,
        monthly_investment: recurring,
      }),
    });
    try {
      const json = response.json();
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

  console.log(investments);
  console.log(initialAmount);
  console.log(investmentId);

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
          setInvestmentId={setInvestmentId}
        />
      </div>
    </>
  );
}

export default Investments;
