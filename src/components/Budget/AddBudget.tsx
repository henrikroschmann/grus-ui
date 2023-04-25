import React, { useEffect, useState } from "react";
import { Form, Modal, Steps, Button } from "antd";
import { Budget } from "../../types/gql-types";
import AddEditIncome from "./AddEditIncome";
import AddEditExpense from "./AddEditExpense";
import AddEditSavings from "./AddEditSavings";
import BudgetForm from "./BudgetForm";
import ReviewEntries from "./ReviewEntries";

const { Step } = Steps;

interface AddBudgetProps {
  visible: boolean;
  onCreate: (newBudget: Budget) => void;
  onCancel: () => void;
  title: string;
  okText: string;
  editingBudget: Budget | null;
  previousBudget: Budget | null;
  initialStep: number;
}

const AddBudget: React.FC<AddBudgetProps> = ({
  visible,
  onCreate,
  onCancel,
  title = "Add a new budget",
  okText = "Create",
  previousBudget = undefined,
  editingBudget = undefined,
  initialStep = 0,
}) => {
  const [currentStep, setCurrentStep] = useState(initialStep);
  const form = Form.useForm()[0];

  const [budget, setBudget] = useState<Budget>({
    id: "",
    name: "",
    date: new Date(),
    incomes: [],
    expenses: [],
    savings: [],
  });

  useEffect(() => {
    if (editingBudget) {
      setBudget(editingBudget);
    }
  }, [editingBudget]);

  const next = () => {
    form
      .validateFields()
      .then((values) => {
        setCurrentStep(currentStep + 1);
        if (currentStep === 0) {
          setBudget({
            ...budget!,
            ...values,
          });
        } else if (currentStep === 1) {
          setBudget({
            ...budget!,
            incomes: values.incomes,
          });
        } else if (currentStep === 2) {
          setBudget({
            ...budget!,
            expenses: values.expenses,
          });
        } else if (currentStep === 3) {
          setBudget({
            ...budget!,
            savings: values.savings,
          });
        }
      })
      .catch((info: any) => {
        console.error("Validate Failed:", info);
      });
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
  };

  const steps = [
    {
      title: "Budget",
      content: <BudgetForm form={form} budget={budget} onFinish={() => next} />,
    },

    {
      title: "Income",
      content: (
        <AddEditIncome
          initialValues={editingBudget?.incomes || []}
          previousValues={previousBudget?.incomes || []}
          form={form}
        />
      ),
    },
    {
      title: "Expense",
      content: (
        <AddEditExpense
          initialValues={editingBudget?.expenses || []}
          previousValues={previousBudget?.expenses || []}
          form={form}
        />
      ),
    },
    {
      title: "Savings",
      content: (
        <AddEditSavings
          initialValues={editingBudget?.savings}
          previousValues={previousBudget?.savings}
          form={form}
        />
      ),
    },
    {
      title: "Review",
      content: <ReviewEntries form={form} />,
    },
  ];

  const onStepSubmit = () => {
    if (currentStep < steps.length - 1) {
      next();
    } else {
      Promise.all([form.validateFields()])
        .then(() => {
          onCreate(budget!);
          form.resetFields();
          setCurrentStep(0);
        })
        .catch((info) => {
          console.error("Validate Failed:", info);
        });
    }
  };

  const recurringExpenses = previousBudget
    ? previousBudget.expenses.filter((expense) => expense.recurring)
    : [];

  const handleCancel = () => {
    setCurrentStep(0);
    onCancel();
    form.resetFields();
  };

  return (
    <Modal
      visible={visible}
      title={title}
      onCancel={handleCancel}
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
