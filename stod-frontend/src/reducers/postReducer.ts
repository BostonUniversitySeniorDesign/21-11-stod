import {
    LOAD_POSTS,
    LOAD_POST_ERROR,
    PostState,
    IPost,
    DOMAIN,
    PostAction,
} from "../actions/types";


const initialState: PostState = {
    posts: [],
    isError: false
}

function postReducer(state = initialState, action: PostAction): PostState {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        case LOAD_POST_ERROR:
        return {
            ...state,
            isError: true
        }
        default:
            return state;
    }
}

export default postReducer;