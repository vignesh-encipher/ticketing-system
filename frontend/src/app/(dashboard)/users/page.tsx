"use client";

import React, { useState } from 'react';
import { Table, Button, Badge, Modal, Input, Select, message, Form } from 'antd';
import { UserAddOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { users as initialUsers } from '@/data/mockData';

export default function UsersAdministratorPage() {
  const router = useRouter();
  const [data, setData] = useState(initialUsers);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm?.() || []; 
  // Custom mock form handling since hooks usually bind properly, we just employ local logic for mock constraints.
  const [newUser, setNewUser] = useState({ name: '', email: '', role: 'Developer' });

  const role = localStorage.getItem('userRole');

  if (role !== 'Admin') {
    return (
      <div className="flex flex-col items-center justify-center p-16">
        <h2 className="text-2xl font-bold text-gray-800">Access Denied</h2>
        <p className="text-gray-500 mt-2">You do not have Administrator permissions to view this page.</p>
        <Button className="mt-6" type="primary" onClick={() => router.push('/dashboard')}>Back to Dashboard</Button>
      </div>
    );
  }

  const columns = [
    { title: 'User Index ID', dataIndex: 'id', key: 'id', width: 120 },
    { title: 'Full Name', dataIndex: 'name', key: 'name' },
    { title: 'Email Address', dataIndex: 'email', key: 'email' },
    { 
      title: 'Current Role', 
      dataIndex: 'role', 
      key: 'role',
      render: (roleConfig: string) => {
        const colors: any = { Admin: 'red', Manager: 'blue', Developer: 'green' };
        return <Badge color={colors[roleConfig]} text={<span className="font-semibold">{roleConfig}</span>} />;
      }
    },
  ];

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email) {
      message.error("Please fill out all fields");
      return;
    }
    const createdUser = {
      id: data.length + 1,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    };
    
    setData([...data, createdUser]);
    message.success('User provisioned successfully');
    setIsModalOpen(false);
    setNewUser({ name: '', email: '', role: 'Developer' });
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">User Management</h2>
          <p className="text-gray-500">Internal active directory and configuration portal.</p>
        </div>
        
        <Button 
          type="primary" 
          icon={<UserAddOutlined />} 
          onClick={() => setIsModalOpen(true)}
          style={{ background: '#4f46e5' }}
        >
          Provision User
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 10 }} />
      </div>

      <Modal
        title="Provision New Identity"
        open={isModalOpen}
        onOk={handleAddUser}
        onCancel={() => setIsModalOpen(false)}
        okText="Provision"
      >
        <div className="space-y-4 my-4">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <Input 
              placeholder="e.g. Satoshi Nakamoto" 
              value={newUser.name}
              onChange={e => setNewUser({ ...newUser, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email Coordinates</label>
            <Input 
              type="email"
              placeholder="e.g. s.nakamoto@company.com" 
              value={newUser.email}
              onChange={e => setNewUser({ ...newUser, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Role Type</label>
            <Select 
              className="w-full"
              value={newUser.role}
              onChange={val => setNewUser({ ...newUser, role: val })}
              options={[
                { label: 'Platform Admin', value: 'Admin' },
                { label: 'Engineering Manager', value: 'Manager' },
                { label: 'Systems Developer', value: 'Developer' },
              ]}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
