// axios for server requests
import { getConfig } from "@testing-library/react";
import axios from "axios";
import { Dispatch } from "redux";
//import { ConfigTypes, CredentialTypes } from "./types";

import {
    LOAD_POSTS,
    LOAD_POSTS_ERROR,
    DOMAIN,
    IPost,
  } from "./types";

  export const loadAllPosts = () => (
    dispatch: Dispatch,
  ) => {
    // Make GET request to server.
    return axios
      .get(`http://${DOMAIN}/posts/posts/?format=json`)
      .then((res) => {
        // If no error, server responds with user object.
        dispatch({ type: LOAD_POSTS, payload: res.data as Array<IPost>});
      })
      .catch((err) => {
        console.log(err);
        dispatch({type: LOAD_POSTS_ERROR});
        //handle any errors here
      });
  };