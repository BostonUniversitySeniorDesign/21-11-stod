// axios for server requests
import { getConfig } from "@testing-library/react";
import axios from "axios";
import { Dispatch } from "redux";

import {
  DOMAIN,
  FLAGGED_CHANGE_SUCCESS,
  FLAGGED_CHANGE_FAIL
} from "./types";

export const changeFlaggedPost = (
    pid: number,
    flag: boolean 
  ) => (dispatch: Dispatch) => {
  
    //request body
    //   const body = JSON.stringify({ flagged });
      const url = `https://${DOMAIN}/posts/posts/` + pid + "/?group=";
    //Make POST request to server with login info.
    axios
      .patch(url, { flagged: flag })
      .then((res) => {
        dispatch({ type: FLAGGED_CHANGE_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FLAGGED_CHANGE_FAIL, payload: {} });
      });
  };

  export const deleteFlaggedPost = (
    pid: number
  ) => (dispatch: Dispatch) => {
  
    //request body
    //   const body = JSON.stringify({ flagged });
      const url = `https://${DOMAIN}/posts/posts/` + pid + "/?group=";
    //Make POST request to server with login info.
    axios
      .delete(url)
      .then((res) => {
        dispatch({ type: FLAGGED_CHANGE_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: FLAGGED_CHANGE_FAIL, payload: {} });
      });
  };
