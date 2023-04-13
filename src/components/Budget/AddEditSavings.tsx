import React from "react";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Savings } from "../../types/gql-types";

interface AddEditSavingsProps {
  form: any;
  initialValues?: Savings[];
}

const AddEditSavings: React.FC<AddEditSavingsProps> = ({ form, initialValues }) => {
  return (
    <Form.List name="savings" initialValue={initialValues}>

      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space key={field.key} style={{ display: "flex" }} align="baseline">
              <Form.Item
                {...field}
                name={[field.name, "name"]}
                rules={[{ required: true, message: "Please input the savings goal name!" }]}
              >
                <Input placeholder="Goal Name" />
              </Form.Item>
              <Form.Item
                {...field}
                name={[field.name, "amount"]}
                rules={[
                  { required: true, message: "Please input the savings goal amount!" },
                  { type: 'number', min: 0, message: "Amount should be a positive number" },
                ]}
              >
                <InputNumber placeholder="Goal Amount" />
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
              Add Savings Goal
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AddEditSavings;
