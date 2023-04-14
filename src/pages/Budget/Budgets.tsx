import React, { useState } from "react";
import { Button, Row, Col, Table, Space, Popconfirm } from "antd";
import AddBudget from "../../components/Budget/AddBudget";
import { Budget, Expense, Income } from "../../types/gql-types";
import { generateMockUserProfile } from "../../__mocks__/mock-data";

const Budgets: React.FC = () => {
  const mockUserProfile = generateMockUserProfile();
  const [budgets, setBudgets] = useState<Budget[]>(mockUserProfile.budgets);
  const [addBudgetModalVisible, setAddBudgetModalVisible] = useState(false);

  const handleCreateBudget = (newBudget: Omit<Budget, "id">) => {
    // Replace with API call to add budget, and get the updated budget list
    const updatedBudgets = [
      ...budgets,
      { id: new Date().toISOString(), ...newBudget },
    ];
    setBudgets(updatedBudgets);
    setAddBudgetModalVisible(false);

    // Update mockUserProfile with the new budget list
    const updatedUserProfile = {
      ...mockUserProfile,
      budgets: updatedBudgets,
    };
    // Update the mockUserProfile
    // Replace with API call to update the user profile
    console.log(updatedUserProfile);
  };

  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setAddBudgetModalVisible(true);
  };

  const handleUpdateBudget = (updatedBudget: Omit<Budget, "id">) => {
    const updatedBudgets = budgets.map((budget) =>
      budget.id === editingBudget?.id ? { ...budget, ...updatedBudget } : budget
    );
    setBudgets(updatedBudgets);
    setAddBudgetModalVisible(false);
    setEditingBudget(null);
  };

  const handleDeleteBudget = (budgetId: string) => {
    const updatedBudgets = budgets.filter((budget) => budget.id !== budgetId);
    setBudgets(updatedBudgets);
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (date: Date | undefined) =>
        date ? new Date(date).toLocaleDateString() : "",
      sorter: (a: any, b: any) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return dateA - dateB;
      },
    },
    {
      title: "Budget",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Income",
      dataIndex: "incomes",
      key: "incomes",
      render: (incomes: Income[], budget: Budget) => {
        const totalIncome = incomes.reduce(
          (acc, income) => acc + income.amount,
          0
        );
        return budget.id === budgets[budgets.length - 1].id
          ? `Total: ${totalIncome}`
          : totalIncome.toFixed(2);
      },
    },
    {
      title: "Expense",
      dataIndex: "expenses",
      key: "expenses",
      render: (expenses: Expense[], budget: Budget) => {
        const totalExpense = expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        const percent =
          ((totalExpense > 0
            ? expenses.reduce((acc, expense) => acc + expense.amount, 0)
            : 1) /
            totalExpense) *
          100;
        return (
          <>
            <span>{`$${totalExpense.toFixed(2)}`}</span>
            <div
              style={{
                width: "100%",
                height: 8,
                marginTop: 4,
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  width: `${Math.min(percent, 100).toFixed(2)}%`,
                  height: "100%",
                  backgroundColor: "#1890ff",
                }}
              />
            </div>
            <div style={{ marginTop: 4 }}>
              <span>{`${Math.min(percent, 100).toFixed(
                2
              )}% of total expenses`}</span>
            </div>
          </>
        );
      },
    },
    {
      title: "Savings",
      dataIndex: "savings",
      key: "savings",
      render: (savings: number, budget: Budget) => {
        const totalSavings =
          budget.incomes.reduce((acc, income) => acc + income.amount, 0) -
          budget.expenses.reduce((acc, expense) => acc + expense.amount, 0);
        const percent =
          ((totalSavings > 0 ? totalSavings : 1) / totalSavings) * 100;
        return (
          <>
            <span>{`$${totalSavings.toFixed(2)}`}</span>
            <div
              style={{
                width: "100%",
                height: 8,
                marginTop: 4,
                maxWidth: "100%",
              }}
            >
              <div
                style={{
                  width: `${Math.min(percent, 100).toFixed(2)}%`,
                  height: "100%",
                  backgroundColor: "#52c41a",
                }}
              />
            </div>
            <div style={{ marginTop: 4 }}>
              <span>{`${Math.min(percent, 100).toFixed(
                2
              )}% of total savings`}</span>
            </div>
          </>
        );
      },
    },

    {
      title: "Actions",
      key: "actions",
      render: (text: any, record: Budget) => (
        <Space size="middle">
          <Button onClick={() => handleEditBudget(record)}>Edit</Button>
          <Popconfirm
            title="Are you sure you want to delete this budget?"
            onConfirm={() => handleDeleteBudget(record.id)}
            okText="Yes"
            cancelText="No"
          >
            <Button danger>Delete</Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col xs={24}>
          <Button
            type="primary"
            onClick={() => {
              setAddBudgetModalVisible(true);
            }}
          >
            Add Budget
          </Button>
          <AddBudget
            visible={addBudgetModalVisible}
            onCreate={editingBudget ? handleUpdateBudget : handleCreateBudget}
            onCancel={() => {
              setAddBudgetModalVisible(false);
              setEditingBudget(null);
            }}
            title={editingBudget ? "Edit Budget" : "Add Budget"}
            okText={editingBudget ? "Update" : "Create"}
            editingBudget={editingBudget}
            previousBudget={budgets[budgets.length - 1]}
            initialStep={0}
          />
          <Table columns={columns} dataSource={budgets} rowKey="id" />
        </Col>
      </Row>
    </>
  );
};

export default Budgets;
