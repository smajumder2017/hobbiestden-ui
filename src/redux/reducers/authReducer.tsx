import { IReducerInitialState } from '../reducers';
import {
  AuthActionsType,
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILURE,
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAILURE,
  LOGOUT
} from '../actions/authActions';
import { IFetchSession } from './../../models/AuthModel';

interface IAuthInitialState extends IReducerInitialState<IFetchSession> {
  authenticated: boolean;
}

const initalState: IAuthInitialState = {
  asyncStatus: 'INIT',
  authenticated: false,
  data: null
};

export function auth(state = initalState, action: AuthActionsType): IAuthInitialState {
  switch (action.type) {
    case FETCH_USER: {
      return {
        ...state,
        asyncStatus: 'LOADING'
      };
    }
    case FETCH_USER_SUCCESS: {
      return {
        ...state,
        asyncStatus: 'SUCCESS',
        data: action.payload.res,
        authenticated: true
      };
    }
    case FETCH_USER_FAILURE: {
      return {
        ...state,
        asyncStatus: 'FAILED'
      };
    }
    case LOGIN_USER: {
      return {
        ...state,
        asyncStatus: 'LOADING'
      };
    }
    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        asyncStatus: 'SUCCESS',
        authenticated: true
      };
    }
    case LOGIN_USER_FAILURE: {
      return {
        ...state,
        asyncStatus: 'FAILED'
      };
    }
    case LOGOUT: {
      return {
        ...state,
        asyncStatus: 'SUCCESS',
        authenticated: false,
        data: null
      };
    }
    default: {
      return { ...state };
    }
  }
}
