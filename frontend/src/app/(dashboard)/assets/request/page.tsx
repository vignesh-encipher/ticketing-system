"use client";

import React from 'react';
import { Card, Form, Select, Input, Button, message } from 'antd';
import { ArrowLeftOutlined, SendOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { Option } = Select;
const { TextArea } = Input;

export default function RequestAssetPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = () => {
    message.success('Hardware request submitted successfully and waiting for manager approval!');
    router.push('/assets');
  };

  return (
    <div className="max-w-xl">
      <div className="flex items-center mb-6">
        <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} className="mr-2" />
        <h2 className="text-2xl font-bold text-gray-800 m-0">Request New Asset</h2>
      </div>

      <Card className="shadow-sm border-0 rounded-xl p-4">
        <div className="mb-6">
          <p className="text-gray-500">
            Submit a request for new hardware or software. 
            All submissions will be routed directly to pending approvals for the management team.
          </p>
        </div>

        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="type" label="Asset Type" rules={[{ required: true, message: 'Please select an asset type' }]}>
            <Select placeholder="Laptop, Monitor, Mobile Device...">
              <Option value="Laptop">Laptop / Workstation</Option>
              <Option value="Monitor">Monitor / External Display</Option>
              <Option value="Mobile">Mobile Device (Phone / Tablet)</Option>
              <Option value="Software">Software License</Option>
              <Option value="Accessory">Accessory (Keyboard, Mouse)</Option>
            </Select>
          </Form.Item>

          <Form.Item name="reason" label="Business Justification" rules={[{ required: true, message: 'Please provide a valid justification' }]}>
            <TextArea rows={5} placeholder="Explain why this asset is required for your role..." />
          </Form.Item>

          <Button type="primary" htmlType="submit" icon={<SendOutlined />} className="w-full mt-2 bg-indigo-600 hover:bg-indigo-500 border-0 h-12 shadow-md">
            Submit Request
          </Button>
        </Form>
      </Card>
    </div>
  );
}
