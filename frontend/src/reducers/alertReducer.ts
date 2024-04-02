import { alertConstants } from '../constants';
import { AlertAction, AlertState } from '../types';

export function alert(state: AlertState = {}, action: AlertAction): AlertState {
  switch (action.type) {
    case alertConstants.SUCCESS:
      return {
        type: 'alert-success',
        message: action.message,
      };
    case alertConstants.ERROR:
      return {
        type: 'alert-danger',
        message: action.message,
      };
    case alertConstants.CLEAR:
      return {};
    default:
      return state;
  }
}
