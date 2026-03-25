import React from 'react';
import { Tag } from 'antd';

export const PriorityTag: React.FC<{ priority: string }> = ({ priority }) => {
  let color = 'default';
  if (priority === 'High') color = 'red';
  if (priority === 'Medium') color = 'orange';
  if (priority === 'Low') color = 'green';
  
  return <Tag color={color}>{priority}</Tag>;
};
