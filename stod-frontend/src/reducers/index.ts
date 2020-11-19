import authReducer from "./authReducer";
import groupsReducer from "./groupsReducer";
import { combineReducers } from "redux";
import postReducer from "./postReducer";

// combines all the reducers to one
export default combineReducers({
  auth: authReducer,
  groups: groupsReducer,
  posts: postReducer
});
