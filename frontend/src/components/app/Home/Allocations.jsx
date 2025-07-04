import Allocation from "./Allocation";

function Allocations(props) {
  const { monthly_income } = props;

  const figures = [
    {
      type: "wants",
      percentage: 20,
      number: 0.2,
      monthly_income,
    },
    {
      type: "needs",
      percentage: 35,
      number: 0.35,
      monthly_income,
    },
    {
      type: "investments",
      percentage: 20,
      number: 0.2,
      monthly_income,
    },
    {
      type: "savings",
      percentage: 10,
      number: 0.1,
      monthly_income,
    },
    {
      type: "debt",
      percentage: 15,
      number: 0.15,
      monthly_income,
    },
  ];

  return (
    <>
      {figures.map((allocation, i) => {
        const { type, percentage, number, monthly_income } = allocation;
        return (
          <Allocation
            type={type}
            number={number}
            percentage={percentage}
            monthly_income={monthly_income}
            key={i}
          />
        );
      })}
    </>
  );
}
export default Allocations;
