import { UserOutlined, PicLeftOutlined } from "@ant-design/icons";

import { MenuItem } from "./types/MenuItem";
import Dashboard from "./pages/Dashboard/Dashboard";
import UserProfile from "./pages/UserProfile/UserProfile";
import SignIn from "./components/auth/SignIn";
import Register from "./components/auth/Register";
import SignOut from "./components/auth/SignOut";
import Budgets from "./pages/Budget/Budgets";

export const items: MenuItem[] = [
  {
    title: "Dashboard",
    key: "dashboard",
    icon: <PicLeftOutlined />,
    route: "/",
    component: Dashboard,
    protected: true
  },
  {
    title: "Budgets",
    key: "budget",
    icon: <PicLeftOutlined />,
    route: "/budget",
    component: Budgets,
    protected: true
  },
  {
    title: "User Profile",
    key: "user",
    icon: <UserOutlined />,
    route: "/profile",
    component: UserProfile,
    protected: true
  },
  {
    title: "SignIn",
    key: "signIn",
    icon: <UserOutlined />,
    route: "/signin",
    component: SignIn,
    protected: false
  },
  {
    title: "Register",
    key: "register",
    icon: <UserOutlined />,
    route: "/register",
    component: Register,
    protected: false
  },
  {
    title: "SignOut",
    key: "signout",
    icon: <UserOutlined />,
    route: "/signout",
    component: SignOut,
    protected: false
  },
];
