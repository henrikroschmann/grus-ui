import { Form, Input } from "antd";
import { Budget } from "../../types/gql-types";
import "moment/locale/en-gb";
import dayjs, { Dayjs } from "dayjs";
import { useEffect } from "react";

interface BudgetFormProps {
  budget: Budget | null;
  onFinish: () => void;
  form: any;
}

const BudgetForm: React.FC<BudgetFormProps> = ({ budget, onFinish, form }) => {
  const initialDate = budget?.date
    ? dayjs(budget.date, "YYYY-MM-DD").startOf("day")
    : null;

  useEffect(() => {
    form.setFieldsValue({
      name: budget?.name,
      date: initialDate,
    });
  }, [budget, initialDate, form]);

  const handleFinish = () => {
    form
      .validateFields()
      .then(() => {
        onFinish();
      })
      .catch((info: any) => {
        console.error("Validate Failed:", info);
      });
  };

  return (
    <Form
      form={form}
      layout="vertical"
      name="budget_form"
      onFinish={handleFinish}
    >
      <Form.Item
        name="name"
        label="Budget Name"
        rules={[{ required: true, message: "Please input the budget name!" }]}
      >
        <Input />
      </Form.Item>
    </Form>
  );
};

export default BudgetForm;
