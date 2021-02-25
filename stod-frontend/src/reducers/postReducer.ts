import {
  LOAD_POSTS,
  POST_ERROR,
  PostState,
  DELETE_POST,
  PostAction,
  EDIT_POST,
  CREATE_POST,
} from "../actions/types";

//type checking initialState with PostState
const initialState: PostState = {
  posts: [],
  isError: false,
  isLoading: true,
};

function postReducer(state = initialState, action: PostAction): PostState {
  let index;
  let newArray;
  switch (action.type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: action.payload,
        isLoading: false,
      };
    // simple case for now to see if error was being produced
    case POST_ERROR:
      return {
        ...state,
        isError: true,
      };
    case EDIT_POST:
      index = state.posts.findIndex((post) => post.id === action.payload); //finding index of the item
      newArray = [...state.posts];
      newArray[index].contents = action.payload.contents;
      return {
        ...state,
        posts: newArray,
        // posts[posts.findIndex(x=> x.id == 2)].id = 2,
        isLoading: false,
      };
    case DELETE_POST:
      index = state.posts.findIndex((post) => post.id === action.payload); //finding index of the item
      newArray = [...state.posts];
      newArray.splice(index, 1);
      return {
        ...state,
        posts: newArray,
        // posts[posts.findIndex(x=> x.id == 2)].id = 2,
        isLoading: false,
      };
    case CREATE_POST:
      newArray = [...state.posts];
      newArray.unshift(action.payload);
      return {
        ...state,
        posts: newArray,
        // posts[posts.findIndex(x=> x.id == 2)].id = 2,
        isLoading: false,
      };
    default:
      return state;
  }
}

export default postReducer;
