import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

const AddToBudgetForm: React.FC = () => {
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log("Received values from form: ", values);
    // Process values here, e.g., send them to API or update state
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish} autoComplete="off">
      <Form.Item
        name="type"
        rules={[{ required: true, message: "Please select a type!" }]}
      >
        <Select placeholder="Select a type">
          <Option value="Income">Income</Option>
          <Option value="Bill">Bill</Option>
          <Option value="Subscription">Subscription</Option>
          <Option value="Savings">Savings</Option>
        </Select>
      </Form.Item>

      <Form.Item
        name="category"
        rules={[{ required: true, message: "Please enter a category!" }]}
      >
        <Input placeholder="Category" />
      </Form.Item>

      <Form.Item
        name="amount"
        rules={[{ required: true, message: "Please enter an amount!" }]}
      >
        <Input placeholder="Amount" type="number" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add to Budget
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddToBudgetForm;
