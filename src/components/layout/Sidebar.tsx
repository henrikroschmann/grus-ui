import { NavLink, useLocation } from "react-router-dom";
import { Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import { items } from "../../menuItems";
import SubMenu from "antd/es/menu/SubMenu";
import "../../styles/Sidebar.css";
import { ThemeContext } from "./ThemeContext";
import { MenuItem } from "../../types/MenuItem";
import { getFlatRoutes } from "../../utils/routesUtils";


interface SidebarProps {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
}

interface SidebarMenuItemProps {
  menuItem: MenuItem;
  onMenuItemClick: (key: string) => void;
}

const SidebarMenuItem = ({
  menuItem,
  onMenuItemClick,
}: SidebarMenuItemProps) => {
  const location = useLocation();
  const flatRoutes = getFlatRoutes();
  const flatRoute = flatRoutes.find((r) => r.key === menuItem.key);
  const route = flatRoute?.route || "";

  // Determine if the NavLink should be active
  const isActive = location.pathname === route;

  return (
    <Menu.Item
      key={menuItem.key}
      icon={menuItem.icon}
      className={isActive ? "active-menu-item" : ""}
    >
      <NavLink to={route} onClick={() => onMenuItemClick(menuItem.key)}>
        {menuItem.title}
      </NavLink>
    </Menu.Item>
  );
};

const Sidebar = ({ isMobile, setIsMobile }: SidebarProps) => {
  const [theme] = useContext(ThemeContext);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKeys, setSelectedKeys] = useState<string[]>([""]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1400) {
        // Medium breakpoint
        setCollapsed(false);
        setIsMobile(false);
      } else if (window.innerWidth < 768) {
        setIsMobile(true);
      } else {
        setCollapsed(true);
        setIsMobile(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [setIsMobile]);

  const renderMenuItems = (menuItems: any[], parentRoute: string) => {
    return menuItems.map((menuItem) => {
      const route = parentRoute
        ? `${parentRoute}/${menuItem.route}`
        : menuItem.route;

      if (menuItem.children) {
        return (
          <SubMenu
            key={menuItem.key}
            icon={menuItem.icon}
            title={menuItem.title}
          >
            {renderMenuItems(menuItem.children, route)}
          </SubMenu>
        );
      }

      return (
        <SidebarMenuItem
          key={menuItem.key}
          menuItem={menuItem}
          onMenuItemClick={(key) => setSelectedKeys([key])}
        />
      );
    });
  };

  return (
    <Sider
      width={isMobile ? "100%" : 200}
      collapsible={!isMobile}
      collapsed={!isMobile && collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className="logo" />
      <Menu
        theme={theme}
        selectedKeys={selectedKeys}
        mode={isMobile ? "horizontal" : "inline"}
      >
        {renderMenuItems(items, "")}
      </Menu>
    </Sider>
  );
};

export default Sidebar;
