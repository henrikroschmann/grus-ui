import { useQuery, useMutation } from "@apollo/client";
import { UserProfile } from "../../types/gql-types";
import { GET_USER_PROFILE } from "../../graphQL/queries/getUserProfile";
import { UPDATE_USER_PROFILE } from "../../graphQL/mutations/updateUserProfile";
import { Card, Form, Button, Input } from "antd";
import "./UserProfile.css";
import { DELETE_USER } from "../../graphQL/mutations/deleteUser";

const DeleteUserButton: React.FC = () => {
  const [deleteUser, { loading, error }] = useMutation(DELETE_USER);

  const handleClick = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete your account? This action cannot be undone."
    );

    if (confirmDelete) {
      try {
        await deleteUser();
        // redirect to login page or show success message
      } catch (error) {
        console.error(error);
        // show error message
      }
    }
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Button danger onClick={handleClick} loading={loading}>
      Delete Account
    </Button>
  );
};

const UserProfileComponent: React.FC = () => {
  const { data, loading, error } = useQuery<{ userProfile: UserProfile }>(
    GET_USER_PROFILE
  );

  const [form] = Form.useForm();
  const [updateUserProfile] = useMutation(UPDATE_USER_PROFILE);

  const handleSubmit = async (values: any) => {
    try {
      await updateUserProfile({
        variables: {
          firstName: values.firstName,
          lastName: values.lastName,
          email: values.email,
        },
      });
      // show success message or redirect to a different page
    } catch (error) {
      console.error(error);
      // show error message
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const userProfile = data?.userProfile;

  return (
    <div className="user-profile">
      <Card
        title={<h2>User Profile</h2>}
        extra={<DeleteUserButton />}
        style={{ maxWidth: 600 }}
      >
        <Form
          form={form}
          onFinish={handleSubmit}
          initialValues={{
            firstName: userProfile?.firstName,
            lastName: userProfile?.lastName,
            email: userProfile?.email,
          }}
          layout="vertical"
        >
          <Form.Item
            label="First Name"
            name="firstName"
            rules={[
              { required: true, message: "Please enter your first name" },
            ]}
          >
            <Input placeholder="Enter your first name" />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName"
            rules={[{ required: true, message: "Please enter your last name" }]}
          >
            <Input placeholder="Enter your last name" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Please enter your email address" },
              { type: "email", message: "Please enter a valid email address" },
            ]}
          >
            <Input
              name="email"
              type="email"
              defaultValue={userProfile?.email}
            />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 6, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Save Changes
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default UserProfileComponent;
