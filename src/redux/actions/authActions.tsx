import { GetActionTypes, createAsyncAction, createAction } from '../../utils/actionCreators';
import * as api from '../../apis';

export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_USER_SUCCESS = 'LOGIN_USER_SUCCESS';
export const LOGIN_USER_FAILURE = 'LOGIN_USER_FAILURE';

export const FETCH_USER = 'FETCH_USER';
export const FETCH_USER_SUCCESS = 'FETCH_USER_SUCCESS';
export const FETCH_USER_FAILURE = 'FETCH_USER_FAILURE';

export const REGISTER_USER_REQUEST = 'REGISTER_USER_REQUEST';
export const REGISTER_USER_SUCCESS = 'REGISTER_USER_SUCCESS';
export const REGISTER_USER_FAILURE = 'REGISTER_USER_FAILURE';

export const LOGOUT= 'LOGOUT';

const AuthActions = {
  createUser: createAsyncAction([REGISTER_USER_REQUEST, REGISTER_USER_SUCCESS, REGISTER_USER_FAILURE], api.register),
  login: createAsyncAction([LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE], api.login),
  facebookLogin: createAsyncAction([LOGIN_USER, LOGIN_USER_SUCCESS, LOGIN_USER_FAILURE], api.facebookLogin),
  fetchUser: createAsyncAction([FETCH_USER, FETCH_USER_SUCCESS, FETCH_USER_FAILURE], api.fetchSession),
  logout: () => createAction('LOGOUT', {}, {}),
};

export default AuthActions;
export type AuthActionsType = GetActionTypes<typeof AuthActions>;
