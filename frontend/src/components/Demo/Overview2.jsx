import OverviewDebts from "./OverviewDebts";
import OverviewInvestemnts from "./OverviewInvestments";
import { useState, useEffect } from "react";

function Overview2(data) {
  //   data is passed as a prop, containing user data
  const res = data.data;
  console.log(data);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  //   seperating the data into state variables
  const [userData, setData] = useState(res);
  const [debts, setDebts] = useState(res.debts);
  const [investments, setInvestments] = useState(res.investments);
  const [income] = useState(res.monthly_income);

  console.log(userData);

  //   filter debts to only include balance greater than 0
  const filterDebts = debts
    .filter((debt) => debt.balance > 0)
    .sort((a, b) => a.balance - b.balance);
  console.log(filterDebts);

  const investmentsSort = investments.sort(
    (a, b) => b.current_balance - a.current_balance
  );

  //   const investments = res.investments;
  console.log(investmentsSort);
  return (
    <>
      <div className="overview-section">
        <h3>Debts</h3>
        <div className="section debt-section">
          <div className="result-headers">
            <h5>Account Name</h5>
            <h5>Balance</h5>
            <h5>Interest Rate</h5>
            <h5>Weekly Payment</h5>
            <h5>Time Remaining</h5>
          </div>

          {res.debts.length > 0 ? (
            filterDebts.map((d, i) => {
              const remaining = d.balance - d.amount_paid;
              const timeRemaining =
                i === 0
                  ? remaining / (d.weekly_payment + res.snowball)
                  : remaining / d.weekly_payment;
              const years = Math.round(timeRemaining / 52);
              const months = Math.round(timeRemaining / 4);
              return (
                <div
                  className={
                    i === 0 ? "result result-active" : "result debt-result"
                  }
                  key={d._id}
                >
                  <h5>{d.account_name}</h5>
                  <h5>$ {remaining}</h5>
                  <h5>{d.interest}%</h5>
                  <h5>
                    ${" "}
                    {i === 0
                      ? `${d.weekly_payment}+( $ ${res.snowball} )`
                      : d.weekly_payment}
                  </h5>
                  <h5>
                    {i === 0
                      ? `${Math.ceil(timeRemaining)} weeks `
                      : timeRemaining > 52
                      ? `${years} years`
                      : `${months} months`}
                  </h5>
                </div>
              );
            })
          ) : (
            <div>
              <h3>Balances will appear here</h3>
            </div>
          )}
        </div>
      </div>
      <div className="overview-section">
        <h3>Investments</h3>
        <div className="section debt-section">
          <div className="result-headers">
            <h5>Account Name</h5>
            <h5>Balance</h5>
            <h5>% Change</h5>
            <h5>Weekly Investment</h5>
            <h5>52 Weeks</h5>
          </div>

          {res.investments.length > 0 ? (
            investmentsSort.map((d, i) => {
              const change =
                ((d.current_balance - d.initial_balance) / d.initial_balance) *
                100;

              const yearlyAmount = Math.round(
                d.current_balance + d.weekly_investment * 52
              );
              const yearly = formatter.format(yearlyAmount);

              return (
                <div className="result debt-result" key={d._id}>
                  <h5>{d.account_name}</h5>
                  <h5>$ {d.current_balance}</h5>
                  <h5
                    className={
                      change > 0
                        ? "positive"
                        : change == 0
                        ? "neutral"
                        : "negative"
                    }
                  >
                    {change}%
                  </h5>
                  <h5>$ {d.weekly_investment}</h5>
                  <h5>{yearly}</h5>
                </div>
              );
            })
          ) : (
            <div>
              <h3>Balances will appear here</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Overview2;
