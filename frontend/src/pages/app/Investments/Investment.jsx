import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BarChart } from "@mui/x-charts";

import Nav from "../../../components/app/Nav";

import "../../../styles/app/investment.scss";

function Investment() {
  const { id } = useParams();

  const [investment, setInvestment] = useState(null);
  const [years, setYears] = useState(10);
  const [data, setData] = useState([]);
  const [time, setTimes] = useState(0);
  const [load, setLoad] = useState(false);

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
      console.log(value);
    }
  }

  function onLoad() {
    investmentBalance(
      investment.amount_invested,
      investment.monthly_investment,
      0.07,
      10
    );
    setLoad(false);
    setYears(10);
  }

  function setChart(years) {
    investmentBalance(
      investment.amount_invested,
      investment.monthly_investment,
      0.07,
      years
    );
    setYears(years);
  }

  return (
    <>
      <Nav />
      {load === true && onLoad()}
      {investment && (
        <div className="investment">
          <div className="headers">
            <h1>{investment.account_name}</h1>
          </div>
          <div className="information">
            {investment && (
              <div className="info-container">
                <div className="buttons-container">
                  <h5
                    onClick={() => setChart(10)}
                    className={years == 10 && "active"}
                  >
                    10 Years
                  </h5>
                  <h5
                    onClick={() => setChart(30)}
                    className={years == 30 && "active"}
                  >
                    30 Years
                  </h5>
                  <h5
                    onClick={() => setChart(40)}
                    className={years == 40 && "active"}
                  >
                    40 Years
                  </h5>
                </div>
                <div className="chart-container">
                  <BarChart
                    margin={{
                      left: 40,
                      right: 40,
                      top: 40,
                      bottom: 40,
                    }}
                    height={300}
                    // width={900}
                    dataset={data}
                    series={[
                      {
                        dataKey: "amount_invested",
                        label: "Amount Invested",
                        stack: "amount",

                        valueFormatter: (v) =>
                          v === null ? "" : formatter.format(v),
                      },
                      {
                        dataKey: "difference",
                        label: "Interest Gained",
                        stack: "amount",
                        stackOffset: "none",
                        color: ["#35ffc6"],
                        valueFormatter: (v) =>
                          v === null ? "" : formatter.format(v),
                      },
                      {
                        dataKey: "amount",
                        label: "Total",
                        stackOffset: "none",
                        color: ["#ff000000"],
                        stack: "amount",

                        valueFormatter: (v) =>
                          v === null ? "" : formatter.format(v),
                      },
                    ]}
                    xAxis={[
                      {
                        dataKey: "year",
                        scaleType: "band",
                        label: "Year",
                        // categoryGapRatio: 0,
                      },
                    ]}
                    yAxis={[
                      {
                        width: 80,
                        valueFormatter: (v) =>
                          v === null ? "" : formatter.format(v),
                      },
                    ]}
                  />
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
