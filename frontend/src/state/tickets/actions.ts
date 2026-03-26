import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const getTickets = createActionThunk(
  'GET_ADMIN_TICKETS_LIST',
  network.getTickets
);

export const createTicket = createActionThunk(
  'CREATE_ADMIN_TICKET',
  network.createTicket
);

export const updateTicket = createActionThunk(
  'UPDATE_ADMIN_TICKET',
  network.updateTicket
);

export const deleteTicket = createActionThunk(
  'DELETE_ADMIN_TICKET',
  network.deleteTicket
);