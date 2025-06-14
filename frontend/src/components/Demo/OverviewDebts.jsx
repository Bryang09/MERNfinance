import { Link } from "react-router-dom";

function OverviewDebts(data) {
  console.log(data);
  const d = data.data;
  console.log(d);

  // calulate remaining balance
  const remaining = d.balance - d.amount_paid;
  // calculate weeks remaining
  const weeks_remaining = remaining / d.weekly_payment;
  // percentage of difference between amount paid and initial balance
  const percentageAmount = d.amount_paid / d.balance;
  // return the difference as percentage
  const percentage = Math.round(percentageAmount * 10000) / 100;

  const years = Math.round(weeks_remaining / 52);
  const months = Math.round(weeks_remaining / 4);
  const weeks = Math.round(weeks_remaining);

  return (
    <tr key={d._id}>
      <td to={`/demo/debts/${d._id}`}>
        <Link>{d.account_name}</Link>
      </td>
      <td>
        <Link to={`/demo/debts/${d._id}`}>$ {remaining}</Link>
      </td>
      <td>
        <Link to={`/demo/debts/${d._id}`}>{d.interest}%</Link>
      </td>
      <td>
        <Link
          className={
            percentage > 0
              ? "positive"
              : percentage === 0
              ? "neutral"
              : "negative"
          }
          to={`/demo/debts/${d._id}`}
        >
          {percentage}%
        </Link>
      </td>
      {/* <td>$ {d.weekly_payment}</td>
      <td>
        {weeks_remaining > 52
          ? `${years} years`
          : weeks_remaining > 4
          ? `${months} months`
          : `${weeks} weeks`}
      </td> */}
    </tr>
  );
}

export default OverviewDebts;
