export interface LoginCredentials {
  username: string;
  password: string;
  rememberMe?: boolean;
  // twoFactorAuthCode?: string;
}

// ALERT TYPES
export interface AlertAction {
  type: string;
  message?: string;
}

export interface AlertState {
  type?: 'alert-success' | 'alert-danger';
  message?: string;
}