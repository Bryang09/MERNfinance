import Overview from "../../components/Demo/Overview";
import NavDemo from "../../components/Nav";
import "../../styles/demo.scss";

function Demo() {
  const User = {
    name: "Bryan",
    monthly_income: 4000,
    goal: "Debt",
    snowball: 40,
    debts: [
      {
        _id: 1,
        account_name: "American Express",
        balance: 3500,
        interest: 32,
        amount_paid: 1750,
        weekly_payment: 50,
      },
      {
        _id: 2,
        account_name: "Chase",
        balance: 5000,
        interest: 30,
        amount_paid: -90,
        weekly_payment: 10,
      },
      {
        _id: 3,
        account_name: "Capital One",
        balance: 200,
        interest: 30,
        amount_paid: 0,
        weekly_payment: 10,
      },
      {
        _id: 4,
        account_name: "Citi",
        balance: 10,
        interest: 32,
        amount_paid: 0,
        weekly_payment: 20,
      },
    ],
    investments: [
      {
        _id: 1,
        account_name: "401k",
        initial_balance: 4000,
        current_balance: 4000,
        weekly_investment: 170,
      },
      {
        _id: 2,
        account_name: "Roth IRA",
        initial_balance: 2000,
        current_balance: 5000,
        weekly_investment: 150,
      },
      {
        _id: 3,
        account_name: "Brokerage Account",
        initial_balance: 100,
        current_balance: 90,
        weekly_investment: 20,
      },
    ],
    savings: [
      {
        _id: 1,
        account_name: "American Express HYSA",
        initial_balance: 2000,
        current_balance: 2000,
      },
    ],
    transactions: [
      {
        transaction_name: "McDonalds",
        transaction_account: "American Express",
        transaction_amount: +50,
        transaction_type: "Wants",
      },
      {
        transaction_name: "Internet",
        transaction_account: "Chase",
        transaction_amount: +80,
        transaction_type: "Needs",
      },
      {
        transaction_name: "Debt",
        transaction_account: "American Express",
        transaction_amount: +50,
        transaction_type: "Debt",
      },
    ],
  };
  return (
    <>
      <NavDemo />
      <div className="home-container">
        <div className="overview-container">
          <h1>
            Hello, <span>{User.name}.</span>
          </h1>
        </div>

        <div className="overview">
          <h2>Account Overview</h2>
          <Overview data={User} type="Debt" />
        </div>
      </div>
    </>
  );
}

export default Demo;
