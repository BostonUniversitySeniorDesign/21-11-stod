import { IErrorState } from "../../actions/types";

export const fieldError = (type: string, errors: IErrorState) => {
  return {
    error: errors.errors[type] ? true : false,
    helperText: errors.errors[type] ? errors.errors[type][0] : "",
  };
};

export const validateEmail = (email: string | undefined) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};
