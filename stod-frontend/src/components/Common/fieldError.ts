import { IErrorState } from "../../actions/types";

export const fieldError = (type: string, errors: IErrorState) => {
  return {
    error: errors.errors[type] ? true : false,
    helperText: errors.errors[type] ? errors.errors[type][0] : "",
  };
};
