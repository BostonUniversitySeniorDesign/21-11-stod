import axios from "axios";

import {
  DOMAIN,
  //   SEND_REQUEST,
  REQUEST_SEND_SUCC,
  REQUEST_SEND_ERR,
  REQUEST_GET_SUCC,
  REQUEST_GET_ERR,
  REQUEST_ACCEPT_SUCC,
  REQUEST_ACCEPT_ERR,
  REQUEST_DECLINE_SUCC,
  REQUEST_DECLINE_ERR,
  GET_FRIEND_LIST_SUCC,
  IFriendObj,
  IRootState,
} from "./types";
import { tokenConfig } from "./authActions";
import { Dispatch } from "redux";

export const sendRequest = (reciver: string) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  const body = JSON.stringify({ reciver });
  return axios
    .post(`https://${DOMAIN}/friends/`, body, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REQUEST_SEND_SUCC,
        payload: res.data as IFriendObj,
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_SEND_ERR });
    });
};

export const getRequests = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  return axios
    .get(`https://${DOMAIN}/friends/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REQUEST_GET_SUCC,
        payload: res.data as IFriendObj[],
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_GET_ERR });
    });
};

export const getFriendList = () => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  return axios
    .get(`https://${DOMAIN}/friends/list/`, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: GET_FRIEND_LIST_SUCC,
        payload: res.data as IFriendObj[],
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_GET_ERR });
    });
};

export const acceptRequest = (id: number) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  return axios
    .patch(`https://${DOMAIN}/friends/accept/${id}/`, {}, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REQUEST_ACCEPT_SUCC,
        payload: { ...res.data, request_id: id } as IFriendObj[],
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_ACCEPT_ERR });
    });
};

export const declineRequest = (id: number) => (
  dispatch: Dispatch,
  getState: () => IRootState
) => {
  return axios
    .patch(`https://${DOMAIN}/friends/decline/${id}/`, {}, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: REQUEST_ACCEPT_SUCC,
        payload: { ...res.data, request_id: id } as IFriendObj[],
      });
    })
    .catch((err) => {
      dispatch({ type: REQUEST_ACCEPT_ERR });
    });
};
