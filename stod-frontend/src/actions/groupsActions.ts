import axios from "axios";

import { SingleGroup, DOMAIN, GROUPS_SUCCESS, GROUPS_ERROR } from "./types";
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