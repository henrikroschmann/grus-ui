import { VictoryChart, VictoryLine, VictoryAxis } from "victory";

const LineChart = () => {
  const data = [
    { x: 1, y: 2 },
    { x: 2, y: 3 },
    { x: 3, y: 5 },
    { x: 4, y: 4 },
    { x: 5, y: 7 },
    { x: 6, y: 6 },
    { x: 7, y: 8 }
  ];

  return (
    <VictoryChart>
      <VictoryAxis
        tickValues={[1, 2, 3, 4, 5, 6, 7]}
        tickFormat={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
      />
      <VictoryAxis dependentAxis />
      <VictoryLine data={data} />
    </VictoryChart>
  );
};

export default LineChart;