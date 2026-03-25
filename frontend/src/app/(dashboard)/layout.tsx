"use client";

import React, { useEffect, useState } from 'react';
import { Layout, Menu, Button, Dropdown, Avatar } from 'antd';
import { 
  DashboardOutlined, 
  ProjectOutlined, 
  CheckSquareOutlined, 
  AppstoreOutlined, 
  UserOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import { useRouter, usePathname } from 'next/navigation';

const { Header, Sider, Content } = Layout;

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [role, setRole] = useState<string | null>(null);
  const [userName, setUserName] = useState<string>('');

  useEffect(() => {
    const userRole = localStorage.getItem('userRole');
    const name = localStorage.getItem('userName');
    if (!userRole) {
      router.push('/login');
    } else {
      setRole(userRole);
      setUserName(name || 'User');
    }
  }, [router]);

  if (!role) return null;

  // Role-based menu items
  const menuItems = [
    { key: '/dashboard', icon: <DashboardOutlined />, label: 'Dashboard', access: ['Admin', 'Manager', 'Developer'] },
    { key: '/tickets', icon: <ProjectOutlined />, label: 'Tickets', access: ['Admin', 'Manager', 'Developer'] },
    { key: '/approvals', icon: <CheckSquareOutlined />, label: 'Approvals', access: ['Admin', 'Manager'] },
    { key: '/assets', icon: <AppstoreOutlined />, label: 'Assets', access: ['Admin', 'Manager', 'Developer'] },
    { key: '/users', icon: <UserOutlined />, label: 'Users', access: ['Admin'] },
  ].filter(item => item.access.includes(role));

  const handleLogout = () => {
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    router.push('/login');
  };

  const userMenu = {
    items: [
      { key: 'role', label: <span className="text-gray-500 font-semibold">{role}</span>, disabled: true },
      { type: 'divider' },
      { key: 'logout', danger: true, icon: <LogoutOutlined />, label: 'Logout', onClick: handleLogout }
    ] as any
  };

  return (
    <Layout className="min-h-screen border-0 bg-gray-50">
      <Sider width={250} theme="light" className="shadow-lg z-10 hidden md:block border-r border-gray-200" style={{ background: '#fff' }}>
        <div className="h-16 flex items-center justify-center border-b border-gray-100">
          <h1 className="text-xl font-bold text-indigo-600 tracking-tight">TicketFlow UI</h1>
        </div>
        <Menu 
          mode="inline" 
          selectedKeys={[pathname]} 
          items={menuItems} 
          onClick={({ key }) => router.push(key)}
          className="mt-2 border-r-0 px-2 font-medium text-gray-700"
        />
      </Sider>
      <Layout>
        <Header style={{ background: '#fff' }} className="px-6 flex items-center justify-between shadow-sm z-0">
          <div className="text-lg font-semibold text-gray-800 opacity-0 md:opacity-100 transition-opacity flex items-center h-full">
            {menuItems.find(m => m.key === pathname)?.label || 'Overview'}
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-gray-500">Welcome, {userName}</span>
            <Dropdown menu={userMenu} placement="bottomRight" trigger={['click']}>
              <Avatar style={{ backgroundColor: '#4f46e5', cursor: 'pointer' }} icon={<UserOutlined />} />
            </Dropdown>
          </div>
        </Header>
        <Content className="p-6 overflow-auto" style={{ maxHeight: 'calc(100vh - 64px)' }}>
          <div className="w-full">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}
