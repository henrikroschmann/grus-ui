import React from "react";
import "./ReviewEntries.module.css";
import { Table } from "antd";

interface ReviewEntriesProps {
  form: any;
}

const ReviewEntries: React.FC<ReviewEntriesProps> = ({ form }) => {
  const incomes = form.getFieldValue("incomes");
  const expenses = form.getFieldValue("expenses");
  const savings = form.getFieldValue("savings");

  const totalIncome = incomes.reduce((acc: number, income: any) => {
    return acc + income.amount;
  }, 0);

  const totalExpense = expenses.reduce((acc: number, expense: any) => {
    return acc + expense.amount;
  }, 0);

  const totalSavings = savings.reduce((acc: number, saving: any) => {
    return acc + saving.amount;
  }, 0);

  const remainingBudget = totalIncome - totalExpense - totalSavings;

  const columns = [
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount: number) => {
        return <span>${amount.toFixed(2)}</span>;
      },
    },
    {
      title: "Recurring",
      dataIndex: "recurring",
      key: "recurring",
      render: (recurring: boolean) => {
        return <span>{recurring ? "Yes" : "No"}</span>;
      },
    },
  ];

  return (
    <>
      <h2 className="title">Review your entries</h2>
      <div className="section">
        <h3 className="subtitle">Budget name:</h3>
        <p className="content">{form.getFieldValue("name")}</p>
      </div>
      <div className="section">
        <h3 className="subtitle">Incomes:</h3>
        <Table
          columns={[
            { title: "Source", dataIndex: "source", key: "source" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
          ]}
          dataSource={incomes}
          pagination={false}
          rowKey={(record) => record.id}
          className="incomes-table"
        />
      </div>
      <div className="section">
        <h3 className="subtitle">Expenses:</h3>
        <Table
          columns={columns}
          dataSource={expenses}
          pagination={false}
          rowKey={(record) => record.id}
          className="expenses-table"
        />
      </div>
      <div className="section">
        <h3 className="subtitle">Savings:</h3>
        <Table
          columns={[
            { title: "Name", dataIndex: "name", key: "name" },
            { title: "Amount", dataIndex: "amount", key: "amount" },
          ]}
          dataSource={savings}
          pagination={false}
          rowKey={(record) => record.id}
          className="savings-table"
        />
      </div>
      <div className="remaining">
        <h3 className="subtitle">Remaining Budget:</h3>
        <p
          className={`"content" ${
            remainingBudget >= 0 ? "positive" : "negative"
          }`}
        >
          {remainingBudget >= 0 ? "+" : "-"}
          {Math.abs(remainingBudget)}
        </p>
      </div>
    </>
  );
};

export default ReviewEntries;
