function DebtsResults(props) {
  const { d, i, formatter, snowball } = props;

  const time = d.balance / d.monthly_payment;

  return (
    <div className="results">
      <h4>{d.account_name}</h4>
      <h4>{formatter.format(d.balance)}</h4>
      <h4>{d.interest_rate}%</h4>
      {i === 0 ? (
        <h4>
          {`${formatter.format(d.monthly_payment)}`}{" "}
          <span>{`( ${formatter.format(snowball)}  )`}</span>
        </h4>
      ) : (
        <h4>{formatter.format(d.monthly_payment)}</h4>
      )}
      <h4>{time.toFixed(2)} months</h4>
    </div>
  );
}

export default DebtsResults;
