"use client";

import { useState, useMemo } from "react";
import { Layout, ConfigProvider, theme as antdTheme } from "antd";
import Header from "./header";
import Sidebar from "./sidebar";
import { useTheme } from "./theme-provider";

const { Content } = Layout;

interface LayoutPageProps {
  role?: "admin" | "reviewer" | "owner";
  children?: React.ReactNode;
}

const LayoutPage = ({ role = "admin", children }: LayoutPageProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme } = useTheme();

  // Memoize theme config to prevent recreation on every render
  const themeConfig = useMemo(
    () => ({
      algorithm:
        theme === "dark" ? antdTheme.darkAlgorithm : antdTheme.defaultAlgorithm,
      token: {
        colorBgContainer: theme === "dark" ? "#1f2937" : "#ffffff",
        colorText: theme === "dark" ? "#f3f4f6" : "#111827",
      },
    }),
    [theme]
  );

  return (
    <ConfigProvider theme={themeConfig}>
      <Layout className="min-h-screen">
        <div className="fixed top-0 left-0 right-0 z-50">
          <Header />
        </div>

        <div className="fixed z-40">
          <Sidebar
            role={role}
            collapsed={collapsed}
            onCollapse={setCollapsed}
          />
        </div>
        <Layout
          className="transition-all duration-200"
          style={{
            marginLeft: collapsed ? 80 : 180, // match sider width
            marginTop: 64, // header height
          }}
        >
          <Content
            className="p-6 bg-white dark:bg-gray-900 h-[calc(100vh-64px)] overflow-y-auto transition-colors duration-300"
            style={{
              backgroundColor: theme === "dark" ? "#0a0a0a" : "#ffffff",
              color: theme === "dark" ? "#D0D5DB" : "#0a0a0a",
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

export default LayoutPage;
