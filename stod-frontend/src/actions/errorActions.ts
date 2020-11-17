// action types
import { AUTH_ERROR, NO_ERROR } from "./types";
import { Dispatch } from "redux";

export const authError = (message: string, code: number) => (
  dispatch: Dispatch
) => {
  dispatch({ type: AUTH_ERROR, payload: { message, code } });
};

export const noError = () => (dispatch: Dispatch) => {
  dispatch({ type: NO_ERROR });
};
