import axios from "axios";

import { SingleGroup, DOMAIN, GROUPS_SUCCESS, GROUPS_ERROR, GROUP_CREATE_SUCCESS, GROUP_CREATE_ERROR } from "./types";
import { Dispatch } from "redux";

export const fetchGroups = () => (
    dispatch: Dispatch
) => {
    return axios
        .get(`http://${DOMAIN}/groups/?format=json`)
        .then((res) => {
            dispatch({type: GROUPS_SUCCESS, payload: res.data as Array<SingleGroup>});
        })
        .catch((err) => {
            dispatch({type: GROUPS_ERROR});
        });
}

export const createGroup = (name: string, description: string) => (
    dispatch: Dispatch
) => {
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({name, description});
    
    axios
        .post(`http://${DOMAIN}/groups/`, body, config)
        .then((res) => {
            dispatch({type: GROUP_CREATE_SUCCESS, payload: res.data});
        })
        .catch((err) => {
            dispatch({type: GROUP_CREATE_ERROR, payload: {}});
        })
}