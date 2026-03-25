"use client";

import React, { useState } from 'react';
import { Card, Tag } from 'antd';
import { StatusTag } from '@/components/common/StatusTag';
import { PriorityTag } from '@/components/common/PriorityTag';
import { useRouter } from 'next/navigation';
import { UserOutlined } from '@ant-design/icons';

const columnsMap = ['Pending Approval', 'Assigned', 'In Progress', 'Resolved', 'Closed'];

export const TicketKanban: React.FC<{ data: any[] }> = ({ data }) => {
  const router = useRouter();

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 h-full min-h-[75vh]">
      {columnsMap.map((colName) => {
        const colTickets = data.filter(t => t.status === colName);
        return (
          <div key={colName} className="min-w-[280px] w-full max-w-[320px] bg-gray-100 rounded-lg p-3 shadow-inner flex flex-col h-[calc(100vh-220px)]">
            <div className="flex justify-between items-center mb-4 px-2">
              <h3 className="font-semibold text-gray-700 items-center flex">{colName}</h3>
              <Tag className="rounded-full shadow-sm ml-2">{colTickets.length}</Tag>
            </div>
            
            <div className="flex-1 overflow-y-auto space-y-3 px-1 custom-scrollbar">
              {colTickets.map(ticket => (
                <Card 
                  key={ticket.id} 
                  hoverable 
                  className="rounded-lg shadow-sm cursor-pointer border-0"
                  bodyStyle={{ padding: '16px' }}
                  onClick={() => router.push(`/tickets/${ticket.id}`)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-medium text-gray-800 break-words line-clamp-2">{ticket.title}</span>
                  </div>
                  <div className="mb-3 text-xs text-gray-500 line-clamp-2">{ticket.description}</div>
                  
                  <div className="flex justify-between items-center mt-auto">
                    <PriorityTag priority={ticket.priority} />
                    {ticket.assignedTo && (
                      <div className="flex items-center text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        <UserOutlined className="mr-1" />
                        <span className="truncate max-w-[80px]">{ticket.assignedTo}</span>
                      </div>
                    )}
                  </div>
                </Card>
              ))}
              {colTickets.length === 0 && (
                <div className="text-center text-gray-400 text-sm mt-4 italic">No tickets here</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};
