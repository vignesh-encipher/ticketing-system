"use client";

import React from 'react';
import { Form, Input, Button, Select, Card, Upload, message } from 'antd';
import { UploadOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

const { TextArea } = Input;
const { Option } = Select;

export default function CreateTicketPage() {
  const router = useRouter();
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    message.success('Ticket created successfully!');
    router.push('/tickets');
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center mb-6">
        <Button 
          type="text" 
          icon={<ArrowLeftOutlined />} 
          onClick={() => router.back()}
          className="mr-2"
        />
        <h2 className="text-2xl font-bold text-gray-800 m-0">Create New Ticket</h2>
      </div>

      <Card className="shadow-sm border-0 rounded-xl">
        <Form form={form} layout="vertical" onFinish={onFinish} size="large">
          <Form.Item name="title" label="Ticket Title" rules={[{ required: true, message: 'Please provide a title' }]}>
            <Input placeholder="E.g., Screen flickering on MacBook" />
          </Form.Item>

          <Form.Item name="description" label="Description" rules={[{ required: true, message: 'Please describe the issue' }]}>
            <TextArea rows={6} placeholder="Provide details about the issue..." />
          </Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Form.Item name="priority" label="Priority" rules={[{ required: true, message: 'Select a priority' }]}>
              <Select placeholder="Select priority">
                <Option value="Low">Low</Option>
                <Option value="Medium">Medium</Option>
                <Option value="High">High</Option>
                <Option value="Critical">Critical</Option>
              </Select>
            </Form.Item>

            <Form.Item name="category" label="Category" rules={[{ required: true, message: 'Select a category' }]}>
              <Select placeholder="Select category">
                <Option value="Hardware">Hardware</Option>
                <Option value="Software">Software</Option>
                <Option value="Network">Network</Option>
                <Option value="Access">Access & Roles</Option>
              </Select>
            </Form.Item>
          </div>

          <Form.Item label="Attachment (Optional)">
            <Upload beforeUpload={() => false} maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to Upload Evidence</Button>
            </Upload>
          </Form.Item>

          <div className="flex justify-end gap-3 mt-6">
            <Button onClick={() => router.back()}>Cancel</Button>
            <Button type="primary" htmlType="submit" style={{ background: '#4f46e5' }}>
              Submit Ticket
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}
