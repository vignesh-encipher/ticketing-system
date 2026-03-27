export interface UserDetails {
  id: string;
  name: string;
  email: string;
  employeeId?: string;
  department?: string;
  roleType?: string;
  profileImage?: string | null;
}

export interface CommentData {
  _id: string;
  ticketId: string;
  userDetails: UserDetails;
  message: string;
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommentsResponse {
  comments: CommentData[];
  pagination: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  }
}

export interface TicketData {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  sourceDept: string;
  targetDept: string;
  priority: string;
  status: string;
  assignee: {
    _id?: string;
    id?: string;
    name: string;
    profileImage: string | null;
    email?: string;
  };
  createdBy: {
    _id?: string;
    id?: string;
    name: string;
    profileImage: string | null;
  };
  attachments: any[];
  isDeleted: boolean;
  createdAt: string;
}

export interface TicketsResponse {
  tickets: TicketData[];
  meta: {
    totalCount: number;
    totalPages: number;
    currentPage: number;
  }
}

export default class TicketsState {
  getTickets: { 
    data: { response: TicketsResponse; status: string; message: string; } | null; 
    error: string | null; 
    loading: boolean;
  };
  getTicketsLoading: boolean | undefined;
  getTicketById: { 
    data: { response: TicketData; status: string; message: string; } | null; 
    error: string | null; 
    loading: boolean;
  };
  getTicketByIdLoading: boolean | undefined;
  createTicketLoading: boolean | undefined;
  updateTicketLoading: boolean | undefined;
  deleteTicketLoading: boolean | undefined;
  
  getComments: {
    data: { response: CommentsResponse; status: string; message: string; } | null;
    error: string | null;
    loading: boolean;
  };
  addCommentLoading: boolean | undefined;

  constructor() {
    this.getTickets = {
      data: null,
      error: null,
      loading: false
    };
    this.getTicketsLoading = false;
    this.getTicketById = {
      data: null,
      error: null,
      loading: false
    };
    this.getTicketByIdLoading = false;
    this.createTicketLoading = false;
    this.updateTicketLoading = false;
    this.deleteTicketLoading = false;
    this.getComments = {
      data: null,
      error: null,
      loading: false
    };
    this.addCommentLoading = false;
  }
}
