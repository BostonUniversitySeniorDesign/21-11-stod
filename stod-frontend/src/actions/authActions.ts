// axios for server requests
import axios from "axios";
// action types
import {
  USER_LOADED,
  USER_LOADING,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PASSWORD_EMAIL_SENT,
  PASSWORD_RESET_COMPLETE,
  RESET_PASSWORD_LOADING,
  IRootState,
  DOMAIN,
} from "./types";
import { ConfigTypes, CredentialTypes } from "./types";
import { Dispatch } from "redux";

/**
 * Redux action functions chain two functions together. thats why you see:
 * const loadUser = () => (dispatch, getState) => { };
 * This is similar to writing:
 * const loadUser = function({dispatch, getState}) {
 *  return function(next) {
 *    return function(action) {
 *      console.log(action);
 *      return next(action);
 *    };
 *  };
 * };
 * dispatch and getState are indirectly sent is by the useDispatch hook and can be
 * used like regular function arguments.
 */

export const loadUser = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  // Dispatch user loading which will set isLoading to true.
  dispatch({ type: USER_LOADING });
  // Make GET request to server.
  axios
    .get(`http://${DOMAIN}/accounts/user/`, tokenConfig(getState))
    .then((res) => {
      // If no error, server responds with user object.
      dispatch({ type: USER_LOADED, payload: res.data });
    })
    .catch((err) => {
      // If there are any errors, we handle them here
      //handle any errors here
    });
};

export const login = (username: string, password: string) => (
  dispatch: Dispatch
) => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //request body
  const body = JSON.stringify({ username, password });

  //Make POST request to server with login info.
  axios
    .post(`http://${DOMAIN}/accounts/login/`, body, config)
    .then((res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res.data });
      console.log(res);
    })
    .catch((err) => {
      if (err.response.data) {
        dispatch({
          type: AUTH_ERROR,
          payload: {
            message: err.response.data.login[0],
            code: err.response.status,
          },
        });
      }else{
        
      }
    });
};

export const registerUser = ({
  username,
  password,
  email,
}: CredentialTypes) => (dispatch: Dispatch) => {
  // headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //request body
  const body = { username, email, password };

  console.log(body);

  axios
    .post(`http://${DOMAIN}/accounts/register/`, body, config)
    .then((res) => {
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    })
    .catch((err) => {});
};

export const logout = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  //User loadig
  dispatch({ type: USER_LOADING });
  console.log("hello");
  axios
    .post(`http://${DOMAIN}/accounts/logout/`, null, tokenConfig(getState))
    .then((res) => {
      dispatch({ type: LOGOUT_SUCCESS });
    })
    .catch((err) => {
      console.log("Error");
    });
};

export const resetPassword = (email: string) => (dispatch: Dispatch) => {
  //User loadig
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ email: email });
  dispatch({ type: RESET_PASSWORD_LOADING });
  axios
    .post(`http://${DOMAIN}/accounts/request-reset-email/`, body, config)
    .then((res) => {
      dispatch({ type: PASSWORD_EMAIL_SENT });
      console.log(res.data);
      console.log(body);
    })
    .catch((err) => {});
};

export const setNewPassword = (body: {
  password: string;
  uidb64: string;
  token: string;
}) => (dispatch: Dispatch) => {
  //User loadig
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  dispatch({ type: RESET_PASSWORD_LOADING });
  axios
    .patch(`http://${DOMAIN}/accounts/password-reset-complete/`, body, config)
    .then((res) => {
      dispatch({ type: PASSWORD_RESET_COMPLETE });
      console.log(res.data);
      console.log(body);
    })
    .catch((err) => {});
};

export const tokenConfig = (getState: () => IRootState) => {
  const token = getState().auth.token;

  // headers
  const config: ConfigTypes = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  //if token is present, add to header
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};
