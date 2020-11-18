import {
    GROUPS_SUCCESS,
    IGroupsState,
    IGroupsAction,
    GROUPS_ERROR,
} from "../actions/types";

const initialState: IGroupsState = {
    isLoading: true,
    groups: [],
    isError: false,
}

function groupsReducer(state = initialState, action: IGroupsAction): IGroupsState {
    switch (action.type) {
        case GROUPS_SUCCESS:
            return {
                ...state,
                isLoading: false,
                groups: action.payload,
                isError: false
            }
        case GROUPS_ERROR:
            return {
                ...state, 
                isLoading: false,
                groups: [],
                isError: true
            }
        default:
            return state;
    }
}

export default groupsReducer;