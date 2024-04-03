import { userConstants } from '../constants';
import { userService } from '../services';
import { LoginCredentials, User, AppDispatch, RequestAction, SuccessAction, FailureAction } from '../types';
import { alertActions } from './';

const login = ({ username, password }: LoginCredentials) => {
  return (dispatch: AppDispatch) => {
    dispatch(request({ username }));

    userService.login({ username, password }).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request({ username }: { username: string }): RequestAction {
    return { type: userConstants.LOGIN_REQUEST, user: { username } };
  }

  function success(user: User): SuccessAction {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }

  function failure(error: string): FailureAction {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
};

export const userActions = {
  login,
};
