// axios for server requests
import { getConfig } from "@testing-library/react";
import axios from "axios";
import { Dispatch } from "redux";
//import { ConfigTypes, CredentialTypes } from "./types";

import {
    LOAD_COMMENTS,
    LOAD_COMMENT_ERROR,
    DOMAIN,
    IComment,
  } from "./types";

  export const loadAllComments = () => (
    dispatch: Dispatch,
  ) => {
    // Make GET request to server.
    return axios
      .get(`http://${DOMAIN}/posts/comments/?format=json`)
      .then((res) => {
        // If no error, server responds with user object.
        dispatch({ type: LOAD_COMMENTS, payload: res.data as Array<IComment>});
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: LOAD_COMMENT_ERROR});
        //handle any errors here
      });
  };