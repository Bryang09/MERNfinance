function Allocation(props) {
  console.log(props);

  const { type, percentage, monthly_income, number } = props;
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return (
    <div className={`allocation ${type}`}>
      <span>
        <h5 style={{ textTransform: "capitalize" }}>{type}</h5>
        <h6>{percentage}%</h6>
      </span>
      <h6>
        <span>{formatter.format(monthly_income * number)} </span>/{" "}
        {formatter.format(monthly_income)}
      </h6>
    </div>
  );
}

export default Allocation;
