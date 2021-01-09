import {
    LOAD_COMMENTS,
    LOAD_COMMENT_ERROR,
    CommentState,
    IComment,
    DOMAIN,
    CommentAction,
} from "../actions/types";

const initialState: CommentState = {
    comments: [],
    isError: false,
    isLoading: true
}

function commentReducer(state = initialState, action: CommentAction): CommentState {
    switch (action.type) {
        case LOAD_COMMENTS:
            return {
                ...state,
                comments: action.payload,
                isLoading: false
            }
        case LOAD_COMMENT_ERROR:
        return {
            ...state,
            isError: true
        }
        default:
            return state;
    }
}

export default commentReducer;