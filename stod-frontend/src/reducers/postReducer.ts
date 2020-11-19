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
}

function postReducer(state = initialState, action: PostAction): PostState {
    switch (action.type) {
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.payload
            }
        default:
            return state;
    }
}

export default postReducer;