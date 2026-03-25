import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const login = createActionThunk('AUTH_LOGIN', network.login);
export const logout = createActionThunk('AUTH_LOGOUT', network.logout);
