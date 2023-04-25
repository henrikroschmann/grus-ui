import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Row, Col, Table, Space, Popconfirm } from "antd";
import AddBudget from "../../components/Budget/AddBudget";
import { Budget, Expense, Income, Query } from "../../types/gql-types";
import { GET_USER_PROFILE } from "../../graphQL/queries/getUserProfile";
import { CREATE_BUDGET } from "../../graphQL/mutations/createBudget";
import { UPDATE_BUDGET } from "../../graphQL/mutations/updateBudget";
import client from "../../graphQL/client";

const Budgets: React.FC = () => {
  const [addBudgetModalVisible, setAddBudgetModalVisible] = useState(false);
  const [editingBudget, setEditingBudget] = useState<Budget | null>(null);
  const { data } = useQuery<Query>(GET_USER_PROFILE);
  const [createBudget] = useMutation(CREATE_BUDGET);
  const [updateBudget] = useMutation(UPDATE_BUDGET);

  const handleCreateBudget = async (newBudget: Budget) => {
    await createBudget({
      variables: {
        input: {
          name: newBudget.name,
          date: new Date().toISOString(),
          incomes: newBudget.incomes.map((i) => ({
            source: i.source,
            amount: i.amount,
          })),
          expenses: newBudget.expenses.map((e) => ({
            category: e.category,
            description: e.description,
            amount: e.amount,
            recurring: e.recurring || false,
          })),
          savings: newBudget.savings.map((s) => ({
            name: s.name,
            amount: s.amount,
          })),
        },
      },
    });
    setAddBudgetModalVisible(false);
  };

  const handleUpdateBudget = async (updatedBudget: Budget) => {
    await updateBudget({
      variables: {
        id: updatedBudget.id,
        updatedBudget: {
          name: updatedBudget.name,
          date: updatedBudget.date,
          incomes: updatedBudget.incomes.map((i) => ({
            source: i.source,
            amount: i.amount,
          })),
          expenses: updatedBudget.expenses.map((e) => ({
            category: e.category,
            description: e.description,
            amount: e.amount,
            recurring: e.recurring || false,
          })),
          savings: updatedBudget.savings.map((s) => ({
            name: s.name,
            amount: s.amount,
          })),
        },
      },
    });
    setEditingBudget(null);
    setAddBudgetModalVisible(false);
  };

  const handleCancelBudget =() => {
    setEditingBudget(null)
    setAddBudgetModalVisible(false)
  }

  const handleEditBudget = (budget: Budget) => {
    setEditingBudget(budget);
    setAddBudgetModalVisible(true);
  };

  const handleDeleteBudget = (budgetId: string) => {
    const updatedBudgets = data?.getUserProfile?.budgets.filter(
      (budget) => budget.id !== budgetId
    );
    if (updatedBudgets) {
      const updatedData = {
        getUserProfile: {
          ...data!.getUserProfile,
          budgets: updatedBudgets,
        },
      };
      client.writeQuery({
        query: GET_USER_PROFILE,
        data: updatedData,
      });
    }
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
      render: (incomes: Income[] | null, budget: Budget) => {
        const totalIncome =
          incomes?.reduce((acc, income) => acc + income.amount, 0) || 0;
        return `Total: ${totalIncome}`;
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
        const income = data?.userProfile.budgets
          .find((b) => b.id === budget.id)
          ?.incomes.reduce((acc, income) => acc + income.amount, 0);
        const percent =
          ((totalExpense > 0 ? totalExpense : 1) / (income || 1)) * 100;
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
              )}% of total income`}</span>
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
        const totalIncome = budget.incomes.reduce(
          (acc, income) => acc + income.amount,
          0
        );
        const totalExpense = budget.expenses.reduce(
          (acc, expense) => acc + expense.amount,
          0
        );
        const totalSavings = totalIncome - totalExpense;
        const percent =
          ((totalSavings > 0 ? totalSavings : 1) / totalIncome) * 100;
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
              )}% of total income`}</span>
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
            onCancel={handleCancelBudget}
            title={editingBudget ? "Edit Budget" : "Add Budget"}
            okText={editingBudget ? "Update" : "Create"}
            editingBudget={editingBudget}
            previousBudget={data?.userProfile.budgets ?
              data?.userProfile?.budgets[
                data?.userProfile.budgets.length - 1
              ] : null
            }
            initialStep={0}
          />
          <Table
            columns={columns}
            dataSource={data?.userProfile?.budgets || []}
            rowKey="id"
          />
        </Col>
      </Row>
    </>
  );
};

export default Budgets;
