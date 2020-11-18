import authReducer from "./authReducer";
<<<<<<< HEAD
=======
import errorReducer from "./errorReducer";
import groupsReducer from "./groupsReducer";
>>>>>>> 2e0e540da8308a596de97264356b2e752c92619e
import { combineReducers } from "redux";

// combines all the reducers to one
export default combineReducers({
  auth: authReducer,
<<<<<<< HEAD
=======
  error: errorReducer,
  groups: groupsReducer,
>>>>>>> 2e0e540da8308a596de97264356b2e752c92619e
});
