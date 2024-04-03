import { userConstants } from '../constants';
import { Dispatch } from 'redux';
import { AlertAction } from './';

export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
  // twoFactorAuthCode?: string;
}

export interface User {
  id: string;
  name: string;
  username?: string;
}

// LOGIN ACTIONS


export interface RequestAction {
  type: userConstants.LOGIN_REQUEST;
  user: { username: string };
}

export interface SuccessAction {
  type: userConstants.LOGIN_SUCCESS;
  user: User;
}

export interface FailureAction {
  type: userConstants.LOGIN_FAILURE;
  error: string;
}

export type AppDispatch = Dispatch<RequestAction | SuccessAction | FailureAction | AlertAction>;

export type LogInAction = RequestAction | SuccessAction | FailureAction | { type: userConstants.LOGOUT };

export interface LogInState {
    loggingIn?: boolean;
    loggedIn?: boolean;
    user?: User | null;
  }

// RE