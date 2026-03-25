export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Manager' | 'Developer';
}

export interface Project {
  _id: string;
  name: string;
  description: string;
}

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'Todo' | 'In Progress' | 'Done' | 'Blocked';
  priority: 'Low' | 'Medium' | 'High';
  project: Project | string;
  assignedTo?: User | string;
  createdBy: User | string;
  createdAt: string;
  updatedAt: string;
}
