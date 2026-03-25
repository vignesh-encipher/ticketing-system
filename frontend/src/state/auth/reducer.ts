import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { login, logout } from "./actions";

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
    { data: null, error: null }
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
  user: createReducer(login),
  loginLoading: getLoading(login),

  logoutStatus: createReducer(logout),
});
