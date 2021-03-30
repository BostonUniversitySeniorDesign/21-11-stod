import axios from "axios";

import {
  SingleGroup,
  DOMAIN,
  GROUPS_SUCCESS,
  GROUPS_ERROR,
  GROUP_CREATE_SUCCESS,
  GROUP_CREATE_ERROR,
} from "./types";
import { Dispatch } from "redux";

export const fetchGroups = (subscribedOnly: boolean, user: string) => (
  dispatch: Dispatch
) => {
  const url = subscribedOnly
    ? `https://${DOMAIN}/groups/subscribed/?format=json&user=${user}`
    : `https://${DOMAIN}/groups/?format=json`;
  return axios
    .get(url)
    .then((res) => {
      dispatch({
        type: GROUPS_SUCCESS,
        payload: res.data as Array<SingleGroup>,
        isSubscribedGroups: subscribedOnly,
      });
    })
    .catch((err) => {
      dispatch({ type: GROUPS_ERROR });
    });
};

export const createGroup = (name: string, description: string) => (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ name, description });

  axios
    .post(`https://${DOMAIN}/groups/`, body, config)
    .then((res) => {
      dispatch({ type: GROUP_CREATE_SUCCESS, payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: GROUP_CREATE_ERROR, payload: {} });
    });
};

export const subscribeToGroup = (user: string, group: string) => (
  dispatch: Dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ user, group });

  axios
    .post(`https://${DOMAIN}/groups/subscribed/`, body, config)
    .then(() => fetchGroups(true, user)(dispatch));
};

export const unsubscribeFromGroup = (user: string, group: string) => (
  dispatch: Dispatch
) => {
  // const url = `http://${DOMAIN}/groups/subscribed/?format=json&user=${user}&group=${group}`;
  const url = `https://${DOMAIN}/groups/subscribed/?format=json&user=${user}&group=${group}`;
  return axios
    .delete(url)
    .then(() => fetchGroups(true, user)(dispatch));
}
