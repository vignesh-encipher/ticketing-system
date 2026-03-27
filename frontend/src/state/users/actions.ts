import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const getUsers = createActionThunk(
  'GET_ADMIN_USERS_LIST',
  network.getUsers
);

export const createUser = createActionThunk(
  'CREATE_ADMIN_USER',
  network.createUser
);
export const updateStatusUser = createActionThunk(
  'UPDATE_ADMIN_USER_STATUS',
  network.updateStatusUser
);

export const getDepartments = createActionThunk(
  'GET_DEPARTMENTS_LIST',
  network.getDepartments
);

export const getUsersByDepartment = createActionThunk(
  'GET_USERS_BY_DEPARTMENT',
  network.getUsersByDepartment
)