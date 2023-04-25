import React from "react";
import { Button, Col, Form, Input, InputNumber, Row, Space } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Income } from "../../types/gql-types";
import "./AddEditIncome.module.css";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

interface AddEditIncomeProps {
  initialValues?: Income[];
  previousValues?: Income[];
  form: any;
}

const AddEditIncome: React.FC<AddEditIncomeProps> = ({
  initialValues,
  previousValues,
  form,
}) => {
  const incomes =
    (initialValues && initialValues.length > 0
      ? initialValues
      : previousValues) ?? [];

  return (
    <Form
      {...layout}
      initialValues={{ incomes: incomes }}
      form={form}
      className="income-form"
    >
      <h2 style={{ marginBottom: 20 }}>Income</h2>
      <Form.List name="incomes" initialValue={incomes}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Row key={field.key} gutter={12} className="income-row" style={{ marginBottom: '16px' }}>
                <Col span={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, "source"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the income source!",
                      },
                    ]}
                  >
                    <Input placeholder="Income Source" size="large" />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...field}
                    name={[field.name, "amount"]}
                    rules={[
                      {
                        required: true,
                        message: "Please input the income amount!",
                      },
                      {
                        type: "number",
                        min: 0,
                        message: "Amount should be a positive number",
                      },
                    ]}
                  >
                    <InputNumber
                      placeholder="Amount"
                      size="large"
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8} className="income-remove-col">
                  {index > 0 && (
                    <MinusCircleOutlined
                      onClick={() => remove(field.name)}
                      className="income-remove-icon"
                    />
                  )}
                </Col>
              </Row>
            ))}
            <Form.Item style={{ marginTop: 16 }}>
              <Button
                type="dashed"
                onClick={() => add()}
                icon={<PlusOutlined />}
                size="large"
                style={{ width: "100%" }}
              >
                Add Income
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AddEditIncome;
