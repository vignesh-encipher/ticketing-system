import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { getTickets, createTicket, updateTicket, deleteTicket, getTicketById, getComments, addComment, getActivityLogs, reassignTicket, updateStatusPriority } from "./actions";

const initialState = {
  loading: true,
  data: null,
  error: null,
};

const createReducer = (actionType: any) =>
  handleActions(
    {
      [actionType.STARTED]: (state: any) => ({
        ...state,
        loading: true,
      }),
      [actionType.SUCCEEDED]: (state: any, action: { payload: any }) => ({
        ...state,
        loading: false,
        data: action.payload,
      }),
      [actionType.FAILED]: (state: any, action: { payload: any }) => ({
        ...state,
        loading: false,
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
  getTicketById: createReducer(getTicketById),
  getTicketByIdLoading: getLoading(getTicketById),
  createTicketLoading: getLoading(createTicket),
  updateTicketLoading: getLoading(updateTicket),
  deleteTicketLoading: getLoading(deleteTicket),
  getComments: createReducer(getComments),
  getCommentsLoading: getLoading(getComments),
  addCommentLoading: getLoading(addComment),
  getActivityLogs: createReducer(getActivityLogs),
  getActivityLogsLoading: getLoading(getActivityLogs),
  reassignTicketLoading: getLoading(reassignTicket),
  updateStatusPriorityLoading: getLoading(updateStatusPriority),
});

export default codifyReducer;
