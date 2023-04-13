import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart } from "chart.js";
import {
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  BarController
);

interface BudgetChartProps {
  months: string[];
  data: {
    incomes: number[];
    expenses: number[];
    savings: number[];
  };
}

const BudgetChart: React.FC<BudgetChartProps> = ({ months, data }) => {
    
  const chartData = {
    labels: months,
    datasets: [
      {
        label: "Income",
        data: data.incomes,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: data.expenses,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings",
        data: data.savings,
        backgroundColor: "rgba(255, 206, 86, 0.2)",
        borderColor: "rgba(255, 206, 86, 1)",
        borderWidth: 1,
      },
    ],
  };

   const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    plugins: {
      tooltip: {
        enabled: true,
      },
    },
  };


  return <Bar data={chartData} options={chartOptions} />;
};

export default BudgetChart;
