// src/components/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table } from "antd";
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

const incomeExpensesData = {
  labels: [
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
  ],
  datasets: [
    {
      label: "Income",
      data: [
        3000, 3200, 3300, 2900, 3000, 3100, 2800, 3200, 3500, 4000, 3800, 4100,
      ],
      backgroundColor: "rgba(75, 192, 192, 0.2)",
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 1,
    },
    {
      label: "Expenses",
      data: [
        2000, 2100, 2300, 2200, 2100, 2400, 2500, 2200, 2300, 2500, 2400, 2600,
      ],
      backgroundColor: "rgba(255, 99, 132, 0.2)",
      borderColor: "rgba(255, 99, 132, 1)",
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

const columns = [
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Age",
    dataIndex: "age",
    key: "age",
  },
  {
    title: "Address",
    dataIndex: "address",
    key: "address",
  },
];

const data = [
  {
    key: "1",
    name: "John Doe",
    age: 32,
    address: "10 Downing Street",
  },
  {
    key: "2",
    name: "Jane Smith",
    age: 42,
    address: "11 Downing Street",
  },
  {
    key: "3",
    name: "Richard Roe",
    age: 28,
    address: "12 Downing Street",
  },
];

const Dashboard: React.FC = () => {
  const [chartVisible, setChartVisible] = useState(true);
  const [topBoxesVisible, setTopBoxesVisible] = useState(true);

  const checkVisibility = () => {
    const row3 = document.querySelector(".row-3") as HTMLDivElement;
    const windowHeight = window.innerHeight;

    if (row3.getBoundingClientRect().top <= windowHeight * 0.4) {
      setChartVisible(false);
    } else {
      setChartVisible(true);
    }

    if (row3.getBoundingClientRect().top <= windowHeight * 0.1) {
      setTopBoxesVisible(false);
    } else {
      setTopBoxesVisible(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", checkVisibility);
    return () => {
      window.removeEventListener("scroll", checkVisibility);
    };
  }, []);
  return (
    <>
      {topBoxesVisible && (
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8}>
            <Card title="Total Savings" className="text-center">
              <h2 className="font-bold">$12,500</h2>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Total Investments" className="text-center">
              <h2 className="font-bold">$25,000</h2>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card title="Total Debts" className="text-center">
              <h2 className="font-bold">$5,000</h2>
            </Card>
          </Col>
        </Row>
      )}
      {chartVisible && (
        <Row gutter={[16, 16]}>
          <Col xs={24}>
            <Card title="Income vs. Expenses">
              <Bar data={incomeExpensesData} options={chartOptions} />
            </Card>
          </Col>
        </Row>
      )}
      <Row gutter={[16, 16]} className="row-3">
        <Col xs={24}>
          <Card title="Users">
            <Table columns={columns} dataSource={data} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default Dashboard;
