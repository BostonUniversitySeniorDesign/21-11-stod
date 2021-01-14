// axios for server requests
import { getConfig } from "@testing-library/react";
import axios from "axios";
import { Dispatch } from "redux";

import {
    ADD_COMMENT,
    COMMENT_SUCCESS,
    LOAD_COMMENTS,
    LOAD_COMMENT_ERROR,
    COMMENT_CREATE_ERROR,
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

  export const createComment = (name: string, comment: string, post: number) => (
    dispatch: Dispatch
  ) => {
    // headers
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    //request body
    const body = JSON.stringify({ name, comment, post });

    //Make POST request to server with login info.
    axios
      .post(`http://${DOMAIN}/posts/comments/?format=json`, body, config)
      .then((res) => {
        dispatch({ type: COMMENT_SUCCESS, payload: res.data });
      })
      .catch((err) => {
        dispatch({type: COMMENT_CREATE_ERROR, payload: {}});
      })
  };
