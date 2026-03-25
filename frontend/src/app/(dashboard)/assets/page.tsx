"use client";

import React, { useState } from 'react';
import { Table, Button, Badge, Modal, Select, message } from 'antd';
import { PlusOutlined, UserSwitchOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { assets, users } from '@/data/mockData';

export default function AssetsPage() {
  const router = useRouter();
  const [data, setData] = useState(assets);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState<number | null>(null);
  const [selectedUser, setSelectedUser] = useState<string>('');
  
  const role = localStorage.getItem('userRole');

  const handleAssign = (id: number) => {
    setSelectedAsset(id);
    setModalVisible(true);
  };

  const confirmAssignment = () => {
    if (!selectedUser) {
      message.error('Please select a user');
      return;
    }
    const userName = users.find(u => u.id === parseInt(selectedUser))?.name;
    setData(data.map(asset => 
      asset.id === selectedAsset 
        ? { ...asset, status: 'Assigned', assignedTo: userName || 'Unknown User' } 
        : asset
    ));
    message.success(`Asset assigned to ${userName}`);
    setModalVisible(false);
    setSelectedUser('');
  };

  const columns = [
    { title: 'Asset Name', dataIndex: 'name', key: 'name' },
    { title: 'Type', dataIndex: 'type', key: 'type' },
    { 
      title: 'Status', 
      dataIndex: 'status', 
      key: 'status',
      render: (status: string) => (
        <Badge status={status === 'Available' ? 'success' : 'processing'} text={status} />
      ),
    },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo', render: (text: string) => text || '--' },
  ];

  if (role === 'Admin' || role === 'Manager') {
    columns.push({
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Button 
          type="link" 
          icon={<UserSwitchOutlined />} 
          onClick={() => handleAssign(record.id)}
          disabled={record.status === 'Assigned'}
        >
          Assign
        </Button>
      ),
    } as any);
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">Hardware & Software Assets</h2>
          <p className="text-gray-500">Track and manage employee hardware allocations.</p>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          onClick={() => router.push('/assets/request')}
          style={{ background: '#4f46e5' }}
        >
          Request Asset
        </Button>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>

      <Modal
        title="Assign Asset to Employee"
        open={modalVisible}
        onOk={confirmAssignment}
        onCancel={() => { setModalVisible(false); setSelectedUser(''); }}
        okText="Confirm Assignment"
      >
        <p className="mb-2 font-medium">Select Employee:</p>
        <Select
          className="w-full mb-4"
          placeholder="Select an employee"
          value={selectedUser}
          onChange={setSelectedUser}
          options={users.map(u => ({ label: `${u.name} - ${u.email}`, value: u.id.toString() }))}
        />
      </Modal>
    </div>
  );
}
