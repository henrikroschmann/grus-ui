import React from "react";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Space,
  Table,
} from "antd";
import {
  DollarCircleOutlined,
  DollarOutlined,
  MinusCircleOutlined,
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
    <Card className="income-card" >
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

    // <Form
    //   {...layout}
    //   initialValues={{ incomes: incomes }}
    //   form={form}
    //   className="income-form"
    // >
    //   <div className="income-header">
    //     <h2 className="income-title">Income</h2>
    //     <Button
    //       type="primary"
    //       icon={<PlusOutlined />}
    //       onClick={() => console.log("s")}
    //       size="large"
    //       className="income-add-btn"
    //     >
    //       Add Income
    //     </Button>
    //   </div>
    //   <Form.List name="incomes" initialValue={incomes}>
    //     {(fields, { add, remove }) => (
    //       <>
    //         {fields.map((field, index) => (
    //           <Row key={field.key} gutter={[12, 16]} className="income-row">
    //             <Col xs={12}>
    //               <Form.Item
    //                 {...field}
    //                 name={[field.name, "source"]}
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input the income source!",
    //                   },
    //                 ]}
    //               >
    //                 <Input
    //                   placeholder="Income Source"
    //                   size="large"
    //                   className="income-input"
    //                 />
    //               </Form.Item>
    //             </Col>
    //             <Col xs={10}>
    //               <Form.Item
    //                 {...field}
    //                 name={[field.name, "amount"]}
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input the income amount!",
    //                   },
    //                   {
    //                     type: "number",
    //                     min: 0,
    //                     message: "Amount should be a positive number",
    //                   },
    //                 ]}
    //               >
    //                 <InputNumber
    //                   placeholder="Amount"
    //                   size="large"
    //                   className="income-input"
    //                 />
    //               </Form.Item>
    //             </Col>
    //             <Col xs={2}>
    //               {index > 0 && (
    //                 <MinusCircleOutlined
    //                   onClick={() => remove(field.name)}
    //                   className="income-remove-icon"
    //                 />
    //               )}
    //             </Col>
    //           </Row>
    //         ))}
    //       </>
    //     )}
    //   </Form.List>
    // </Form>

    // <Form
    //   {...layout}
    //   initialValues={{ incomes: incomes }}
    //   form={form}
    //   className="income-form"
    // >
    //   <h2 style={{ marginBottom: 20 }}>Income</h2>
    //   <Form.List name="incomes" initialValue={incomes}>
    //     {(fields, { add, remove }) => (
    //       <>
    //         {fields.map((field, index) => (
    //           <Row key={field.key} gutter={12} className="income-row" style={{ marginBottom: '16px' }}>
    //             <Col span={8}>
    //               <Form.Item
    //                 {...field}
    //                 name={[field.name, "source"]}
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input the income source!",
    //                   },
    //                 ]}
    //               >
    //                 <Input placeholder="Income Source" size="large" />
    //               </Form.Item>
    //             </Col>
    //             <Col span={8}>
    //               <Form.Item
    //                 {...field}
    //                 name={[field.name, "amount"]}
    //                 rules={[
    //                   {
    //                     required: true,
    //                     message: "Please input the income amount!",
    //                   },
    //                   {
    //                     type: "number",
    //                     min: 0,
    //                     message: "Amount should be a positive number",
    //                   },
    //                 ]}
    //               >
    //                 <InputNumber
    //                   placeholder="Amount"
    //                   size="large"
    //                   style={{ width: "100%" }}
    //                 />
    //               </Form.Item>
    //             </Col>
    //             <Col span={8} className="income-remove-col">
    //               {index > 0 && (
    //                 <MinusCircleOutlined
    //                   onClick={() => remove(field.name)}
    //                   className="income-remove-icon"
    //                 />
    //               )}
    //             </Col>
    //           </Row>
    //         ))}
    //         <Form.Item style={{ marginTop: 16 }}>
    //           <Button
    //             type="dashed"
    //             onClick={() => add()}
    //             icon={<PlusOutlined />}
    //             size="large"
    //             style={{ width: "100%" }}
    //           >
    //             Add Income
    //           </Button>
    //         </Form.Item>
    //       </>
    //     )}
    //   </Form.List>
    // </Form>
  );
};

export default AddEditIncome;
