"use client";

import React, { useState } from "react";
import { Form, Input, Button, Card, Typography, message, Layout } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { requestPortal } from "@/util/network";

const { Title, Text } = Typography;

const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const res = await requestPortal("auth/login", {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (res.status === 'SUCCESS') {
        message.success("Login successful!");
        sessionStorage.setItem("accessToken", res.response.accessToken);
        sessionStorage.setItem("user", JSON.stringify(res.response.user));
        sessionStorage.setItem("userId", res.response.user.id);
        
        // Redirect based on role or to dashboard
        router.push("/admin/dashboard");
      } else {
        message.error(res.message || "Login failed");
      }
    } catch (error: any) {
      message.error(error.message || "An error occurred during login");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout className="h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl border-none">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-indigo-100">
            <Title level={2} className="m-0 text-white font-bold">E</Title>
          </div>
          <Title level={3} className="m-0 font-bold text-slate-800">
            Welcome Back
          </Title>
          <Text className="text-slate-400">
            Login to access your health ticketing dashboard
          </Text>
        </div>

        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          layout="vertical"
          size="large"
        >
          <Form.Item
            name="email"
            rules={[
              { required: true, message: "Please input your Email!" },
              { type: 'email', message: 'Please enter a valid email!' },
              { 
                pattern: /@encipherhealth\.com$/, 
                message: 'Must be an @encipherhealth.com email' 
              }
            ]}
          >
            <Input 
              prefix={<UserOutlined className="text-slate-400" />} 
              placeholder="Email (@encipherhealth.com)" 
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-slate-400" />}
              placeholder="Password"
              className="rounded-lg h-12"
            />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-12 rounded-lg bg-indigo-600 font-bold text-lg border-none hover:bg-indigo-700 transition-all duration-300 shadow-md shadow-indigo-100"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>

          <div className="text-center mt-6">
            <Text className="text-slate-500">Don't have an account? </Text>
            <Button 
                type="link" 
                className="p-0 text-indigo-600 font-bold hover:text-indigo-700"
                onClick={() => router.push("/register")}
            >
                Register Now
            </Button>
          </div>
        </Form>
      </Card>
    </Layout>
  );
};

export default LoginPage;
