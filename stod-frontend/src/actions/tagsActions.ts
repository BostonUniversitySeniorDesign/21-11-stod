import axios from "axios";

import {
    DOMAIN,
    Tag,
    TAGS_SUCCESS,
    TAGS_ERROR,
} from "./types";
import { Dispatch } from "redux";

export const fetchAllTags = () => (dispatch: Dispatch) => {
    const url: string = `https://${DOMAIN}/tags/?format=json`;
    return axios
        .get(url)
        .then((res) => {
            dispatch({
                type: TAGS_SUCCESS,
                payload: res.data as Array<Tag>,
            });
        })
        .catch((err) => {
            dispatch({ type: TAGS_ERROR });
        });
};