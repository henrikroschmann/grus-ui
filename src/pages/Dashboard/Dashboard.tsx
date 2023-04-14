import React from "react";
import { Row, Col, Card, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Chart } from "chart.js";
import {
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { generateMockUserProfile } from "../../__mocks__/mock-data";
import { processBudgets } from "../../utils/budgetUtils";
import BudgetChart from "../../components/Chart/BudgetChart";
import BudgetTable from "../../components/Table/BudgetTable";

Chart.register(
  LinearScale,
  CategoryScale,
  BarElement,
  Tooltip,
  Legend,
  BarController
);

const Dashboard: React.FC = () => {
  const mockUserProfile = generateMockUserProfile();
  const processedBudgets = processBudgets(mockUserProfile.budgets);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthlyData = processedBudgets.reduce(
    (acc, budget) => {
      const monthIndex = new Date(budget.date).getMonth();

      acc.incomes[monthIndex] += budget.income;
      acc.expenses[monthIndex] += budget.expense;
      acc.savings[monthIndex] += budget.savings;

      return acc;
    },
    {
      incomes: new Array(12).fill(0),
      expenses: new Array(12).fill(0),
      savings: new Array(12).fill(0),
    }
  );

  const nav = useNavigate();

  const handleViewBudgetsClick = () => {
    nav("/budget");
  };

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Income, Expenses, and Savings per Budget">
            <BudgetChart months={months} data={monthlyData} />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Card title="Budgets">
            <BudgetTable dataSource={processedBudgets} />
            <Button type="primary" onClick={handleViewBudgetsClick}>
              View All Budgets
            </Button>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
