import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import Nav from "../../../components/app/Nav";

import "../../../styles/app/investment.scss";
import Chart from "../../../components/app/Investments/Investment/Chart";
import ComparisonChart from "../../../components/app/Investments/Investment/ComparisonChart";
import TestChart from "../../../components/app/Investments/Investment/TestChart";

function Investment() {
  const { id } = useParams();

  const [investment, setInvestment] = useState(null);
  const [years, setYears] = useState(10);
  const [data, setData] = useState([]);
  const [load, setLoad] = useState(false);
  const [editData, setEditData] = useState([]);
  const [interestRate, setInterest] = useState(0.07);

  const [testValue, setTestValue] = useState(150);
  const [testData, setTestData] = useState([]);

  useEffect(() => {
    const userId = localStorage.getItem("user");
    const getInvestments = async () => {
      const response = await fetch(`/api/user/${userId}/investments`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      try {
        const json = await response.json();
        const isInvestment = json.filter((investment) => {
          return investment._id === id;
        });
        const result = isInvestment[0];
        setInvestment(result);
        setLoad(true);
      } catch (error) {
        console.log(error);
      }
    };
    getInvestments();
  }, []);

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  function calculateFutureValueWithAnnuity(
    initialInvestment,
    periodicPayment,
    annualInterestRate,
    years,
    paymentsPerYear
  ) {
    // Calculate periodic interest rate and number of periods
    const periodicInterestRate = annualInterestRate / 12;

    // Future Value of the Initial Investment
    const fvInitialInvestment =
      initialInvestment * Math.pow(1 + periodicInterestRate, years);

    // Future Value of the Ordinary Annuity Payments
    const fvAnnuityPayments =
      periodicPayment *
      ((Math.pow(1 + periodicInterestRate, years * paymentsPerYear) - 1) /
        periodicInterestRate);

    // Total Future Value
    const totalFutureValue = fvInitialInvestment + fvAnnuityPayments;

    return totalFutureValue;
  }

  let value = [];

  function investmentBalance(initial, monthly_investment, interest, years) {
    for (let i = 1; i <= years; i++) {
      let amountAtYear = calculateFutureValueWithAnnuity(
        initial,
        monthly_investment,
        interest,
        i,
        12
      );
      let amountInvested = monthly_investment * 12 * i + initial;
      value.push({
        year: i,
        amount: parseInt(amountAtYear.toFixed(2)),
        amount_invested: amountInvested,
        difference: parseInt(
          (amountAtYear.toFixed(2) - amountInvested).toFixed(2)
        ),
      });
      setData(value);
    }
  }

  let edit = [];

  function extraInvestmentBalance(
    additional,
    initial,
    monthly_investment,
    interest,
    years
  ) {
    let newMonthly = monthly_investment + additional;
    for (let i = 1; i <= years; i++) {
      let amountAtYear = calculateFutureValueWithAnnuity(
        initial,
        newMonthly,
        interest,
        i,
        12
      );
      let amountInvested = newMonthly * 12 * i + initial;
      edit.push({
        year: i,
        extraAmount: parseInt(amountAtYear.toFixed(2)),
        extraAmountInvested: amountInvested,
        extraDifference: parseInt(
          (amountAtYear.toFixed(2) - amountInvested).toFixed(2)
        ),
      });
      setEditData(edit);
    }
  }

  function extra(amount, years, interest) {
    extraInvestmentBalance(
      amount,
      investment.amount_invested,
      investment.monthly_investment,
      interest,
      years
    );
  }

  let test = [];

  function testInvestmentBalance(initial, amount, interest, years) {
    for (let i = 1; i <= years; i++) {
      let amountAtYear = calculateFutureValueWithAnnuity(
        initial,
        amount,
        interest,
        i,
        12
      );
      let amountInvested = amount * 12 * i + initial;
      test.push({
        year: i,
        testAmount: parseInt(amountAtYear.toFixed(2)),
        testAmountInvested: amountInvested,
        testDifference: parseInt(
          (amountAtYear.toFixed(2) - amountInvested).toFixed(2)
        ),
      });
      setTestData(test);
    }
  }

  const testDifferent = (e) => {
    e.preventDefault();
    testInvestmentBalance(
      investment.amount_invested,
      testValue,
      interestRate,
      years
    );
  };

  function onLoad() {
    investmentBalance(
      investment.amount_invested,
      investment.monthly_investment,
      0.07,
      10
    );
    extraInvestmentBalance(
      100,
      investment.amount_invested,
      investment.monthly_investment,
      0.07,
      10
    );
    testInvestmentBalance(investment.amount_invested, 150, 0.07, 10);

    setLoad(false);
    setYears(10);
  }

  function setChart(years, interest) {
    investmentBalance(
      investment.amount_invested,
      investment.monthly_investment,
      interest,
      years
    );
    setYears(years);
  }

  function changeInterestRate(rate) {
    console.log(`years: ${years}`);
    console.log(`rate: ${rate}`);
    setInterest(rate);
    setChart(years, rate);
    extra(100, years, rate);
    testInvestmentBalance(investment.amount_invested, testValue, rate, years);
  }

  function changeYears(year) {
    setYears(year);
    setChart(year, interestRate);
    extra(100, year, interestRate);
    testInvestmentBalance(
      investment.amount_invested,
      testValue,
      interestRate,
      year
    );
  }

  return (
    <>
      <Nav />
      {load === true && onLoad()}
      {investment && (
        <div className="investment">
          <div className="investment-headers">
            <h1>{investment.account_name}</h1>
            <h3>
              You are currently investing{" "}
              {formatter.format(investment.monthly_investment)} / month
            </h3>
          </div>

          <div className="information">
            {investment && (
              <div className="info-container">
                <div className="buttons-container">
                  <h5
                    onClick={() => changeYears(10)}
                    className={years == 10 ? "active" : ""}
                  >
                    10 Years
                  </h5>
                  <h5
                    onClick={() => changeYears(30)}
                    className={years == 30 ? "active" : ""}
                  >
                    30 Years
                  </h5>
                  <h5
                    onClick={() => changeYears(40)}
                    className={years == 40 ? "active" : ""}
                  >
                    40 Years
                  </h5>
                </div>{" "}
                <div style={{ textAlign: "center" }}>
                  <h4>Interest Rate</h4>
                  <h6>* 7% Accounts For Inflation </h6>
                  <h6>* 10% Is The Average Return On The S&P 500</h6>
                </div>
                <div className="buttons-container">
                  <h5
                    className={
                      interestRate == 0.07 ? "active_rate interest" : "interest"
                    }
                    onClick={() => changeInterestRate(0.07)}
                  >
                    7%
                  </h5>
                  <h5
                    className={
                      interestRate == 0.1 ? "active_rate interest" : "interest"
                    }
                    onClick={() => changeInterestRate(0.1)}
                  >
                    10%
                  </h5>
                </div>
                <div className="chart-container">
                  <Chart data={data} interest={interestRate} />
                </div>
                <div className="if-container">
                  <h3>If you can save an extra $100 per month</h3>
                  <h6>* Amounts Shown With Interest Added</h6>
                  <div className="cart-container">
                    <ComparisonChart
                      data={data}
                      editData={editData}
                      interest={interestRate}
                      original={investment.monthly_investment}
                    />
                  </div>
                </div>
                <div className="if-container">
                  <h3>Check How Much An Investement Could Be Worth</h3>
                  <h5>
                    <form onSubmit={(e) => testDifferent(e)}>
                      <input
                        type="number"
                        defaultValue={testValue}
                        onChange={(e) => setTestValue(e.target.value)}
                        required={true}
                      />
                      <button>Submit</button>
                    </form>
                  </h5>
                  <div className="cart-container">
                    <TestChart
                      data={data}
                      testData={testData}
                      amount={testValue}
                      interest={interestRate}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}

export default Investment;
