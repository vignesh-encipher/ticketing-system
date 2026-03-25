import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { getTickets, getTicketDetails, createTicket, updateTicketStatus } from "./actions";

const initialState = {
  data: null,
  error: null,
};

const createReducer = (actionType: any) =>
  handleActions(
    {
      [actionType.START]: (state: any) => ({ ...state }),
      [actionType.SUCCEEDED]: (state: any, action: { payload: any }) => ({
        ...state,
        data: action.payload,
        error: null,
      }),
      [actionType.FAILED]: (state: any, action: { payload: any }) => ({
        ...state,
        error: action.payload,
      }),
    },
    initialState
  );

const getLoading = (type: any) =>
  handleActions(
    {
      [type.START]: () => true,
      [type.SUCCEEDED]: () => false,
      [type.FAILED]: () => false,
    },
    false
  );

export default combineReducers({
  tickets: createReducer(getTickets),
  ticketsLoading: getLoading(getTickets),
  
  ticketDetails: createReducer(getTicketDetails),
  ticketDetailsLoading: getLoading(getTicketDetails),
});
