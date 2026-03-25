import { createActionThunk } from '@/util/redux';
import * as network from './network';

export const getTickets = createActionThunk('GET_TICKETS', network.getTickets);
export const getTicketDetails = createActionThunk('GET_TICKET_DETAILS', network.getTicketDetails);
export const createTicket = createActionThunk('CREATE_TICKET', network.createTicket);
export const updateTicketStatus = createActionThunk('UPDATE_TICKET_STATUS', network.updateTicketStatus);
