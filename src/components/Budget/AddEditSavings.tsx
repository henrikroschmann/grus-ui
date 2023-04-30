import React from "react";
import { Button, Card, Form, Input, InputNumber, Table } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { Saving } from "../../types/gql-types";
import Column from "antd/es/table/Column";

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
    <Card className="savings-card">
      <Form {...layout} initialValues={{ savings: savings }} form={form}>
        <Form.List name="savings" initialValue={savings}>
          {(fields, { add, remove }) => (
            <>
              <Table
                dataSource={fields}
                rowKey={(record) => record.key}
                pagination={false}
              >
                <Column
                  title="Goal Name"
                  dataIndex={["name"]}
                  key="name"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record?.name, "name"]}
                      fieldKey={[record.fieldKey, "name"]}
                      rules={[
                        {
                          required: true,
                          message: "Please input the savings goal name!",
                        },
                      ]}
                    >
                      <Input placeholder="Goal Name" />
                    </Form.Item>
                  )}
                />
                <Column
                  title="Goal Amount"
                  dataIndex={["amount"]}
                  key="amount"
                  render={(text, record: any, index) => (
                    <Form.Item
                      name={[record.name, "amount"]}
                      fieldKey={[record.fieldKey, "amount"]}
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
                    >
                      <InputNumber
                        placeholder="Goal Amount"
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

              <Form.Item style={{ marginTop: 20 }}>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  icon={<PlusOutlined />}
                  size="large"
                  style={{ width: "100%" }}
                >
                  Add Savings Goal
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
      </Form>
    </Card>
  );
};

export default AddEditSavings;
