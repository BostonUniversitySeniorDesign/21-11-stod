import { StringLiteral } from "typescript";

// Server domain
//export const DOMAIN = "127.0.0.1:8000";
export const DOMAIN = "stodbackend.app";
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

export interface IUser {
  id: number;
  username: string;
  email: string;
  is_superuser: boolean;
}
// Auth interfaces
export interface IAuthState {
  token: string | null;
  isAuthenticated: boolean | null;
  isLoading: boolean;
  user: IUser | null;
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
  posts: PostState;
  comments: CommentState;
  userGroup: IUserGroup;
  tags: ITagsState;
  friends: IFriendState;
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
  displayJoinButton: boolean;
}

export interface IGroupsState {
  isLoading: boolean;
  allGroups: Array<SingleGroup>;
  subscribedGroups: Array<SingleGroup>;
  isError: boolean;
}

export interface IGroupsProps {
  subscribedOnly: boolean;
}

export interface IGroupsAction {
  type: typeof GROUPS_SUCCESS | typeof GROUPS_ERROR;
  payload?: any;
  isSubscribedGroups: boolean;
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

export const TAGS_SUCCESS = "TAGS_SUCCESS";
export const TAGS_ERROR = "TAGS_ERROR";

export interface Tag {
  name: string;
  tagType: string;
}

export interface ITagsState {
  isLoading: boolean;
  allTags: Array<Tag>;
  isError: boolean;
}

export interface ITagsAction {
  type: typeof TAGS_SUCCESS | typeof TAGS_ERROR;
  payload?: any;
}

export const LOAD_POSTS = "LOAD_POSTS";
export const POST_ERROR = "POST_ERROR";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const EDIT_POST = "EDIT_POST";
export const EDIT_POST_SUCCESS = "EDIT_POST_SUCCESS";
export const POSTS_LOADING = "POSTS_LOADING";
export const CREATE_POST = "CREATE_POST";

export interface IPost {
  id: number;
  title: string;
  group: string;
  contents: string;
  poster: string;
  date: string;
  tags: string[];
  flagged: boolean;
}

export interface PostState {
  isLoading: boolean;
  posts: IPost[];
  isError: boolean;
}

export interface PostAction {
  type:
    | typeof LOAD_POSTS
    | typeof POST_ERROR
    | typeof EDIT_POST
    | typeof DELETE_POST
    | typeof CREATE_POST;
  payload?: any;
}

export const LOAD_COMMENTS = "LOAD_COMMENTS";
export const COMMENTS_LOADING = "COMMENTS_LOADING";
export const ADD_COMMENT = "ADD_COMMENT";
export const COMMENT_SUCCESS = "COMMENT_SUCCESS";
export const DELETE_COMMENT = "DELETE_COMMENT";
export const EDIT_COMMENT = "EDIT_COMMENT";
export const LOAD_COMMENT_ERROR = "LOAD_COMMENT_ERROR";
export const COMMENT_CREATE_ERROR = "COMMENT_CREATE_ERROR";

export interface IComment {
  id: number;
  name: string;
  comment: string;
  created_on: string;
  post: number;
  parent: number;
  reply: string;
}

export interface CommentState {
  isLoading: boolean;
  comments: IComment[];
  isError: boolean;
}

export interface CommentAction {
  type:
    | typeof LOAD_COMMENTS
    | typeof LOAD_COMMENT_ERROR
    | typeof COMMENT_SUCCESS;
  payload?: any;
}

export const SWITCH_GROUP = "SWITCH_GROUP";
export interface IUserGroup {
  currentGroup: string;
}

export interface UserGroupAction {
  type: typeof SWITCH_GROUP;
  payload?: any;
}

export const FLAGGED_CHANGE_SUCCESS = "FLAGGED_CHANGE_SUCCESS";
export const FLAGGED_CHANGE_FAIL = "FLAGGED_CHANGE_FAIL";
export const FLAGGED_DELETE_SUCCESS = "FLAGGED_DELETE_SUCCESS";
export const FLAGGED_DELETE_FAIL = "FLAGGED_DELETE_FAIL";

export interface IFlaggedAction {
  type:
    | typeof FLAGGED_CHANGE_SUCCESS
    | typeof FLAGGED_CHANGE_FAIL
    | typeof FLAGGED_DELETE_SUCCESS
    | typeof FLAGGED_DELETE_FAIL;
  payload?: any;
}

export interface IFlaggedState {
  isLoading: boolean;
  posts: IPost[];
  isError: boolean;
}

export const GET_FRIEND_LIST_SUCC = "GET_FRIEND_LIST";
export const SEND_REQUEST = "SEND_REQUEST";
export const REQUEST_SEND_SUCC = "REQUEST_SEND_SUCC";
export const REQUEST_SEND_ERR = "REQUEST_SEND_ERR";
export const REQUEST_GET_SUCC = "REQUEST_GET_SUCC";
export const REQUEST_GET_ERR = "REQUEST_GET_ERR";
export const FIRENDS_GET_SUCC = "FIRENDS_GET_SUCC";
export const FIRENDS_GET_ERR = "FIRENDS_GET_ERR";
export const REQUEST_ACCEPT_SUCC = "REQUEST_ACCEPT_SUCC";
export const REQUEST_ACCEPT_ERR = "REQUEST_ACCEPT_ERR";
export const REQUEST_DECLINE_SUCC = "REQUEST_DECLINE_SUCC";
export const REQUEST_DECLINE_ERR = "REQUEST_DECLINE_ERR";

export interface IFriendActioms {
  type:
    | typeof SEND_REQUEST
    | typeof REQUEST_SEND_SUCC
    | typeof REQUEST_GET_SUCC
    | typeof REQUEST_DECLINE_SUCC
    | typeof REQUEST_ACCEPT_SUCC
    | typeof GET_FRIEND_LIST_SUCC;
  payload?: any;
}

export interface IFriendList {
  id: number;
  user: number;
  current_user: string;
  friends: Array<any>;
}

export interface IFriendState {
  friend_obj: IFriendList | null;
  friend_req: IFriendObj[];
  isLoading: boolean;
}

export interface IFriendObj {
  id: number;
  is_active: boolean;
  declined: boolean;
  timestamp: string;
  sender: string;
  reciver: string;
}
