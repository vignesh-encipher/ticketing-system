"use client";

import React, { useState } from 'react';
import { Table, Button, Space, message, Modal, Input } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { tickets } from '@/data/mockData';
import { PriorityTag } from '@/components/common/PriorityTag';

const { TextArea } = Input;

export default function ApprovalsPage() {
  const [data, setData] = useState(tickets.filter(t => t.status === 'Pending Approval'));
  const [rejectModal, setRejectModal] = useState<{ visible: boolean, id: number | null }>({ visible: false, id: null });
  const [reason, setReason] = useState('');

  const handleApprove = (id: number) => {
    message.success('Ticket Approved!');
    setData(data.filter(t => t.id !== id));
  };

  const confirmReject = () => {
    if (!reason.trim()) {
      message.error('Please provide a reason');
      return;
    }
    message.success('Ticket Rejected');
    setData(data.filter(t => t.id !== rejectModal.id));
    setRejectModal({ visible: false, id: null });
    setReason('');
  };

  const columns = [
    { title: 'Ticket ID', dataIndex: 'id', key: 'id', width: 100 },
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (p: string) => <PriorityTag priority={p} /> },
    {
      title: 'Action',
      key: 'action',
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" size="small" className="bg-green-600 hover:bg-green-500 border-0" icon={<CheckOutlined />} onClick={() => handleApprove(record.id)}>
            Approve
          </Button>
          <Button danger size="small" icon={<CloseOutlined />} onClick={() => setRejectModal({ visible: true, id: record.id })}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2 text-gray-800">Approvals</h2>
      <p className="text-gray-500 mb-6">Review and action pending requests.</p>
      
      <div className="bg-white p-6 rounded-lg shadow-sm">
        <Table columns={columns} dataSource={data} rowKey="id" />
      </div>

      <Modal
        title="Reject Ticket Request"
        open={rejectModal.visible}
        onOk={confirmReject}
        onCancel={() => setRejectModal({ visible: false, id: null })}
        okText="Confirm Rejection"
        okButtonProps={{ danger: true }}
      >
        <p className="mb-2 font-medium">Please provide a reason for rejection:</p>
        <TextArea rows={4} value={reason} onChange={e => setReason(e.target.value)} placeholder="Required rejection reason..." />
      </Modal>
    </div>
  );
}
