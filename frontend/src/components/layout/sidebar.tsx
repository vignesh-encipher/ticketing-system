"use client";

import { memo, useMemo } from "react";
import { Layout, Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AiOutlineDashboard,
  AiOutlineUser,
  AiOutlineFileText,
  AiOutlineSync,
  AiOutlineTable,
  AiOutlineMenuFold,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { useTheme } from "./theme-provider";

const { Sider } = Layout;

interface SidebarProps {
  role: "admin" | "reviewer" | "owner";
  collapsed: boolean;
  onCollapse: (collapsed: boolean) => void;
}

// Role-based menu configuration - using functions to create icons on demand
const getRoleMenus = (role: "admin" | "reviewer" | "owner") => {
  const basePath = `/${role}`;
  return [
    {
      key: "dashboard",
      icon: AiOutlineDashboard,
      label: "Dashboard",
      href: `${basePath}/dashboard`,
    },
    {
      key: "patients",
      icon: AiOutlineUser,
      label: "Patients",
      href: `${basePath}/patients`,
    },
    {
      key: "reports",
      icon: AiOutlineFileText,
      label: "Reports",
      href: `${basePath}/reports`,
    },
    {
      key: "loopings",
      icon: AiOutlineSync,
      label: "Loopings",
      href: `${basePath}/loopings`,
    },
    {
      key: "table",
      icon: AiOutlineTable,
      label: "Table",
      href: `${basePath}/table`,
    },
  ];
};

const Sidebar = memo(({ role, collapsed, onCollapse }: SidebarProps) => {
  const { theme } = useTheme();
  const pathname = usePathname();
  
  // Memoize menu items to prevent recreation on every render
  const menuItems = useMemo(() => {
    const menus = getRoleMenus(role);
    return menus.map((item) => {
      const IconComponent = item.icon;
      return {
        key: item.key,
        icon: <IconComponent />,
        label: <Link href={item.href}>{item.label}</Link>,
      };
    });
  }, [role]);

  // Get the selected key based on current pathname
  const selectedKey = useMemo(() => {
    const menus = getRoleMenus(role);
    const currentMenu = menus.find((menu) => pathname === menu.href);
    return currentMenu?.key || menus[0]?.key || "dashboard";
  }, [pathname, role]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      className="bg-blue-100 dark:bg-gray-800 fixed left-0 top-16 bottom-0 transition-colors duration-300"
      width={180}
      collapsedWidth={80}
      trigger={null}
    >
      <div
        className="flex items-center justify-center w-full h-12 bg-blue-200 dark:bg-gray-700 hover:bg-blue-300 dark:hover:bg-gray-600 transition-colors cursor-pointer"
        onClick={() => onCollapse(!collapsed)}
      >
        {collapsed ? (
          <AiOutlineMenuUnfold className="text-lg text-gray-800 dark:text-gray-200" />
        ) : (
          <AiOutlineMenuFold className="text-lg text-gray-800 dark:text-gray-200" />
        )}
      </div>
      <Menu
        mode="inline"
        items={menuItems}
        className="bg-blue-100 dark:bg-gray-800 border-r-0 flex-1 transition-colors duration-300"
        theme={theme}
        selectedKeys={[selectedKey]}
      />
    </Sider>
  );
});

Sidebar.displayName = "Sidebar";

export default Sidebar;
