import { NavLink, useLocation } from "react-router-dom";
import { Button, Menu } from "antd";
import Sider from "antd/es/layout/Sider";
import { useContext, useEffect, useState } from "react";
import { items } from "../../menuItems";
import SubMenu from "antd/es/menu/SubMenu";
import "./Sidebar.css";

import { MenuItem } from "../../types/MenuItem";

import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { getFlatRoutes } from "../../routes/routesUtils";
import { ThemeContext } from "../../ThemeContext";

interface SidebarProps {
  isMobile: boolean;
  setIsMobile: (value: boolean) => void;
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
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

const Sidebar = ({
  isMobile,
  setIsMobile,
  collapsed,
  setCollapsed,
}: SidebarProps) => {
  const [theme] = useContext(ThemeContext);
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
  }, [setIsMobile, setCollapsed]);

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
      onCollapse={setCollapsed}
      style={{
        position: "fixed",
        height: isMobile ? "auto" : "100%",
        zIndex: 1,
      }}
    >
      <div className="logo" />
      <Menu
        theme={theme}
        selectedKeys={selectedKeys}
        mode={isMobile ? "horizontal" : "inline"}
      >
        {renderMenuItems(items, "")}
      </Menu>
      {!isMobile && (
        <div style={{ position: "absolute", right: 0 }}>
          <Button type="text" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          </Button>
        </div>
      )}
    </Sider>
  );
};

export default Sidebar;
