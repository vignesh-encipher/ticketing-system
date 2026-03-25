import React from 'react';
import { Tag } from 'antd';

export const StatusTag: React.FC<{ status: string }> = ({ status }) => {
  let color = 'default';
  if (status === 'Pending Approval') color = 'warning';
  if (status === 'Assigned') color = 'processing';
  if (status === 'In Progress') color = 'blue';
  if (status === 'Resolved' || status === 'Completed' || status === 'Available') color = 'success';
  if (status === 'Closed') color = 'default';
  
  return <Tag color={color}>{status}</Tag>;
};
