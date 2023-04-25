import React, { useContext } from "react";
import { Button, Card } from "antd";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

const SignOut: React.FC = () => {
  const { setIsAuthenticated } = useContext(AuthContext);
  const nav = useNavigate();
  const handleSignOut = () => {    
    localStorage.removeItem("token");
    setIsAuthenticated(false)
    nav("/signin");
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
