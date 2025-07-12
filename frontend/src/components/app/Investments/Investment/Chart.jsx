import { BarChart } from "@mui/x-charts";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});
function Chart(props) {
  const { data, interest } = props;
  return (
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
          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
        },
        {
          dataKey: "difference",
          label: `Interest Gained ( ${(interest * 100).toFixed(2)} ) %`,
          stack: "amount",
          stackOffset: "none",
          color: ["#35ffc6"],
          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
        },
        {
          dataKey: "amount",
          label: "Total",
          stackOffset: "none",
          color: ["#ff000000"],
          stack: "amount",

          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
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
          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
        },
      ]}
    />
  );
}
export default Chart;
