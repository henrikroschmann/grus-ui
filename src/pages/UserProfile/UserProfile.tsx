import React from "react";
import { Card } from "antd";
import { UserProfile as UserProfileType } from "../../types/gql-types";

interface UserProfileProps {
  userProfile: UserProfileType;
}

const UserProfile: React.FC<UserProfileProps> = ({ userProfile }) => {
  return (
    <Card title="User Profile">
      <p>Name: {userProfile.firstName} {userProfile.lastName}</p>
      <p>Email: {userProfile.email}</p>
    </Card>
  );
};

export default UserProfile;
