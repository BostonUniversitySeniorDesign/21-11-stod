import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import { combineReducers } from "redux";

// combines all the reducers to one
export default combineReducers({
  auth: authReducer,
  error: errorReducer,
});