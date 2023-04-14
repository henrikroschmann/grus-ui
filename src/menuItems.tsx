import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  FileOutlined,
} from "@ant-design/icons";

import { MenuItem } from "./types/MenuItem";
import AddToBudgetForm from "./components/AddToBudgetForm/AddToBudgetForm";
import Dashboard from "./pages/Dashboard/Dashboard";
import Option1 from "./pages/Option1/Option1";
import PersonalBudget from "./pages/PersonalBudget/PersonalBudget";

export const items: MenuItem[] = [
  {
    title: "Example table",
    key: "1",
    icon: <PieChartOutlined />,
    route: "/",
    component: PersonalBudget,
    protected: false,
  },
  {
    title: "Example Dashboard",
    key: "2",
    icon: <DesktopOutlined />,
    route: "/option2",
    component: Dashboard,
    protected: false,
  },
  {
    title: "User",
    key: "sub1",
    icon: <UserOutlined />,
    route: "/user",
    component: Option1,
    protected: false,
    children: [
      {
        title: "Tom",
        key: "3",
        route: "tom",
        component: Option1,
        protected: false,
      },
      {
        title: "Bill",
        key: "4",
        route: "bill",
        component: Option1,
        protected: false,
      },
      {
        title: "Alex",
        key: "5",
        route: "alex",
        component: Option1,
        protected: false,
      },
    ],
  },
  {
    title: "Example form with validation",
    key: "9",
    icon: <FileOutlined />,
    route: "/files",
    protected: false,
    component: AddToBudgetForm,
  },
  {
    title: "Protected route",
    key: "9",
    icon: <FileOutlined />,
    route: "/protected",
    protected: true,
    component: AddToBudgetForm,
  },
];
