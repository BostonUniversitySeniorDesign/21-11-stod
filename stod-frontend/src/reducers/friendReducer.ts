import React from "react";
import {
  REQUEST_SEND_SUCC,
  REQUEST_SEND_ERR,
  FIRENDS_GET_SUCC,
  FIRENDS_GET_ERR,
  REQUEST_GET_SUCC,
  REQUEST_GET_ERR,
  REQUEST_ACCEPT_SUCC,
  REQUEST_DECLINE_SUCC,
  GET_FRIEND_LIST_SUCC,
  IFriendState,
  IFriendActioms,
} from "../actions/types";

const initialState: IFriendState = {
  friend_obj: null,
  friend_req: [],
  isLoading: true,
};

function friendReducer(
  state = initialState,
  action: IFriendActioms
): IFriendState {
  switch (action.type) {
    case GET_FRIEND_LIST_SUCC:
      return {
        ...state,
        friend_obj: action.payload,
      };
    case REQUEST_SEND_SUCC:
      return {
        ...state,
        friend_req: [...state.friend_req, action.payload],
        isLoading: false,
      };
    case REQUEST_GET_SUCC:
      return {
        ...state,
        friend_req: action.payload,
        isLoading: false,
      };
    case REQUEST_ACCEPT_SUCC:
      return {
        ...state,
        friend_obj: action.payload,
        friend_req: state.friend_req.map((f) =>
          f.id === action.payload.request_id ? { ...f, is_active: false } : f
        ),
      };
    case REQUEST_DECLINE_SUCC:
      return {
        ...state,
        friend_obj: action.payload,
        friend_req: state.friend_req.map((f) =>
          f.id === action.payload.request_id ? { ...f, is_active: false } : f
        ),
      };
    default:
      return state;
  }
}

export default friendReducer;
