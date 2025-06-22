import { LineChart } from "@mui/x-charts";
import { useState } from "react";

function DemoInvestmentResults(res) {
  console.log(res);
  const { investments, type } = res;
  console.log(investments);

  let [expanded, setExpandedView] = useState(false);
  const [expandedResults, setExpandedResults] = useState({});

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function calculateRecurringInvestment(
    payment,
    annualInterestRate,
    years,
    compoundingFrequency
  ) {
    // Calculate the interest rate per compounding period
    const r = annualInterestRate / compoundingFrequency;

    // Calculate the total number of compounding periods
    const n = years * compoundingFrequency;

    // Apply the future value of ordinary annuity formula
    const futureValue = payment * ((Math.pow(1 + r, n) - 1) / r);

    return futureValue;
  }

  function handleClick(results) {
    console.log(expandedResults.length);
    if (expandedResults.length == 0 || expandedResults) {
      setExpandedView(true);
    }
    if (results == expandedResults) {
      setExpandedView(!expanded);
    }

    setExpandedResults(results);
  }

  const { account_name } = expandedResults;

  const current_balance = formatter.format(expandedResults.current_balance);
  const initial_balance = formatter.format(expandedResults.initial_balance);
  const difference =
    expandedResults.current_balance - expandedResults.initial_balance;
  const percentDifference =
    (difference / expandedResults.initial_balance) * 100;

  const yearly = parseInt(
    calculateRecurringInvestment(
      expandedResults.weekly_investment * 4,
      0.07,
      1,
      12
    ).toFixed(2)
  );

  const yearlyForm = yearly + expandedResults.current_balance;
  const yearlyFormat = formatter.format(yearlyForm);
  const yearlyInves = yearlyForm - expandedResults.current_balance;
  const investedYear =
    expandedResults.weekly_investment * 4 * 12 +
    expandedResults.current_balance;
  const investedYearly = formatter.format(investedYear);

  const diffYear = (((yearlyForm - investedYear) / investedYear) * 100).toFixed(
    2
  );

  const tenYear =
    parseInt(expandedResults.current_balance) +
    parseInt(
      calculateRecurringInvestment(
        expandedResults.weekly_investment * 4,
        0.07,
        10,
        12
      ).toFixed(2)
    );

  const tenYearForm = tenYear + expandedResults.current_balance;
  const tenYearFormat = formatter.format(tenYearForm);
  const tenYearInves = tenYearForm - expandedResults.current_balance;
  const investedTenYear =
    expandedResults.weekly_investment * 4 * 12 * 10 +
    expandedResults.current_balance;

  const investedTenYears = formatter.format(investedTenYear);

  const diffTenYear = (
    ((tenYearForm - investedTenYear) / investedTenYear) *
    100
  ).toFixed(2);

  return (
    <div className="show-investment-container">
      <h3>{type}</h3>
      <div className="show-investment">
        <div className="headers">
          <h4>Account Type</h4>
          <h4>Account Balance</h4>
          <h4>Weekly Contribution</h4>
          <h4>% Change</h4>
          {/* <h4>10 Years</h4> */}
        </div>
        {investments.map((investment) => {
          const percent =
            ((investment.current_balance - investment.initial_balance) /
              investment.initial_balance) *
            100;

          return (
            <>
              <div className="results" onClick={() => handleClick(investment)}>
                <h5>{investment.account_name}</h5>
                <h5>{formatter.format(investment.current_balance)}</h5>
                <h5>{formatter.format(investment.weekly_investment)}</h5>
                <h5
                  className={
                    percent > 0
                      ? "positive"
                      : percent < 0
                      ? "negative"
                      : "neutral"
                  }
                >{`${percent.toFixed(2)}%`}</h5>
              </div>
            </>
          );
        })}

        {expanded && (
          <div className={expanded ? "results expanded-results" : "hidden"}>
            <span className="title">
              <h4>{account_name}</h4>
              <span>
                <h6 onClick={() => setExpandedView(false)}>x</h6>
              </span>
            </span>
            <div className="expanded-view header">
              <h4>Initial Balance</h4>
              <h4>Current Balance</h4>
              <h4>% Change</h4>
            </div>
            <div className="results">
              <div className="data">
                <h4>{initial_balance}</h4>
                <h4>{current_balance}</h4>
                <h4
                  className={
                    percentDifference > 0
                      ? "positive"
                      : percentDifference == 0
                      ? "neutral"
                      : "negative"
                  }
                >{`${percentDifference.toFixed(2)}%`}</h4>
                {/* <h4>{`${yearlyFormat}(${investedYearly})`}</h4>
                <h4>{`${tenYearFormat}(${investedTenYears})`}</h4> */}
              </div>
            </div>
            <div className="expanded-view header">
              <h4>
                Expected Invested
                <br /> 1 Year
              </h4>
              <h4>
                Expected Balance <br />1 Year
              </h4>
              <h4>
                Expected Investment <br />
                Gains
              </h4>
            </div>
            <div className="results">
              <div className="data">
                <h4>{investedYearly}</h4>
                <h4>{yearlyFormat}</h4>
                <h4
                  className={
                    diffYear > 0
                      ? "positive"
                      : diffYear < 0
                      ? "negative"
                      : "neutral"
                  }
                >
                  {diffYear}%
                </h4>
              </div>
            </div>
            <div className="expanded-view header">
              <h4>
                Expected Invested
                <br /> 10 Year
              </h4>
              <h4>
                Expected Balance
                <br /> 10 Year
              </h4>
              <h4>
                Expected Investment
                <br /> Gains
              </h4>
            </div>
            <div className="data">
              <h4>{investedTenYears}</h4>
              <h4>{tenYearFormat}</h4>
              <h4
                className={
                  diffYear > 0
                    ? "positive"
                    : diffYear < 0
                    ? "negative"
                    : "neutral"
                }
              >
                {diffTenYear}%
              </h4>
            </div>
          </div>
        )}

        <div className="total">
          <h5>Total</h5>
          <h5></h5>
        </div>
      </div>
    </div>
  );
}
export default DemoInvestmentResults;
