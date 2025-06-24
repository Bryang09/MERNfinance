import Overview2 from "../../components/Demo/Overview2";
import NavDemo from "../../components/Demo/Nav";
// import "../../styles/demo.scss";
import "../../styles/demo/overview2.scss";
import { User } from "./User";

function Demo() {
  const user = User;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  // define the percentage for each category based on user goal
  const wantPercent = user.goal === "Debt" ? 0.2 : 0.25;
  const needPercent = 0.35;
  const investmentPercent = user.goal === "Debt" ? 0.2 : 0.25;
  const savingsPercent = user.goal === "Debt" ? 0.1 : 0.15;
  const debtPercent = user.goal === "Debt" ? 0.15 : 0;

  // calculate the allocation for each category
  const wantAllocation = user.monthly_income * wantPercent;
  const needAllocation = user.monthly_income * needPercent;
  const investmentAllocation = user.monthly_income * investmentPercent;
  const savingsAllocation = user.monthly_income * savingsPercent;
  const debtAllocation = user.monthly_income * debtPercent;

  // format the allocations
  const income = formatter.format(user.monthly_income);
  const wants = formatter.format(wantAllocation);
  const needs = formatter.format(needAllocation);
  const investments = formatter.format(investmentAllocation);
  const savings = formatter.format(savingsAllocation);
  const debt = formatter.format(debtAllocation);

  console.log(user);
  return (
    <>
      <NavDemo />
      <div className="home-container">
        <div className="overview-container">
          <h1>
            Hello, <span id="name">{User.name}.</span>
          </h1>
          <div className="allocations">
            <div className="allocation wants">
              <span>
                <h5>Wants</h5>
                <h6>{wantPercent * 100}%</h6>
              </span>
              <h6>
                {wants}/{income}
              </h6>
            </div>
            <div className="allocation needs">
              <span>
                <h5>Needs</h5>
                <h6>{needPercent * 100}%</h6>
              </span>
              <h6>
                {needs}/{income}
              </h6>
            </div>
            <div className="allocation investments">
              <span>
                <h5>Investment</h5>
                <h6>{investmentPercent * 100}%</h6>
              </span>
              <h6>
                {investments}/{income}
              </h6>
            </div>
            <div className="allocation savings">
              <span>
                <h5>Savings</h5>
                <h6>{savingsPercent * 100}%</h6>
              </span>
              <h6>
                {savings}/{income}
              </h6>
            </div>
            <div className="allocation debt">
              <span>
                <h5>Debt</h5>
                <h6>{debtPercent * 100}%</h6>
              </span>
              <h6>
                {debt}/{income}
              </h6>
            </div>
          </div>

          <div className="overview">
            <h2>Account Overview</h2>
            <Overview2 data={User} type="Debt" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Demo;
