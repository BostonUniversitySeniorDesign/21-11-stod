// Server domain
export const DOMAIN = "127.0.0.1:8000";
/**
 * These are all possible actions that could happen in our application.
 * A Redux action would dispatch these and the reducer will update the global state
 * accordingly.
 */
// Auth types
export const USER_LOADED = "USER_LOADED";
export const USER_LOADING = "USER_LOADING";
export const AUTH_ERROR = "AUTH_ERROR";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const REGISTER_SUCCESS = "REGISTER_SUCCESS";
export const REGISTER_FAIL = "REGISTER_FAIL";
export const PASSWORD_EMAIL_SENT = "PASSWORD_EMAIL_SENT";
export const PASSWORD_RESET_COMPLETE = "PASSWORD_RESET_COMPLETE";
export const RESET_PASSWORD_LOADING = "RESET_PASSWORD_LOADING";
// Error types
export const NO_ERROR = "NO_ERROR";

// Auth interfaces
export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: { id: number; username: string; email: string } | null;
  password_email_sent: boolean;
  new_password_set: boolean;
  isResetLoading: boolean;
  errors: IErrorState;
}

// Auth action types
export interface IAuthAction {
  type:
    | typeof USER_LOADING
    | typeof USER_LOADED
    | typeof LOGIN_SUCCESS
    | typeof LOGOUT_SUCCESS
    | typeof AUTH_ERROR
    | typeof LOGIN_FAIL
    | typeof REGISTER_SUCCESS
    | typeof PASSWORD_EMAIL_SENT
    | typeof PASSWORD_RESET_COMPLETE
    | typeof RESET_PASSWORD_LOADING
    | typeof REGISTER_FAIL;
  payload?: any;
}

// Redux global state interface
export interface IRootState {
  auth: IAuthState;
  error: IErrorState;
  groups: IGroupsState;
  groupCreate: IGroupsCreateState;
}

// Header JSON interface
export interface ConfigTypes {
  headers: {
    "Content-Type": string;
    Authorization?: string;
  };
}

// Register credentials interface
export interface CredentialTypes {
  username: string;
  password: string;
  email: string;
}

// Error interfaces
export interface IErrorState {
  status_code: number | null;
  errors: {
    [key: string]: Array<string>;
  };
}

// Error action types
export interface IErrorAction {
  type: typeof AUTH_ERROR | typeof NO_ERROR;
  payload?: { message: string; code: number };
}

export const GROUPS_SUCCESS = "GROUPS_SUCCESS";
export const GROUPS_ERROR = "GROUPS_ERROR";
export const GROUP_CREATE_SUCCESS = "GROUP_CREATE_SUCCESS";
export const GROUP_CREATE_ERROR = "GROUP_CREATE_ERROR";

export interface SingleGroup {
  name: string;
  description: string;
}

export interface IGroupsState {
  isLoading: boolean;
  groups: Array<SingleGroup>;
  isError: boolean;
}

export interface IGroupsAction {
  type: typeof GROUPS_SUCCESS | typeof GROUPS_ERROR;
  payload?: any;
}

export interface IGroupsCreateState {
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
}

export interface IGroupsCreateAction {
  type: typeof GROUP_CREATE_SUCCESS | typeof GROUP_CREATE_ERROR;
  payload?: any;
}