export interface UserData {
  _id: string;
  name: string;
  email: string;
  employeeId: string;
  department: {
    _id: string;
    name: string;
  } | string;
  roleType: string;
  profileImage: string | null;
  status: string;
  isDeleted: boolean;
  createdAt: string;
}

export interface UsersResponse {
  users: UserData[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}

export default class UsersState {
  getUsers: { 
    data: { response: UsersResponse; status: string; message: string; } | null; 
    error: string | null; 
    loading: boolean;
  };
  getUsersLoading: boolean | undefined;

  getDepartments: {
    data: { response: any[]; status: string; message: string; } | null;
    error: string | null;
    loading: boolean;
  };
  getDepartmentsLoading: boolean | undefined;
  createUserLoading: boolean | undefined;

  constructor() {
    this.getUsers = {
      data: null,
      error: null,
      loading: false
    };
    this.getUsersLoading = false;
    this.getDepartments = {
      data: null,
      error: null,
      loading: false
    };
    this.getDepartmentsLoading = false;
    this.createUserLoading = false;
  }
}
