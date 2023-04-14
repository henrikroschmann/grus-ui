import React from "react";
import { Form, Input, Button, Card } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./Register.css";
import { Link } from "react-router-dom";

const Register: React.FC = () => {
  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Implement your register logic here
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <Card className="register-card" title="Register" bordered={false}>
      <Form
        name="register"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        layout="vertical"
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input
            prefix={<MailOutlined />}
            placeholder="Email"
            className="register-input"
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Password"
            className="register-input"
          />
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          rules={[
            { required: true, message: "Please confirm your password!" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("The two passwords do not match!")
                );
              },
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Confirm Password"
            className="register-input"
          />
        </Form.Item>

        <Form.Item>
          <p>
            Already have an account? <Link to="/signin">Sign in!</Link>
          </p>
          <Button type="primary" htmlType="submit" className="register-button">
            Register
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default Register;
