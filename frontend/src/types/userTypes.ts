// import { userConstants } from '../constants';
// import { Dispatch } from 'redux';
// import { AlertAction } from './';

export interface LoginCredentials {
  username: string;
  password: string;
  email?: string;
  rememberMe?: boolean;
  // twoFactorAuthCode?: string;
}

export interface User {
  id: string | number;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
}

// LOGIN STATE

// export interface RequestAction {
//   type: userConstants.LOGIN_REQUEST;
//   user: User;
// }

// export interface SuccessAction {
//   type: userConstants.LOGIN_SUCCESS;
//   user: User;
// }

// export interface FailureAction {
//   type: userConstants.LOGIN_FAILURE;
//   error: string;
// }

// export type AppDispatch = Dispatch<RequestAction | SuccessAction | FailureAction | AlertAction>;

// export type LogInAction = RequestAction | SuccessAction | FailureAction | { type: userConstants.LOGOUT };

export interface LoginState {
  loggingIn: boolean;
  isSuccess: boolean;
  isError: boolean;
  user: User | null;
  errorMessage?: string;
}

// REGISTRATION STATE

export interface RegistrationState {
  isRegistering: boolean;
  isSuccess: boolean;
  isError: boolean;
  errorMessage?: string;
  user?: User | null;
}

// REGISTRATION FORM MODEL
export interface RegistrationForm {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}
