import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const getUsers = createActionThunk(
  'GET_ADMIN_USERS_LIST',
  network.getUsers
);