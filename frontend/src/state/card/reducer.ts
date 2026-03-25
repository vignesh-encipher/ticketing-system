import { combineReducers } from "redux";
import { handleActions } from "redux-actions";
import { getUsers, createUser, updateUser, deleteUser } from "./actions";

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
  getUsers: createReducer(getUsers),
  getUsersLoading: getLoading(getUsers),
  createUser: createReducer(createUser),
  createUserLoading: getLoading(createUser),
  updateUser: createReducer(updateUser),
  updateUserLoading: getLoading(updateUser),
  deleteUser: createReducer(deleteUser),
  deleteUserLoading: getLoading(deleteUser),
});

export default codifyReducer;
