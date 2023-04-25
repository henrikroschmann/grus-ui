import React from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Switch,
} from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Expense } from "../../types/gql-types";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
interface AddEditExpenseProps {
  initialValues?: Expense[];
  previousValues?: Expense[];
  form: any;
}

const AddEditExpense: React.FC<AddEditExpenseProps> = ({
  initialValues,
  previousValues,
  form,
}) => {
  const expenses =
    (initialValues && initialValues.length > 0
      ? initialValues
      : previousValues) ?? [];

  return (
    <Form {...layout} initialValues={{ expenses: expenses }} form={form}>
      <Form.List name="expenses" initialValue={expenses}>
        {(fields, { add, remove }) => (
          <>
            {fields.map((field) => (
              <Space
                key={field.key}
                style={{ display: "flex" }}
                align="baseline"
              >
                <Row gutter={16} style={{ width: "100%" }}>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      name={[field.name, "category"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the expense category!",
                        },
                      ]}
                    >
                      <Input placeholder="Category" />
                    </Form.Item>
                  </Col>
                  <Col span={8}>
                    <Form.Item
                      {...field}
                      name={[field.name, "description"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the expense description!",
                        },
                      ]}
                    >
                      <Input placeholder="Description" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, "amount"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the expense amount!",
                        },
                        {
                          type: "number",
                          min: 0,
                          message: "Amount should be a positive number",
                        },
                      ]}
                    >
                      <InputNumber placeholder="Amount" />
                    </Form.Item>
                  </Col>
                  <Col span={4}>
                    <Form.Item
                      {...field}
                      name={[field.name, "recurring"]}
                      valuePropName="checked"
                    >
                      <Switch />
                    </Form.Item>
                  </Col>
                  <Col span={2}>
                    <MinusCircleOutlined onClick={() => remove(field.name)} />
                  </Col>
                </Row>
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
    </Form>
  );
};

export default AddEditExpense;
