function Results(props) {
  let { debts, snowball, activeDebt, setActiveDebt } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className="results-container">
      <div className="results-headers">
        <h4>Account Name</h4>
        <h4>Balance</h4>
        <h4>Interest Rate</h4>
        <h4>Weekly Payment</h4>
        <h4>Time Until Payoff</h4>
      </div>
      {debts.map((debt, i) => {
        const timeUntil = debt.balance / debt.weekly_payment;
        const withSnowball =
          debt.balance / (debt.weekly_payment + snowball).toFixed(2);
        const years = timeUntil / 52;
        return (
          <div
            className="results"
            onClick={() => setActiveDebt(debt)}
            key={debt._id}
          >
            <h4>{debt.account_name}</h4>
            <h4>{formatter.format(debt.balance)}</h4>
            <h4>{debt.interest}%</h4>
            {i === 0 ? (
              <h4>
                {`${formatter.format(debt.weekly_payment)}`}{" "}
                <span className="snowball">{`(${formatter.format(
                  snowball
                )})`}</span>
              </h4>
            ) : (
              <h4>{formatter.format(debt.weekly_payment)}</h4>
            )}
            {i === 0 ? (
              <h4>
                {withSnowball < 4
                  ? `${withSnowball.toFixed(2)} weeks`
                  : withSnowball < 52
                  ? `${(withSnowball / 12).toFixed(2)} months`
                  : `${withSnowball.toFixed(2)}`}
              </h4>
            ) : (
              <h4>
                {timeUntil < 4
                  ? `${timeUntil} weeks`
                  : timeUntil < 52
                  ? `${timeUntil / 4} months`
                  : `${years.toFixed(2)} years`}
              </h4>
            )}
          </div>
        );
      })}{" "}
      {activeDebt !== null && (
        <div className="expanded-results">
          <span className="title">
            <h4>{activeDebt.account_name}</h4>
          </span>
          <div className="expanded-view header">
            <h4>Account Balance</h4>
            <h4>Weekly Payment</h4>
            <h4>
              Time To Payoff <br />
              Paying The Minimum
            </h4>
          </div>
          <div className="results">
            <div className="data">
              <h4>{formatter.format(activeDebt.balance)}</h4>
              <h4>{formatter.format(activeDebt.weekly_payment)}</h4>
              {/* Calculate The Timeframe Displayed */}
              {activeDebt.balance / activeDebt.weekly_payment <= 4 ? (
                <h4>{activeDebt.balance / activeDebt.weekly_payment} weeks</h4>
              ) : activeDebt.balance / activeDebt.weekly_payment <= 52 ? (
                <h4>
                  {`${(
                    activeDebt.balance /
                    activeDebt.weekly_payment /
                    4
                  ).toFixed(2)} Months`}
                </h4>
              ) : (
                <h4>
                  {`${(
                    activeDebt.balance /
                    activeDebt.weekly_payment /
                    52
                  ).toFixed(2)} Years`}
                </h4>
              )}
            </div>
          </div>
          <div className="expanded-view header">
            <h4>
              Weekly Payment <br /> Using Snowball
            </h4>
            <h4>Time To Payoff Using Snowball</h4>
            <h4>Percentage Difference</h4>
          </div>
          <div className="results">
            <div className="data">
              {debts.map((debt, i) => {
                const check = debt.account_name === activeDebt.account_name;
                switch (check) {
                  case true:
                    for (let j = 0; j <= i; j++) {
                      const news = debts.filter((a, b) => {
                        return b < i;
                      });

                      news.map((balance) => {
                        snowball += balance.weekly_payment;
                      });

                      let total = debt.weekly_payment + snowball;
                      let division = activeDebt.balance / total;
                      return (
                        <>
                          <h4 key={debt._id}>
                            {`${formatter.format(debt.weekly_payment)}`}
                            <span>{`(${formatter.format(snowball)})`}</span>
                          </h4>
                          <h4>
                            {division < 4
                              ? `${division.toFixed(2)} Weeks`
                              : `${division.toFixed(2) / 4} Months`}
                          </h4>
                        </>
                      );
                    }
                    break;
                }
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default Results;
