import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const getUsers = createActionThunk(
  'GET_USERS_LIST',
  network.getUsers
);

export const createUser = createActionThunk(
  'CREATE_USER',
  network.createUser
);

export const updateUser = createActionThunk(
  'UPDATE_USER',
  network.updateUser
);

export const deleteUser = createActionThunk(
  'DELETE_USER',
  network.deleteUser
);