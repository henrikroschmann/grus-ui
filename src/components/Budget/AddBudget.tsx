import React, { useState } from "react";
import { DatePicker, Form, Input, Modal, Steps, Button } from "antd";
import { Budget } from "../../types/gql-types";
import AddEditIncome from "./AddEditIncome";
import AddEditExpense from "./AddEditExpense";
import AddEditSavings from "./AddEditSavings";

const { Step } = Steps;

interface AddBudgetProps {
  visible: boolean;
  onCreate: (newBudget: Omit<Budget, "id">) => void;
  onCancel: () => void;
  title?: string;
  okText?: string;
  previousBudget?: Budget | null;
  editingBudget?: Budget | null;
  initialStep: number
}

const AddBudget: React.FC<AddBudgetProps> = ({
  visible,
  onCreate,
  onCancel,
  title = "Add a new budget",
  okText = "Create",
  previousBudget = undefined,
  editingBudget = undefined,
  initialStep = 0
}) => {
  const [form] = Form.useForm();
  const [incomesForm] = Form.useForm();
  const [expensesForm] = Form.useForm();
  const [savingsForm] = Form.useForm();

  const [currentStep, setCurrentStep] = useState(initialStep);

  const steps = [
    {
      title: "Budget",
      content: (
        <>
          <Form.Item
            name="name"
            label="Budget Name"
            rules={[
              { required: true, message: "Please input the budget name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="date"
            label="Budget Date"
            rules={[
              { required: true, message: "Please select the budget date!" },
            ]}
          >
            <DatePicker />
          </Form.Item>
        </>
      ),
    },
    {
      title: "Income",
      content: (
        <AddEditIncome
          form={incomesForm}
          initialValues={editingBudget?.incomes || []} //|| previousBudget?.incomes}          
        />
      ),
    },
    {
      title: "Expense",
      content: (
        <AddEditExpense
          form={expensesForm}
          initialValues={editingBudget?.expenses || previousBudget?.expenses}
        />
      ),
    },
    {
      title: "Savings",
      content: (
        <AddEditSavings
          form={savingsForm}
          initialValues={editingBudget?.savings} // || previousBudget?.savings}
        />
      ),
    },
  ];

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const onStepSubmit = () => {
    if (currentStep < steps.length - 1) {
      next();
    } else {
      Promise.all([
        form.validateFields(),
        incomesForm.validateFields(),
        expensesForm.validateFields(),
        savingsForm.validateFields(),
      ])
        .then(([budgetValues, incomeValues, expenseValues, savingsValues]) => {
          form.resetFields();
          incomesForm.resetFields();
          expensesForm.resetFields();
          savingsForm.resetFields();

          onCreate({
            ...budgetValues,
            incomes: [incomeValues],
            expenses: [expenseValues],
            savings: [savingsValues],
          } as Omit<Budget, "id">);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    }
  };

  const recurringExpenses = previousBudget
    ? previousBudget.expenses.filter((expense) => expense.recurring)
    : [];

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={onCancel}
      footer={null}
      width={800}
    >
      <Steps current={currentStep} style={{ marginBottom: "32px" }}>
        {steps.map((step) => (
          <Step key={step.title} title={step.title} />
        ))}
      </Steps>
      <Form
        form={form}
        layout="vertical"
        name="add_budget_form"
        initialValues={{
          modifier: "public",
          expenses: recurringExpenses,
          ...editingBudget,
        }}
      >
        <div style={{ minHeight: "200px" }}>{steps[currentStep].content}</div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "24px",
          }}
        >
          {currentStep > 0 && (
            <Button onClick={prev} style={{ marginRight: "8px" }}>
              Previous
            </Button>
          )}
          <Button type="primary" onClick={onStepSubmit}>
            {currentStep === steps.length - 1 ? okText : "Next"}
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddBudget;
