import { useEffect, useState } from "react";
import { signup } from "../services/api";

import "../styles/app/signup.scss";
import Nav from "../components/app/Nav";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();

  const [error, setError] = useState(false);
  const [loading, isLoading] = useState(true);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [income, setIncome] = useState(null);
  const [goal, setGoal] = useState(null);
  const [disabled, isButtonDisabled] = useState(true);

  useEffect(() => {
    if (name && email && password && income && goal !== null) {
      isButtonDisabled(false);
    } else {
      isButtonDisabled(true);
    }
  }, [name, email, goal, income, password]);

  async function handleSubmit(e) {
    e.preventDefault();
    const response = await fetch("/api/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body: JSON.stringify({
        email: email,
        password: password,
        name: name,
        monthly_income: income,
        goal: goal,
      }),
    });
    const json = await response.json();

    try {
      localStorage.setItem("token", json.token);
      console.log(json.user);
      navigate(`/home/${json.user._id}`);
    } catch (error) {
      console.log(error);
      console.log(json.user);
    } finally {
      isLoading(false);
    }
  }

  return (
    <>
      {/* <Nav /> */}
      <div className="signup-page">
        <h1>Create Account</h1>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <span className="form-section">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                required={true}
                autoComplete="name"
                onChange={(e) => setName(e.target.value)}
              />
            </span>
            <span className="form-section">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required={true}
                onChange={(e) => setEmail(e.target.value)}
              />
            </span>
            <span className="form-section">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                required={true}
                autoComplete="new-password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </span>
            <span className="form-section">
              <label htmlFor="income">Monthly Income</label>
              <input
                type="number"
                name="income"
                id="income"
                required={true}
                onChange={(e) => setIncome(e.target.value)}
              />
            </span>
            <span className="form-section">
              <div className="goal">
                <h3>What Is Your Goal?</h3>
                <span>
                  <h5
                    id={goal === "debt" ? "debt_active" : "debt"}
                    onClick={() => setGoal("debt")}
                  >
                    Debt
                  </h5>
                  <h5
                    id={
                      goal === "investment" ? "investment_active" : "investment"
                    }
                    onClick={() => setGoal("investment")}
                  >
                    Investment
                  </h5>
                </span>
              </div>
            </span>
            <button
              type="submit"
              id={!disabled ? "create_account" : "disabled_button"}
              disabled={disabled}
            >
              Create Account
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
