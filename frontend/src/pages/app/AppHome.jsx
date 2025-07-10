import { Link, useParams } from "react-router-dom";
import Nav from "../../components/app/Nav";
import { useEffect, useState } from "react";
import Allocations from "../../components/app/Home/Allocations";

import "../../styles/app/home.scss";

function AppHome() {
  const id = localStorage.getItem("user");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const response = await fetch(`/api/user/${id}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const json = await response.json();
      setUser(json);
    };
    getUser();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  let investmentBalance = 0;
  let weeklyInvestemnt = 0;
  let yearlyInvestment = 0;

  console.log(user);
  return (
    <>
      <Nav />
      <div className="home-container">
        {user && (
          <div className="overview-container">
            <h1>
              Hello, <span id="name">{user.name}</span>
            </h1>
            <div className="allocations">
              <Allocations monthly_income={user.monthly_income} />
            </div>
            <div className="overview">
              <h2>Account Overview</h2>

              <div className="overview-section">
                <h3>Debts</h3>

                {user.debts.length > 0 ? (
                  <div className="section debt-section">
                    <div className="result-headers">
                      <h5>Account Name</h5>
                      <h5>Balance</h5>
                      <h5>Interest Rate</h5>
                      <h5>Weekly Payment</h5>
                      <h5>Time Remaining</h5>
                    </div>
                    <div>
                      <h1>debts</h1>
                    </div>
                  </div>
                ) : (
                  <div className="empty-section empty-debt">
                    <h2>Debts Will Appear Here</h2>
                    <span>
                      <a href="">
                        <h4>Add Debt</h4>
                      </a>
                    </span>
                  </div>
                )}
              </div>
              <div className="overview-section">
                <Link to="/investments">
                  <h3>Investments</h3>
                </Link>

                {user.investments.length > 0 ? (
                  <div className="section debt-section">
                    <div className="result-headers">
                      <h5>Account Name</h5>
                      <h5>Balance</h5>
                      <h5>Percent Change</h5>
                      <h5>Monthly Investment</h5>
                      <h5>Yearly</h5>
                    </div>
                    {user.investments.map((investment) => {
                      investmentBalance += investment.amount_invested;
                      weeklyInvestemnt += investment.monthly_investment;
                      yearlyInvestment += investment.monthly_investment * 12;

                      const percentage =
                        ((investment.amount_invested -
                          investment.initial_amount) /
                          investment.initial_amount) *
                        100;

                      const yearlyAmount = Math.round(
                        investment.amount_invested +
                          investment.monthly_investment * 12
                      );
                      const yearly = formatter.format(yearlyAmount);
                      return (
                        <div className="result debt-result">
                          <h5>{investment.account_name}</h5>
                          <h5>
                            {formatter.format(investment.amount_invested)}
                          </h5>
                          <h5
                            className={
                              percentage > 0
                                ? "positive"
                                : percentage === 0
                                ? "neutral"
                                : "negative"
                            }
                          >
                            {percentage.toFixed(2)}%
                          </h5>
                          <h5>
                            {formatter.format(investment.monthly_investment)}
                          </h5>
                          <h5>{yearly}</h5>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="empty-section empty-investments">
                    <h2>Investments Will Appear Here</h2>
                    <span>
                      <Link to="/investments">
                        <h4>Add Investments</h4>
                      </Link>
                      <a href=""></a>
                    </span>
                  </div>
                )}
                <div className="section">
                  <div className="result debt-result">
                    <h5>Total</h5>
                    <h5>{formatter.format(investmentBalance)}</h5>
                    <h5></h5>
                    <h5>{formatter.format(weeklyInvestemnt)}</h5>
                    <h5>{formatter.format(yearlyInvestment)}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AppHome;
