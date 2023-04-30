import { useQuery } from "@apollo/client";
import { Bar, Pie } from "react-chartjs-2";
import { GET_USER_PROFILE } from "../../graphQL/queries/getUserProfile";
import { Query } from "../../types/gql-types";
import { Chart } from "chart.js";
import { registerables } from "chart.js";
import './Dashboard.css'

Chart.register(...registerables);

const Dashboard = () => {
  const { data, loading, error } = useQuery<Query>(GET_USER_PROFILE);

  if (loading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  const user = data?.userProfile;

  const chartData = {
    labels: user?.budgets.map((budget) => budget.name),
    datasets: [
      {
        label: "Income",
        data: user?.budgets.map((budget) =>
          budget.incomes.reduce((total, income) => total + income.amount, 0)
        ),
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: user?.budgets.map((budget) =>
          budget.expenses.reduce((total, expense) => total + expense.amount, 0)
        ),
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
      {
        label: "Savings",
        data: user?.budgets.map((budget) =>
          budget.savings.reduce((total, saving) => total + saving.amount, 0)
        ),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
    options: {
      scales: {
        x: {
          type: "category",
          ticks: {
            callback: function (value: any) {
              switch (value) {
                case "Essential expense":
                  return "1";
                case "Non-essential expense":
                  return "2";
                default:
                  return "";
              }
            },
          },
        },
      },
    },
  };

  const pieData = {
    labels: ["Essential expenses", "Non-essential expenses"],
    datasets: [
      {
        data: [
          user?.budgets.reduce(
            (total: any, budget: { expenses: any[] }) =>
              total +
              budget.expenses
                .filter(
                  (expense: { category: string }) =>
                    expense.category === "Essential expense"
                )
                .reduce(
                  (subtotal: any, expense: { amount: any }) =>
                    subtotal + expense.amount,
                  0
                ),
            0
          ),
          user?.budgets.reduce(
            (total: any, budget: { expenses: any[] }) =>
              total +
              budget.expenses
                .filter(
                  (expense: { category: string }) =>
                    expense.category === "Non-essential expense"
                )
                .reduce(
                  (subtotal: any, expense: { amount: any }) =>
                    subtotal + expense.amount,
                  0
                ),
            0
          ),
        ],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto py-8">        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white shadow-lg rounded-lg px-6 py-8">
            <h2 className="text-lg font-semibold mb-4">Income vs. Expenses vs. Savings</h2>
            <Bar data={chartData} />
          </div>
          <div className="bg-white shadow-lg rounded-lg px-6 py-8">
            <h2 className="text-lg font-semibold mb-4">Essential vs. Non-essential Expenses</h2>
            <Pie data={pieData} />
          </div>
        </div>
      </div>
    </div>
  );
  
};

export default Dashboard;
