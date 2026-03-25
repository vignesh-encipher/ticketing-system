"use client";

import React from 'react';
import { Table, Button, Space } from 'antd';
import { StatusTag } from '@/components/common/StatusTag';
import { PriorityTag } from '@/components/common/PriorityTag';
import { useRouter } from 'next/navigation';

export const TicketTable: React.FC<{ data: any[], role: string }> = ({ data, role }) => {
  const router = useRouter();

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title', width: '30%' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusTag status={s} /> },
    { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (p: string) => <PriorityTag priority={p} /> },
    { title: 'Assigned To', dataIndex: 'assignedTo', key: 'assignedTo', render: (a: string) => a || <span className="text-gray-400 italic">Unassigned</span> },
    {
      title: 'Actions',
      key: 'actions',
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space>
          <Button type="primary" size="small" onClick={() => router.push(`/tickets/${record.id}`)}>
            View
          </Button>
        </Space>
      )
    }
  ];

  return <Table columns={columns} dataSource={data} rowKey="id" />;
};
