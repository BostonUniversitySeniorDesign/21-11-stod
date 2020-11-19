import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import {groupsReducer, groupCreateReducer} from "./groupsReducer";
import { combineReducers } from "redux";

// combines all the reducers to one
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
  groups: groupsReducer,
  groupCreate: groupCreateReducer,
});
