import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { getTickets, createTicket, updateTicket, deleteTicket } from "./actions";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const createReducer = (actionType: any) =>
  handleActions(
    {
      [actionType.STARTED]: (state: any, action: any) => ({
        ...state,
      }),
      [actionType.SUCCEEDED]: (state: any, action: { payload: any }) => ({
        ...state,
        data: action.payload,
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

const codifyReducer = combineReducers({
  getTickets: createReducer(getTickets),
  getTicketsLoading: getLoading(getTickets),
  createTicketLoading: getLoading(createTicket),
  updateTicketLoading: getLoading(updateTicket),
  deleteTicketLoading: getLoading(deleteTicket),
});

export default codifyReducer;
