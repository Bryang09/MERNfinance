import OverviewDebts from "./OverviewDebts";
import OverviewInvestemnts from "./OverviewInvestments";

function Overview(data) {
  const res = data.data;

  const debts = data.data.debts;
  const filterDebts = debts.filter((debt) => debt.balance > 0);
  console.log(filterDebts);

  const debtsSort = filterDebts.sort((a, b) => a.balance - b.balance);
  let price = debtsSort[0].weekly_payment;

  price += res.snowball;

  console.log(price);
  console.log(debtsSort);
  debtsSort[0].weekly_payment = price;
  console.log(debtsSort);

  const investments = data.data.investments;
  const investmentsSort = investments.sort(
    (a, b) => b.current_balance - a.current_balance
  );

  return (
    <>
      <div className="overview-section">
        <h3>Debts</h3>
        <div className="section debt-section">
          {res.debts.length > 0 ? (
            <table>
              <tbody>
                <tr className="labels">
                  <th>Account Name</th>
                  <th>Balance</th>
                  <th>Interest Rate</th>
                  <th>% Change</th>
                </tr>

                {/* <th>Weekly Payment</th>
                <th>Until Payoff</th> */}
                {debtsSort.map((d) => {
                  return <OverviewDebts data={d} key={d._id} />;
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <h3>Balances will appear hear</h3>
            </div>
          )}
        </div>
      </div>
      <div className="overview-section">
        <h3>Investments</h3>
        <div className="section">
          {res.investments.length > 0 ? (
            <table>
              <tbody>
                <tr className="labels">
                  <th>Account Name</th>
                  <th>Balance</th>
                  <th>% Change</th>

                  <th>Weekly Investment</th>
                </tr>

                {/* <th>52 Week Balance</th>
                <th>Possible Balance At 65</th> */}
                {investmentsSort.map((d) => {
                  return <OverviewInvestemnts data={d} key={d._id} />;
                })}
              </tbody>
            </table>
          ) : (
            <div>
              <h3>Balances will appear hear</h3>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
export default Overview;
