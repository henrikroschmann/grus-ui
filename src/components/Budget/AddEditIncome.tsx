import React from "react";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Income } from "../../types/gql-types";

interface AddEditIncomeProps {
  form: any;
  initialValues?: Income[];
}

const AddEditIncome: React.FC<AddEditIncomeProps> = ({ form, initialValues  }) => {
  return (
    <Form.List name="incomes" initialValue={initialValues}>
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space key={field.key} style={{ display: "flex" }} align="baseline">
              <Form.Item
                {...field}
                name={[field.name, "source"]}
                rules={[{ required: true, message: "Please input the income source!" }]}
              >
                <Input placeholder="Income Source" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, "amount"]}
                rules={[
                  { required: true, message: "Please input the income amount!" },
                  { type: 'number', min: 0, message: "Amount should be a positive number" },
                ]}
              >
                <InputNumber placeholder="Amount" />
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
              Add Income
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AddEditIncome;
