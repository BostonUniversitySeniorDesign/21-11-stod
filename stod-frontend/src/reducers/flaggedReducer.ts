import {
  FLAGGED_DELETE_SUCCESS,
  FLAGGED_CHANGE_SUCCESS,
  FLAGGED_CHANGE_FAIL,
  FLAGGED_DELETE_FAIL,
  IFlaggedAction,
  IFlaggedState,
} from "../actions/types";

const initialState: IFlaggedState = {
  posts: [],
  isError: false,
  isLoading: true,
};

function flaggedReducer(
  state = initialState,
  action: IFlaggedAction
): IFlaggedState {
  let index;
  let newArray;
  switch (action.type) {
    case FLAGGED_CHANGE_SUCCESS:
      index = state.posts.findIndex((post) => post.id === action.payload); //finding index of the item
      newArray = [...state.posts];
      newArray.splice(index, 1);
      return {
        ...state,
        posts: newArray,
        isLoading: false,
      };
    case FLAGGED_DELETE_SUCCESS:
      index = state.posts.findIndex((post) => post.id === action.payload); //finding index of the item
      newArray = [...state.posts];
      newArray.splice(index, 1);
      return {
        ...state,
        posts: newArray,
        isLoading: false,
      };
    case FLAGGED_CHANGE_FAIL:
      return {
        ...state,
        isError: true,
      };
    case FLAGGED_DELETE_FAIL:
      return {
        ...state,
        isError: true,
      };
    default:
      return state;
  }
}

export default flaggedReducer;
