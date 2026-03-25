export const tickets = [
  { id: 1, title: 'Camera issue', description: 'Webcam not working during calls', status: 'Pending Approval', priority: 'High', assignedTo: null, category: 'Hardware' },
  { id: 2, title: 'Cannot access VPN', description: 'VPN client showing authorization error', status: 'Assigned', priority: 'High', assignedTo: 'Dev User', category: 'Network' },
  { id: 3, title: 'Update internal portal', description: 'New features need to be deployed', status: 'In Progress', priority: 'Medium', assignedTo: 'Dev User', category: 'Software' },
  { id: 4, title: 'Monitor replacement', description: 'Screen flickering', status: 'Resolved', priority: 'Low', assignedTo: 'Hardware Team', category: 'Hardware' },
];

export const assets = [
  { id: 1, name: 'MacBook Pro 16', type: 'Laptop', status: 'Assigned', assignedTo: 'John Doe' },
  { id: 2, name: 'Dell UltraSharp', type: 'Monitor', status: 'Available', assignedTo: null },
  { id: 3, name: 'Logitech MX Master', type: 'Mouse', status: 'Available', assignedTo: null },
];

export const users = [
  { id: 1, name: 'Admin User', email: 'admin@company.com', role: 'Admin' },
  { id: 2, name: 'Manager User', email: 'manager@company.com', role: 'Manager' },
  { id: 3, name: 'Dev User', email: 'dev@company.com', role: 'Developer' },
];
