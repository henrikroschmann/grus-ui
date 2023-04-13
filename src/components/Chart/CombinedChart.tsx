import { VictoryArea, VictoryChart, VictoryGroup, VictoryLegend } from "victory";

interface ICombinedChartProps {
  chartWidth: number
}

const CombinedChart = ({chartWidth}:ICombinedChartProps) => {
  const data = [
    { month: 1, expenses: 100, savings: 200, income: 300 },
    { month: 2, expenses: 200, savings: 300, income: 400 },
    { month: 3, expenses: 300, savings: 400, income: 500 },
    { month: 4, expenses: 400, savings: 500, income: 600 },
    { month: 5, expenses: 500, savings: 600, income: 700 },
    { month: 6, expenses: 600, savings: 700, income: 800 },
    { month: 7, expenses: 700, savings: 800, income: 900 },
    { month: 8, expenses: 800, savings: 900, income: 1000 },
    { month: 9, expenses: 900, savings: 1000, income: 1100 },
    { month: 10, expenses: 1000, savings: 1100, income: 1200 },
    { month: 11, expenses: 1100, savings: 1200, income: 1300 },
    { month: 12, expenses: 1200, savings: 1300, income: 1400 },
  ];

  const colors = ["tomato", "orange", "gold"];
  const types = ["expenses", "savings", "income"];

  const areaComponents = types.map((type, i) => {
    return (
      <VictoryArea
        key={type}
        data={data}
        x="month"
        y={type}
        style={{ data: { fill: colors[i] } }}
      />
    );
  });

  return (
    <>
      {chartWidth && (
        <VictoryChart width={chartWidth} height={400}>
          <VictoryGroup offset={10}>
            {areaComponents}
          </VictoryGroup>
          <VictoryLegend
            x={chartWidth / 2}
            y={360}
            orientation="horizontal"
            gutter={20}
            data={[
              { name: "Expenses", symbol: { fill: colors[0] } },
              { name: "Savings", symbol: { fill: colors[1] } },
              { name: "Income", symbol: { fill: colors[2] } },
            ]}
          />
        </VictoryChart>
      )}
    </>
  );
};

export default CombinedChart;
