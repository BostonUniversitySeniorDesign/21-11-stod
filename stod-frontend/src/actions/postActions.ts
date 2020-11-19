// axios for server requests
import { getConfig } from "@testing-library/react";
import axios from "axios";
import { Dispatch } from "redux";
//import { ConfigTypes, CredentialTypes } from "./types";

import {
    LOAD_POSTS,
    LOAD_POST_ERROR,
    DOMAIN,
    IPost,
  } from "./types";

  export const loadAllPosts = () => (
    dispatch: Dispatch,
  ) => {
    // Dispatch user loading which will set isLoading to true.
    dispatch({ type: LOAD_POSTS });
    // Make GET request to server.
    axios
      .get(`http://${DOMAIN}/accounts/posts/?format=json`)
      .then((res) => {
        // If no error, server responds with user object.
        dispatch({ type: LOAD_POSTS, payload: res.data as IPost[]});
      })
      .catch((err) => {
        dispatch({type: LOAD_POST_ERROR});
        //handle any errors here
      });
  };