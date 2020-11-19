import authReducer from "./authReducer";
import { groupsReducer, groupCreateReducer } from "./groupsReducer";
import { combineReducers } from "redux";

// combines all the reducers to one
export default combineReducers({
  auth: authReducer,
  groups: groupsReducer,
  groupCreate: groupCreateReducer,
});
