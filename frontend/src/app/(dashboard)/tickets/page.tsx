"use client";

import React, { useState, useEffect } from 'react';
import { Button, Segmented, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { tickets } from '@/data/mockData';
import { TicketTable } from '@/components/tickets/TicketTable';
import { TicketKanban } from '@/components/tickets/TicketKanban';
import { useRouter } from 'next/navigation';

export default function TicketsPage() {
  const router = useRouter();
  const [view, setView] = useState<string>('Table');
  const [searchTerm, setSearchTerm] = useState('');
  const [role, setRole] = useState('');

  useEffect(() => {
    setRole(localStorage.getItem('userRole') || 'Developer');
  }, []);

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    t.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">All Tickets</h2>
          <p className="text-gray-500">Manage and track issues across the platform.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <Input 
            placeholder="Search tickets..." 
            prefix={<SearchOutlined />} 
            allowClear
            onChange={e => setSearchTerm(e.target.value)}
            className="w-64"
          />
          <Segmented 
            options={['Table', 'Kanban']} 
            value={view} 
            onChange={v => setView(v as string)} 
          />
          <Button 
            type="primary" 
            icon={<PlusOutlined />} 
            style={{ background: '#4f46e5' }}
            onClick={() => router.push('/tickets/create')}
          >
            Create Ticket
          </Button>
        </div>
      </div>

      <div className="flex-1 bg-white p-6 rounded-lg shadow-sm overflow-hidden h-full">
        {view === 'Table' ? (
          <TicketTable data={filteredTickets} role={role} />
        ) : (
          <TicketKanban data={filteredTickets} />
        )}
      </div>
    </div>
  );
}
