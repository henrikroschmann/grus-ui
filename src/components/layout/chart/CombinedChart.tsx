import React from "react";
import { faker } from '@faker-js/faker';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLine, VictoryStack } from "victory";

const generateData = () => {
  const data = [];

  for (let i = 1; i <= 12; i++) {
    const expenses = faker.finance.amount(500, 1500, 2);
    const savings = faker.finance.amount(0, 1000, 2);
    const income = faker.finance.amount(2000, 4000, 2);

    data.push({ month: i, expenses: expenses, savings: savings, income: income });
  }

  return data;
};

const CombinedChart = () => {
  const data = generateData();

  return (
    <VictoryChart>
      <VictoryAxis tickValues={data.map(d => d.month)} />
      <VictoryAxis dependentAxis />
      <VictoryStack>
        <VictoryBar data={data} x="month" y="expenses" />
        <VictoryBar data={data} x="month" y="savings" />
        <VictoryBar data={data} x="month" y="income" />
      </VictoryStack>
      <VictoryLine data={data} x="month" y="savings" />
      <VictoryLine data={data} x="month" y="income" />
    </VictoryChart>
  );
};

export default CombinedChart;
