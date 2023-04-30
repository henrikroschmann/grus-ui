import React from "react";
import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Select,
  Switch,
  Table,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Expense, ExpenseCategory } from "../../types/gql-types";
import Column from "antd/es/table/Column";

const { Option } = Select;

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
    <Card className="expense-card">
      <Form {...layout} initialValues={{ expenses: expenses }} form={form}>
        <Form.List name="expenses" initialValue={expenses}>
          {(fields, { add, remove }) => (
            <>
              <Table
                dataSource={fields}
                rowKey={(record) => record.key}
                pagination={false}
              >
                <Column
                  title="Category"
                  dataIndex={["category"]}
                  key="category"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record?.name, "category"]}
                      fieldKey={[record.fieldKey, "category"]}
                      rules={[
                        {
                          required: true,
                          message: "Please select the expense category!",
                        },
                      ]}
                    >
                      <Select placeholder="Category">
                        <Option value={ExpenseCategory.ESSENTIAL}>
                          {ExpenseCategory.ESSENTIAL}
                        </Option>
                        <Option value={ExpenseCategory.NON_ESSENTIAL}>
                          {ExpenseCategory.NON_ESSENTIAL}
                        </Option>
                      </Select>
                    </Form.Item>
                  )}
                />
                <Column
                  title="Description"
                  dataIndex={["description"]}
                  key="description"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record.name, "description"]}
                      fieldKey={[record.fieldKey, "description"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the expense description!",
                        },
                      ]}
                    >
                      <Input placeholder="Description" />
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
                          message: "Please input the expense amount!",
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
                  title="Recurring"
                  dataIndex={["recurring"]}
                  key="recurring"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record.name, "recurring"]}
                      valuePropName="checked"
                    >
                      <Switch />
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
                  Add Expense
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};

export default AddEditExpense;
