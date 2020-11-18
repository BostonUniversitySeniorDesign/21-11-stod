import authReducer from "./authReducer";
import { combineReducers } from "redux";

// combines all the reducers to one
export default combineReducers({
  auth: authReducer,
});
