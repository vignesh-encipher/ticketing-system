"use client";

import { useEffect, useState } from "react";
import { Form, Input, Button, Card, message } from "antd";
import { UserOutlined, LockOutlined, RightOutlined } from "@ant-design/icons";
import { connect } from "react-redux";
import { actions as authActions } from "@/state/auth";
import { useRouter } from "next/navigation";

interface LoginPageProps {
  login: (payload: any) => Promise<any>;
  loginLoading: boolean;
}

const LoginPage = ({ login, loginLoading }: LoginPageProps) => {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onFinish = async (values: any) => {
    try {
      await login(values);
      message.success("Login successful");
      router.push("/admin/kanban");
    } catch (err) {
      message.error("Invalid credentials");
    }
  };

  if (!mounted) return null; // Prevent hydration errors with animations

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-slate-900">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px] opacity-40 animate-blob mix-blend-screen" />
        <div className="absolute top-[20%] right-[-10%] w-[35%] h-[40%] bg-purple-600 rounded-full blur-[100px] opacity-40 animate-blob animation-delay-2000 mix-blend-screen" />
        <div className="absolute bottom-[-20%] left-[20%] w-[40%] h-[40%] bg-indigo-500 rounded-full blur-[120px] opacity-40 animate-blob animation-delay-4000 mix-blend-screen" />
      </div>

      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05) !important;
          backdrop-filter: blur(20px) !important;
          -webkit-backdrop-filter: blur(20px) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5) !important;
        }
        .ant-form-item-label > label {
          color: rgba(255, 255, 255, 0.85) !important;
        }
        .ant-input-affix-wrapper {
          background: rgba(255, 255, 255, 0.1) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          color: white !important;
        }
        .ant-input-affix-wrapper input {
          background: transparent !important;
          color: white !important;
        }
        .ant-input-affix-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.5) !important;
        }
        .ant-input-affix-wrapper-focused,
        .ant-input-affix-wrapper:hover {
          background: rgba(255, 255, 255, 0.15) !important;
          border-color: #6366f1 !important;
          box-shadow: 0 0 0 2px rgba(99, 102, 241, 0.2) !important;
        }
        .ant-input-prefix {
          color: rgba(255, 255, 255, 0.6) !important;
        }
      `}</style>

      {/* Login Card */}
      <div 
        className="z-10 w-full max-w-[420px] p-6 transform transition-all duration-700 hover:scale-[1.01]"
        style={{ 
          animation: "slideUpFade 0.8s ease-out forwards",
          opacity: 0,
          transform: "translateY(20px)"
        }}
      >
        <Card className="glass-card text-white border-0 rounded-2xl overflow-hidden">
          <div className="text-center mb-8">
            <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg mb-4 transform transition-transform hover:rotate-12 duration-300">
              <LockOutlined className="text-3xl text-white" />
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-2">
              Welcome back
            </h1>
            <p className="text-gray-400">Sign in to your Ticketing workspace</p>
          </div>

          <Form layout="vertical" onFinish={onFinish} size="large" initialValues={{ email: 'testuser@company.com', password: 'password123' }}>
            <Form.Item 
              label="Work Email" 
              name="email" 
              rules={[{ required: true, message: 'Please input your email!' }, { type: 'email', message: 'Valid email required!' }]}
            >
              <Input 
                prefix={<UserOutlined />} 
                placeholder="name@company.com" 
                className="rounded-lg h-12"
              />
            </Form.Item>
            <Form.Item 
              label="Password" 
              name="password" 
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password 
                prefix={<LockOutlined />} 
                placeholder="Enter your password" 
                className="rounded-lg h-12"
              />
            </Form.Item>

            <Button 
              type="primary" 
              htmlType="submit" 
              className="w-full h-12 text-base font-semibold rounded-lg mt-4 bg-indigo-600 hover:bg-indigo-500 border-0 shadow-lg hover:shadow-indigo-500/30 transition-all flex items-center justify-center group"
              loading={loginLoading}
            >
              <span className="mr-2">Log In</span>
              <RightOutlined className="text-xs transition-transform group-hover:translate-x-1" />
            </Button>
          </Form>
        </Card>
      </div>

      <style jsx>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

const enhancer = connect(
  (state: any) => ({
    loginLoading: state.auth?.loginLoading || false,
  }),
  { login: authActions.login }
);

export default enhancer(LoginPage);
