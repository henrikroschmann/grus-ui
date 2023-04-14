import React from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./SignIn.css";
import { Link } from "react-router-dom";

const SignIn: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Implement your signIn logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="signin-card" title="Sign In" bordered={false}>
      <Form
        name="signIn"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your email!",
            },
            {
              type: "email",
              message: "Please enter a valid email address",
            },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            className="signin-input"
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            className="signin-input"
          />
        </Form.Item>

        <Form.Item>
          <p>
            Don't have an account? <Link to="/register">Register now!</Link>
          </p>
          <Button type="primary" htmlType="submit" className="signin-button">
            Sign In
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignIn;
