"use client";

import React, { useEffect, useState } from 'react';
import { Card, Statistic, Row, Col, Table, Tag } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, ClockCircleOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { tickets } from '@/data/mockData';
import { StatusTag } from '@/components/common/StatusTag';
import { PriorityTag } from '@/components/common/PriorityTag';

export default function DashboardPage() {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    setRole(localStorage.getItem('userRole'));
  }, []);

  const totalTickets = tickets.length;
  const pending = tickets.filter(t => t.status === 'Pending Approval').length;
  const inProgress = tickets.filter(t => t.status === 'In Progress' || t.status === 'Assigned').length;
  const resolved = tickets.filter(t => t.status === 'Resolved' || t.status === 'Completed').length;

  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Status', dataIndex: 'status', key: 'status', render: (s: string) => <StatusTag status={s} /> },
    { title: 'Priority', dataIndex: 'priority', key: 'priority', render: (p: string) => <PriorityTag priority={p} /> },
  ];

  if (!role) return null;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Overview</h2>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm border-l-4 border-indigo-500 rounded-lg">
            <Statistic title="Total Tickets" value={totalTickets} prefix={<InfoCircleOutlined className="text-indigo-500 mr-2" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm border-l-4 border-yellow-500 rounded-lg">
            <Statistic title="Pending Approvals" value={pending} prefix={<ClockCircleOutlined className="text-yellow-500 mr-2" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm border-l-4 border-blue-500 rounded-lg">
            <Statistic title="Active Tickets" value={inProgress} prefix={<ExclamationCircleOutlined className="text-blue-500 mr-2" />} />
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card bordered={false} className="shadow-sm border-l-4 border-green-500 rounded-lg">
            <Statistic title="Resolved" value={resolved} prefix={<CheckCircleOutlined className="text-green-500 mr-2" />} />
          </Card>
        </Col>
      </Row>

      <div className="mt-8 bg-white p-4 rounded-lg shadow-sm">
        <h3 className="text-lg font-medium text-gray-700 mb-4">Recent Tickets</h3>
        <Table dataSource={tickets} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} size="middle" />
      </div>
    </div>
  );
}
