import React from "react";
import { Button, Form, Input, InputNumber, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Saving } from "../../types/gql-types";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface AddEditSavingsProps {
  initialValues?: Saving[];
  previousValues?: Saving[];
  form: any;
}

const AddEditSavings: React.FC<AddEditSavingsProps> = ({
  initialValues,
  previousValues,
  form,
}) => {
  const savings =
    (initialValues && initialValues.length > 0
      ? initialValues
      : previousValues) ?? [];

  return (
    <Form
      {...layout}
      initialValues={{ savings: savings }}
      form={form}
    >
      <h2 style={{ marginBottom: 20 }}>Savings Goals</h2>
      <Form.List name="savings" initialValue={savings}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <div
                key={field.key}
                style={{ display: "flex", marginBottom: 10 }}
              >
                <Form.Item
                  {...field}
                  name={[field.name, "name"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input the savings goal name!",
                    },
                  ]}
                  style={{ marginRight: 10, flex: 1 }}
                >
                  <Input placeholder="Goal Name" size="large" />
                </Form.Item>
                <Form.Item
                  {...field}
                  name={[field.name, "amount"]}
                  rules={[
                    {
                      required: true,
                      message: "Please input the savings goal amount!",
                    },
                    {
                      type: "number",
                      min: 0,
                      message: "Amount should be a positive number",
                    },
                  ]}
                  style={{ marginRight: 10 }}
                >
                  <InputNumber placeholder="Goal Amount" size="large" />
                </Form.Item>
                <MinusCircleOutlined
                  onClick={() => remove(field.name)}
                  style={{ fontSize: 18 }}
                />
              </div>
            ))}
            <Form.Item style={{ marginTop: 20 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                size="large"
              >
                Add Savings Goal
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddEditSavings;
