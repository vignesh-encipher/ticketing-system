import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const getTickets = createActionThunk(
  'GET_ADMIN_TICKETS_LIST',
  network.getTickets
);

export const getTicketById = createActionThunk(
  'GET_ADMIN_TICKET_BY_ID',
  network.getTicketById
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

export const getComments = createActionThunk(
  'GET_ADMIN_TICKET_COMMENTS',
  network.getComments
);

export const addComment = createActionThunk(
  'ADD_ADMIN_TICKET_COMMENT',
  network.addComment
);