import React from "react";
import { Button, Card } from "antd";

const SignOut: React.FC = () => {
  const handleSignOut = () => {
    console.log("Signing out...");
    // Implement your signOut logic here
  };

  return (
    <Card title="Sign Out">
      <p>Are you sure you want to sign out?</p>
      <Button type="primary" onClick={handleSignOut}>
        Sign Out
      </Button>
    </Card>
  );
};
export default SignOut;
