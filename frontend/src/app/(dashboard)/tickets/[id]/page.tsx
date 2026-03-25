"use client";

import React, { useEffect, useState } from 'react';
import { Card, Button, Divider, Input, message, Modal, Select } from 'antd';
import { ArrowLeftOutlined, CheckOutlined, CloseOutlined, UserAddOutlined, EditOutlined } from '@ant-design/icons';
import { useParams, useRouter } from 'next/navigation';
import { StatusTag } from '@/components/common/StatusTag';
import { PriorityTag } from '@/components/common/PriorityTag';
import { tickets, users } from '@/data/mockData';

export default function TicketDetailsPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.id as string;
  const [ticket, setTicket] = useState<any>(null);
  const [role, setRole] = useState<string>('');
  const [isAssignModal, setIsAssignModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<string>('');

  useEffect(() => {
    setRole(localStorage.getItem('userRole') || 'Developer');
    const found = tickets.find(t => t.id === parseInt(ticketId));
    setTicket(found || tickets[0]);
  }, [ticketId]);

  if (!ticket) return null;

  const handleApprove = () => {
    message.success('Ticket Approved!');
    setTicket({ ...ticket, status: 'In Progress' });
  };

  const handleReject = () => {
    message.error('Ticket Rejected!');
    setTicket({ ...ticket, status: 'Closed' });
  };

  const handleStatusChange = (status: string) => {
    message.success(`Status updated to ${status}`);
    setTicket({ ...ticket, status });
  };

  const handleAssign = () => {
    if (!selectedUser) {
      message.error('Please select a user');
      return;
    }
    const user = users.find(u => u.id === parseInt(selectedUser))?.name;
    setTicket({ ...ticket, assignedTo: user, status: 'Assigned' });
    message.success(`Ticket assigned to ${user}`);
    setIsAssignModal(false);
  };

  return (
    <div className="w-full">
      <div className="flex items-center mb-6 justify-between">
        <div className="flex items-center">
          <Button type="text" icon={<ArrowLeftOutlined />} onClick={() => router.back()} className="mr-2" />
          <h2 className="text-2xl font-bold text-gray-800 m-0">Ticket #{ticket.id}</h2>
        </div>
      </div>

      <Card className="shadow-sm border-0 rounded-xl mb-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-2">{ticket.title}</h3>
            <p className="text-gray-600">{ticket.description}</p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <StatusTag status={ticket.status} />
            <PriorityTag priority={ticket.priority} />
            <div className="text-sm mt-2 text-gray-500">
              Assigned: <span className="font-semibold text-gray-800">{ticket.assignedTo || 'Unassigned'}</span>
            </div>
          </div>
        </div>

        <Divider />

        <div className="flex flex-wrap gap-4 mt-6">
          {ticket.status === 'Pending Approval' && (role === 'Admin' || role === 'Manager') && (
            <>
              <Button type="primary" className="bg-green-600" icon={<CheckOutlined />} onClick={handleApprove}>Approve</Button>
              <Button danger icon={<CloseOutlined />} onClick={handleReject}>Reject</Button>
            </>
          )}

          {(role === 'Admin' || role === 'Manager') && (
            <Button type="dashed" icon={<UserAddOutlined />} onClick={() => setIsAssignModal(true)}>
              Assign User
            </Button>
          )}

          {role === 'Developer' && ticket.status !== 'Closed' && (
            <div className="flex items-center gap-2">
              <span className="text-gray-500 text-sm mr-2">Update Status:</span>
              <Select defaultValue={ticket.status} onChange={handleStatusChange} style={{ width: 140 }}>
                <Select.Option value="In Progress">In Progress</Select.Option>
                <Select.Option value="Resolved">Resolved</Select.Option>
                <Select.Option value="Closed">Closed</Select.Option>
              </Select>
            </div>
          )}
        </div>
      </Card>

      <Modal title="Assign Ticket" open={isAssignModal} onOk={handleAssign} onCancel={() => setIsAssignModal(false)} okText="Assign">
        <p className="mb-2">Select a user to assign this ticket to:</p>
        <Select 
          placeholder="Select user" 
          style={{ width: '100%' }} 
          className="mb-4"
          onChange={setSelectedUser}
          options={users.map(u => ({ label: `${u.name} (${u.role})`, value: u.id.toString() }))}
        />
      </Modal>
    </div>
  );
}
