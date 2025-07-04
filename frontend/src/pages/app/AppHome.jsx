import { useParams } from "react-router-dom";
import Nav from "../../components/app/Nav";
import { useEffect, useState } from "react";
import Allocations from "../../components/app/Home/Allocations";

import "../../styles/app/home.scss";

function AppHome() {
  const { id } = useParams();
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
                <h3>Investments</h3>
                {user.investments.length > 0 ? (
                  <div className="section debt-section">
                    <div className="result-headers">
                      <h5>Account Name</h5>
                      <h5>Balance</h5>
                      <h5>Interest Rate</h5>
                      <h5>Weekly Payment</h5>
                      <h5>Time Remaining</h5>
                    </div>
                    <div>
                      <h1>investments</h1>
                    </div>
                  </div>
                ) : (
                  <div className="empty-section empty-investments">
                    <h2>Investments Will Appear Here</h2>
                    <span>
                      <a href="">
                        <h4>Add Investments</h4>
                      </a>
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AppHome;
