import { SWITCH_GROUP, IUserGroup, UserGroupAction } from "../actions/types";

//type checking initialState with PostState
const initialState: IUserGroup = {
  currentGroup: "home",
};

function usergroupReducer(
  state = initialState,
  action: UserGroupAction
): IUserGroup {
  switch (action.type) {
    case SWITCH_GROUP:
      return {
        currentGroup: action.payload,
      };
    default:
      return state;
  }
}

export default usergroupReducer;
