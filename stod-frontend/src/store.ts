import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import { ThunkDispatch } from "redux-thunk";
import { IRootState } from "./actions/types";
import { AnyAction } from "redux";
type DispatchFunctionType = ThunkDispatch<IRootState, undefined, AnyAction>;

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
export type RootState = ReturnType<typeof rootReducer>;
