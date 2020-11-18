import {
  AUTH_ERROR,
  NO_ERROR,
  IErrorState,
  IErrorAction,
} from "../actions/types";

const initialState: IErrorState = {
  message: null,
  code: null,
  isError: false,
};

function errorReducer(state = initialState, action: IErrorAction): IErrorState {
  switch (action.type) {
    case AUTH_ERROR:
      return {
        ...state,
        ...action.payload,
        isError: true,
      };
    case NO_ERROR:
      return {
        ...state,
        isError: false,
      };
    default:
      return state;
  }
}

export default errorReducer;
