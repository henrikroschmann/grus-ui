import React from "react";
import { Button, Form, Input, InputNumber, Space, Switch } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Expense } from "../../types/gql-types";

interface AddEditExpenseProps {
  form: any;
  initialValues?: Expense[];
}

const AddEditExpense: React.FC<AddEditExpenseProps> = ({ form, initialValues }) => {
  console.log("initialValues", initialValues)
  return (
    <Form.List name="expenses" initialValue={initialValues}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space key={field.key} style={{ display: "flex" }} align="baseline">
              <Form.Item
                {...field}
                name={[field.name, "category"]}
                rules={[{ required: true, message: "Please input the expense category!" }]}
              >
                <Input placeholder="Category" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, "description"]}
                rules={[{ required: true, message: "Please input the expense description!" }]}
              >
                <Input placeholder="Description" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, "amount"]}
                rules={[
                  { required: true, message: "Please input the expense amount!" },
                  { type: 'number', min: 0, message: "Amount should be a positive number" },
                ]}
              >
                <InputNumber placeholder="Amount" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, "recurring"]}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
              <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
          ))}
          <Form.Item>
            <Button
              type="dashed"
              onClick={() => add()}
              icon={<PlusOutlined />}
              style={{ width: "100%" }}
            >
              Add Expense
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AddEditExpense;
