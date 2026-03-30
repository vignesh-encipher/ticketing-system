"use client";

import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Typography, message, Layout, Select } from "antd";
import { UserOutlined, MailOutlined, LockOutlined, IdcardOutlined, ApartmentOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { requestPortal } from "@/util/network";

const { Title, Text } = Typography;
const { Option } = Select;

const RegisterPage = () => {
  const [loading, setLoading] = useState(false);
  const [departments, setDepartments] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const res = await requestPortal("departments", { method: "GET" });
      if (res.status === 'SUCCESS') {
        setDepartments(res.response);
      }
    } catch (error) {
      console.error("Failed to fetch departments", error);
    }
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await requestPortal("auth/register", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.status === 'SUCCESS') {
        message.success("Registration successful!");
        router.push("/login");
      } else {
        message.error(res.message || "Registration failed");
      }
    } catch (error: any) {
      message.error(error.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-xl shadow-xl rounded-2xl border-none">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-100">
            <Title level={2} className="m-0 text-white font-bold">E</Title>
          </div>
          <Title level={3} className="m-0 font-bold text-slate-800">
            Create Account
          </Title>
          <Text className="text-slate-400">
            Join Encipher Health's internal ticketing system
          </Text>
        </div>

        <Form
          name="register"
          onFinish={onFinish}
          layout="vertical"
          size="large"
          className="grid grid-cols-1 md:grid-cols-2 gap-x-4"
        >
          <Form.Item
            name="name"
            label="Full Name"
            className="md:col-span-2"
            rules={[{ required: true, message: "Please input your full name!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Marcus Sterling" />
          </Form.Item>

          <Form.Item
            name="email"
            label="Work Email"
            rules={[
              { required: true, message: "Please input your email!" },
              { type: 'email', message: 'Please enter a valid email!' },
              { 
                pattern: /@encipherhealth\.com$/, 
                message: 'Must be an @encipherhealth.com email' 
              }
            ]}
          >
            <Input prefix={<MailOutlined />} placeholder="name@encipherhealth.com" />
          </Form.Item>

          <Form.Item
            name="employeeId"
            label="Employee ID"
            rules={[{ required: true, message: "Please input your employee ID!" }]}
          >
            <Input prefix={<IdcardOutlined />} placeholder="EHP-1024" />
          </Form.Item>

          <Form.Item
            name="department"
            label="Department"
            rules={[{ required: true, message: "Please select your department!" }]}
          >
            <Select 
              prefix={<ApartmentOutlined />} 
              placeholder="Select Department"
              showSearch
              optionFilterProp="children"
            >
              {departments?.map(dept => (
                <Option key={dept.id} value={dept.id}>{dept.name}</Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="roleType"
            label="Role"
            rules={[{ required: true, message: "Please select your role!" }]}
          >
            <Select placeholder="Select Role">
              <Option value="Admin">Admin</Option>
              <Option value="Manager">Manager</Option>
              <Option value="Agent">Agent</Option>
              <Option value="User">User</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
                { required: true, message: "Please input your password!" },
                { min: 6, message: 'Password must be at least 6 characters' }
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
          </Form.Item>

          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            dependencies={['password']}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="••••••••" />
          </Form.Item>

          <Form.Item className="md:col-span-2 mt-4">
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded-lg bg-indigo-600 font-bold text-lg border-none hover:bg-indigo-700 shadow-md shadow-indigo-100"
              loading={loading}
            >
              Create Account
            </Button>
          </Form.Item>

          <div className="md:col-span-2 text-center mt-2">
            <Text className="text-slate-500">Already have an account? </Text>
            <Button 
                type="link" 
                className="p-0 text-indigo-600 font-bold"
                onClick={() => router.push("/login")}
            >
                Login here
            </Button>
          </div>
        </Form>
      </Card>
    </Layout>
  );
};

export default RegisterPage;
