import { Link, useNavigate } from "react-router-dom";

function OverviewInvestemnts(data) {
  const d = data.data;

  const percentageChange =
    (d.current_balance - d.initial_balance) / d.initial_balance;

  const percentage = Math.round(percentageChange * 10000) / 100;
  const yearly = (d.current_balance + d.weekly_investment * 52).toLocaleString(
    "en-US"
  );

  function getInvestment() {
    //   calculate investments

    // current balance
    let current = d.current_balance;
    //   monthly contributions
    let contributions = d.weekly_investment * 4;
    // Interest Rate
    let rate = 0.07;
    // time in years ( will be dynamic )
    let time = 65 - 28;
    //  loop through the years
    for (let i = 1; i < time * 12; i++) {
      current += contributions;
      current += current * (rate / 12);
    }
    let res = current.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return res;
  }

  return (
    // <Link>
    <tr key={d._id}>
      <td>
        <Link to={`/demo/investments/${d._id}`}>{d.account_name}</Link>
      </td>
      <td>
        <Link to={`/demo/investments/${d._id}`}>${d.current_balance}</Link>
      </td>
      <td>
        <Link
          to={`/demo/investments/${d._id}`}
          className={
            percentage > 0
              ? "positive"
              : percentage === 0
              ? "neutral"
              : "negative"
          }
        >
          {percentage}%
        </Link>
      </td>
      <td>
        <Link to={`/demo/investments/${d._id}`}>$ {d.weekly_investment}</Link>
      </td>
      {/*  <td>$ {yearly}</td>
      <td>$ {getInvestment()}</td> */}
    </tr>
    // </Link>
  );
}

export default OverviewInvestemnts;
