import {
    GROUPS_SUCCESS,
    IGroupsState,
    IGroupsAction,
    GROUPS_ERROR,
    IGroupsCreateState,
    IGroupsCreateAction,
    GROUP_CREATE_SUCCESS,
    GROUP_CREATE_ERROR,
} from "../actions/types";

const initialState: IGroupsState = {
    isLoading: true,
    allGroups: [],
    subscribedGroups: [],
    isError: false,
}

export function groupsReducer(state = initialState, action: IGroupsAction): IGroupsState {
    switch (action.type) {
        case GROUPS_SUCCESS:
            if (action.isSubscribedGroups) {
                return {
                    ...state,
                    isLoading: false,
                    subscribedGroups: action.payload,
                    isError: false
                }
            } else {
                return {
                    ...state,
                    isLoading: false,
                    allGroups: action.payload,
                    isError: false
                }
            }
        case GROUPS_ERROR:
            return {
                ...state, 
                isLoading: false,
                isError: true
            }
        default:
            return state;
    }
}

const initialGroupCreateState: IGroupsCreateState = {
    isLoading: true,
    isSuccess: false,
    isError: false,
}

export function groupCreateReducer(state = initialGroupCreateState, action: IGroupsCreateAction): IGroupsCreateState {
    switch (action.type) {
        case GROUP_CREATE_ERROR:
            return {
                ...state,
                isLoading: false,
                isSuccess: false,
            }
        case GROUP_CREATE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                isSuccess: true
            }
        default:
            return state;
    }
}