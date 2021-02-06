// axios for server requests
import { getConfig } from "@testing-library/react";
import axios from "axios";
import { Dispatch } from "redux";
//import { ConfigTypes, CredentialTypes } from "./types";

import {
  LOAD_POSTS,
  POST_ERROR,
  EDIT_POST,
  DOMAIN,
  IPost,
  DELETE_POST,
} from "./types";

export const loadAllPosts = () => (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    params:{
      group: ""
    }
  };
  // Make GET request to server.
  return axios
    .get(`http://${DOMAIN}/posts/posts/`, config)
    .then((res) => {
      // If no error, server responds with user object.
      console.log(res);
      dispatch({ type: LOAD_POSTS, payload: res.data as Array<IPost> });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: POST_ERROR });
      //handle any errors here
    });
};

//make a PUT request to edit a post
//takes in id of post and edited contents
export const editPost = (id: number, contents: string) => (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ contents });
  const url = `http://${DOMAIN}/posts/posts/` + id + "/";
  axios
    .patch(url, body, config)
    .then((res) => {
      dispatch({ type: EDIT_POST, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: POST_ERROR, payload: {} });
    });
};

export const deletePost = (id: number) => (dispatch: Dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const url = `http://${DOMAIN}/posts/posts/` + id + "/";
  axios
    .delete(url, config)
    .then((res) => {
      dispatch({ type: DELETE_POST, payload: id });
    })
    .catch((err) => {
      dispatch({ type: POST_ERROR, payload: {} });
    });
};
