import {
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
} from "@ant-design/icons";
import Option1 from "./components/pages/Option1";
import { MenuItem } from "./types/MenuItem";

export const items: MenuItem[] = [
  {
    title: "Option 1",
    key: "1",
    icon: <PieChartOutlined />,
    route: "/",
    component: Option1,
  },
  {
    title: "Option 2",
    key: "2",
    icon: <DesktopOutlined />,
    route: "/option2",
    component: Option1,
  },
  {
    title: "User",
    key: "sub1",
    icon: <UserOutlined />,
    route: "/user",
    component: Option1,
    children: [
      {
        title: "Tom",
        key: "3",
        route: "tom",
        component: Option1,
      },
      {
        title: "Bill",
        key: "4",
        route: "bill",
        component: Option1,
      },
      {
        title: "Alex",
        key: "5",
        route: "alex",
        component: Option1,
      },
    ],
  },
  {
    title: "Team",
    key: "sub2",
    icon: <TeamOutlined />,
    route: "/team",
    component: Option1,
    children: [
      {
        title: "Team 1",
        key: "6",
        route: "/team1",
        component: Option1,
      },
      {
        title: "Team 2",
        key: "8",
        route: "/team2",
        component: Option1,
      },
    ],
  },
  {
    title: "Files",
    key: "9",
    icon: <FileOutlined />,
    route: "/files",
    component: Option1,
  },
];
