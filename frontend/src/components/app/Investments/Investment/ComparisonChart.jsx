import { BarChart } from "@mui/x-charts";
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

function ComparisonChart(props) {
  const { data, editData, interest, original } = props;
  const bothCharts = data.map((d, i) => {
    return { ...d, ...editData[i] };
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
          label: `${formatter.format(original)} ( ${(interest * 100).toFixed(
            2
          )} ) %`,
          stackOffset: "none",
          color: ["#ff6eff"],
          stack: "amount",

          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
        },

        {
          dataKey: "extraAmount",
          label: `${formatter.format(original + 100)} ( ${(
            interest * 100
          ).toFixed(2)} ) %`,
          stack: "extra",

          valueFormatter: (v) => (v === null ? "" : formatter.format(v)),
          color: ["#f6c36f"],
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

export default ComparisonChart;
