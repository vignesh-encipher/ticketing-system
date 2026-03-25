"use client";

import React, { useEffect, useState } from 'react';
import { Form, Input, Button, Card, Select, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = (values: any) => {
    setLoading(true);
    setTimeout(() => {
      // Mock Auth: Store role in localStorage
      localStorage.setItem('userRole', values.role);
      localStorage.setItem('userName', values.email.split('@')[0]);
      message.success(`Logged in successfully as ${values.role}`);
      router.push('/dashboard');
    }, 800);
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md shadow-xl rounded-xl border-0">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Ticketing System</h1>
          <p className="text-gray-500">Sign in to your account</p>
        </div>

        <Form layout="vertical" onFinish={onFinish} size="large" initialValues={{ email: 'admin@company.com', password: 'password', role: 'Admin' }}>
          <Form.Item name="email" label="Email" rules={[{ required: true, message: 'Please enter your email' }]}>
            <Input prefix={<UserOutlined />} placeholder="Email" />
          </Form.Item>
          <Form.Item name="password" label="Password" rules={[{ required: true, message: 'Please enter your password' }]}>
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item name="role" label="Role" rules={[{ required: true, message: 'Please select a role' }]}>
            <Select>
              <Select.Option value="Admin">Admin</Select.Option>
              <Select.Option value="Manager">Manager</Select.Option>
              <Select.Option value="Developer">Developer</Select.Option>
            </Select>
          </Form.Item>
          <Button type="primary" htmlType="submit" className="w-full mt-2" loading={loading} style={{ background: '#4f46e5' }}>
            Log In
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default LoginPage;
