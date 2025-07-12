import { BarChart } from "@mui/x-charts";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function TestChart(props) {
  const { data, testData, amount, interest } = props;

  const bothCharts = data.map((d, i) => {
    return { ...d, ...testData[i] };
  });

  console.log(bothCharts);

  return (
    <BarChart
      margin={{
        left: 40,
        right: 40,
        top: 40,
        bottom: 40,
      }}
      height={300}
      dataset={bothCharts}
      series={[
        {
          dataKey: "amount",
          label: `Original Total ( ${(interest * 100).toFixed(2)} ) %`,
          stackOffset: "none",
          color: ["#ff2c87"],
          stack: "amount",

          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
        },
        {
          dataKey: "testAmount",
          label: `${formatter.format(amount)} Monthly ( ${(
            interest * 100
          ).toFixed(2)} ) %`,
          stack: "test",
          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
          color: ["#58ff5c"],
        },
      ]}
      xAxis={[
        {
          dataKey: "year",
          scaleType: "band",
          label: "Year",
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

export default TestChart;
