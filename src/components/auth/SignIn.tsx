import React, { useContext } from "react";
import { Form, Input, Button, Card, Layout, Typography, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../api/auth";
import { AuthContext } from "../../contexts/AuthContext";


const { Content } = Layout;
const { Title } = Typography;

const SignIn: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const nav = useNavigate();
  const onFinish = async (values: any) => {
    try {
      const { email, password } = values;
      await login(email, password, setIsAuthenticated);
      nav("/")
    } catch (error) {
      if (error instanceof Error) {
        notification.error({
          message: "Failed to sign in",
          description: error.message,
        });
      }
    }
  };

  const onFinishFailed = (errorInfo: any) => {
    console.error('Failed:', errorInfo);
  };

  return (
    <Layout>
      <Content className="signin-content">
        <Card className="signin-card">
          <Title level={3}>Sign In</Title>
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
      </Content>
    </Layout>
  );
};

export default SignIn;
