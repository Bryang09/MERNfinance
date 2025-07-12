import { CiEdit } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";

function Results(props) {
  const { investments, editHandler, handleDelete } = props;

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="results-container">
      <h3>Investments</h3>
      <div className="show-investment">
        <div className="results-headers">
          <h4>Account Type</h4>
          <h4>Account Balance</h4>
          <h4>Monthly Contributions</h4>
          <h4>% Change</h4>
        </div>
      </div>
      {investments.map((investment) => {
        const percent =
          ((investment.amount_invested - investment.initial_amount) /
            investment.initial_amount) *
          100;
        return (
          <div className="results investments_results" key={investment._id}>
            <h4>
              <Link to={`/investments/${investment._id}`}>
                {investment.account_name}
              </Link>
            </h4>
            <h4>{formatter.format(investment.amount_invested)}</h4>
            <h4>{formatter.format(investment.monthly_investment)}</h4>
            <h4
              className={
                percent > 0 ? "positive" : percent < 0 ? "negative" : "neutral"
              }
            >
              {percent.toFixed(2)}%
              <span className="svg-container">
                <CiEdit onClick={() => editHandler(investment)} />

                <MdDelete onClick={() => handleDelete(investment)} />
              </span>
            </h4>
          </div>
        );
      })}
    </div>
  );
}
export default Results;
