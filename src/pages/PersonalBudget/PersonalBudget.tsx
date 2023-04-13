import React from "react";
import { Row, Col, Card, List } from "antd";

const data = [
  { title: "Salary", amount: 4500, type: "Income" },
  { title: "Freelance", amount: 1200, type: "Income" },
  { title: "Electricity Bill", amount: 100, type: "Bill" },
  { title: "Water Bill", amount: 50, type: "Bill" },
  { title: "Netflix Subscription", amount: 15, type: "Subscription" },
  { title: "Spotify Subscription", amount: 10, type: "Subscription" },
  { title: "Emergency Fund", amount: 150, type: "Savings" },
  { title: "Retirement Fund", amount: 300, type: "Savings" },
];

const PersonalBudget: React.FC = () => {
  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={12} md={12} lg={12}>
        <Card title="Personal Budget">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.title} - ${item.type}`}
                  description={`Amount: $${item.amount}`}
                />
              </List.Item>
            )}
          />
        </Card>
      </Col>
    </Row>
  );
};

export default PersonalBudget;
