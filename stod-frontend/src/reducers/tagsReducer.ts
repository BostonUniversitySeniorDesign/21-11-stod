import {
    TAGS_SUCCESS,
    TAGS_ERROR,
    ITagsState,
    ITagsAction,
} from "../actions/types";

const initialState: ITagsState = {
    isLoading: true,
    allTags: [],
    isError: false,
}

export function tagsReducer(state = initialState, action: ITagsAction): ITagsState {
    switch (action.type) {
        case TAGS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                allTags: action.payload,
                isError: false,
            }
        case TAGS_ERROR:
            return {
                ...state,
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}