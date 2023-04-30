import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Table,
} from "antd";
import {
  PlusOutlined,
} from "@ant-design/icons";
import { Income } from "../../types/gql-types";
import "./AddEditIncome.module.css";
import Column from "antd/es/table/Column";

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
    <Card className="income-card">
      <Form {...layout} initialValues={{ incomes: incomes }} form={form}>
        <Form.List name="incomes" initialValue={incomes}>
          {(fields, { add, remove }) => (
            <>
              <Table
                dataSource={fields}
                rowKey={(record) => record.key}
                pagination={false}
              >
                <Column
                  title="Source"
                  dataIndex={["source"]}
                  key="source"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record?.name, "source"]}
                      fieldKey={[record.fieldKey, "source"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the income source!",
                        },
                      ]}
                    >
                      <Input placeholder="Income Source" />
                    </Form.Item>
                  )}
                />
                <Column
                  title="Amount"
                  dataIndex={["amount"]}
                  key="amount"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record.name, "amount"]}
                      fieldKey={[record.fieldKey, "amount"]}
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
                        style={{ width: "100%" }}
                      />
                    </Form.Item>
                  )}
                />
                <Column
                  title=""
                  key="actions"
                  render={(text, record: any, index) => (
                    <Button
                      type="link"
                      onClick={() => remove(record?.name)}
                      danger
                    >
                      Remove
                    </Button>
                  )}
                />
              </Table>

              <Form.Item>
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
    </Card>
  );
};

export default AddEditIncome;
